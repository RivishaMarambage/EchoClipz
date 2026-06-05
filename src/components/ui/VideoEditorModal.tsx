import React, { useState, useEffect, useRef } from 'react';
import { X, Type, Scissors, Loader2, Save, Trash2, Smartphone, Monitor, Play, Pause, ArrowLeft, Music, Volume2, Upload } from 'lucide-react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

const FONTS = [
  { name: 'Roboto', url: 'https://raw.githubusercontent.com/googlefonts/roboto/main/src/hinted/Roboto-Bold.ttf' },
  { name: 'Montserrat', url: 'https://raw.githubusercontent.com/google/fonts/main/ofl/montserrat/Montserrat-Bold.ttf' },
  { name: 'Bebas Neue', url: 'https://raw.githubusercontent.com/google/fonts/main/ofl/bebasneue/BebasNeue-Regular.ttf' },
  { name: 'Anton', url: 'https://raw.githubusercontent.com/google/fonts/main/ofl/anton/Anton-Regular.ttf' },
  { name: 'Poppins', url: 'https://raw.githubusercontent.com/google/fonts/main/ofl/poppins/Poppins-Bold.ttf' },
  { name: 'Bangers', url: 'https://raw.githubusercontent.com/google/fonts/main/ofl/bangers/Bangers-Regular.ttf' },
  { name: 'Permanent Marker', url: 'https://raw.githubusercontent.com/google/fonts/main/apache/permanentmarker/PermanentMarker-Regular.ttf' },
  { name: 'Teko', url: 'https://raw.githubusercontent.com/google/fonts/main/ofl/teko/Teko-Bold.ttf' },
  { name: 'Alfa Slab One', url: 'https://raw.githubusercontent.com/google/fonts/main/ofl/alfaslabone/AlfaSlabOne-Regular.ttf' },
  { name: 'Kanit', url: 'https://raw.githubusercontent.com/google/fonts/main/ofl/kanit/Kanit-Bold.ttf' }
];

interface VideoEditorModalProps {
  clip: { id: string; url: string; duration: string };
  ffmpeg: FFmpeg | null;
  onClose: () => void;
  onSave: (newUrl: string) => void;
}

interface Segment {
  id: string;
  start: number;
  end: number;
}

export function VideoEditorModal({ clip, ffmpeg, onClose, onSave }: VideoEditorModalProps) {
  // App State
  const [isRendering, setIsRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [error, setError] = useState('');
  
  // Text Engine State
  const [textOverlay, setTextOverlay] = useState('');
  const [textColor, setTextColor] = useState('#ffffff');
  const [textSize, setTextSize] = useState(72);
  const [textFont, setTextFont] = useState(FONTS[0].name);
  const [textPos, setTextPos] = useState({ x: 50, y: 50 }); // percentages
  
  // Aspect Ratio State
  const [aspectRatio, setAspectRatio] = useState<'original' | '9:16'>('original');

  // Audio State
  const [musicTrack, setMusicTrack] = useState<{ file: File; url: string; name: string } | null>(null);
  const [videoVolume, setVideoVolume] = useState(100);
  const [musicVolume, setMusicVolume] = useState(50);
  const [audioSegments, setAudioSegments] = useState<Segment[]>([]);
  const [selectedAudioSegmentId, setSelectedAudioSegmentId] = useState<string | null>(null);
  const [musicDuration, setMusicDuration] = useState<number>(0);

  // Timeline State
  const parsedMax = parseInt(clip.duration.replace('s', ''), 10) || 30;
  const maxDuration = Math.max(parsedMax, Math.ceil(musicDuration));
  const [segments, setSegments] = useState<Segment[]>([{ id: '1', start: 0, end: parsedMax }]);
  const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>('1');
  const [playhead, setPlayhead] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync Volume
  useEffect(() => {
    if (videoRef.current) videoRef.current.volume = videoVolume / 100;
  }, [videoVolume]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = musicVolume / 100;
  }, [musicVolume]);

  // Dragging logic
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Calculate position as percentage of container
        let newX = ((e.clientX - rect.left) / rect.width) * 100;
        let newY = ((e.clientY - rect.top) / rect.height) * 100;
        newX = Math.max(0, Math.min(100, newX));
        newY = Math.max(0, Math.min(100, newY));
        setTextPos({ x: newX, y: newY });
      }
    };
    
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const getRenderedTime = (absoluteTime: number, segs: Segment[]) => {
    let renderedTime = 0;
    const sorted = [...segs].sort((a, b) => a.start - b.start);
    for (const seg of sorted) {
      if (absoluteTime < seg.start) break;
      if (absoluteTime > seg.end) {
        renderedTime += (seg.end - seg.start);
      } else {
        renderedTime += (absoluteTime - seg.start);
        break;
      }
    }
    return renderedTime;
  };

  const getAbsoluteTimeFromRendered = (renderedTime: number, segs: Segment[]) => {
    let accumulated = 0;
    const sorted = [...segs].sort((a, b) => a.start - b.start);
    for (const seg of sorted) {
      const duration = seg.end - seg.start;
      if (renderedTime <= accumulated + duration) {
        return seg.start + (renderedTime - accumulated);
      }
      accumulated += duration;
    }
    if (sorted.length > 0) return sorted[sorted.length - 1].end;
    return 0;
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      let currentTime = videoRef.current.currentTime;
      
      if (segments.length > 0) {
        const activeSegment = segments.find(s => currentTime >= s.start && currentTime <= s.end);
        
        if (!activeSegment) {
          const sortedSegments = [...segments].sort((a, b) => a.start - b.start);
          const nextSegment = sortedSegments.find(s => s.start > currentTime);
          
          if (nextSegment) {
            videoRef.current.currentTime = nextSegment.start;
            currentTime = nextSegment.start;
          } else {
            videoRef.current.pause();
            setIsPlaying(false);
            const endOfLast = sortedSegments[sortedSegments.length - 1].end;
            videoRef.current.currentTime = endOfLast;
            currentTime = endOfLast;
          }
        }
      }
      
      setPlayhead(currentTime);

      if (audioRef.current && musicTrack && audioSegments.length > 0) {
        const renderedTime = getRenderedTime(currentTime, segments);
        const audioAbsTime = getAbsoluteTimeFromRendered(renderedTime, audioSegments);
        const totalAudioDuration = audioSegments.reduce((acc, s) => acc + (s.end - s.start), 0);
        
        if (renderedTime >= totalAudioDuration) {
           audioRef.current.pause();
        } else {
           if (Math.abs(audioRef.current.currentTime - audioAbsTime) > 0.2) {
             audioRef.current.currentTime = audioAbsTime;
           }
           if (isPlaying && audioRef.current.paused) {
             audioRef.current.play().catch(() => {});
           }
        }
      } else if (audioRef.current && musicTrack && audioSegments.length === 0) {
        audioRef.current.pause();
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    let time = parseFloat(e.target.value);
    
    if (segments.length > 0) {
      const activeSegment = segments.find(s => time >= s.start && time <= s.end);
      if (!activeSegment) {
        const sortedSegments = [...segments].sort((a, b) => a.start - b.start);
        const nextSegment = sortedSegments.find(s => s.start > time);
        if (nextSegment) {
          time = nextSegment.start;
        } else {
          time = sortedSegments[sortedSegments.length - 1].end;
        }
      }
    }
    
    setPlayhead(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
    if (audioRef.current && musicTrack && audioSegments.length > 0) {
      const renderedTime = getRenderedTime(time, segments);
      const audioAbsTime = getAbsoluteTimeFromRendered(renderedTime, audioSegments);
      audioRef.current.currentTime = audioAbsTime;
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
    if (musicTrack && audioSegments.length > 0) {
      audioRef.current?.play().catch(() => {});
    }
  };
  const handlePause = () => {
    setIsPlaying(false);
    audioRef.current?.pause();
  };

  const handleSplit = (type: 'video' | 'audio' = 'video') => {
    if (type === 'video') {
      const segmentIndex = segments.findIndex(s => playhead >= s.start && playhead <= s.end);
      if (segmentIndex === -1) return;
      
      const seg = segments[segmentIndex];
      if (playhead > seg.start + 0.2 && playhead < seg.end - 0.2) {
        const seg1: Segment = { id: `v_${Date.now()}_1`, start: seg.start, end: playhead };
        const seg2: Segment = { id: `v_${Date.now()}_2`, start: playhead, end: seg.end };
        
        const newSegments = [...segments];
        newSegments.splice(segmentIndex, 1, seg1, seg2);
        setSegments(newSegments);
        setSelectedSegmentId(seg2.id);
        setSelectedAudioSegmentId(null);
      }
    } else {
      const renderedTime = getRenderedTime(playhead, segments);
      const audioAbsTime = getAbsoluteTimeFromRendered(renderedTime, audioSegments);
      
      const segmentIndex = audioSegments.findIndex(s => audioAbsTime >= s.start && audioAbsTime <= s.end);
      if (segmentIndex === -1) return;
      
      const seg = audioSegments[segmentIndex];
      if (audioAbsTime > seg.start + 0.2 && audioAbsTime < seg.end - 0.2) {
        const seg1: Segment = { id: `a_${Date.now()}_1`, start: seg.start, end: audioAbsTime };
        const seg2: Segment = { id: `a_${Date.now()}_2`, start: audioAbsTime, end: seg.end };
        
        const newSegments = [...audioSegments];
        newSegments.splice(segmentIndex, 1, seg1, seg2);
        setAudioSegments(newSegments);
        setSelectedAudioSegmentId(seg2.id);
        setSelectedSegmentId(null);
      }
    }
  };

  const handleDeleteSegment = () => {
    if (selectedSegmentId) {
      if (segments.length <= 1) {
        alert("You cannot delete the only remaining video segment.");
        return;
      }
      setSegments(segments.filter(s => s.id !== selectedSegmentId));
      setSelectedSegmentId(null);
    } else if (selectedAudioSegmentId) {
      setAudioSegments(audioSegments.filter(s => s.id !== selectedAudioSegmentId));
      setSelectedAudioSegmentId(null);
    }
  };

  const handleRender = async () => {
    if (!ffmpeg || !ffmpeg.loaded) {
      setError('FFmpeg engine is not available.');
      return;
    }
    
    if (segments.length === 0) {
      setError('No segments to render. Video is empty.');
      return;
    }
    
    const lastLogs: string[] = [];
    
    try {
      setIsRendering(true);
      setError('');
      setRenderProgress(0);
      
      const inputName = `clip_${clip.id}.mp4`;
      const outputName = `edited_${clip.id}_${Date.now()}.mp4`;
      
      // Load the input video into the FFmpeg virtual file system
      await ffmpeg.writeFile(inputName, await fetchFile(clip.url));
      
      let musicInputName = '';
      if (musicTrack) {
        musicInputName = `music_${Date.now()}.mp3`;
        await ffmpeg.writeFile(musicInputName, await fetchFile(musicTrack.file));
      }
      
      let fontFilter = '';
      if (textOverlay.trim() !== '') {
        try {
          const fontObj = FONTS.find(f => f.name === textFont) || FONTS[0];
          await ffmpeg.writeFile('font.ttf', await fetchFile(fontObj.url));
          
          const escapedText = textOverlay.replace(/'/g, "\\'").replace(/:/g, '\\:');
          
          // Note: drawtext x and y coordinates are absolute pixels. We use our percentage relative to W and H.
          const xStr = `(w-text_w)*${textPos.x / 100}`;
          const yStr = `(h-text_h)*${textPos.y / 100}`;
          
          // Convert HEX to FFmpeg color format (e.g. #FFFFFF)
          const ffmpegColor = textColor.replace('#', '0x') + 'FF'; 
          
          fontFilter = `drawtext=fontfile=font.ttf:text='${escapedText}':fontcolor=${ffmpegColor}:fontsize=${textSize}:x=${xStr}:y=${yStr}`;
        } catch (e) {
          console.warn('Failed to load font', e);
        }
      }
      
      const args = ['-i', inputName];
      if (musicInputName) {
        args.push('-i', musicInputName);
      }
      
      const isSimpleTrim = segments.length === 1 && !fontFilter && aspectRatio === 'original' && !musicTrack && videoVolume === 100;
      
      if (isSimpleTrim) {
        // Fast path: No complex filters needed, just stream copy
        const seg = segments[0];
        args.push('-ss', seg.start.toString(), '-to', seg.end.toString());
        args.push('-c', 'copy');
        args.push(outputName);
      } else {
        let filterComplex = '';
        
        // 1 & 2. Trim and Concat Segments
        if (segments.length === 1) {
          const seg = segments[0];
          filterComplex += `[0:v]trim=start=${seg.start}:end=${seg.end},setpts=PTS-STARTPTS[v_concat];`;
          // Note: If video has no audio, [0:a] will crash. But complex edits usually need audio mapping.
          filterComplex += `[0:a]atrim=start=${seg.start}:end=${seg.end},asetpts=PTS-STARTPTS[a_out];`;
        } else {
          segments.forEach((seg, i) => {
            filterComplex += `[0:v]trim=start=${seg.start}:end=${seg.end},setpts=PTS-STARTPTS[v${i}];`;
            filterComplex += `[0:a]atrim=start=${seg.start}:end=${seg.end},asetpts=PTS-STARTPTS[a${i}];`;
          });
          
          let concatInputs = '';
          segments.forEach((_, i) => {
            concatInputs += `[v${i}][a${i}]`;
          });
          filterComplex += `${concatInputs}concat=n=${segments.length}:v=1:a=1[v_concat][a_out];`;
        }
        
        // 3. Audio Mixing Stage
        let finalAudio = '[a_out]';
        
        if (musicTrack && audioSegments.length > 0) {
          let mAud = '[1:a]';
          if (audioSegments.length === 1) {
             const seg = audioSegments[0];
             filterComplex += `[1:a]atrim=start=${seg.start}:end=${seg.end},asetpts=PTS-STARTPTS[m_trimmed];`;
             mAud = '[m_trimmed]';
          } else {
             audioSegments.forEach((seg, i) => {
               filterComplex += `[1:a]atrim=start=${seg.start}:end=${seg.end},asetpts=PTS-STARTPTS[ma${i}];`;
             });
             let aConcatInputs = '';
             audioSegments.forEach((_, i) => {
               aConcatInputs += `[ma${i}]`;
             });
             filterComplex += `${aConcatInputs}concat=n=${audioSegments.length}:v=0:a=1[m_trimmed];`;
             mAud = '[m_trimmed]';
          }
          filterComplex += `${mAud}volume=${musicVolume / 100}[m_aud_vol];`;
          filterComplex += `[a_out]volume=${videoVolume / 100}[v_aud];`;
          filterComplex += `[v_aud][m_aud_vol]amix=inputs=2:duration=first:dropout_transition=2[a_final];`;
          finalAudio = '[a_final]';
        } else if (videoVolume !== 100 || (musicTrack && audioSegments.length === 0)) {
          // If no music segments, just use video audio (or muted video audio)
          filterComplex += `[a_out]volume=${(musicTrack && audioSegments.length === 0) ? videoVolume / 100 : videoVolume / 100}[a_final];`;
          finalAudio = '[a_final]';
        }

        // 4. Chain Crop / Text on video
        let currentV = '[v_concat]';
        let nextV = '[v_crop]';
        
        if (aspectRatio === '9:16') {
          filterComplex += `${currentV}crop=ih*9/16:ih${nextV};`;
          currentV = nextV;
          nextV = '[v_text]';
        }
        
        if (fontFilter) {
          filterComplex += `${currentV}${fontFilter}${nextV};`;
          currentV = nextV;
        }
        
        // Remove trailing semicolon to prevent FFmpeg 'No such filter' error
        if (filterComplex.endsWith(';')) {
          filterComplex = filterComplex.slice(0, -1);
        }
        
        args.push('-filter_complex', filterComplex);
        args.push('-map', currentV);
        args.push('-map', finalAudio);
        
        // We must re-encode video because of complex filters
        args.push('-c:v', 'libx264', '-preset', 'ultrafast');
        args.push('-c:a', 'aac');
        args.push(outputName);
      }
      
      const onLog = ({ message }: { message: string }) => {
        console.log('FFmpeg:', message);
        lastLogs.push(message);
        if (lastLogs.length > 5) lastLogs.shift();
      };
      
      const onProgress = ({ progress }: { progress: number }) => {
        setRenderProgress(Math.min(99, Math.round(progress * 100)));
      };
      
      ffmpeg.on('log', onLog);
      ffmpeg.on('progress', onProgress);
      
      await ffmpeg.exec(args);
      
      ffmpeg.off('progress', onProgress);
      ffmpeg.off('log', onLog);
      
      const data = await ffmpeg.readFile(outputName);
      const outBlob = new Blob([data as unknown as BlobPart], { type: 'video/mp4' });
      const objectUrl = URL.createObjectURL(outBlob);
      
      onSave(objectUrl);
      
    } catch (err: Error | unknown) {
      console.error("FFmpeg render error:", err);
      // Append the last FFmpeg log lines to help debug!
      setError(`Failed to render. Details: ${(err as Error).message}. FFmpeg Log: ${lastLogs.join(' | ')}`);
    } finally {
      setIsRendering(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#050506] overflow-hidden">
      {/* Header */}
      <div className="h-14 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose} 
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors text-sm font-mono group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>
          <div className="w-px h-4 bg-zinc-800" />
          <h3 className="text-white font-bold font-mono tracking-tight flex items-center gap-2">
            <Scissors className="w-5 h-5 text-[#39FF14]" />
            EchoClipz Advanced Editor
          </h3>
        </div>
        <div className="flex items-center gap-4">
          {error && <span className="text-red-400 text-xs font-mono">{error}</span>}
          {isRendering && (
            <div className="flex items-center gap-2 text-[#39FF14] text-xs font-mono">
              <Loader2 className="w-4 h-4 animate-spin" />
              Rendering {renderProgress}%...
            </div>
          )}
          <button 
            onClick={handleRender}
            disabled={isRendering}
            className="bg-[#39FF14] hover:bg-[#2ee610] disabled:opacity-50 text-black font-bold font-mono px-6 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-2 shadow-[0_0_10px_rgba(57,255,20,0.2)]"
          >
            <Save className="w-4 h-4" />
            Save & Render
          </button>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors ml-2">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Video Workspace */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-black relative">
          <div 
            ref={containerRef}
            className={`relative bg-zinc-900 overflow-hidden shadow-2xl flex items-center justify-center transition-all duration-300 ${aspectRatio === '9:16' ? 'aspect-[9/16] h-full rounded-lg' : 'aspect-video w-[80%] border border-zinc-800'}`}
          >
            <video 
              ref={videoRef}
              src={clip.url} 
              onTimeUpdate={handleTimeUpdate}
              onPlay={handlePlay}
              onPause={handlePause}
              controls={false}
              className={`w-full h-full object-cover ${aspectRatio === '9:16' ? 'object-center' : ''}`}
            />
            {musicTrack && (
              <audio 
                ref={audioRef} 
                src={musicTrack.url} 
                onLoadedMetadata={(e) => {
                  const duration = e.currentTarget.duration;
                  setMusicDuration(duration);
                  if (audioSegments.length === 0) {
                    setAudioSegments([{ id: `audio_${Date.now()}`, start: 0, end: duration }]);
                  }
                }}
              />
            )}
            
            {/* Draggable Text Overlay */}
            {textOverlay && (
              <div 
                ref={dragRef}
                onMouseDown={() => setIsDragging(true)}
                style={{ 
                  left: `${textPos.x}%`, 
                  top: `${textPos.y}%`, 
                  transform: 'translate(-50%, -50%)',
                  color: textColor,
                  fontSize: `${textSize / 3}px` // scaled down for preview purposes roughly
                }}
                className={`absolute cursor-move select-none whitespace-nowrap hover:ring-2 ring-[#39FF14]/50 ring-offset-4 ring-offset-black/20 p-2 rounded`}
              >
                <span style={{ fontFamily: textFont, textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 2px 0 #000, 2px 0 0 #000, 0 -2px 0 #000, -2px 0 0 #000, 0 0 10px rgba(0,0,0,0.8)' }}>
                  {textOverlay}
                </span>
              </div>
            )}
            
            {/* Play/Pause Button */}
            <div className="absolute bottom-4 left-4 flex gap-2 z-10">
               <button 
                 onClick={() => isPlaying ? videoRef.current?.pause() : videoRef.current?.play()}
                 className="bg-black/50 hover:bg-black/80 backdrop-blur-md text-white p-2 rounded-full border border-white/10 transition-transform active:scale-95"
               >
                 {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current translate-x-[1px]" />}
               </button>
            </div>
          </div>
        </div>

        {/* Right Tools Panel */}
        <div className="w-80 bg-zinc-950 border-l border-zinc-800 flex flex-col shrink-0 overflow-y-auto">
          <div className="p-6 space-y-8">
            
            {/* Aspect Ratio */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Format / Ratio</h4>
              <div className="flex bg-zinc-900 rounded-lg p-1 border border-zinc-800">
                <button 
                  onClick={() => setAspectRatio('original')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-mono rounded-md transition-colors ${aspectRatio === 'original' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  16:9 Orig
                </button>
                <button 
                  onClick={() => setAspectRatio('9:16')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-mono rounded-md transition-colors ${aspectRatio === '9:16' ? 'bg-zinc-800 text-[#39FF14] shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  9:16 Mobile
                </button>
              </div>
            </div>

            {/* Text Overlay Section */}
            <div className="space-y-4 pt-4 border-t border-zinc-800/50">
              <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                <Type className="w-4 h-4" />
                Text Overlay
              </h4>
              
              <input 
                type="text" 
                placeholder="Type your caption here..." 
                value={textOverlay}
                onChange={(e) => setTextOverlay(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#39FF14] transition-colors"
              />

              {textOverlay && (
                <div className="space-y-4 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800/50">
                  <p className="text-[10px] text-[#39FF14] font-mono italic">Drag text on the video to move it.</p>
                  
                  <div>
                    <label className="text-[10px] text-zinc-500 font-mono mb-2 block">Font Family</label>
                    <select 
                      value={textFont}
                      onChange={(e) => setTextFont(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 text-white text-xs px-3 py-2 rounded focus:outline-none focus:border-[#39FF14]"
                    >
                      {FONTS.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                    </select>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="text-[10px] text-zinc-500 font-mono mb-2 block">Font Size ({textSize}px)</label>
                      <input 
                        type="range" min="24" max="150" 
                        value={textSize} onChange={(e) => setTextSize(parseInt(e.target.value))}
                        className="w-full accent-[#39FF14]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-zinc-500 font-mono mb-2 block">Color</label>
                      <input 
                        type="color" 
                        value={textColor} 
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Audio Settings Section */}
            <div className="space-y-4 pt-4 border-t border-zinc-800/50">
              <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                <Music className="w-4 h-4" />
                Audio & Music
              </h4>
              
              <div className="space-y-3 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800/50">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] text-zinc-500 font-mono">Video Volume ({videoVolume}%)</label>
                  <Volume2 className="w-3.5 h-3.5 text-zinc-500" />
                </div>
                <input 
                  type="range" min="0" max="100" 
                  value={videoVolume} onChange={(e) => setVideoVolume(parseInt(e.target.value))}
                  className="w-full accent-[#39FF14]"
                />

                <div className="pt-2 border-t border-zinc-800/50">
                  <label className="text-[10px] text-zinc-500 font-mono mb-2 block">Background Music</label>
                  {!musicTrack ? (
                    <label className="flex items-center justify-center gap-2 w-full bg-zinc-900 border border-zinc-700 hover:border-[#39FF14] transition-colors rounded-lg px-4 py-2 text-xs font-mono text-white cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      Upload Audio
                      <input 
                        type="file" 
                        accept="audio/*" 
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = URL.createObjectURL(file);
                            setMusicTrack({ file, url, name: file.name });
                          }
                        }}
                      />
                    </label>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-zinc-900 border border-zinc-700 rounded p-2">
                        <span className="text-xs text-[#39FF14] font-mono truncate mr-2">{musicTrack.name}</span>
                        <button 
                          onClick={() => {
                            if (musicTrack.url) URL.revokeObjectURL(musicTrack.url);
                            setMusicTrack(null);
                            setAudioSegments([]);
                            setMusicDuration(0);
                            setSelectedAudioSegmentId(null);
                          }}
                          className="text-zinc-500 hover:text-red-400"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] text-zinc-500 font-mono">Music Volume ({musicVolume}%)</label>
                        <Volume2 className="w-3.5 h-3.5 text-[#39FF14]" />
                      </div>
                      <input 
                        type="range" min="0" max="100" 
                        value={musicVolume} onChange={(e) => setMusicVolume(parseInt(e.target.value))}
                        className="w-full accent-[#39FF14]"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            
          </div>
        </div>
      </div>

      {/* Bottom Timeline Panel */}
      <div className="h-48 bg-zinc-950 border-t border-zinc-800 flex flex-col shrink-0">
        {/* Timeline Tools */}
        <div className="h-10 bg-zinc-900 border-b border-zinc-800 flex items-center px-4 gap-2">
          <button 
            onClick={() => handleSplit('video')}
            disabled={!segments.some(s => playhead > s.start + 0.2 && playhead < s.end - 0.2)}
            className="flex items-center gap-1.5 px-3 py-1 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:hover:bg-zinc-800 rounded text-xs font-mono text-white transition-colors"
          >
            <Scissors className="w-3.5 h-3.5" /> Split Video
          </button>
          
          {musicTrack && (
            <button 
              onClick={() => handleSplit('audio')}
              disabled={!audioSegments.some(s => {
                  const renderedTime = getRenderedTime(playhead, segments);
                  const audioAbsTime = getAbsoluteTimeFromRendered(renderedTime, audioSegments);
                  return audioAbsTime > s.start + 0.2 && audioAbsTime < s.end - 0.2;
              })}
              className="flex items-center gap-1.5 px-3 py-1 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:hover:bg-zinc-800 rounded text-xs font-mono text-[#39FF14] hover:text-[#2ee610] transition-colors"
            >
              <Scissors className="w-3.5 h-3.5" /> Split Audio
            </button>
          )}

          <button 
            onClick={handleDeleteSegment}
            disabled={(!selectedSegmentId && !selectedAudioSegmentId) || (selectedSegmentId && segments.length <= 1)}
            className="flex items-center gap-1.5 px-3 py-1 bg-zinc-800 hover:bg-red-900/50 disabled:opacity-50 disabled:hover:bg-zinc-800 rounded text-xs font-mono text-red-400 hover:text-red-300 transition-colors ml-auto"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete Selected
          </button>
        </div>
        
        {/* Track Area */}
        <div className="flex-1 relative px-8 py-6 bg-[#0a0a0c] overflow-hidden select-none flex flex-col justify-center gap-2">
          
          {/* Ruler / Scrubber Area */}
          <div className="relative w-full h-8">
            {/* Time Scrubber Input */}
            <input 
              type="range" 
              min={0} max={maxDuration} step="0.1"
              value={playhead}
              onChange={handleSeek}
              className="absolute inset-0 z-40 opacity-0 cursor-ew-resize w-full h-full"
            />

            <div className="absolute bottom-1 w-full flex justify-between px-1">
              <span className="text-[10px] text-zinc-600 font-mono">0:00</span>
              <span className="text-[10px] text-zinc-600 font-mono">0:{maxDuration.toString().padStart(2, '0')}</span>
            </div>

            {/* Visual Playhead Handle */}
            <div 
              className="absolute top-0 bottom-[-4rem] w-[2px] bg-white z-30 pointer-events-none"
              style={{ left: `calc(${ (playhead / maxDuration) * 100 }% - 1px)` }}
            >
              <div className="absolute top-2 -translate-x-[5px] w-3 h-3 bg-white rotate-45 rounded-sm" />
            </div>
          </div>

          {/* Segments Track (Video) */}
          <div className="relative w-full h-12 bg-zinc-900/50 rounded-lg overflow-hidden border border-zinc-800 shadow-inner">
             {segments.map((seg) => {
               const leftPct = (seg.start / maxDuration) * 100;
               const widthPct = ((seg.end - seg.start) / maxDuration) * 100;
               return (
                 <div 
                   key={seg.id}
                   onClick={() => {
                     setSelectedSegmentId(seg.id);
                     setSelectedAudioSegmentId(null);
                   }}
                   className={`absolute top-0 bottom-0 border-r border-zinc-950 flex items-center justify-center px-2 cursor-pointer transition-all z-10 ${
                     selectedSegmentId === seg.id ? 'bg-[#39FF14]/20 border border-[#39FF14] z-20 shadow-[0_0_15px_rgba(57,255,20,0.2)]' : 'bg-zinc-800 hover:bg-zinc-700'
                   }`}
                   style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                 >
                   <span className="text-[10px] font-mono text-white/70 truncate pointer-events-none drop-shadow-md">
                     Video {seg.start.toFixed(1)}s - {seg.end.toFixed(1)}s
                   </span>
                 </div>
               );
             })}
          </div>

          {/* Audio Segments Track */}
          {musicTrack && audioSegments.length > 0 && (
            <div className="relative w-full h-12 bg-zinc-900/50 rounded-lg overflow-hidden border border-zinc-800 shadow-inner mt-2">
               {audioSegments.map((seg) => {
                 const startRendered = getRenderedTime(seg.start, audioSegments);
                 const durationRendered = seg.end - seg.start;
                 const endRendered = startRendered + durationRendered;
                 
                 const startVisual = getAbsoluteTimeFromRendered(startRendered, segments);
                 const endVisual = getAbsoluteTimeFromRendered(endRendered, segments);
                 
                 const leftPct = (startVisual / maxDuration) * 100;
                 const widthPct = ((endVisual - startVisual) / maxDuration) * 100;
                 
                 return (
                   <div 
                     key={seg.id}
                     onClick={(e) => {
                       e.stopPropagation();
                       setSelectedAudioSegmentId(seg.id);
                       setSelectedSegmentId(null);
                     }}
                     className={`absolute top-0 bottom-0 border-r border-zinc-950 flex items-center justify-center px-2 cursor-pointer transition-all z-10 ${
                       selectedAudioSegmentId === seg.id ? 'bg-blue-500/30 border border-blue-500 z-20 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-blue-900/40 hover:bg-blue-800/50'
                     }`}
                     style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                   >
                     <span className="text-[10px] font-mono text-white/90 truncate pointer-events-none drop-shadow-md">
                       Audio {seg.start.toFixed(1)}s - {seg.end.toFixed(1)}s
                     </span>
                   </div>
                 );
               })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

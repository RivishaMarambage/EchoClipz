"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';
import { VideoEditorModal } from '@/components/ui/VideoEditorModal';

export default function TestFFmpegPage() {
  const [ffmpeg, setFFmpeg] = useState<FFmpeg | null>(null);
  const [clip, setClip] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const ff = new FFmpeg();
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
      await ff.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });
      setFFmpeg(ff);
      setClip({
        id: 'test_clip',
        duration: '5s',
        url: '/dummy.mp4'
      });
    };
    load();
  }, []);

  if (!ffmpeg || !clip) {
    return <div className="p-10 text-white">Loading FFmpeg...</div>;
  }

  return (
    <div className="w-screen h-screen">
      <VideoEditorModal 
        clip={clip} 
        ffmpeg={ffmpeg} 
        onClose={() => console.log('Close')} 
        onSave={(url) => console.log('Saved URL:', url)} 
      />
    </div>
  );
}

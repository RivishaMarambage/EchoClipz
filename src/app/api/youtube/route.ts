import { NextRequest, NextResponse } from 'next/server';
import ytdl from '@distube/ytdl-core';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');

  if (!url || !ytdl.validateURL(url)) {
    return new NextResponse('Invalid or missing YouTube URL', { status: 400 });
  }

  try {
    const info = await ytdl.getInfo(url);
    
    // Get the highest quality format that contains both audio and video
    const format = ytdl.chooseFormat(info.formats, { filter: 'audioandvideo', quality: 'highest' });
    
    const videoStream = ytdl(url, { format });
    
    const readableStream = new ReadableStream({
      start(controller) {
        videoStream.on('data', (chunk) => {
          controller.enqueue(chunk);
        });
        videoStream.on('end', () => {
          controller.close();
        });
        videoStream.on('error', (err) => {
          console.error("YTDL Error:", err);
          controller.error(err);
        });
      },
      cancel() {
        videoStream.destroy();
      }
    });

    const headers = new Headers();
    headers.set('Content-Type', format.mimeType || 'video/mp4');
    // Sanitize title for filename
    const safeTitle = info.videoDetails.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    headers.set('Content-Disposition', `attachment; filename="${safeTitle}.mp4"`);

    return new NextResponse(readableStream, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('YouTube Proxy Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

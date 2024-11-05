import { NextResponse } from 'next/server';
import axios from 'axios';
import { JSDOM } from 'jsdom';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is missing' }, { status: 400 });
  }

  try {
    const response = await axios.get(url);
    const dom = new JSDOM(response.data);
    const document = dom.window.document;

    // Extract meta tags data
    const descriptionMeta = document.querySelector('meta[property="og:description"]');
    const titleMeta = document.querySelector('meta[property="og:title"]');
    const imageMeta = document.querySelector('meta[property="og:image"]');

    const followers = descriptionMeta ? descriptionMeta.getAttribute('content') : null;
    const name = titleMeta ? titleMeta.getAttribute('content') : null;
    const imageUrl = imageMeta ? imageMeta.getAttribute('content') : null;

    return NextResponse.json({
      followers,
      name,
      imageUrl,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

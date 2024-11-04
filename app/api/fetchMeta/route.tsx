// import { NextRequest, NextResponse } from 'next/server';
// import axios from 'axios';

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);
//   const url = searchParams.get('url');

//   if (!url) {
//     return NextResponse.json({ error: 'URL parameter is missing' }, { status: 400 });
//   }

//   try {
//     const response = await axios.get(url);
//     const html = response.data;

//         const match = html.match(/<meta property="og:description" content="([^"]*)"/);
//     if (match && match[1]) {
//       return NextResponse.json({ content: match[1] });
//     } else {
//       return NextResponse.json({ error: 'Meta tag not found' }, { status: 404 });
//     }
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
//   }
// }

import axios from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return new Response(JSON.stringify({ error: 'URL parameter is missing' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await axios.get(url);
    const html = response.data;


    const match = html.match(/<meta property="og:description" content="([^"]*)"/);
    console.log(match[1])

    if (match && match[1]) {
      return new Response(JSON.stringify({ content: match[1] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ error: 'Meta tag not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


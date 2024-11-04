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

    // ส่ง HTML กลับไปยัง component
    return new Response(JSON.stringify({ content: html }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {  // เปลี่ยนชื่อจาก error เป็น err
    console.error('Error fetching data:', err);  // แสดงข้อผิดพลาดในคอนโซล
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

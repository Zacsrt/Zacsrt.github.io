"use client";
import { useState } from 'react';

export default function ExampleComponent() {
  const [metaContent, setMetaContent] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  async function fetchMetaContent() {
    if (!username) return;

    try {
      const response = await fetch(`/api/fetchMeta?url=https://www.instagram.com/${username}/`);
      const data = await response.json();
      if (data.content) {
        // ใช้ extractFollowers ที่ดึงข้อมูลจาก content
        const followers = extractFollowers(data.content);
        setMetaContent(followers);
        setName(username)
      } else {
        console.error('Meta tag not found');
      }
    } catch (error) {
      console.error('Error fetching meta tag:', error);
    }
  }

  // Function to extract followers count
  const extractFollowers = (content: string) => {
    const match = content.match(/<meta property="og:description" content="([^"]*)"/);
    if (match && match[1]) {
      // ใช้ regex ดึงข้อมูล followers
      const followersMatch = match[1].match(/(\d{1,3}(?:,\d{3})*) Followers/);
      return followersMatch ? followersMatch[1] + ' Followers' : 'Followers not found';
    }
    return 'Meta tag not found';
  };

  return (
    <div className="bg-white rounded-md shadow-md p-4 max-w-xl mx-auto my-4 flex flex-col items-center">
      <input
        type="text"
        placeholder="Enter Instagram username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-2 text-lg"
      />
      <button 
        onClick={fetchMetaContent} 
        className="bg-blue-500 text-white rounded-md py-2 px-4 text-lg hover:bg-blue-600 transition duration-300"
      >
        Fetch Meta Tag
      </button>
            <p className="mt-2 text-lg font-bold">{name}</p>
      <p className="mt-2 text-lg font-bold">Followers Count: {metaContent}</p>
    </div>
  );
}

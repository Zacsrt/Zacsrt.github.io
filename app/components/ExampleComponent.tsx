"use client";
import { useState } from 'react';
import axios from 'axios';

export default function ExampleComponent() {
  const [followers, setFollowers] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  async function fetchMetaContent() {
    if (!username) return;

    try {
      const response = await axios.get(`/api/fetchMeta?url=https://www.instagram.com/${username}/`);
      const data = response.data;
console.log(data)
      if (data) {
        const followersMatch = (data.followers).match(/(\d{1,3}(?:,\d{3})*) Followers/);
        setFollowers(followersMatch[1] || 'Followers not found');
        setName(data.name || username);
        setImageUrl(data.imageUrl || '');
      } else {
        console.error('Meta tag data not found');
      }
    } catch (error) {
      console.error('Error fetching meta tag:', error);
    }
  }

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
      {imageUrl && <img src={imageUrl} alt={`${name}'s profile`} className="mt-4 rounded-full w-24 h-24" />}
      <p className="mt-2 text-lg font-bold">{name}</p>
      <p className="mt-2 text-lg font-bold">Followers Count: {followers}</p>
    </div>
  );
}

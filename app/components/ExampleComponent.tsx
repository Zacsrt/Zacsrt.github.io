"use client";
import { useEffect, useState } from 'react';
import { testdata } from './test';
import axios from 'axios';

export default function ExampleComponent() {
    const [metaContent, setMetaContent] = useState('');
    const [username, setUsername] = useState('');

    async function fetchMetaContent() {
        if (!username) return;

        try {
            //   const response = await fetch(`/api/fetchMeta?url=https://www.instagram.com/${username}/`);
            const response:any = await fetch(`https://www.instagram.com/${username}/`);
            const data = await response.text();
            console.log(data)
            // const match: any = data.match(/<meta property="og:description" content="([^"]*)"/);
            // console.log(match)
            // const followers = extractFollowers(match[1]);
            // setMetaContent(followers)
            //   if (data.content) {
            //     const followers = extractFollowers(data.content);
            //     setMetaContent(followers);
            //   } else {
            //     console.error('Meta tag not found');
            //   }
        } catch (error) {
            console.error('Error fetching meta tag:', error);
        }
    }

    const extractFollowers = (content: string) => {
        const match = content.match(/(\d{1,3}(?:,\d{3})*) Followers/);
        return match ? match[1] + ' Followers' : 'Followers not found';
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter Instagram username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={fetchMetaContent}>Fetch Meta Tag</button>
            <p>Followers Count: {metaContent}</p>
        </div>
    );
}

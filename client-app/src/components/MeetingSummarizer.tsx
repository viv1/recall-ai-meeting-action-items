// src/components/MeetingSummarizer.tsx

import React, { useState } from 'react';
import axios from 'axios';

const MeetingSummarizer: React.FC = () => {
  const [meetingUrl, setMeetingUrl] = useState('');
  const [botId, setBotId] = useState('');
  const [summary, setSummary] = useState('');
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');

  const API_BASE_URL = process.env.BACKEND_URL || 'http://localhost:3002'; // Your backend API base URL

  const handleCreateBot = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/create_bot`, { meetingUrl });
      setBotId(response.data.botId);
      setError(''); // Clear any previous errors
    } catch (error) {
      setError('Error creating bot. Please check the meeting URL.');
      console.error('Error in handleCreateBot:', error);
    }
  };

  const handleGetSummary = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/summarize`, { botId });
      setSummary(response.data.summary);
      setTranscript(response.data.transcript);
      setError('');
    } catch (error) {
      setError('Error getting summary. Please try again.');
      console.error('Error in handleGetSummary:', error);
    }
  };
  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
        Meeting Summarizer
      </h1>

      <div className="flex flex-col md:flex-row mb-4">
        <input
          type="url"
          value={meetingUrl}
          onChange={(e) => setMeetingUrl(e.target.value)}
          placeholder="Enter meeting URL"
          className="w-full md:w-3/4 px-4 py-2 border rounded-l-md focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          onClick={handleCreateBot}
          className="w-full md:w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md disabled:opacity-50"
          disabled={!meetingUrl}
        >
          Create Bot
        </button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {botId && (
        <div className="mt-6">
          <p className="text-gray-600 mb-2">Bot ID: {botId}</p>
          <button
            onClick={handleGetSummary}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Get Meeting Summary
          </button>
        </div>
      )}

      {summary && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Summary</h2>
          <p className="text-gray-700 whitespace-pre-line">{summary}</p>
        </div>
      )}

      {transcript && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Transcript</h2>
          <p className="text-gray-700 whitespace-pre-line">{transcript}</p>
        </div>
      )}
    </div>
  );
};

export default MeetingSummarizer;

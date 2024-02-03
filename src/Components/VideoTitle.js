import React, { useState } from 'react';

// Helper function to truncate text
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return { truncated: text, shouldShowButton: false };
  } else {
    const truncatedText = text.substring(0, maxLength) + '...';
    return { truncated: truncatedText, shouldShowButton: true };
  }
};

const VideoTitle = ({ title, overview }) => {
  const [expanded, setExpanded] = useState(false);

  // Truncate overview to a certain length (e.g., 150 characters)
  const { truncated, shouldShowButton } = truncateText(overview, 179);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const resetText = () => {
    setExpanded(false);
  };

  return (
    <div className='w-screen aspect-video pt-[20%] px-12 absolute text-white bg-gradient-to-r from-black'>
      <h1 className='text-4xl font-bold'>{title}</h1>
      <p className='py-6 text-lg w-1/4'>
        {expanded ? overview : truncated}
        {shouldShowButton && (
          <button className='text-blue-500' onClick={expanded ? resetText : toggleExpanded}>
            {expanded ? ' Read Less' : ' Read More'}
          </button>
        )}
      </p>
      <div className=''>
        <button className='bg-white text-black p-4 px-12 text-xl hover:bg-opacity-80 rounded-lg'>
          ▶️ Play
        </button>
        <button className='mx-2 bg-white text-black p-4 px-12 text-xl bg-opacity-40 rounded-lg'>
          ℹ️ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;

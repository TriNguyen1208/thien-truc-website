import React, { useState } from 'react';

const DisableTextBox = ({ width = 'w-64', height = 'h-auto', placeholder = '', type = 'input' }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 10000);
  };

  return (
    <div className="relative inline-block">
      {type === 'input' ? (
        <input
          className={`bg-gray-100 text-black border border-gray-300 rounded px-3 py-2 cursor-not-allowed ${width} ${height}`}
          placeholder={placeholder}
          disabled
        />
      ) : (
        <textarea
          className={`bg-gray-100 text-black border border-gray-300 rounded px-3 py-2 cursor-not-allowed resize-none ${width} ${height}`}
          placeholder={placeholder}
          disabled
        />
      )}
    </div>
  );
};

export default DisableTextBox;

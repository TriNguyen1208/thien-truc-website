import React, { useState } from 'react';

export default function MenuProject({items}) {
  const [activeItem, setActiveItem] = useState(items[0]);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="flex gap-4 bg-white-100 rounded-full p-1 w-fit shadow-lg">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => handleItemClick(item)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform ${
            activeItem === item
              ? 'bg-emerald-500 text-white shadow-lg scale-100'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
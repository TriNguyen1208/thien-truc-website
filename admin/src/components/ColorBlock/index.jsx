import React from 'react'

const ColorBlock = ({ color }) => (
    <div className="flex items-center gap-2">
      <div
        className="w-4 h-4 rounded-sm"
        style={{ backgroundColor: color }}
      />
      <span>{color}</span>
    </div>
  );

export default ColorBlock
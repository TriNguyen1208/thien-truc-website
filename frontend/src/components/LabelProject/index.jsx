import React from 'react';

const LabelProject = ({ data, color }) => {
  return (
    <button style={{ backgroundColor: color }} className="text-white font-bold px-6 py-1 rounded-2xl">
      {data}
    </button>
  );
};

export default LabelProject;
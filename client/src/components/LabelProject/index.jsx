import React from 'react';

const LabelProject = ({data}) => {
  const {content, color }  = data
  return (
    <button
      className={`text-black px-6 py-3 rounded-full`}
      style={{ background: color}}
    >
      {content}
    </button>
  );
};

export default LabelProject;
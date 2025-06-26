import React from 'react';

const LabelProject = (props) => {
  const {data, color }  = props
  return (
    <button className={`bg-${color}-500 text-black px-6 py-2 rounded-full`}>
      {data}
    </button>
  );
};

export default LabelProject;
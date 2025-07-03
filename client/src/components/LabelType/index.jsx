import React from 'react'

const LabelType = ({data}) => {
    const {content, color }  = data
    console.log(content)
    return (
      <button
        className={`text-white py-1 px-5 rounded-full`}
        style={{ background: color}}
      >
        {content}
      </button>
    );
}

export default LabelType
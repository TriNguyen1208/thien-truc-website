import React, { useState, useEffect } from 'react'

const LabelAssgin = ({current, onAssign}) => {
    const [assign, setAssign] = useState(current);
    useEffect(() => {
        setAssign(current);
    }, [current]);
    const handleAssignClick = () => {
        const newState = assign === "Đã gán" ? "Chưa gán" : "Đã gán";
        setAssign(newState);
        onAssign(newState); // báo cho parent
    };
    return (
        <div className=''>
            {assign === "Đã gán" && 
                <button
                    className='py-1 px-3 rounded-full bg-[#dcfce7] cursor-pointer'
                    onClick={handleAssignClick}
                >
                    <span className='text-[#166534] font-bold'>Đã gán</span>
                </button>
            }
            {assign === "Chưa gán" && 
                <button
                    className='py-1 px-3 rounded-full bg-white border border-gray-300 cursor-pointer '
                    onClick={handleAssignClick}
                >
                    <span className='text-black font-bold'>Chưa gán</span>
                </button>
            }
        </div>
    )
}

export default LabelAssgin
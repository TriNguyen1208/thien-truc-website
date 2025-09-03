// components/ProjectsToolbar.jsx
import PostCategory from "@/components/PostCategory";
import React from 'react';

const ProjectsToolbar = React.forwardRef(({ categories, idSelectedCategories, handleClick }, ref) => {
    return (
        <div className="container-fluid">
            <div className="my-[40px] text-center" ref={ref}>
                <h1 className='text-4xl mb-[30px] font-bold'>Công trình tiêu biểu</h1>
                <div className="mb-[30px] max-w-[70%] mx-auto">
                    <PostCategory
                        categories={categories}
                        handleClick={handleClick}
                        idCategories={idSelectedCategories}
                    />
                </div>
            </div>
        </div>
    );
});

export default ProjectsToolbar;
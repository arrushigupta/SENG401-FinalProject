import React from 'react';

const LoadingAnimation = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin bg-black"></div>
        </div>
    );
};

export default LoadingAnimation;

import React from 'react'

const ATMProfileCard = () => {
    return (
        <div className="bg-white p-2 px-4 flex rounded gap-6 items-center">
            <div>
                <img
                    className="w-16 h-16 rounded-full object-cover"
                    src="/profile.webp"
                    alt="user-image"
                />
            </div>
            <div className=''>
                <p className="text-xl font-bold">Hi, Reader,</p>
                <p>Here's your News!</p>
            </div>
        </div>
    )
}

export default ATMProfileCard
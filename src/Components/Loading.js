import React from 'react'

const Loading = () => {
    return (
        <div className='flex justify-center align-middle'>
            <img src={require("../Images/loader.gif")} className='w-15 shadow-xl' alt="loader" />
        </div>
    )
}

export default Loading
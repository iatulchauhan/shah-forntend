import React from 'react'

const ProfileIcon = (props) => {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.2133 14.4933C16.08 14.48 15.92 14.48 15.7734 14.4933C12.6 14.3867 10.08 11.7867 10.08 8.58666C10.08 5.31999 12.72 2.66666 16 2.66666C19.2667 2.66666 21.92 5.31999 21.92 8.58666C21.9067 11.7867 19.3867 14.3867 16.2133 14.4933Z" stroke={props?.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9.54665 19.4133C6.31998 21.5733 6.31998 25.0933 9.54665 27.24C13.2133 29.6933 19.2266 29.6933 22.8933 27.24C26.12 25.08 26.12 21.56 22.8933 19.4133C19.24 16.9733 13.2266 16.9733 9.54665 19.4133Z" stroke={props?.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    )
}

export default ProfileIcon
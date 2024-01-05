import React from 'react'

const SmsIcon = (props) => {
  return (
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.6667 27.3333H9.33335C5.33335 27.3333 2.66669 25.3333 2.66669 20.6667V11.3333C2.66669 6.66667 5.33335 4.66667 9.33335 4.66667H22.6667C26.6667 4.66667 29.3334 6.66667 29.3334 11.3333V20.6667C29.3334 25.3333 26.6667 27.3333 22.6667 27.3333Z" stroke={props.color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22.6666 12L18.4933 15.3333C17.12 16.4267 14.8666 16.4267 13.4933 15.3333L9.33331 12" stroke={props.color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  )
}

export default SmsIcon;
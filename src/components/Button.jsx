import React from 'react'
import '../styles/button.css'
export default function Button({icon: Icon, title, onclick, type}) {
  return (
    <button className={type||""} onClick={onclick}>
        {Icon && <Icon />}
        {title}
    </button>
  )
}

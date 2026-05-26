import React from 'react'
import '../styles/button.css'
export default function Button({icon: Icon, title, onclick, type, disabled}) {
  return (
    <button className={type||""} onClick={onclick} disabled={disabled}>
        {Icon && <Icon />}
        {title}
    </button>
  )
}

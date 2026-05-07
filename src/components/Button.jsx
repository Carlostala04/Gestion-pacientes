import React from 'react'
import '../styles/button.css'
export default function Button({icon: Icon, title, onclick}) {
  return (
    <button onClick={onclick}>
        {Icon && <Icon />}
        {title}
    </button>
  )
}

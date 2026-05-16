import React from 'react'
import "../styles/infoCard.css"
export default function InfoCards({title, info_number,message}) {
  return (
    <div className='card'>
        <h3 className='card-title'>{title}</h3>
        <h4 className='card-number'>{info_number}</h4>
        <h5 className='card-message'>{message}</h5>
    </div>
  )
}

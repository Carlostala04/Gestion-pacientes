import React from 'react'

export default function Form({ children, onSubmit }) {
  return (
   <form className='form' onSubmit={onSubmit}>
    {children}
   </form>
  )
}

import Link from 'next/link';
import React from 'react'

const Nav = () => {
  return (
    <div>
      <Link href="/">Home</Link> |  
      <Link href="/about">About</Link> | 
      <Link href="/services">Services</Link> | 
      <Link href="/team">Team</Link> | 
      <Link href="/contact">Contact</Link>
    </div>
  )
}

export default Nav

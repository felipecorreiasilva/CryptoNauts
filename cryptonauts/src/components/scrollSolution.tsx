'use client'

import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const scrollSolution = () => {
    const pathname = usePathname()
    useEffect(() => {
        window.scroll(0, 0)
    }, [pathname])
    
  return (
    <div></div>
  )
}

export default scrollSolution
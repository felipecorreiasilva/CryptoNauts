'use client'

import React, { useEffect, useState } from 'react'

function Footer() {
const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
    {isClient &&
    <footer className='p-32'>
        <div className="text-white text-center">footer</div>
    </footer>
    }
    </>
  )
}

export default Footer
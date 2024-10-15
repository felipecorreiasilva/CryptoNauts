'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import Header from './Header'

interface PropsMainContainer {
    children: ReactNode
}

const MainContainer = (props:PropsMainContainer) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
    {isClient &&
      <div className='flex flex-col'>
        
        <main className="pt-44 sm:pt-64">
          
            {props.children}

        </main>
        
    </div>
    }
    </>
    
    
    
  )
}

export default MainContainer
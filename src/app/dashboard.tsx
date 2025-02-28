'use client'

import { useState } from 'react'

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState('')
  return (
    <div>
      <h1>Dashboard {isLoading}</h1>
    </div>
  )
}

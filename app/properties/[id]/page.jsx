import Link from 'next/link'
import React from 'react'

function PropertyPage({ params }) {
  const { id } = params

  return (
    <div>
      <h1 className="text-3xl">{id} Properties</h1>
      <Link href="/properties">Go Home</Link>
    </div>
  )
}

export default PropertyPage

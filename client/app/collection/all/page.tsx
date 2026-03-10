import CollectionCard from '@/components/CollectionCard';
import React from 'react'

type Collection = {
    _id: string,
    title: string,
    description: string,
    image?: string
}

async function getCollections(): Promise<Collection[]> {
  const res = await fetch("http://localhost:5000/api/collections", {
    cache: "no-store"
  });

  if(!res.ok) {
    throw new Error("Failed to fetch all collections!")
  }

  return res.json()
}

export default async function page() {

  const collections = await getCollections();

  return (
    <>
    <div className='flex items-center justify-around min-h-[90vh] bg-color2'>
      <div className='text-white text-2xl md:text-8xl font-poppins font-semibold'>
        All Collections
      </div>
    </div>
    <div className='flex flex-wrap items-center justify-evenly pt-[15vh] bg-color5 min-h-screen'>
      {collections.map(c => 
        <CollectionCard key={c._id} c={c}></CollectionCard>
      )}
    </div>
    </>
  )
}

import React from 'react'
import EditPharmacistsForm from './components/EditPharmacistForm'

export default function EditPharmacist({ params }: { params: { id: string } }) {
  return (
    <div className="p-5 flex not-lg:flex-col not-lg:space-y-5 min-h-screen w-full justify-evenly items-center font-[family-name:var(--font-geist-sans)]">
      <h1 className='font-[family-name:var(--font-geist-sans)] text-3xl font-semibold'>Edit pharmacist info</h1>
      <EditPharmacistsForm id={params.id}></EditPharmacistsForm>
    </div>
  )
}
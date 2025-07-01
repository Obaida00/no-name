import React from 'react'
import EditPharmacistsForm from './components/EditPharmacistForm'

export default function EditPharmacist({params}: {params: {id: string}}) {
  return (
    <div className="flex min-h-screen w-full justify-center items-center font-[family-name:var(--font-geist-sans)]">
        <EditPharmacistsForm id={params.id}></EditPharmacistsForm>
    </div>
  )
}
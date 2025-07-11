import React from 'react'
import AddPharmacistsForm from './components/AddPharmacistsForm'

export default function AddPharmacists() {
  return (
    <div className=" p-5 flex not-lg:flex-col not-lg:space-y-5 min-h-screen w-full justify-evenly items-center font-[family-name:var(--font-geist-sans)]">
        <h1 className='font-[family-name:var(--font-geist-sans)] text-3xl font-semibold'>Add a pharmacist</h1>
        <AddPharmacistsForm></AddPharmacistsForm>
    </div>
  )
}

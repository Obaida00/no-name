import React from 'react'
import ProfileEditForm from '@/components/ProfileEditForm';

export default function ProfileEdit() {


    return (
        <div className="flex flex-col justify-center w-full not-lg:items-center min-h-screen  p-10 ">
            <h1 className='text-2xl mb-10 font-[family-name:var(--font-geist-sans)]'>Edit your info</h1>
            <div className="">
                <ProfileEditForm></ProfileEditForm>
            </div>

        </div>
    )
}

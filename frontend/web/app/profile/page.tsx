"use client"
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext'
import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function Profile() {
    const { user, loadUser} = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            loadUser();
        }
    }, [user, loadUser]);

    const handleLogout = async () => {
        const res = await fetch("/api/logout", {
            method: "POST",
        });


        if (res.ok) {
            console.log("USER AFTER LOGGING OUT: " + user);
            router.replace("/");
        }
    };

    const handleTransition = () => {
        console.log('moving to profile edit');
        router.push("/profile-edit");
    }

    return (
        <>
            <div className="flex flex-col font-[family-name:var(--font-geist-sans)] p-8">
                <h2 className='text-2xl font-bold'>Profile</h2>
                <div className=" w-100 md:w-150 h-full p-8 rounded-2xl">
                    <div className="flex items-center bg-gray-100 px-8 py-5 rounded-2xl space-x-5 mb-7">
                        <Avatar className='w-[50px] h-[50px]'>
                            <AvatarFallback className='border border-black'>
                                <User />
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <div className="flex space-x-2">
                                <h1 className='text-lg'>{user?.name}</h1>
                                <Badge variant={'outline'}>Admin</Badge>
                            </div>
                            <h3 className='text-muted-foreground text-sm'>{user?.email}</h3>
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                        <div className="">
                            <h1>Address</h1>
                            <div className="p-3 bg-gray-100 rounded-xl">
                                {user?.address}
                            </div>
                        </div>
                        {/* Some hardcoded stuff: */}
                        <div className="">
                            <h1>Age</h1>
                            <div className="p-3 bg-gray-100 rounded-xl">
                                25
                            </div>
                        </div>
                        <div className="">
                            <h1>Gender</h1>
                            <div className="p-3 bg-gray-100 rounded-xl">
                                Male
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between mt-7'>
                        <Button className='bg-red-200 text-red-600 cursor-pointer' onClick={handleLogout} variant={'secondary'}>Logout</Button>
                        <Button className='cursor-pointer' onClick={handleTransition} variant={'default'}>Edit profile</Button>
                    </div>

                </div>
            </div>
        </>
    )
}

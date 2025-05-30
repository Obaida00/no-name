"use client"
import React from 'react'
import { Avatar, AvatarFallback } from './ui/avatar';
import { LogOut, User } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export default function ProfileSideCard() {

    const { user } = useUser();
    const router = useRouter();

    const handleLogout = async () => {
        const res = await fetch("/api/logout", {
            method: "POST",
        });


        if (res.ok) {
            console.log("USER AFTER LOGGING OUT: " + user);
            router.replace("/");
        }
    };


    return (
        <Link href={"/profile"}>
            <div className="flex items-center py-3 justify-between hover:bg-slate-100 cursor-pointer rounded-xl font-[family-name:var(--font-geist-sans)]">
                <div className="flex items-center">
                    <Avatar className='w-[35px] h-[35px]'>
                        <AvatarFallback className='bg-slate-300'>
                            <User size={20} />
                        </AvatarFallback>
                    </Avatar>
                    <h3 className='mx-3 font-semibold'>{user?.name}</h3>
                </div>
                <Tooltip>
                    <TooltipTrigger><LogOut size={20} className='cursor-pointer' onClick={handleLogout}></LogOut></TooltipTrigger>
                    <TooltipContent>
                        <p>Logout</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </Link>

    )
}

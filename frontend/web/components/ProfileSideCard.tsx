"use client"
import React from 'react'
import { Avatar, AvatarFallback } from './ui/avatar';
import { User } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import Link from 'next/link';

export default function ProfileSideCard() {

    const { user } = useUser();


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
            </div>
        </Link>

    )
}

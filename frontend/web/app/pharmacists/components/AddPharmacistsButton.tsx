"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';

export default function AddPharmacistsButton() {
    const router = useRouter();
    return (
        <Button onClick={() => router.push("/pharmacists/add")}>Add pharmacist</Button>

    )
}

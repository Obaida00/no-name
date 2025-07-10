"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';

export default function EditPharmacistButton({id}: {id: string}) {
    const router = useRouter();
    return (
        <Button onClick={() => router.push(`/pharmacists/${id}/edit`)} size={'sm'}>Edit information</Button>

    )
}

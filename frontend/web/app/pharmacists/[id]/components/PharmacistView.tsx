"use client"
import { Table, TableBody, TableCell, TableFooter, TableRow } from '@/components/ui/table'
import React, { useEffect, useState } from 'react'
import myToast from '@/components/ui/toast'
import { User } from '@/contexts/UserContext'
import DeletePharmacistButton from '../edit/components/DeletePharmacistButton';
import EditPharmacistButton from '../edit/components/EditPharmacistButton';
import { Skeleton } from '@/components/ui/skeleton'


export default function PharmacistView({ id }: { id: string }) {

    const [loading, setLoading] = useState(false);
    const [pharmacist, setPharmacist] = useState<User | null>(null);



    useEffect(() => {
        const fetchPharmacist = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                    }
                });

                if (!response.ok) {
                    myToast({ title: response.statusText, state: "error" });
                }
                const data = await response.json();
                console.log(data);

                setPharmacist(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);  
            }
        }
        fetchPharmacist();
    }, [id]);
    return (
        
        <div className="w-full min-h-screen font-[family-name:var(--font-geist-sans)]">
            <div className="flex not-md:flex-col not-md:items-center not-md:space-y-5 md:space-x-10 w-full p-8 ">
                <div className="w-[200px] h-[200px] bg-gray-300 rounded-2xl"></div>
                <div className="flex flex-col not-md:items-center">
                    {loading && (
                        <Skeleton className='h-5 w-[300px]'></Skeleton>
                    )}
                    <div className="mb-3">
                        <h1 className='text-3xl font-semibold'>{pharmacist?.name}</h1>
                    </div>
                    <div className="">
                        <Table className='text-md'>
                            <TableBody>
                                <TableRow className='items-center'>
                                    <TableCell className='font-semibold'>
                                        Email
                                    </TableCell>
                                    <TableCell className='text-gray-500'>
                                        {pharmacist?.email}
                                    </TableCell>
                                </TableRow>
                                <TableRow className='items-center'>
                                    <TableCell className='font-semibold'>
                                        Address
                                    </TableCell>
                                    <TableCell className='text-gray-500'>
                                        {pharmacist?.address}
                                    </TableCell>
                                </TableRow>
                                <TableRow className='items-center'>
                                    <TableCell className='font-semibold'>
                                        Gender
                                    </TableCell>
                                    <TableCell className='text-gray-500'>
                                        {pharmacist?.gender}
                                    </TableCell>
                                </TableRow>
                                <TableRow className='items-center'>
                                    <TableCell className='font-semibold'>
                                        Age
                                    </TableCell>
                                    <TableCell className='text-gray-500'>
                                        {pharmacist?.age}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell>
                                        <EditPharmacistButton id={id} />
                                    </TableCell>
                                    <TableCell>
                                        <DeletePharmacistButton id={id} />
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </div>
            </div>

        </div>
    )
}

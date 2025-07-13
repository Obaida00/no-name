"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import myToast from '@/components/ui/toast';
import { useRouter } from 'next/navigation'
import React from 'react'

export default function DeletePharmacistButton({ id }: { id: string }) {

  const handleUserDeletion = async () => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json"
        }
      });

      const data = await response.json();
      if (!response.status) {
        myToast({ title: data.message, state: "error" });
      }
      myToast({ title: data.message, state: "error" });
      router.back();
    } catch (error) {
      console.error("Error in DELETE /api/users/id", error);
    }
  }



  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={'sm'} variant={'secondary'} className='bg-red-200 text-red-600' >
          Delete Pharmacist
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this pharmacist? all contracts and shifts will also be deleted!
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel className='font-[family-name:var(--font-geist-sans)]'>Cancel</AlertDialogCancel>
            <AlertDialogAction className='font-[family-name:var(--font-geist-sans)] bg-red-600' onClick={handleUserDeletion}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

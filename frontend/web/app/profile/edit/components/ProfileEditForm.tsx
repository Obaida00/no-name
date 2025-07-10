"use client"

import React from 'react'
import { useUser } from '@/contexts/UserContext'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import myToast from '@/components/ui/toast';
export default function ProfileEditForm() {
    const { user, loadUser } = useUser();
    const router = useRouter();

    const ProfileSchema = z.object({
        name: z.string().min(2, { message: "Name must be at least 2 characters" }),
        email: z.string().email(),
        address: z.string(),
        age: z.coerce.number().min(20, { message: "Your age must not be less than 20 years" }),
        gender: z.string()
    });


    const form = useForm<z.infer<typeof ProfileSchema>>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            name: user?.name,
            email: user?.email,
            address: user?.address,
            gender: user?.gender,
            age: user?.age,
        }
    });

    const handleSubmitEdits = async (values: z.infer<typeof ProfileSchema>) => {
        try {
            const body = JSON.stringify({
                id: user?.id,
                ...values
            });
            const response = await fetch("/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Accept-Language": "en",
                },
                body: body,
            });
            if (response.ok) {
                console.log("SUCCESS: RESPONSE 200");
                const data = await response.json();
                console.log("THIS IS FROM UI: " + data.user.address);
                myToast({ title: "User info were edited successfully", state: "success" })
                loadUser(); 
                router.back();

            }
        } catch (error) {
            console.log(error);
            myToast({ title: "From UI: Error happened", state: "error" })
        }
    }

    return (
        <div className="flex justify-between font-[family-name:var(--font-geist-sans)] not-md:p-5">
            <Form {...form}>
                <form action="" onSubmit={form.handleSubmit(handleSubmitEdits)} className=' md:w-full flex lg:flex-row flex-col justify-center lg:justify-between md:items-end h-100'>
                    <div className='md:w-[450px] border border-dashed rounded-2xl md:self-start p-8'>
                        <FormField control={form.control} name='name' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl><Input {...field} className='mb-4' type="text" /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name='email' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl><Input {...field} className='mb-4' type="text" /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name='address' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl><Input {...field} className='mb-4' type="text" /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <div className="flex not-md:flex-col items-start">
                            <FormField control={form.control} name='age' rules={{ min: 20 }} render={({ field }) => (
                                <FormItem className='mb-4'>
                                    <FormLabel>Age</FormLabel>
                                    <FormControl><Input {...field} value={field.value} type="number" min={20} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name='gender' render={({ field }) => (
                                <FormItem className='md:ml-2 w-full'>
                                    <FormLabel>Gender</FormLabel>
                                    <FormControl><Select {...field} defaultValue={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className='w-full'>
                                            <SelectValue placeholder="select gender" />
                                        </SelectTrigger>
                                        <SelectContent className='font-[family-name:var(--font-geist-sans)]'>
                                            <SelectGroup>
                                                <SelectLabel>Gender</SelectLabel>
                                                <SelectItem value="male">Male</SelectItem>
                                                <SelectItem value="female">Female</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                    </div>
                    <div>
                        <Button type='submit' variant={'default'} className='mt-7 not-lg:w-full cursor-pointer'>Save changes</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

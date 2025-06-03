"use client"

import React from 'react'
import { useUser } from '@/contexts/UserContext'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from './ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from '@/components/ui/select';
import { Button } from './ui/button';
export default function ProfileEditForm() {
    const { user } = useUser();
    const ProfileSchema = z.object({
        name: z.string().min(2, { message: "Name must be at least 2 characters" }),
        age: z.number().min(20, { message: "Your age must not be less than 20 years" }),
        gender: z.string()
    });


    const form = useForm<z.infer<typeof ProfileSchema>>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            name: user?.name,
            age: 25,
            gender: "Male",
        }
    });

    const handleSubmitEdits = async (values: z.infer<typeof ProfileSchema>) => {
        console.log(values);
        try {
            const body = JSON.stringify({
                id: user?.id,
                values
            });
            const response = await fetch("/api/user/edit", {
                method: "POST",
                body: body,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Edited profile: " + data.name);
            }
        } catch (error) {
            console.log("From UI: Error occured" + error);
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
                                    <FormControl><Select {...field} onValueChange={field.onChange}>
                                        <SelectTrigger className='w-full'>
                                            <SelectValue placeholder="select gender"/>
                                        </SelectTrigger>
                                        <SelectContent className='font-[family-name:var(--font-geist-sans)]'>
                                            <SelectGroup>
                                                <SelectLabel>Gender</SelectLabel>
                                                <SelectItem value="Male">Male</SelectItem>
                                                <SelectItem value="Female">Female</SelectItem>
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

"use client"

import React from 'react'
import { useUser } from '@/contexts/UserContext'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from './ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from '@/components/ui/select';
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
    return (
        <div className="min-h-full">
            <h1>form</h1>
            <div className="grid">
                <Form {...form}>
                    <form action="">
                        <FormField control={form.control} name='name' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl><Input {...field} type="text" /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name='age' rules={{ min: 20 }} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Age</FormLabel>
                                <FormControl><Input {...field} type="number" /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name='gender' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Age</FormLabel>
                                <FormControl><Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a fruit" />
                                    </SelectTrigger>
                                    <SelectContent>
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
                    </form>
                </Form>
            </div>
        </div>
    )
}

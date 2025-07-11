"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import myToast from '@/components/ui/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeOff, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod'

export default function AddPharmacistsForm() {
    const router = useRouter();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    const toggleConfirmVisibility = () => {
        setConfirmPasswordVisible((prev) => !prev);
    };
    const handlePharmacistAddition = async (values: z.infer<typeof PharmacistSchema>) => {
        console.log("age type is: " + typeof values.age);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Accept-Language": "en"
                },
                body: JSON.stringify({
                    name: values.name,
                    email: values.email,
                    address: values.address,
                    gender: values.gender,
                    age: values.age,
                    password: values.password,
                    passwordConfirmation: values.confirmPassword,
                }),
            });

            if (response.status === 401) {
                myToast({ title: "Permission denied", state: "error" });
            }
            if (!response.ok) {
                myToast({ title: response.statusText, state: "error" });

            }

            const data = await response.json();
            console.log(" Added Pharmacist: " + data.user);
            myToast({ title: response.statusText, state: "success" });
            router.back();
        } catch (error) {
            console.log("Error in add page: " + error);
        }
    }


    const PharmacistSchema = z.object({
        name: z.string().min(1, "Name must be at least one character"),
        email: z.string().email(),
        address: z.string().min(2, "Address must be at least two characters or two numbers"),
        gender: z.string(),
        age: z.coerce.number().min(20, "Age must be greater than or equal to 20"),
        password: z.string().min(8, { message: "Password must be at least 8 characters" }),
        confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
    })
        .refine((data) => data.password === data.confirmPassword, {
            message: "Passwords doesn't match",
            path: ["confirmPassword"],
        });
    const form = useForm<z.infer<typeof PharmacistSchema>>({
        resolver: zodResolver(PharmacistSchema),
        defaultValues: {
            name: "",
            email: "",
            address: "",
            gender: "",
            age: 0,
            password: "",
            confirmPassword: "",
        }
    })
    return (
        <Form {...form}>
            <form action="" onSubmit={form.handleSubmit(handlePharmacistAddition)} className=' '>
                <div className='md:w-[450px] border border-dashed rounded-2xl md:self-start p-8'>
                    <FormField control={form.control} name='name' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl><Input placeholder='Name' {...field} className='mb-4' type="text" /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name='email' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl><Input placeholder='Email' {...field} className='mb-4' type="text" /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name='address' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl><Input placeholder='Address' {...field} className='mb-4' type="text" /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <div className="flex not-md:space-x-2 items-start">
                        <FormField control={form.control} name='age' rules={{ min: 20 }} render={({ field }) => (
                            <FormItem className='mb-4'>
                                <FormLabel>Age</FormLabel>
                                <FormControl><Input placeholder='Age' {...field} value={field.value} type="number" min={20} max={70} /></FormControl>
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
                    <div className="flex flex-col space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="flex gap-1">
                                            <Input placeholder='Password' {...field} type={passwordVisible ? "text" : "password"} />
                                            <Button size="icon" type="button" onClick={togglePasswordVisibility}>
                                                {passwordVisible ? <EyeOff /> : <Eye />}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <div className="flex gap-1">
                                            <Input placeholder='Confirm Password' {...field} type={confirmPasswordVisible ? "text" : "password"} />
                                            <Button size="icon" type="button" onClick={toggleConfirmVisibility}>
                                                {confirmPasswordVisible ? <EyeOff /> : <Eye />}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div>
                        <Button type='submit' variant={'default'} className='mt-7 w-full cursor-pointer'>Add pharmacist</Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}


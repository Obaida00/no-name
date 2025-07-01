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
                    "Accept-Language" : "en"
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
            console.log(" Added Pharmacist: " + data.status);
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
            <form action="" onSubmit={form.handleSubmit(handlePharmacistAddition)} className='space-y-3'>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl><Input {...field} placeholder='Full name' /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl><Input {...field} type="email" placeholder='Email address' /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl><Input {...field} type="text" placeholder='Street address' /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField control={form.control} name='gender' render={({ field }) => (
                    <FormItem className=''>
                        <FormControl><Select {...field} onValueChange={field.onChange}>
                            <SelectTrigger defaultValue={"Select gender"} className='w-full'>
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
                <FormField control={form.control} name='age' rules={{ min: 20 }} render={({ field }) => (
                    <FormItem className='mb-4'>
                        <FormLabel>Age</FormLabel>
                        <FormControl><Input {...field} value={field.value} placeholder='Age' type="number" min={20} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="flex gap-1">
                                    <Input {...field} placeholder='Password' type={passwordVisible ? "text" : "password"} />
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
                            <FormControl>
                                <div className="flex gap-1">
                                    <Input {...field} placeholder='Confirm password' type={confirmPasswordVisible ? "text" : "password"} />
                                    <Button size="icon" type="button" onClick={toggleConfirmVisibility}>
                                        {confirmPasswordVisible ? <EyeOff /> : <Eye />}
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>Add pharmacist</Button>
            </form>
        </Form>
    )
}

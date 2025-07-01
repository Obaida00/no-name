"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import myToast from '@/components/ui/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod'

export default function EditPharmacistForm({ id }: { id: string }) {
    const router = useRouter();


    ///WE WILL DISCUSS THIS LATER ON.
    const handlePharmacistUpdate = async (values: z.infer<typeof PharmacistSchema>) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Accept-Language": "en"
                },
                body: JSON.stringify({
                    id: id,
                    name: values.name,
                    email: values.email,
                    address: values.address,
                    gender: values.gender,
                    age: values.age,
                }),
            });

            if (response.status === 401) {
                myToast({ title: "Permission denied", state: "error" });
            }
            if (!response.ok) {
                myToast({ title: response.statusText, state: "error" });

            }

            const data = await response.json();
            console.log(" Updated Pharmacist: " + data.user);
            router.back();
        } catch (error) {
            console.log("Error in edit page: " + error);
        }
    }


    const PharmacistSchema = z.object({
        name: z.string().min(1, "Name must be at least one character"),
        email: z.string().email(),
        address: z.string().min(2, "Address must be at least two characters or two numbers"),
        gender: z.string(),
        age: z.coerce.number().min(20, "Age must be greater than or equal to 20"),
    });
    const form = useForm<z.infer<typeof PharmacistSchema>>({
        resolver: zodResolver(PharmacistSchema),
        defaultValues: {
            name: "",
            email: "",
            address: "",
            gender: "",
            age: 0,
        }
    })

    useEffect(() => {
        const fetchPharmacist = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`, { method: "GET", headers: { Accept: "application/json" } });
                if (!response.ok) {
                    throw new Error("Failed to fetch pharmacist");
                }
                const data = await response.json();
                form.reset(data)
            } catch (error) {
                console.error("Error fetching pharmacist:", error);
                myToast({ title: "Failed to load pharmacist data", state: "error" });
            }
        };

        if (id) {
            fetchPharmacist();
        }
    }, [id, form]);

    return (
        <Form {...form}>
            <form action="" onSubmit={form.handleSubmit(handlePharmacistUpdate)} className='space-y-3'>
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
                <Button type='submit'>Update pharmacist</Button>
            </form>
        </Form>
    )
}
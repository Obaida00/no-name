"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { EyeOff, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import myToast from './ui/toast';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';

export default function LoginForm() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { loadUser } = useUser();

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    const formSchema = z.object({
        email: z.string().email({ message: "Please enter a valid email" }),
        password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const handleLogin = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();
            console.log("login data: " + data);
            if (!response.ok) {
                if (response.status === 401) {
                    myToast({ title: "Incorrect email or password", state: "error" });
                    return
                }
                myToast({ title: data.message || "Login failed", state: "error" });
                return;
            }
            loadUser();
            router.replace("/home");
            myToast({ title: "Logged in successfully", state: "success" });

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            myToast({ title: "Something went wrong", state: "error" });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="font-[family-name:var(--font-geist-sans)]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl><Input {...field} type="email" /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <div className="flex gap-1">
                                        <Input {...field} type={passwordVisible ? "text" : "password"} />
                                        <Button size="icon" type="button" onClick={togglePasswordVisibility}>
                                            {passwordVisible ? <EyeOff /> : <Eye />}
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={loading} className="w-full mt-4">
                        {loading ? "Loading..." : "Login"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}

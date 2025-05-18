"use client"
import React from 'react'
import {
    Card,
    CardContent,

    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import LoginForm from './loginForm'
import RegisterForm from './registerForm'


export default function AuthToggler() {

    return (
        <Tabs defaultValue="login" className="w-[400px] font-[family-name:var(--font-geist-sans)]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <Card>
                    <CardHeader>
                        <CardTitle className='text-xl'>Sign In</CardTitle>
                        
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <LoginForm></LoginForm>
                    </CardContent>
                    
                </Card>
            </TabsContent>
            <TabsContent value="register">
                <Card>
                    <CardHeader>
                        <CardTitle className='text-xl'>Sign Up</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <RegisterForm></RegisterForm>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}

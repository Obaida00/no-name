"use client"

import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { redirect } from 'next/navigation';
export default function Homepage() {

    const { user, loading, setUser } = useUser();


    const handleLogout = async () => {
        const res = await fetch("/api/logout", {
            method: "POST",
        });

        if (res.ok) {
            setUser(null);
            redirect("/");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>Not logged in</p>;
    return (
        <>
            <p>Welcome {user.name}</p>
            <p>your email is : {user.email}</p>
            <Button onClick={handleLogout}>Logout</Button>
        </>
    );
}

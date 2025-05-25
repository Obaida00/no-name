"use client"
import { useUser } from '@/contexts/UserContext';
import { useEffect } from 'react';
export default function Homepage() {

    const { user, loadUser } = useUser();
    useEffect(() => {
        if (!user) {
            loadUser();
        }
    }, [user, loadUser]);
    return (
        <>
            <h1>this is the home page - Doha and Layal are creating this page </h1>
        </>
    );
}

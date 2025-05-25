"use client"

import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { redirect } from 'next/navigation';
export default function Homepage() {

    const { user, loading, loadUser } = useUser();
    useEffect(() => {
        if (!user) {
            loadUser();
        }
    }, [user, loadUser]);

    const handleLogout = async () => {
        const res = await fetch("/api/logout", {
            method: "POST",
        });

        if (res.ok) {
            console.log("USER AFTER LOGGING OUT: " + user);
            redirect("/");
        }
    };

    if (loading) return <p>Loading...</p>;
    return (
        <>
            <div className="flex flex-col font-[family-name:var(--font-geist-sans)] p-8">
                <h2 className='text-3xl font-bold'>Profile</h2>

            </div>
        </>
    );
}

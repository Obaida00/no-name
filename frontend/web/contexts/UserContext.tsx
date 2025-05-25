"use client"
import myToast from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import React, { createContext, useContext,  useState } from "react";

type User = {
    id: number;
    name: string;
    email: string;
};

type UserContextType = {
    user: User | null;
    loading: boolean;
    loadUser: () => Promise<void>;
    setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType>({
    user: null,
    loading: false,
    loadUser: async () => { },
    setUser: () => { },
});

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const loadUser = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/user", { credentials: "include" });
            if (response.status === 200) {
                const data = await response.json();
                console.log("talalalal" + data);

                console.log("data fetched: " + data.email);
                setUser(data);
            }
            if (!response.ok) {
                router.replace("/");
                myToast({ title: "Unauthenticated, log into your account", state: "error" })
            }
        } catch (error) {
            console.error("this is from catch in the context: " + error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <UserContext.Provider value={{ user, loading, setUser, loadUser}}>
            {children}
        </UserContext.Provider>
    )
}
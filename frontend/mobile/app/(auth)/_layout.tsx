import { Slot } from 'expo-router'
import { Text, View } from "react-native";
import React from 'react'
import GuestButton from '@/components/GuestButton';

export default function AuthLayout() {
    return (
        <>
            <GuestButton />
            <Slot />
        </>
    )
}

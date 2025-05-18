import { useAuth } from '@/contexts/auth-context'
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function Home() {

    const { user, logout } = useAuth()!;

    return (
        <>
            <View style={styles.homeContainer}>
                <Text>Welcome Home, {user?.name ?? ""}</Text>
                {user && (<TouchableOpacity onPress={logout} style={styles.logoutBtn}>
                    <Text style={{ color: "white" }}>Logout</Text>
                </TouchableOpacity>)}
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    homeContainer: {
        minHeight: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    logoutBtn: {
        width: 150,
        backgroundColor: "rgba(100, 100, 100, .6)",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
        margin: 40,
    }
})

import { router } from 'expo-router'
import React from 'react'
import { Button, TouchableOpacity, Text, View, StyleSheet } from 'react-native'

export default function GuestButton() {
    return (
        <View style={styles.guestContainer}>
            <TouchableOpacity style={styles.guestBtn} onPress={() => router.replace("/home")}>
                <Text>
                    Continue as a Guest
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    guestContainer: {
        justifyContent: "center", 
        alignItems: "center", 
        padding: 20, 
        position: "absolute", 
        width: "100%", 
        bottom: 0,
    },
    guestBtn: {
        backgroundColor: "rgba(112, 112, 112, 0.4)",
        height: 55,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        position: "relative",
        width: "100%"
    }
})
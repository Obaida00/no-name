import RegisterForm from '@/components/RegisterForm'
import { Link } from 'expo-router'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Register() {
    return (
        <View style={styles.container}>
            <RegisterForm></RegisterForm>
            <Text style={{textAlign: "center", color: "gray"}}>Already have an account?</Text>
            <Link href={"/"} style={styles.hypertext}>Sign in</Link>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100%"
    },
    hypertext: {
        textDecorationLine: "underline",
        color: "blue",
    }
});
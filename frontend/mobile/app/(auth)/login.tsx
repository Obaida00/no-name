import LoginForm from '@/components/LoginForm'
import { Link } from 'expo-router'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Login() {
  return (
    <View style={{ justifyContent: "center", minHeight: "100%" }}>
      <LoginForm></LoginForm>
      <Text style={{textAlign: "center", color: "gray"}}>Dont't have an account? <Link href={"/register"} style={styles.hypertext}>Sign up</Link></Text>
    </View>
  )
};


const styles = StyleSheet.create({
  hypertext: {
    textDecorationLine: "underline",
    color: "blue",
  },
})
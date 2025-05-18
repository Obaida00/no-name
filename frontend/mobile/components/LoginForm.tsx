import React, { createContext, useState } from "react"
import { StyleSheet, TextInput, TouchableOpacity, View, Text } from "react-native"
import { ThemedView } from "./ThemedView"
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText } from "./ui/form-control"
import { Input, InputField } from "./ui/input";
import { AlertCircleIcon } from "./ui/icon";
import { Controller, Form, SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { Formik } from "formik";
import { AuthContext, useAuth } from "@/contexts/auth-context";
import { Button } from "./ui/button";
import Feather from "@expo/vector-icons/Feather";
import { Link } from "expo-router";

export default function LoginForm() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { login, loading } = useAuth()!;

    const formSchema = Yup.object().shape({
        email: Yup.string().email('Please enter a valid email').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')
    });

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev)
    }
    const handleLogin = (data: Yup.InferType<typeof formSchema>) => {

        login(data.email, data.password);


    }

    return (
        <View>
            <Formik initialValues={{ email: '', password: '' }} validationSchema={formSchema} onSubmit={handleLogin}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={{ padding: 20 }}>

                        <View style={{ marginBottom: 15 }}>
                            <TextInput placeholder="Email" onChangeText={handleChange("email")} onBlur={handleBlur("email")} value={values.email} style={styles.inputField}></TextInput>
                            {errors.email && touched.email && <Text style={{ color: "red", marginTop:5 }}>{errors.email}</Text>}
                        </View>

                        <View style={{ marginBottom: 5, alignItems: "center", flexDirection:"row"}}>
                            <TextInput  secureTextEntry={passwordVisible} placeholder="Password" onChangeText={handleChange("password")} onBlur={handleBlur("password")} value={values.password} style={styles.inputField}></TextInput>
                            <TouchableOpacity onPress={togglePasswordVisibility} style={{ position: "absolute", right: 10, }}>
                                <Feather name={passwordVisible ? "eye" : "eye-off"} size={24} color={"black"} />
                            </TouchableOpacity>
                        </View>
                        {errors.password && touched.password && <Text style={{ color: "red" }}>{errors.password}</Text>}

                        <TouchableOpacity disabled={loading} onPress={() => handleSubmit()} style={styles.signInBtn}>
                            <Text style={{ color: "white" }}>{loading? "Loading..." : "Sign in"}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>

    )
}

const styles = StyleSheet.create({
    inputField: {
        height: 60,
        width: "100%",
        borderRadius: 8,
        backgroundColor: "#e5e7eb",
        padding: 13,
    },
    signInBtn: {
        backgroundColor: "#18a3e2",
        height: 55,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        position: "relative",
    },
})
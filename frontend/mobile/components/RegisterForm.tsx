import { useAuth } from '@/contexts/auth-context';
import Feather from '@expo/vector-icons/Feather';
import { Formik, FormikHelpers, FormikValues } from 'formik';
import React, { useState } from 'react'
import { TextInput, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Yup from "yup";

export default function RegisterForm() {
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [confirmationVisible, setConfirmationVisible] = useState(true);
    const { register, loading } = useAuth()!;

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    }
    const toggleConfirmationVisibility = () => {
        setConfirmationVisible((previous) => !previous);
    }

    const handleRegister = async (values: Yup.InferType<typeof formSchema>, { setErrors, setStatus }: FormikHelpers<Yup.InferType<typeof formSchema>>) => {
        try {
            await register(values.fullName, values.email, values.password, values.passwordConfirmation);
        } catch (error: any) {
            if (error.fieldErrors) {
                setErrors(error.fieldErrors)
            } else if(error.message) {
                setStatus(error.message);
            }
        }
    }

    const formSchema = Yup.object().shape({
        fullName: Yup.string().min(2, "Name must be at least 2 characters").required("Full name is required"),
        email: Yup.string().email("Please enter a valid email").required("Email is required"),
        password: Yup.string().min(8, "Password must be at least 8 characters").required("password is required"),
        passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), ""], "Passwords doesn't match").required("Please confirm your password"),
    });
    return (
        <View style={{width: "100%"}}>
            <Formik initialValues={{ fullName: '', email: '', password: '', passwordConfirmation: '' }} validationSchema={formSchema} onSubmit={handleRegister}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, status }) => (
                    <View style={{ padding: 20 }}>
                        {status && <Text style={{ color: "red" , padding: 20, backgroundColor: "rgba(255, 0, 0, 0.1)", borderRadius: 10, marginBottom: 15}}>{status}</Text>}
                        <View style={{ marginBottom: 15 }}>
                            <TextInput placeholder="Full name" onChangeText={handleChange("fullName")} onBlur={handleBlur("fullName")} value={values.fullName} style={styles.inputField}></TextInput>
                            {errors.fullName && touched.fullName && <Text style={{ color: "red", marginTop: 5 }}>{errors.fullName}</Text>}
                        </View>
                        <View style={{ marginBottom: 15 }}>
                            <TextInput placeholder="Email" onChangeText={handleChange("email")} onBlur={handleBlur("email")} value={values.email} style={styles.inputField}></TextInput>
                            {errors.email && touched.email && <Text style={{ color: "red", marginTop: 5 }}>{errors.email}</Text>}
                        </View>

                        <View style={{ marginBottom: 5, alignItems: "center", flexDirection: "row" }}>
                            <TextInput secureTextEntry={passwordVisible} placeholder="Password" onChangeText={handleChange("password")} onBlur={handleBlur("password")} value={values.password} style={styles.inputField}></TextInput>
                            <TouchableOpacity onPress={togglePasswordVisibility} style={{ position: "absolute", right: 10, }}>
                                <Feather name={passwordVisible ? "eye" : "eye-off"} size={24} color={"black"} />
                            </TouchableOpacity>
                        </View>
                        {errors.password && touched.password && <Text style={{ color: "red" }}>{errors.password}</Text>}

                        <View style={{ marginBottom: 5, marginTop: 10, alignItems: "center", flexDirection: "row" }}>
                            <TextInput secureTextEntry={confirmationVisible} placeholder="Confirm password" onChangeText={handleChange("passwordConfirmation")} onBlur={handleBlur("passwordConfirmation")} value={values.passwordConfirmation} style={styles.inputField}></TextInput>
                            <TouchableOpacity onPress={toggleConfirmationVisibility} style={{ position: "absolute", right: 10, }}>
                                <Feather name={confirmationVisible ? "eye" : "eye-off"} size={24} color={"black"} />
                            </TouchableOpacity>
                        </View>
                        {errors.passwordConfirmation && touched.passwordConfirmation && <Text style={{ color: "red" }}>{errors.passwordConfirmation}</Text>}

                        <TouchableOpacity disabled={loading} onPress={() => handleSubmit()} style={styles.signUpBtn}>
                            <Text style={{ color: "white" }}>{loading? "Loading..." : "Sign up"}</Text>
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
    signUpBtn: {
        backgroundColor: "#18a3e2",
        height: 55,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        position: "relative",
    },
})

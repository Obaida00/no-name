"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { Eye, EyeOff } from "lucide-react";
import myToast from "./ui/toast";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";

function RegisterForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { loadUser } = useUser();

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const toggleConfirmVisibility = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };

  const formSchema = z
    .object({
      name: z.string().min(2, { message: "The name must be at least 2 characters" }),
      email: z.string().email({ message: "Please enter a valid email" }),
      address: z.string(),
      gender: z.string(),
      age: z.coerce.number().min(20, { message: "Your age must not be less than 20 years" }),
      password: z.string().min(8, { message: "Password must be at least 8 characters" }),
      confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords doesn't match",
      path: ["confirmPassword"],
    });

  type FormFields = z.infer<typeof formSchema>;

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      gender: "",
      age: 0,
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegister = async (values: FormFields) => {
    setLoading(true);
    console.log(values.age);
    console.log(values.gender);
    
    console.log(values.password);
    console.log(values.confirmPassword);


    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          address: values.address,
          gender: values.gender,
          age: values.age,
          password: values.password,
          passwordConfirmation: values.confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(`reg form: ${data.errors}`);

        if (data.errors) {
          (Object.keys(data.errors) as Array<keyof FormFields>).forEach((field) => {
            form.setError(field, {
              type: "server",
              message: data.errors[field][0],
            });
          });
        } else {
          myToast({ title: data.message ?? "Something went wrong", state: "error" });
        }
        return;
      }

      myToast({ title: "Account created successfully", state: "success" });
      loadUser();
      router.replace("/home");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      myToast({ title: "Something went wrong", state: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl><Input {...field} type="email" /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl><Input {...field} type="text" /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex not-md:flex-col items-start">
            <FormField control={form.control} name='age' rules={{ min: 20 }} render={({ field }) => (
              <FormItem className='mb-4'>
                <FormLabel>Age</FormLabel>
                <FormControl><Input {...field} value={field.value} type="number" min={20} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name='gender' render={({ field }) => (
              <FormItem className='md:ml-2 w-full'>
                <FormLabel>Gender</FormLabel>
                <FormControl><Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="select gender" />
                  </SelectTrigger>
                  <SelectContent className='font-[family-name:var(--font-geist-sans)]'>
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="flex gap-1">
                    <Input {...field} type={passwordVisible ? "text" : "password"} />
                    <Button size="icon" type="button" onClick={togglePasswordVisibility}>
                      {passwordVisible ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <div className="flex gap-1">
                    <Input {...field} type={confirmPasswordVisible ? "text" : "password"} />
                    <Button size="icon" type="button" onClick={toggleConfirmVisibility}>
                      {confirmPasswordVisible ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading} className="w-full mt-4">
            {loading ? "Loading..." : "Sign up"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default RegisterForm;

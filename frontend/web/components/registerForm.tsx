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

function RegisterForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {loadUser} = useUser();

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
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegister = async (values: FormFields) => {
    setLoading(true);
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

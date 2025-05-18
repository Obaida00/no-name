import Constants from "expo-constants";
import { createContext, useContext, useEffect, useState } from "react";
import * as Keychain from "react-native-keychain";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
interface AuthContextType {
  user: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userName: string, email: string, password: string, passwordConfirmation: string) => Promise<void>
}
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (
    email: string,
    password: string) => {
    try {
      setLoading(true);
      console.log("BASE_URL:", Constants.expoConfig?.extra?.BASE_URL!);
      const response = await fetch(`${Constants.expoConfig?.extra?.BASE_URL!}/api/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      if (response.ok) {
        const data = await response.json();
        await SecureStore.setItemAsync("token", JSON.stringify(data.token));
        console.log("logged in");
        setUser(data.user);
        router.replace('/home');
      } else {
        console.log(response.status);

      }
    } catch (error) {
      console.error("Login error: ", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const token = await SecureStore.getItemAsync("token")
      console.log(token);
      if (token) {
        const respose = await fetch(`${Constants.expoConfig?.extra?.BASE_URL!}/api/logout`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
        });
        await SecureStore.deleteItemAsync("token");
        console.log(SecureStore.getItemAsync("token"));
        
        setUser(null);
        router.replace("/")
      } else {
        throw new Error("Un Authorized")
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const loadUserInfo = async () => {
    try {
      setLoading(true);
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        const token = JSON.parse(credentials.password);
        const response = await fetch(process.env.BASE_URL!, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    userName: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ) => {
    try {
      setLoading(true);
      const response = await fetch(`${Constants.expoConfig?.extra?.BASE_URL!}/api/register`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          email: email,
          password: password,
          passwordConfirmation: passwordConfirmation,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("registered");
        const token = data.token;
        await SecureStore.setItemAsync("token", JSON.stringify(token));
        console.log(SecureStore.getItemAsync("token"));
        setUser(data.user);
        router.replace("/home");
      } else {
        console.log(data.message);

        if (data.message) {
          throw { message: data.message };
        }
        if (data.errors) {
          const simplifiedErrors: Record<string, string> = {};
          for (const key in data.errors) {
            simplifiedErrors[key] = data.errors[key][0];
          }
          throw { fieldErrors: simplifiedErrors };
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>{children}</AuthContext.Provider>
  )
};
export const useAuth = () => useContext(AuthContext);
import { useState } from "react";
import { getUser, loginUser, registerUser } from "@/api/user";
import { UserSchema } from "@common/schemas/user";
import { useNavigate } from "react-router";

type User = Zod.infer<typeof UserSchema>;
const AUTH_TOKEN_KEY = "authToken";
const USER_KEY = "user";

export function useAuth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const user = localStorage.getItem(USER_KEY) ? JSON.parse(localStorage.getItem(USER_KEY) as string) : null;
  const setUser = (user: User | null) => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  };
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY)
  const setAuthToken = (token: string | null) => {
    if (token) {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
  };

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await getUser();
      if (error) {
        setError(error.message);
        return;
      }
      if (data?.data) {
        setUser(data.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await loginUser(email, password);
      if (error) {
        setError(error.message);
        return;
      }
      if (data?.token) {
        setAuthToken(data.token);
      }
      await fetchUser();
      navigate("/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await registerUser(name, email, password);
      if (error) {
        setError(error.message);
        return;
      }
      if (data?.token) {
        setAuthToken(data.token);
      }
      await fetchUser();
      navigate("/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setAuthToken(null);
    navigate("/login");
  };

  return {
    user,
    loading,
    error,
    authToken,
    login,
    register,
    logout,
  };
}
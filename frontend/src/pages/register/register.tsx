import React, { useState, FormEvent } from "react";
import { useAuth } from "@/hooks/useAuth";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, error } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await register(name, email, password);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-secondary">
      <div className="p-8 rounded-lg shadow-lg w-full h-full sm:max-w-md sm:h-auto">
        <h1 className="text-3xl font-bold text-center text-primary mb-6">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-primary">
              Name:
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-primary rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
              autoComplete="name"
              autoFocus
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-primary">
              Email:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-primary rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-primary">
              Password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-primary rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
              autoComplete="new-password"
            />
          </div>
          {error && <p className="text-danger text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full p-3 bg-primary text-white rounded"
          >
            Register
          </button>
          <p className="text-sm text-center text-primary">
            Already have an account?{" "}
            <a href="/login" className="text-primary hover:text-neutral">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
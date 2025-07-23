import { useAuth } from "@/hooks/useAuth";
import React from "react";

// This is the home page which all users will see even without being logged in
// This is a stub and should be updated with actual content like a landing page or whatever is appropriate for your application
// TODO: Remove this comment after making changes

const HomePage: React.FC = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="flex text-4xl font-semibold text-gray-800">
        {user ? `Hello, ${user.name}` : "Welcome"}
      </h1>
    </div>
  );
};

export default HomePage;
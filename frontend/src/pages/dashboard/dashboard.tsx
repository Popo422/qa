import { useAuth } from "@/hooks/useAuth";
import React from "react";


const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="flex text-4xl font-semibold text-gray-800">
        {user ? `Hello, ${user.name}` : "Welcome"}
      </h1>
    </div>
  );
};

export default DashboardPage;
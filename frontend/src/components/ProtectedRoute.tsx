// components/ProtectedRoute.tsx
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Link } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return (
      <div className="flex flex-col items-center text-foreground justify-center h-screen text-center p-4">
        <h2 className="text-2xl font-bold mb-4">You are not logged in</h2>
        <p className="mb-4">Please login to access this page.</p>
        <Link
          to="/login"
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
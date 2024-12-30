import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, Key } from "lucide-react";
import { signup } from "../services/auth";
import { useAuth } from "../hooks/useAuth";
import { Input } from "@/components/ui/input";
import RoleSelect from "@/components/auth/RoleSelect";
import { UserRole } from "@/types";
export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    securityNumber: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [role, setRole] = useState<UserRole>("USER");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  useEffect(() => {
    setFormData({ ...formData, role: role });
  }, [role]);
  /**
   * Handles the form submission for user signup.
   * Prevents the default form submission behavior, clears any existing error messages,
   * and checks if the password and confirm password fields match.
   * If passwords do not match, sets an error message and returns early.
   * If passwords match, sets the loading state, attempts to create a new user account using the
   * provided form data through the signup service, and updates the user context upon success.
   * If there's an error during signup, sets an error message based on the response.
   * Finally, resets the loading state.
   *
   * @param {React.FormEvent} e - The form submission event.
   */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const user = await signup(formData);
      setUser(user);
      window.location.reload();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-primary">
            Or{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              sign in to your account
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <RoleSelect
              onChange={(r) => {
                setRole(r);
              }}
              value={role}
            />
            {role === "ADMIN" && (
              <div>
                <label htmlFor="securitynumber" className="sr-only">
                  Security Number
                </label>
                <div className="flex mb-2">
                  <div className="inset-y-0 left-0 ml-1 flex items-center">
                    <Key className="h-5 absolute w-5 mr-6 text-gray-400" />
                  </div>
                  <Input
                    id="securitynumber"
                    type="text"
                    required
                    value={formData.securityNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        securityNumber: e.target.value,
                      })
                    }
                    className="pl-8"
                    //   className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Security number"
                  />
                </div>
              </div>
            )}
            <div>
              <label htmlFor="name" className="sr-only">
                Full name
              </label>
              <div className="flex">
                <div className="inset-y-0 left-0 ml-1 flex items-center">
                  <User className="h-5 absolute w-5 mr-6 text-gray-400" />
                </div>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="pl-8"
                  //   className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Full name"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="flex mt-2">
                <div className="inset-y-0 left-0 ml-1 flex items-center">
                  <Mail className="h-5 absolute w-5 mr-6 text-gray-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="pl-8"
                  //   className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="flex mt-2">
                <div className="inset-y-0 left-0 ml-1 flex items-center">
                  <Lock className="h-5 absolute w-5 mr-6 text-gray-400" />
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="pl-8"
                  //   className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm password
              </label>
              <div className="flex mt-2">
                <div className="inset-y-0 left-0 ml-1 flex items-center">
                  <Lock className="h-5 absolute w-5 mr-6 text-gray-400" />
                </div>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="pl-8"
                  //   className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm password"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}

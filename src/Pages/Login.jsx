import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // react-router-dom, not react-router
import { Input } from "../Components";
import { auth } from "../Firebase/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useSelector } from "react-redux";

const Login = () => {
  const status = useSelector((state) => state.user.status);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  // Ye function Firebase signup ka hook ban jayega
  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-5 py-15 bg-light-primary">
      <h1 className="text-3xl text-light-text font-bold mb-4">
        Log In to your Account
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="p-5 w-full max-w-sm">
        {/* Email */}
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        {/* Password */}
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-dark-text mt-4 text-dark-secondary py-2 px-4 rounded cursor-pointer active:bg-dark-secondary/80 active:text-dark-text/90 hover:scale-101 transition-all active:scale-99"
        >
          {status === "loading" ? "Logging In..." : "Log In"}
        </button>

        {/* Login Link */}
        <p className="text-light-text mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-dark-primary underline cursor-pointer"
          >
            Sign Up here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;

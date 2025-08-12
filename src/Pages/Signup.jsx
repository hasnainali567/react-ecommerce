import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // react-router-dom, not react-router
import { Input } from "../Components";
import { auth } from "../Firebase/Firebase";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUserDoc } from "../Components/Features/UserSlice.js";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const status = useSelector((state) => state.user.status);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await dispatch(
        addUserDoc({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          username: data.username,
          cart: [],
        })
      ).unwrap();
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center p-5 py-15'>
      <h1 className='text-3xl text-black/70 font-bold mb-4'>
        Create your Account
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className='p-5 w-full max-w-sm'>
        {/* Username */}
        <Input
          label='Username'
          type='text'
          placeholder='Enter your username'
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters",
            },
          })}
        />
        {errors.username && (
          <p className='text-red-500 text-sm'>{errors.username.message}</p>
        )}

        {/* Email */}
        <Input
          label='Email'
          type='email'
          placeholder='Enter your email'
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <p className='text-red-500 text-sm'>{errors.email.message}</p>
        )}

        {/* Password */}
        <Input
          label='Password'
          type='password'
          placeholder='Enter your password'
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <p className='text-red-500 text-sm'>{errors.password.message}</p>
        )}

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full bg-light-text mt-4 text-white py-2 px-4 rounded cursor-pointer'
        >
          {status === "loading" ? "Signing Up..." : "Sign Up"}
        </button>

        {/* Login Link */}
        <p className='text-light-text mt-4'>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className='text-dark-primary underline cursor-pointer'
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;

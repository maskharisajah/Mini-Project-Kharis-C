import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import React from "react";
import * as z from "zod";

import { Input } from "../../components/input/input";
import Button from "../../components/button/button";
import { useToken } from "../../utils/states/context/token-context";
import Swal from "../../utils/swal";
import { login } from "../../utils/api/auth/api";
import Navbar from "../../components/navbar/Navbar";

const schema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export default function Login() {
  const { changeToken } = useToken();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  async function handleLogin(data) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const result = await login(data);
      changeToken(JSON.stringify(result));
      Swal.fire({
        title: "Success",
        text: "Successfully Login",
        showCancelButton: false,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        showCancelButton: false,
      });
    }
  }

  return (
    <div className="px-8 pb-4">
      <Navbar />
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl mt-5">
        <p className="text-center text-4xl text-indigo-800 underline underline-offset-1 font-semibold">Login</p>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Input register={register} name="username" label="Username" error={errors.username?.message} />
          <Input
            register={register}
            name="password"
            label="Password"
            type="password"
            error={errors.password?.message}
          />
          <div className="flex flex-row">
            <Button
              className="w-1/2 p-2 bg-sky-800 rounded-xl px-6 text-white font-bold"
              label="Submit"
              type="submit"
            />
            <div className="mx-auto pt-1">
              <p className=" text-indigo-800">
                Dont have account?
                <Link
                  to="/register"
                  className="text-indigo-800 text-xl font-semibold ml-3 underline underline-offset-1"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

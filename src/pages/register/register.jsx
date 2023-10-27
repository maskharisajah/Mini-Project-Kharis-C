import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { IoPencil, IoTrash } from "react-icons/io5";
import * as z from "zod";

import { Input, RadioGroup, Select, TextArea } from "../../components/input/input";
import Swal from "../../utils/swal";
import Button from "../../components/button/button";
import { createUser, deleteUser, getUser, updateUser } from "../../utils/api/crudUser/api";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";

const schema = z.object({
  id: z.string().optional(),
  userName: z
    .string()
    .min(1, { message: "Please enter a valid username" })
    .max(25, { message: "Product name must not exceed 25 characters" }),
  passWord: z
    .string()
    .min(1, { message: "Please enter a valid password" })
    .max(20, { message: "Product name must not exceed 25 characters" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  gender: z.enum(["Male", "Female"]),
});

export default function Index() {
  const [selectedId, setSelectedId] = useState("");
  const [user, setUser] = useState([]);

  const {
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  const columns = useMemo(
    () => [
      {
        header: "No",
        accessorKey: "id",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "User Name",
        accessorKey: "userName",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Password",
        accessorKey: "passWord",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Email",
        accessorKey: "email",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Gender",
        accessorKey: "gender",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "",
        accessorKey: "actionEdit",
        cell: (info) => <IoPencil onClick={() => onClickEdit(info.row.original)} />,
        footer: (props) => props.column.id,
      },
      {
        header: "",
        accessorKey: "actionDelete",
        cell: (info) => <IoTrash onClick={() => onClickDelete(info.row.original.id)} />,
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getUser();
      setUser(result);
    } catch (error) {
      console.log(error.toString());
    }
  }

  async function onSubmit(data) {
    try {
      await createUser(data);
      Swal.fire({
        title: "Success",
        text: "Successfully create new user",
        showCancelButton: false,
      });
      reset();
      fetchData();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        showCancelButton: false,
      });
    }
  }

  async function onSubmitEdit(data) {
    try {
      await updateUser({ ...data, id: selectedId });
      Swal.fire({
        title: "Success",
        text: "Successfully updated the product",
        showCancelButton: false,
      });
      setSelectedId("");
      reset();
      fetchData();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        showCancelButton: false,
      });
    }
  }

  function onClickEdit(data) {
    setSelectedId(data.id);
    setValue("userName", data.userName);
    setValue("passWord", data.passWord);
    setValue("email", data.email);
    setValue("gender", data.gender);
  }

  async function onClickDelete(id_user) {
    try {
      await deleteUser(id_user);
      Swal.fire({
        title: "Success",
        text: "Successfully deleted the product",
        showCancelButton: false,
      });
      fetchData();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        showCancelButton: false,
      });
    }
  }

  return (
    <div className="pb-4 px-8 ">
      <Navbar />
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl mt-5">
        <p className="text-4xl mb-5 text-indigo-800 underline underline-offset-1 font-semibold text-center">
          Register Page
        </p>
        <form onSubmit={handleSubmit(selectedId == "" ? onSubmit : onSubmitEdit)} aria-label="user-form">
          <Input
            id="input-user-name"
            aria-label="input-user-name"
            label="Username"
            name="userName"
            register={register}
            error={errors.userName?.message}
          />
          <Input
            id="input-password"
            aria-label="input-password"
            label="Password"
            name="passWord"
            register={register}
            error={errors.passWord?.message}
          />
          <Input
            id="input-email"
            aria-label="input-email"
            label="Email"
            name="email"
            register={register}
            error={errors.email?.message}
          />
          <RadioGroup
            id="input-gender"
            aria-label="input-gender"
            label="Gender"
            name="gender"
            options={["Male", "Female"]}
            register={register}
            error={errors.gender?.message}
          />
          <div className="flex flex-row">
            <Button
              className="w-1/2 p-2 bg-sky-800 rounded-xl px-6 text-white font-bold"
              id="btn-submit"
              aria-label="btn-submit"
              label="Submit"
              type="submit"
              disabled={isSubmitting}
            />
            <div className="mx-auto">
              <p className=" text-indigo-800">
                Have account?
                <Link to="/login" className="text-indigo-800 text-xl font-semibold p-5 underline underline-offset-1">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

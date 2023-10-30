import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { IoPencil, IoTrash } from "react-icons/io5";
import * as z from "zod";

import { Input, RadioGroup, Select, TextArea } from "../../components/input/input";
import Swal from "../../utils/swal";
import Button from "../../components/button/button";
import Table from "../../components/table";
import { createUser, deleteUser, getUser, updateUser } from "../../utils/api/crudUser/api";

const schema = z.object({
  id: z.string().optional(),
  userName: z
    .string()
    .min(1, { message: "Masukan username" })
    .max(25, { message: "Username tidak boleh melebihi 25 karakter" }),
  passWord: z
    .string()
    .min(1, { message: "Masukan password" })
    .max(20, { message: "Passwordtidak boleh melebihi 20 karakter" }),
  email: z.string().email({ message: "Masukan email" }),
  gender: z.enum(["Laki-laki", "Perempuan"]),
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
        header: "Username",
        accessorKey: "userName",
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
        header: "Jenis Kelamin",
        accessorKey: "gender",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Action",
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
        text: "Successfully updated the user",
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
        text: "Successfully deleted user",
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
    <div className="py-4 px-8 text-center ">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl mt-5">
        <div className="mx-auto  pb-4 font-semibold">
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
              label="Jenis Kelamin"
              name="gender"
              options={["Laki-laki", "Perempuan"]}
              register={register}
              error={errors.gender?.message}
            />
            <Button id="btn-submit" aria-label="btn-submit" label="Submit" type="submit" disabled={isSubmitting} />
          </form>
        </div>
      </div>
      <Table datas={user} columns={columns} />
    </div>
  );
}

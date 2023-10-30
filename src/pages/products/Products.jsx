import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { IoPencil, IoTrash } from "react-icons/io5";
import * as z from "zod";

import { Input, RadioGroup, Select, TextArea } from "../../components/input/input";
import Swal from "../../utils/swal";
import Button from "../../components/button/button";
import Table from "../../components/table";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../../utils/api/crudProduct/api";

const schema = z.object({
  id: z.string().optional(),
  productName: z
    .string()
    .min(1, { message: "Masukan Nama Produk" })
    .max(25, { message: "Nama Produk Tidak boleh melebihi 25 kata" }),
  productCategory: z.string().min(1, { message: "Masukan Kategori Produk" }),
  productFreshness: z.string().min(1, { message: "Masukan Kondisi Produk" }),
  additionalDescription: z.string().min(1, { message: "Masukan Deskripsi Produk" }),
  productPrice: z.number().min(1, { message: "Masukan Harga Produk" }),
});

export default function Index() {
  const [selectedId, setSelectedId] = useState("");
  const [products, setProducts] = useState([]);

  const {
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      productFreshness: "",
      productPrice: 0,
    },
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
        header: "Nama Produk",
        accessorKey: "productName",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Kategori Produk",
        accessorKey: "productCategory",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Kondisi Produk",
        accessorKey: "productFreshness",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Deskripsi Produk",
        accessorKey: "additionalDescription",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Harga Produk",
        accessorKey: "productPrice",
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
      const result = await getProducts();
      setProducts(result);
    } catch (error) {
      console.log(error.toString());
    }
  }

  async function onSubmit(data) {
    try {
      await createProduct(data);
      Swal.fire({
        title: "Success",
        text: "Successfully create new product",
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
      await updateProduct({ ...data, id: selectedId });
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
    setValue("productName", data.productName);
    setValue("productCategory", data.productCategory);
    setValue("image", data.image);
    setValue("productFreshness", data.productFreshness);
    setValue("additionalDescription", data.additionalDescription);
    setValue("productPrice", data.productPrice);
  }

  async function onClickDelete(id_product) {
    try {
      await deleteProduct(id_product);
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
    <div className="py-4 px-8 text-center ">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl mt-5">
        <div className="mx-auto pb-4 font-semibold">
          <form onSubmit={handleSubmit(selectedId == "" ? onSubmit : onSubmitEdit)} aria-label="product-form">
            <Input
              id="input-product-name"
              aria-label="input-product-name"
              label="Nama Produk"
              name="productName"
              register={register}
              error={errors.productName?.message}
            />
            <Select
              id="input-product-category"
              aria-label="input-product-category"
              label="Kategori Produk"
              name="productCategory"
              options={["Sembako", "Perkakas", "Elektronik", "Alat Tulis"]}
              placeholder="Choose..."
              register={register}
              error={errors.productCategory?.message}
            />
            <RadioGroup
              id="input-product-freshness"
              aria-label="input-product-freshness"
              label="Kondisi Produk"
              name="productFreshness"
              options={["Baru", "Retur", "bekas"]}
              register={register}
              error={errors.productFreshness?.message}
            />
            <TextArea
              id="input-product-description"
              aria-label="input-product-description"
              label="Deskripsi Produk"
              role="input"
              name="additionalDescription"
              register={register}
              error={errors.additionalDescription?.message}
            />
            <Input
              id="input-product-price"
              aria-label="input-product-price"
              label="Harga Produk"
              name="productPrice"
              type="number"
              register={register}
              error={errors.productPrice?.message}
            />
            <Button id="btn-submit" aria-label="btn-submit" label="Submit" type="submit" disabled={isSubmitting} />
          </form>
        </div>
      </div>
      <Table datas={products} columns={columns} />
    </div>
  );
}

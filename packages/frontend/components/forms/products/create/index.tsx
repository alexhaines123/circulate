import { POST, State } from "@/pages/api/products";
import { FormEvent, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./validation";
import { ErrorMessage } from "@hookform/error-message";
import Input from "@/components/input";
import Button from "@/components/button";
import TextArea from "@/components/textarea";
import ImagePicker from "@/components/image-picker";

export interface FormValues {
  title: string;
  description: string;
  price: number;
  images: FileList;
}

export function CreateProductForm() {
  const {
    formState: { isValid, errors },
    register,
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      console.log(formData.get("images"));
      const body = {
        title: formData.get("title"),
        description: formData.get("description"),
        price: formData.get("price"),
        images: formData.getAll("images"),
      };

      await fetch("/api/products", {
        method: "POST",
        body: formData,
      });
    } catch (error: any) {
      alert("Error: " + error.message);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <FormContent
        register={register}
        control={control}
        isValid={isValid}
        errors={errors}
      />
    </form>
  );
}

export function FormContent({
  isValid,
  errors,
  control,
  register,
}: {
  isValid: boolean;
  errors: FieldErrors<FormValues>;
  control: Control<FormValues, any>;
  register: UseFormRegister<FormValues>;
}) {
  return (
    <div className="flex flex-col gap-4">
      <Controller
        name="images"
        control={control}
        render={({ field: { onChange } }) => (
          <ImagePicker
            label="Image"
            name="image"
            errors={errors}
            register={register}
            onChange={(files) => {
              console.log("hih", files);
              if (!files) return;
              onChange(files);
            }}
          />
        )}
      />
      <Input
        label="Title"
        name="title"
        errors={errors}
        register={register}
        placeholder="My awesome item!"
      />
      <TextArea
        label="Description"
        placeholder="My awesome item is awesome!"
        name="description"
        register={register}
        errors={errors}
      />
      <Input label="Price" name="price" errors={errors} register={register} />
      <div className="flex justify-end">
        <Button type="submit" disabled={!isValid}>
          Create
        </Button>
      </div>
    </div>
  );
}

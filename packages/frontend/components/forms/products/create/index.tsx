import { POST, State } from "@/pages/api/products";
import { FormEvent, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import {
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

export interface FormValues {
  title: string;
  description: string;
  price: number;
}

export function CreateProductForm() {
  const {
    register,
    formState: { isValid, errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);

      const body = {
        title: formData.get("title"),
        description: formData.get("description"),
        price: formData.get("price"),
      };

      await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(body),
      });
    } catch (error: any) {
      alert("Error: " + error.message);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <FormContent register={register} isValid={isValid} errors={errors} />
    </form>
  );
}

export function FormContent({
  register,
  isValid,
  errors,
}: {
  register: UseFormRegister<FormValues>;
  isValid: boolean;
  errors: FieldErrors<FormValues>;
}) {
  console.log(errors, isValid);
  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Title"
        placeholder="My awesome item!"
        name="title"
        errors={errors}
        register={register}
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

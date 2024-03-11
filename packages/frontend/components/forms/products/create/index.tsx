import { FormEvent, useEffect } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./validation";
import Input from "@/components/input";
import Button from "@/components/button";
import TextArea from "@/components/textarea";
import ImagePicker from "@/components/image-picker";
import { s3Upload } from "@/lib/awsLib";

type Props = { signedFileUploadUrl: string };

export interface FormValues {
  title: string;
  description: string;
  price: number;
  images: File[];
}

export function CreateProductForm({ signedFileUploadUrl }: Props) {
  const {
    formState: { isValid, errors },
    control,
    register,
    getValues,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

      const values = getValues();

      const images = await Promise.all(
        values.images.map((file) =>
          fetch(signedFileUploadUrl, {
            body: file,
            method: "PUT",
            headers: {
              "Content-Type": file.type,
              "Content-Disposition": `attachment; filename="${file.name}"`,
            },
          })
        )
      );

      const body = {
        title: values.title,
        description: values.description,
        price: values.price,
        images: images.map((response) => ({ key: response.url.split("?")[0] })),
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
      <FormContent
        control={control}
        isValid={isValid}
        errors={errors}
        register={register}
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
            label="Images"
            name="images"
            errors={errors}
            register={register}
            onChange={(files) => {
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

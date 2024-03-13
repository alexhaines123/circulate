import { FormEvent } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/lib/trpc";
import { formSchema } from "./validation";
import Input from "@/components/input";
import Button from "@/components/button";
import TextArea from "@/components/textarea";
import ImagePicker from "@/components/image-picker";
import { useFetchQuery } from "@/lib/queries";
import { useRouter } from "next/router";

export interface FormValues {
  title: string;
  description: string;
  price: string;
  images: File[];
}

export function CreateProductForm() {
  const {
    formState: { isValid, errors },
    control,
    register,
    getValues,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });
  const productCreateMutation = trpc.products.productCreate.useMutation();
  const s3BatchGetS3SignedUrlsMutation =
    trpc.file.batchGetSignedUploadUrls.useMutation();
  const fileUploadMutation = useFetchQuery();

  const router = useRouter();

  const isLoading =
    productCreateMutation.isLoading || s3BatchGetS3SignedUrlsMutation.isLoading;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

      const values = getValues();

      const signedUploadUrls = await s3BatchGetS3SignedUrlsMutation.mutateAsync(
        {
          amount: values.images.length,
        }
      );

      const images = await Promise.all(
        values.images.map((file, indx) => {
          return fileUploadMutation.mutateAsync({
            input: signedUploadUrls[indx],
            init: {
              body: file,
              method: "PUT",
              headers: {
                "Content-Type": file.type,
                "Content-Disposition": `attachment; filename="${file.name}"`,
              },
            },
          });
        })
      );

      const body = {
        title: values.title,
        description: values.description,
        price: parseFloat(values.price),
        product_images: images.map((response) => ({
          key: response.url.split("?")[0],
        })),
      };

      const newProduct = await productCreateMutation.mutateAsync(body);

      router.push(`/products/${newProduct.product_id}`);
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
        isLoading={isLoading}
        register={register}
      />
    </form>
  );
}

export function FormContent({
  isValid,
  errors,
  control,
  isLoading,
  register,
}: {
  isValid: boolean;
  errors: FieldErrors<FormValues>;
  control: Control<FormValues, any>;
  isLoading: boolean;
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
      <Input
        label="Price"
        name="price"
        type="number"
        step={0.01}
        errors={errors}
        register={register}
      />
      <div className="flex justify-end">
        <Button
          type="submit"
          isLoading={isLoading}
          disabled={!isValid || isLoading}
        >
          Create
        </Button>
      </div>
    </div>
  );
}

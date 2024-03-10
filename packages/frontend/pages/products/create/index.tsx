import { CreateProductForm } from "@/components/forms/products/create";
import { useRef } from "react";

function CreateProductPage() {
  const titleInput = useRef<HTMLInputElement>(null);
  const descriptionInput = useRef<HTMLInputElement>(null);
  const priceInput = useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !titleInput.current ||
      !descriptionInput.current ||
      !priceInput.current
    ) {
      return;
    }

    const title = titleInput.current.value;
    const description = descriptionInput.current.value;
    const price = priceInput.current.value;

    console.log(title, description, price);
    fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, price }),
    });
  }

  return (
    <div className="prose">
      <h1>Create Product</h1>
      <CreateProductForm />
    </div>
  );
}

export default CreateProductPage;

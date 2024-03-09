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
    <div>
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input ref={titleInput} type="text" id="name" name="name" />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            ref={descriptionInput}
            type="text"
            id="description"
            name="description"
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input ref={priceInput} type="number" id="price" name="price" />
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}

export default CreateProductPage;

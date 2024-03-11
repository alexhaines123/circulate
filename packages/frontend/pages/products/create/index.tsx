import { CreateProductForm } from "@/components/forms/products/create";
import HeadComponent from "@/components/head";

function CreateProductPage() {
  return (
    <>
      <HeadComponent title="Create item" />
      <div className="prose">
        <h1>Create Item</h1>
        <CreateProductForm />
      </div>
    </>
  );
}

export default CreateProductPage;

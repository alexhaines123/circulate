import HeadComponent from "@/components/head";
import ProductList from "@/components/product/product-list";
import { trpc } from "@/lib/trpc";
import { useSearchParams } from "next/navigation";

function ProductPage() {
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("searchQuery");

  const productList = trpc.products.productList.useQuery({
    ...(searchQuery ? { searchQuery } : {}),
  });

  return (
    <>
      <HeadComponent title={"All items"} />
      <h1>Products</h1>
      {productList.data && <ProductList products={productList.data} />}
    </>
  );
}

export default ProductPage;

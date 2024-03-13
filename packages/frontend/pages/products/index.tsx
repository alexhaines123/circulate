import ProductList from "@/components/product/product-list";
import { trpc } from "@/lib/trpc";

function ProductPage() {
  const productList = trpc.products.productList.useQuery();

  return (
    <div>
      <h1>Products</h1>
      {productList.data && <ProductList products={productList.data} />}
    </div>
  );
}

export default ProductPage;

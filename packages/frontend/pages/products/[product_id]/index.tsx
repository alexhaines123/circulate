import { z } from "zod";
import { trpc } from "@/lib/trpc";
import { useTypedRouter } from "@/lib/hooksLib";
import ProductDetail from "@/components/product/product-detail";
import HeadComponent from "@/components/head";

const routerSchema = z.object({
  product_id: z.coerce.string(),
});

function ProductPage() {
  const router = useTypedRouter(routerSchema);
  const { product_id } = router.query;

  const product = trpc.products.productGet.useQuery({ product_id });

  return (
    <>
      {product.data && (
        <>
          <HeadComponent title={product.data.title} />
          <ProductDetail {...product.data} />;
        </>
      )}
    </>
  );
}

export default ProductPage;

import { trpc } from "@/lib/trpc";
import Image from "next/image";

function ProductPage({ products }: { products: any }) {
  const productList = trpc.useQuery(["productList"]);

  return (
    <div>
      <h1>Products</h1>

      {productList.data?.map((product: any) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>{product.price}</p>
          {product.product_images.map((image: any) => (
            <div className="relative w-20 h-20">
              <Image
                key={image.product_image_id}
                src={image.key}
                alt={product.title}
                fill
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ProductPage;

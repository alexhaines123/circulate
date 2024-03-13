import { formatGBP } from "@/lib/currency";
import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  price: number;
  product_images: {
    key: string;
    product_image_id: string;
  }[];
  product_id: string;
};

function ProductListItem({ title, price, product_id, product_images }: Props) {
  const image = product_images[0];
  return (
    <div className="flex flex-col">
      <div className="relative h-full w-full">
        <Link href={`/products/${product_id}`}>
          <Image
            key={image.product_image_id}
            src={image.key}
            alt={title}
            fill
            className="min-h-72 max-h-96 !relative object-contain"
          />
        </Link>
      </div>
      <p className="m-0">{formatGBP(price)}</p>
    </div>
  );
}

export default ProductListItem;

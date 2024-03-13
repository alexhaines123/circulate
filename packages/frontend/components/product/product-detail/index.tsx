import Button from "@/components/button";
import Modal from "@/components/modal";
import { formatGBP } from "@/lib/currency";
import Image from "next/image";
import { Fragment, useState } from "react";

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

function ProductDetail({ title, price, description, product_images }: Props) {
  const [fullscreenImage, setFullscreenImage] = useState<string>();

  const onOpenImageFullscreen = (imageUrl: string) => {
    setFullscreenImage(imageUrl);
  };

  const onCloseImageFullscreen = () => {
    setFullscreenImage(undefined);
  };

  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="grid grid-cols-12 col-span-12 lg:col-span-8 lg:grid-cols-8 gap-2">
        <div className="col-span-6 lg:col-span-3 ">
          <Image
            key={product_images[0].product_image_id}
            src={product_images[0].key}
            alt={title}
            fill
            className="!relative object-cover w-full h-full m-0 pointer  "
            id="product-image"
            onClick={() => onOpenImageFullscreen(product_images[0].key)}
          />
        </div>
        <div className="grid col-span-6 grid-cols-2 lg:grid-cols-2 lg:col-span-5 gap-2 row-span-1">
          {product_images.map((image, index) => (
            <Fragment key={image.product_image_id}>
              {index > 0 && (
                <>
                  <div className="row-span-1 lg:row-span-2">
                    <Image
                      key={image.product_image_id}
                      src={image.key}
                      alt={title}
                      fill
                      className="!relative object-cover w-full h-full m-0 lg:max-h-96"
                      onClick={() => onOpenImageFullscreen(image.key)}
                    />
                  </div>
                </>
              )}
            </Fragment>
          ))}
        </div>
      </div>
      <div className="col-span-12 lg:col-span-4">
        <div className=" my-2 lg:my-0 py-4 px-2 border-neutral-content border rounded-lg flex flex-col justify-between">
          <div>
            <h1 className="my-2">{formatGBP(price)}</h1>
            <h2 className="my-2">{title}</h2>
            <p className="my-2">{description}</p>
          </div>
          <div>
            <Button extraClassName="w-full my-2">Buy now</Button>
            <Button importance="secondary" extraClassName="w-full ">
              Make an offer
            </Button>
          </div>
        </div>
      </div>
      <Modal open={Boolean(fullscreenImage)} onClose={onCloseImageFullscreen}>
        <div className="m-2">
          {fullscreenImage && (
            <Image
              src={fullscreenImage}
              alt={"Full screen image"}
              fill
              className="!relative object-cover w-full h-full m-0"
            />
          )}
        </div>
      </Modal>
    </div>
  );
}

export default ProductDetail;

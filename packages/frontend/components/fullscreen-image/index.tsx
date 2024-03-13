import Image from "next/image";
import { ComponentProps, useRef } from "react";

type Props = ComponentProps<typeof Image>;

function FullscreenImage(props: Props) {
  const ref = useRef<HTMLImageElement>(null);

  const handleClick = () => {
    if (!ref.current) return;
    ref.current.requestFullscreen();
  };

  return <Image onClick={handleClick} {...props} ref={ref} />;
}

export default FullscreenImage;

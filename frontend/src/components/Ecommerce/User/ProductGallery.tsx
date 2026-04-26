import { useState } from "react";

const ProductGallery = ({ images }: any) => {
  const [active, setActive] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="bg-gray-100 h-100 flex items-center justify-center rounded-xl">
        No Image
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">

      {/*  THUMBNAILS (LEFT on desktop) */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto">
        {images.map((img: any, i: number) => (
          <img
            key={i}
            src={img.url}
            onClick={() => setActive(i)}
            className={`w-16 h-16 object-contain rounded cursor-pointer border ${
              active === i ? "border-black" : "border-gray-200"
            }`}
          />
        ))}
      </div>

      {/* 🖼 MAIN IMAGE */}
      <div className="flex-1 relative group">
        <img
          src={images[active].url}
          className="w-full h-100 object-contain rounded-xl transition-transform duration-300 group-hover:scale-110"
        />
      </div>
    </div>
  );
};

export default ProductGallery;
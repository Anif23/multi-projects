import { useState } from "react";

const ImageViewer = ({ images, open, setOpen }: any) => {
  const [index, setIndex] = useState(0);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-9999">

      <button
        onClick={() => setOpen(false)}
        className="absolute top-4 right-6 text-white text-2xl"
      >
        ✕
      </button>

      <div className="flex gap-6 items-center">

        {/* 🖼️ MAIN IMAGE */}
        <div className="relative group">
          <img
            src={images[index]?.url}
            className="w-100 h-100 object-contain rounded bg-white"
          />

          {/* ZOOM EFFECT */}
          {/* <div className="absolute inset-0 hidden group-hover:block bg-cover bg-center scale-150"
            style={{
              backgroundImage: `url(${images[index]?.url})`
            }}
          /> */}
        </div>

        {/*  THUMBNAILS */}
        <div className="flex flex-col gap-2 max-h-100 overflow-y-auto">
          {images.map((img: any, i: number) => (
            <img
              key={img.id}
              src={img.url}
              onClick={() => setIndex(i)}
              className={`w-16 h-16 object-cover rounded cursor-pointer border ${
                index === i ? "border-blue-500" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
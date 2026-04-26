import { useState } from "react";
import ImageViewer from "./ImageViewer";

const ImageCell = ({ images }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="relative cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <img
          src={images?.[0]?.url || "/placeholder.png"}
          className="w-14 h-14 object-contain rounded border"
        />

        {images?.length > 1 && (
          <div className="absolute -top-2 -right-2 bg-black text-white text-xs px-2 py-0.5 rounded-full">
            +{images.length - 1}
          </div>
        )}
      </div>

      {/* 🔥 VIEWER */}
      <ImageViewer images={images} open={open} setOpen={setOpen} />
    </>
  );
};

export default ImageCell;
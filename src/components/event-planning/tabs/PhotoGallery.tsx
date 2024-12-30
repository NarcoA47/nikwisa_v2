"use client";

import { fetchImagesByStoreId } from "@/reducers/imageSlice";
import { AppDispatch, RootState } from "@/reducers/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image"; // Import next/image for optimized images

export default function PhotosGallery({ storeId }: { storeId: number }) {
  const dispatch = useDispatch<AppDispatch>();
  const { images, loading, error } = useSelector(
    (state: RootState) => state.images
  );

  // Fetch images when the component mounts or storeId changes
  useEffect(() => {
    dispatch(fetchImagesByStoreId(storeId));
  }, [storeId, dispatch]);

  console.log("images", images);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="py-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative">
            <Image
              src={image.image} // Use `image.image` to access the image URL
              alt={`Image uploaded at ${new Date(
                image.uploaded_at
              ).toLocaleString()}`}
              width={500} // Set width and height (you can adjust based on your layout)
              height={500}
              className="object-cover rounded-lg shadow-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

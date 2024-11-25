"use client";

interface PhotosTabProps {
  serviceName: string;
  photos: string[];
}

export default function PhotosGallery({ serviceName, photos }: PhotosTabProps) {
  return (
    <div className="py-6">
      <h2 className="text-2xl font-semibold mb-6">Photos of {serviceName}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`${serviceName} photo ${index + 1}`}
            className="w-full h-auto object-cover rounded-lg shadow-sm"
          />
        ))}
      </div>
    </div>
  );
}

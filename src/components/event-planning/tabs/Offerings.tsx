"use client";
import { useSelector, useDispatch } from "react-redux";
import { fetchOfferingsByStoreId } from "@/reducers/offeringsSlice";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/reducers/store";
import OfferingCard from "./OfferingCard";

export default function Offerings({ storeId }: { storeId: number }) {
  const dispatch = useDispatch<AppDispatch>();
  const { offerings, loading, error } = useSelector(
    (state: RootState) => state.offerings
  );

  // Fetch offerings when component mounts or storeId changes
  useEffect(() => {
    dispatch(fetchOfferingsByStoreId(storeId));
  }, [storeId, dispatch]);

  console.log("offerings", offerings);
  console.log("id", storeId);

  if (loading) {
    return <div>Loading offerings...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h3 className="font-bold text-lg mb-4">Services Offered:</h3>
      <div className="grid grid-cols-1 md:grid-cols-3  gap-6">
        {offerings.length === 0 ? (
          <div className="text-center text-lg">No products available</div>
        ) : (
          offerings.map((offering) => (
            <OfferingCard
              key={offering.id}
              offering={{
                id: offering.id,
                name: offering.name,
                description: offering.description,
                price: offering.price,
                image: offering.image || "/placeholder-image.jpg",
                phone_number: offering.phoneNumber
                  ? Number(offering.phoneNumber)
                  : undefined,
                whatsapp_number: offering.whatsappNumber
                  ? Number(offering.whatsappNumber)
                  : undefined,
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

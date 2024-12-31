"use client";
import OfferingForm from "@/components/OfferingForm";

export default function AddServicePage() {
  const handleSubmit = async (serviceData: any) => {
    // API call to create the new service
    await createService(serviceData);
  };

  return (
    <div>
      <OfferingForm onSubmit={handleSubmit} />
    </div>
  );
}

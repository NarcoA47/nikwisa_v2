"use client";
import ServiceForm from "@/components/ServiceForm";

export default function AddServicePage() {
  const handleSubmit = async (serviceData: any) => {
    // API call to create the new service
    await createService(serviceData);
  };

  return (
    <div>
      <ServiceForm onSubmit={handleSubmit} />
    </div>
  );
}

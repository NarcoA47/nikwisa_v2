import ServiceCard from "./ServiceCard";

interface ServicesTabProps {
  services: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    phoneNumber: string;
    whatsappNumber: string;
  }[];
}

export default function Services({ services }: ServicesTabProps) {
  return (
    <div>
      <h3 className="font-bold text-lg mb-4">Services Offered:</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {services.length === 0 ? (
          <div className="text-center text-lg">No products available</div>
        ) : (
          services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))
        )}
      </div>
    </div>
  );
}

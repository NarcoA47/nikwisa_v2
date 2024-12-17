import OfferingCard from "./OfferingCard";

interface Offering {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  phoneNumber?: string; // Optional
  whatsappNumber?: string; // Optional
}

interface OfferingsTabProps {
  offerings: Offering[];
}

export default function Offerings({ offerings }: OfferingsTabProps) {
  return (
    <div>
      <h3 className="font-bold text-lg mb-4">Services Offered:</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {offerings.length === 0 ? (
          <div className="text-center text-lg">No products available</div>
        ) : (
          offerings.map((offering) => (
            <OfferingCard key={offering.id} offering={offering} />
          ))
        )}
      </div>
    </div>
  );
}

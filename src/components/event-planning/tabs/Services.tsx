"use client";

interface ServicesTabProps {
  services: string[];
}

export default function Services({ services }: ServicesTabProps) {
  return (
    <div>
      <h3 className="font-bold text-lg mb-2">Services Offered:</h3>
      <ul className="list-disc pl-5">
        {services.map((service, index) => (
          <li key={index}>{service}</li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import Step1Categories from "@/components/Categories/Step1Categories";
import Step2SubCategories from "@/components/Categories/Step2SubCategories";
import Step3StoreDetails from "@/components/Categories/Step3Details";
import React, { useState } from "react";

interface StoreData {
  categories: string[];
  event_planning_categories: string[];
  rent_hire_categories: string[];
  name: string;
  phone_number: string;
  whats_app: string;
  image: File | null;
  overview: string;
  location: string;
  working_hours: string;
  owner: string | null;
}

const initialStoreData: StoreData = {
  categories: [],
  event_planning_categories: [],
  rent_hire_categories: [],
  name: "",
  phone_number: "",
  whats_app: "",
  image: null,
  overview: "",
  location: "",
  working_hours: "",
  owner: null,
};

const CreateStoreSteps = () => {
  const [step, setStep] = useState(1);
  const [storeData, setStoreData] = useState<StoreData>(initialStoreData);

  // Debug logging
  console.log("Current step:", step);
  console.log("Current store data:", storeData);

  const handleNext = (newData: Partial<StoreData>) => {
    setStoreData((prev) => {
      const updated = {
        ...prev,
        ...newData,
        // Ensure arrays are properly handled
        categories: newData.categories || prev.categories,
        event_planning_categories:
          newData.event_planning_categories || prev.event_planning_categories,
        rent_hire_categories:
          newData.rent_hire_categories || prev.rent_hire_categories,
      };
      console.log("Updating store data:", updated);
      return updated;
    });
    setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (finalData: Partial<StoreData>) => {
    // Combine all data for final submission
    const completeData = {
      ...storeData,
      ...finalData,
    };
    console.log("Submitting complete data:", completeData);
    // Handle submission logic here
  };

  return (
    <div className="p-6">
      {step === 1 && (
        <Step1Categories
          selectedCategories={storeData.categories}
          onNext={(data: { categories: string[] }) =>
            handleNext({ categories: data.categories })
          }
        />
      )}
      {step === 2 && (
        <Step2SubCategories
          selectedCategories={storeData.categories}
          selectedEventCategories={storeData.event_planning_categories}
          selectedRentHireCategories={storeData.rent_hire_categories}
          onPrevious={handlePrevious}
          onNext={(data: {
            event_planning_categories?: string[];
            rent_hire_categories?: string[];
          }) =>
            handleNext({
              event_planning_categories: data.event_planning_categories || [],
              rent_hire_categories: data.rent_hire_categories || [],
            })
          }
        />
      )}
      {step === 3 && (
        <Step3StoreDetails
          storeData={storeData}
          onPrevious={handlePrevious}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default CreateStoreSteps;

// "use client";

// import Step1Categories from "@/components/Categories/Step1Categories";
// import Step2SubCategories from "@/components/Categories/Step2SubCategories";
// import Step3StoreDetails from "@/components/Categories/Step3Details";
// import React, { useState } from "react";

// const CreateStoreSteps = () => {
//   const [step, setStep] = useState(1);
//   const [storeData, setStoreData] = useState({
//     categories: [],
//     event_planning_categories: [],
//     rent_hire_categories: [],
//     name: "",
//     phone_number: "",
//     whats_app: "",
//     image: "",
//     overview: "",
//     location: "",
//     working_hours: "",
//     owner: null,
//   });

//   const handleNext = (newData: any) => {
//     setStoreData((prev) => ({ ...prev, ...newData }));
//     setStep((prev) => prev + 1);
//   };

//   const handlePrevious = () => {
//     setStep((prev) => prev - 1);
//   };

//   return (
//     <div className="p-6">
//       {step === 1 && (
//         <Step1Categories
//           selectedCategories={storeData.categories}
//           onNext={handleNext}
//         />
//       )}
//       {step === 2 && (
//         <Step2SubCategories
//           selectedCategories={storeData.categories}
//           selectedEventCategories={storeData.event_planning_categories}
//           selectedRentHireCategories={storeData.rent_hire_categories}
//           onPrevious={handlePrevious}
//           onNext={handleNext}
//         />

//         // <Step2SubCategories
//         //   selectedCategories={storeData.categories}
//         //   selectedEventCategories={storeData.event_planning_categories}
//         //   onPrevious={handlePrevious}
//         //   onNext={handleNext}
//         // />
//       )}
//       {step === 3 && (
//         <Step3StoreDetails
//           storeData={storeData}
//           onPrevious={handlePrevious}
//           onSubmit={() => {}}
//         />
//       )}
//     </div>
//   );
// };

// export default CreateStoreSteps;

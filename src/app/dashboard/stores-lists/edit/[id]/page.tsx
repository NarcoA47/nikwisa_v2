"use client";

import Step1 from "@/components/UpdatingStore/Step1";
import Step2 from "@/components/UpdatingStore/Step2";
import Step3 from "@/components/UpdatingStore/Step3";
import { AppDispatch, RootState } from "@/reducers/store";
import { fetchStoreById } from "@/reducers/storeSlice";
import { Store } from "@/types/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const defaultStoreData: Store = {
  name: "",
  categories: [],
  event_planning_categories: [],
  overview: "",
  phone_number: "",
  whats_app: "",
  location: "",
  image: null,
  working_hours: null,
  is_verified: false,
  is_responsive: false,
  id: 0,
  rating: 0,
  reviews_count: 0,
  photos: [],
  createdAt: "",
  updatedAt: "",
  offerings: [],
  reviews: [],
  rent_hire_categories: [],
  owner: ""
};

const EditStore = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { store } = useSelector((state: RootState) => state.stores);
  const [step, setStep] = useState(1);
  const [storeData, setStoreData] = useState(defaultStoreData);

  useEffect(() => {
    if (id) dispatch(fetchStoreById(Number(id)));
  }, [dispatch, id]);

  useEffect(() => {
    if (store) setStoreData(store); // Prefill data if editing an existing store
  }, [store]);

  const handleNext = (data: Partial<typeof defaultStoreData>) => {
    setStoreData((prev: typeof defaultStoreData) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const handlePrevious = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    console.log("Final Data:", storeData);
    // Handle form submission (e.g., API call)
  };

  return (
    <div className="p-6">
      {step === 1 && (
        <Step1 selectedCategories={storeData.categories} onNext={handleNext} />
      )}
      {step === 2 && (
        <Step2
          selectedEventCategories={storeData.event_planning_categories}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
      {step === 3 && (
        <Step3
          storeData={storeData}
          storeId={id}
          onPrevious={handlePrevious}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default EditStore;

import { useState, useEffect } from "react";

const useFormStorage = (key) => {
  const [storedData, setStoredData] = useState(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : {};
    }
    return {};
  });

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    console.log("useFormStorage mounted");
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem(key);
      console.log("Saved data from localStorage:", savedData);
      if (savedData) {
        setStoredData(JSON.parse(savedData));
        setShowModal(true); // Show modal if data exists
        console.log("Modal set to show");
      }
      setIsLoading(false);
      console.log("Loading state set to false");
    }
  }, [key]);

  // Save form data to localStorage
  const saveFormData = (data) => {
    console.log("Saving form data:", data);
    const newData = { ...storedData, ...data, lastStep: data.step || storedData.lastStep || 1 }; // Ensure lastStep is updated
    console.log("Merged data to save:", newData);
    localStorage.setItem(key, JSON.stringify(newData));
    setStoredData(newData);
    console.log("Form data saved to localStorage with lastStep:", newData.lastStep);
  };

  // Reset form data
  const resetFormData = () => {
    console.log("Resetting form data");
    localStorage.removeItem(key);
    setStoredData({});
    setShowModal(false);
    console.log("Form data cleared and modal hidden");
  };

  return {
    storedData,
    saveFormData,
    resetFormData,
    showModal,
    setShowModal,
    isLoading,
  };
};

export default useFormStorage;

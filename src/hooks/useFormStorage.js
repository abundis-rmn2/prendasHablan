import { useState, useEffect } from "react";

const useFormStorage = (keyName = "formData") => {
  const isBrowser = typeof window !== "undefined"; // Check for browser environment
  const [storedData, setStoredData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isBrowser) {
      setIsLoading(false);
      return;
    }
    const saved = localStorage.getItem(keyName);
    if (saved) {
      setStoredData(JSON.parse(saved));
      setShowModal(true);
    }
    setIsLoading(false);
  }, [keyName, isBrowser]);

  const saveFormData = (data) => {
    if (isBrowser) {
      localStorage.setItem(keyName, JSON.stringify(data));
      setStoredData(data);
    }
  };

  const resetFormData = () => {
    if (isBrowser) {
      localStorage.removeItem(keyName);
      setStoredData({});
    }
  };

  const logAllForms = () => {
    if (isBrowser) {
      console.log("All saved forms in localStorage:");
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("formData_")) {
          console.log(`${key}:`, JSON.parse(localStorage.getItem(key)));
        }
      });
    }
  };

  return {
    storedData,
    saveFormData,
    resetFormData,
    showModal,
    setShowModal,
    isLoading,
    logAllForms, // Expose the method
  };
};

export default useFormStorage;

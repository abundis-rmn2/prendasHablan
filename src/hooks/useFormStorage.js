import { useState, useEffect } from "react";

const useFormStorage = (keyName = "formData") => {
  console.log(`Using useFormStorage with key: ${keyName}`); // Alert for keyName being used

  const [storedData, setStoredData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(keyName);
    if (saved) {
      setStoredData(JSON.parse(saved));
      setShowModal(true);
    }
    setIsLoading(false);
  }, [keyName]);

  const saveFormData = (data) => {
    localStorage.setItem(keyName, JSON.stringify(data));
    setStoredData(data);
  };

  const resetFormData = () => {
    localStorage.removeItem(keyName);
    setStoredData({});
  };

  const logAllForms = () => {
    console.log("All saved forms in localStorage:");
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("formData_")) {
        console.log(`${key}:`, JSON.parse(localStorage.getItem(key)));
      }
    });
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

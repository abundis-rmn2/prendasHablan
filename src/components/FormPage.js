import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Step1_BasicInfo from "./Form/Step1_BasicInfo";
import Step2_Disappearance from "./Form/Step2_Disappearance";
import Step3_Clothing from "./Form/Step3_Clothing";
import Step4_Consent from "./Form/Step4_Consent";
import FormProgress from "./Form/FormProgress";
import Modal from "./Form/Modal";
import FormInfo from "./Form/FormInfo";
import SummaryModal from "./Form/SummaryModal"; // Import the new SummaryModal component
import useFormStorage from "../hooks/useFormStorage";

const FormPage = ({ csvData = [] }) => {
  const { register, handleSubmit, watch, control, reset, setValue, formState: { errors } } = useForm();
  const { storedData, saveFormData, resetFormData, showModal, setShowModal, isLoading } =
    useFormStorage("formData");

  const [step, setStep] = useState(1);
  const [showSummaryModal, setShowSummaryModal] = useState(false); // State for the summary modal

  // Load saved data into the form on mount
  useEffect(() => {
    console.log("FormPage mounted");
    if (storedData && !isLoading) {
      console.log("Stored data found:", storedData);
      Object.keys(storedData).forEach((key) => {
        setValue(key, storedData[key]); // Populate form fields with saved data
        console.log(`Set value for ${key}:`, storedData[key]);
      });
      setStep(storedData.lastStep || 1); // Restore the last step
      console.log("Restored step:", storedData.lastStep || 1);
    }
  }, [storedData, isLoading, setValue]);

  const nextStep = (data) => {
    console.log("Next step triggered with data:", data);
    const updatedStep = step + 1;
    saveFormData({ ...storedData, ...data, step: updatedStep }); // Save current step and data
    setStep(updatedStep);
    console.log("Step incremented to:", updatedStep);
  };

  const prevStep = () => {
    console.log("Previous step triggered");
    const updatedStep = step - 1;
    saveFormData({ ...storedData, step: updatedStep }); // Save current step
    setStep(updatedStep);
    console.log("Step decremented to:", updatedStep);
  };

  const onSubmit = (data) => {
    console.log("Form submitted with data:", data);
    if (step < 4) {
      console.log("Saving data and moving to next step:", { ...data, step: step + 1 });
      saveFormData({ ...storedData, ...data, step: step + 1 }); // Merge new data with existing stored data
      nextStep(data);
    } else {
      console.log("Final step reached, showing summary modal");
      setShowSummaryModal(true); // Show the summary modal
    }
  };

  const handleFinalSubmit = () => {
    console.log("Final submission confirmed");
    resetFormData(); // Clear data after submission
    setShowSummaryModal(false); // Close the summary modal
  };

  const handleCancelSummary = () => {
    console.log("Summary modal canceled");
    setShowSummaryModal(false); // Close the summary modal
  };

  const handleStartNewForm = () => {
    console.log("Starting new form");
    resetFormData(); // Clear localStorage and reset form
    reset(); // Reset form fields
    setStep(1); // Go back to step 1
    console.log("Form reset and step set to 1");
  };

  if (isLoading) {
    console.log("Loading state active");
    return <p>Cargando...</p>; // Show loading state while checking localStorage
  }

  return (
    <>
      {showModal && (
        <Modal
          show={showModal}
          onContinue={() => {
            console.log("Continuing with saved data");
            setShowModal(false);
          }} // Close modal and continue with saved data
          onStartNew={handleStartNewForm} // Start a new form
        />
      )}
      {showSummaryModal && (
        <SummaryModal
          data={storedData}
          onConfirm={handleFinalSubmit}
          onCancel={handleCancelSummary}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProgress currentStep={step} totalSteps={4} />

        {step === 1 && (
          <Step1_BasicInfo
            register={register}
            control={control}
            errors={errors}
          />
        )}
        {step === 2 && <Step2_Disappearance register={register} watch={watch} errors={errors} />}
        {step === 3 && (
          <Step3_Clothing
            register={register}
            watch={watch}
            errors={errors}
            csvData={csvData}
          />
        )}
        {step === 4 && <Step4_Consent register={register} watch={watch} errors={errors} />}

        <div>
          {step > 1 && <button type="button" onClick={prevStep}>Anterior</button>}
          <button type="submit">{step === 4 ? "Enviar" : "Siguiente"}</button>
        </div>
      </form>
      <FormInfo data={storedData} />
    </>
  );
};

export default FormPage;

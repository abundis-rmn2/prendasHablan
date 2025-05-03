import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Step1_BasicInfo from "./Form/Step1_BasicInfo";
import Step2_Disappearance from "./Form/Step2_Disappearance";
import Step3_Clothing from "./Form/Step3_Clothing";
import Step4_Consent from "./Form/Step4_Consent";
import Step5_ThankYou from "./Form/Step5_ThankYou"; // Import the new Step5_ThankYou component
import FormProgress from "./Form/FormProgress";
import Modal from "./Form/Modal";
import FormInfo from "./Form/FormInfo";
import SummaryModal from "./Form/SummaryModal"; // Import the new SummaryModal component
import useFormStorage from "../hooks/useFormStorage";

const FormPage = ({ 
  csvData = [], 
  preselectIndicio = false, 
  formContext = "default", 
  stepOrder = [1, 2, 3, 4] 
}) => {
  const { register, handleSubmit, watch, control, reset, setValue, formState: { errors } } = useForm();
  const { 
    storedData, 
    saveFormData, 
    resetFormData, 
    showModal, 
    setShowModal, 
    isLoading 
  } = useFormStorage(`formData_${formContext}`);

  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = stepOrder[stepIndex];
  const [showSummaryModal, setShowSummaryModal] = useState(false); // State for the summary modal

  // Load saved data into the form on mount
  useEffect(() => {
    console.log("FormPage mounted");
    if (storedData && !isLoading) {
      console.log("Stored data found:", storedData);
      if (Object.keys(storedData).length === 0) {
        reset(); // Ensure form fields are cleared if storedData is empty
        console.log("Form fields cleared due to empty stored data");
      } else {
        Object.keys(storedData).forEach((key) => {
          setValue(key, storedData[key]); // Populate form fields with saved data
          console.log(`Set value for ${key}:`, storedData[key]);
        });
        const storedStepIndex = storedData.stepIndex || 0;
        setStepIndex(storedStepIndex); // Restore the last step index
        console.log("Restored step index:", storedStepIndex);
      }
    }
  }, [storedData, isLoading, setValue]);

  const nextStep = (data) => {
    console.log("Next step triggered with data:", data);
    const newIndex = stepIndex + 1;
    saveFormData({ ...storedData, ...data, stepIndex: newIndex }); // Save current step index and data
    setStepIndex(newIndex);
    console.log("Step index incremented to:", newIndex);
  };

  const prevStep = () => {
    console.log("Previous step triggered");
    const newIndex = stepIndex - 1;
    saveFormData({ ...storedData, stepIndex: newIndex }); // Save current step index
    setStepIndex(newIndex);
    console.log("Step index decremented to:", newIndex);
  };

  const onSubmit = (data) => {
    console.log("Form submitted with data:", data);

    // Ensure consent is explicitly set to true if checked
    if (data.consent === true || data.consent === "true") {
      data.consent = true;
    } else {
      data.consent = false;
    }

    // Save all data to localStorage before proceeding
    saveFormData({ ...storedData, ...data });

    if (stepIndex < stepOrder.length - 1) {
      console.log("Saving data and moving to next step:", { ...data, stepIndex: stepIndex + 1 });
      saveFormData({ ...storedData, ...data, stepIndex: stepIndex + 1 }); // Merge new data with existing stored data
      nextStep(data);
    } else {
      if (data.consent) {
        console.log("Final step reached, showing summary modal");
        setShowSummaryModal(true); // Show the summary modal only if consent is true
      } else {
        alert("Debes aceptar el consentimiento para enviar el formulario.");
      }
    }
  };

  const handleFinalSubmit = () => {
    console.log("Final submission confirmed");
    resetFormData(); // Clear data after submission
    setShowSummaryModal(false); // Close the summary modal
    setStepIndex(stepOrder.length); // Move to step 5 (thank-you message)
  };

  const handleCancelSummary = () => {
    console.log("Summary modal canceled");
    setShowSummaryModal(false); // Close the summary modal
  };

  const handleStartNewForm = () => {
    console.log("Starting new form");
    resetFormData(); // Clear localStorage and reset form data
    reset(); // Reset form fields
    setStepIndex(0); // Go back to step 1
    console.log("Form reset and step index set to 0");
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
          resetFormData={() => {
            resetFormData(); // Clear localStorage
            reset(); // Clear form fields
            setStepIndex(0); // Reset to step 1
          }}
        />
      )}
      {showSummaryModal && (
        <SummaryModal
          data={storedData}
          onConfirm={handleFinalSubmit}
          onCancel={handleCancelSummary}
        />
      )}
      <FormInfo data={storedData} />
      {stepIndex === stepOrder.length ? (
        <Step5_ThankYou onStartNewForm={handleStartNewForm} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormProgress currentStep={stepIndex + 1} totalSteps={stepOrder.length} />

          {currentStep === 1 && (
            <Step1_BasicInfo
              register={register}
              control={control}
              errors={errors}
            />
          )}
          {currentStep === 2 && <Step2_Disappearance register={register} watch={watch} errors={errors} />}
          {currentStep === 3 && (
            <Step3_Clothing
              register={register}
              setValue={setValue} // Pass setValue to Step3_Clothing
              watch={watch}
              errors={errors}
              csvData={csvData}
              noIndicioSelected={!preselectIndicio} // Pass noIndicioSelected based on preselectIndicio
            />
          )}
          {currentStep === 4 && <Step4_Consent register={register} watch={watch} errors={errors} />}

          <div>
            {stepIndex > 0 && <button type="button" onClick={prevStep}>Anterior</button>}
            <button type="submit">{stepIndex === stepOrder.length - 1 ? "Enviar" : "Siguiente"}</button>
          </div>
        </form>
      )}
    </>
  );
};

export default FormPage;

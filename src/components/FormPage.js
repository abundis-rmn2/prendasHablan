import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Step1BasicInfo from "./Form/Step1_BasicInfo"; // Fix PascalCase
import Step2Disappearance from "./Form/Step2_Disappearance"; // Fix PascalCase
import Step3Clothing from "./Form/Step3_Clothing"; // Fix PascalCase
import Step4Consent from "./Form/Step4_Consent"; // Fix PascalCase
import Step5ThankYou from "./Form/Step5_ThankYou"; // Fix PascalCase
import FormProgress from "./Form/FormProgress";
import Modal from "./Form/Modal";
import FormInfo from "./Form/FormInfo";
import SummaryModal from "./Form/SummaryModal";
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
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  useEffect(() => {
    console.log("FormPage mounted");
    if (storedData && !isLoading) {
      console.log("Stored data found:", storedData);
      if (Object.keys(storedData).length === 0) {
        reset();
        console.log("Form fields cleared due to empty stored data");
      } else {
        Object.keys(storedData).forEach((key) => {
          setValue(key, storedData[key]);
          console.log(`Set value for ${key}:`, storedData[key]);
        });
        const storedStepIndex = storedData.stepIndex || 0;
        setStepIndex(storedStepIndex);
        console.log("Restored step index:", storedStepIndex);
      }
    }
  }, [storedData, isLoading, setValue, reset]); // Add 'reset' to dependency array

  const nextStep = (data) => {
    console.log("Next step triggered with data:", data);
    const newIndex = stepIndex + 1;
    saveFormData({ ...storedData, ...data, stepIndex: newIndex });
    setStepIndex(newIndex);
    console.log("Step index incremented to:", newIndex);
  };

  const prevStep = () => {
    console.log("Previous step triggered");
    const newIndex = stepIndex - 1;
    saveFormData({ ...storedData, stepIndex: newIndex });
    setStepIndex(newIndex);
    console.log("Step index decremented to:", newIndex);
  };

  const onSubmit = (data) => {
    console.log("Form submitted with data:", data);

    if (data.consent === true || data.consent === "true") {
      data.consent = true;
    } else {
      data.consent = false;
    }

    saveFormData({ ...storedData, ...data });

    if (stepIndex < stepOrder.length - 1) {
      console.log("Saving data and moving to next step:", { ...data, stepIndex: stepIndex + 1 });
      saveFormData({ ...storedData, ...data, stepIndex: stepIndex + 1 });
      nextStep(data);
    } else {
      if (data.consent) {
        console.log("Final step reached, showing summary modal");
        setShowSummaryModal(true);
      } else {
        alert("Debes aceptar el consentimiento para enviar el formulario.");
      }
    }
  };

  const handleFinalSubmit = () => {
    console.log("Final submission confirmed");
    resetFormData();
    setShowSummaryModal(false);
    setStepIndex(stepOrder.length);
  };

  const handleCancelSummary = () => {
    console.log("Summary modal canceled");
    setShowSummaryModal(false);
  };

  const handleStartNewForm = () => {
    console.log("Starting new form");
    resetFormData();
    reset();
    setStepIndex(0);
    console.log("Form reset and step index set to 0");
  };

  if (isLoading) {
    console.log("Loading state active");
    return <p>Cargando...</p>;
  }

  return (
    <>
      {showModal && (
        <Modal
          show={showModal}
          onContinue={() => {
            console.log("Continuing with saved data");
            setShowModal(false);
          }}
          onStartNew={handleStartNewForm}
          resetFormData={() => {
            resetFormData();
            reset();
            setStepIndex(0);
          }}
          setShowModal={setShowModal} // Pass setShowModal to Modal
        />
      )}
      {showSummaryModal && (
        <SummaryModal
          data={storedData}
          onConfirm={handleFinalSubmit}
          onCancel={handleCancelSummary}
        />
      )}
      {formContext !== "default" && <FormInfo data={storedData} />}
      {stepIndex === stepOrder.length ? (
        <Step5ThankYou onStartNewForm={handleStartNewForm} />
      ) : (
        <form style={{ maxWidth: "1024px", margin: "0 auto", width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
          <FormProgress 
            currentStep={stepIndex + 1} 
            totalSteps={stepOrder.length} 
            stepOrder={stepOrder} 
            formContext={formContext} // Pass formContext to FormProgress
          />
          {currentStep === 1 && (
            <Step1BasicInfo
              register={register}
              control={control}
              errors={errors}
            />
          )}
          {currentStep === 2 && (
            <Step2Disappearance
              register={register}
              watch={watch}
              errors={errors}
            />
          )}
          {currentStep === 3 && (
            <Step3Clothing
              register={register}
              setValue={setValue}
              watch={watch}
              errors={errors}
              csvData={csvData}
              noIndicioSelected={!preselectIndicio}
            />
          )}
          {currentStep === 4 && (
            <Step4Consent
              register={register}
              watch={watch}
              errors={errors}
            />
          )}
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

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
import logotipo from "../images/logotipo.png"; // Import the logo image
import ShareButtonAside from "./ShareButtonAside"; // Import the new ShareButtonAside component
import IndicioForm from "./Form/IndicioForm"; // Import IndicioForm

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
  const [selectedIndicios, setSelectedIndicios] = useState([]); // Shared state for selected items

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

  // Calculate dynamic margins
  const footerHeight = getComputedStyle(document.documentElement).getPropertyValue('--footer-height') || '4rem';
  const headerHeight = getComputedStyle(document.documentElement).getPropertyValue('--header-height') || '4rem';
  const marginBottom = `calc(${footerHeight} - 5px)`;
  const marginTop = `calc(${headerHeight} - 15px)`;
  console.log("Calculated margins:", { marginBottom, marginTop });

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
            <div style={{ display: "flex", maxWidth: "1280px", margin: "0 auto", width: "100%", height: "100%" }}>
        <div className="infoPrends" style={{ 
          width: "30%",
          background: "lightgray", 
          display: "flex",
          alignItems: "center",
          placeContent: "stretch flex-end",
          marginBottom: "calc(-5px + 4rem)",
          marginTop: "calc(-15px + 4rem)",
          flexDirection: "column",
          flexWrap: "nowrap",
          alignContent: "center",
          justifyContent: "flex-end"
        }}>
          {/*componente Indicio Tiempo Real */}
          <IndicioForm 
            context={formContext} 
            preselectIndicio={preselectIndicio} 
            csvData={csvData} 
            selectedIndicios={selectedIndicios} // Pass shared state to IndicioForm
          />
          <ShareButtonAside 
            indicio="example-indicio" 
            customText="Compartir en redes" 
            customStyles={{
              container: { textAlign: "left", padding: "1rem" },
              text: { fontSize: "1.5rem", fontWeight: "bold" },
              button: { margin: "0.25rem", padding: "0.5rem 1rem" }
            }} 
          />
          <div style={{textAlign: "center", margin: "0.2rem"}}>
            <img style={{width: "70%", height: "auto", margin: "auto", objectFit: "cover" }} src={logotipo} alt="Logotipo" />
          </div>
        </div>
        <div className="form" style={{ 
          width: "50%",
          overflowY: "overlay",
          marginBottom: marginBottom,
          marginTop: marginTop,
          display: "flex",
          flexDirection: "row",
          alignContent: "center", 
          alignItems: "center",
          justifyContent: "center",
          overflowX: "hidden",
          padding: "1rem"
        }}>
          {stepIndex === stepOrder.length ? (
            <Step5ThankYou onStartNewForm={handleStartNewForm} />
          ) : (
            <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
              <FormProgress 
            currentStep={stepIndex + 1} 
            totalSteps={stepOrder.length} 
            stepOrder={stepOrder} 
            formContext={formContext} // Pass formContext to FormProgress</div>
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
                  selectedIndicios={selectedIndicios} // Pass shared state to Step3_Clothing
                  setSelectedIndicios={setSelectedIndicios} // Pass setter function
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
        </div>
        <div className="formInfo" style={{ 
          width: "20%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "stretch"
        }}>
          {
            <FormInfo 
              data={storedData} 
              keyTexts={{
                name: "Nombre reportante",
                location: "Ubicación reportante",
                relationship: "Relación con la persona desaparecida",
                age: "Edad de la persona desaparecida",
                last_seen: "Última vez visto",
                has_job_offer: "Relación a oferta de trabajo",
                job_offer_type: "Tipo de oferta de trabajo",
                contact_medium: "Medio de contacto",
                recognized_clothing: "Indicio reconocido",
                clothing_owner: "Dueño de la ropa",
                recognition_reason: "Razón de reconocimiento",
                contacted_authorities: "Autoridades contactadas",
                willing_to_share: "Dispuesto a compartir",
                contact_info: "Información de contacto",
                authority_details: "Detalles de la autoridad"
              }} 
              keysToShow={[
                "name", 
                "location", 
                "relationship", 
                "age", 
                "last_seen", 
                "has_job_offer", 
                "job_offer_type", 
                "contact_medium", 
                "recognized_clothing", 
                "clothing_owner", 
                "recognition_reason", 
                "contacted_authorities", 
                "willing_to_share", 
                "contact_info"
              ]}
              keysToShowBySection={{
                "Información básica": ["name", "location", "relationship", "age"],
                "Detalles de la desaparición": ["last_seen", "has_job_offer", "job_offer_type", "contact_medium"],
                "Identificación de Prendas": ["recognized_clothing", "clothing_owner", "recognition_reason"],
                "Contacto y consentimiento": ["contacted_authorities", "willing_to_share", "contact_info", "authority_details"],
              }}
              sectionIcons={{
                "Información básica": { path: "/images/icono-03.png", label: "Información básica" },
                "Detalles de la desaparición": { path: "/images/icono-02.png", label: "Detalles de la desaparición" },
                "Identificación de Prendas": { path: "/images/icono-01.png", label: "Identificación de Prendas" },
                "Contacto y consentimiento": { path: "/images/icono-04.png", label: "Contacto y consentimiento" },
              }}
            />
          }
        </div>
      </div>
    </>
  );
};

export default FormPage;

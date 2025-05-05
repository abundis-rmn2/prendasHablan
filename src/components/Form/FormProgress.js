import React from "react";

const FormProgress = ({ currentStep, totalSteps, stepOrder, formContext }) => {
  const defaultIcons = [
    { path: "/images/icono-01.png", label: "Identificación de Prendas" },
    { path: "/images/icono-02.png", label: "Detalles de la desaparición" },
    { path: "/images/icono-03.png", label: "Información básica" },
    { path: "/images/icono-04.png", label: "Contacto y consentimiento" },
  ];

  const customIcons = [
    { path: "/images/icono-03.png", label: "Información básica" },
    { path: "/images/icono-02.png", label: "Detalles de la desaparición" },
    { path: "/images/icono-01.png", label: "Identificación de Prendas" },
    { path: "/images/icono-04.png", label: "Contacto y consentimiento" },
  ];

  const icons = formContext !=="default" ? defaultIcons : customIcons;

  const getIconPath = (step) => icons[step - 1]?.path || "";
  const getIconLabel = (step) => icons[step - 1]?.label || "";

  const progressPercentages = [0, 33.4, 66.6, 100]; // Fixed percentages for 4 steps
  const progressPercentage = progressPercentages[currentStep - 1] || 0;

  console.log("Form context:", formContext); // Optional: Log formContext for debugging

  return (
    <div className="percentage-bar" style={{ position: "relative", width: "100%" }}>
      {/* Percentage Bar */}
      <div className="percentage-bar-inner"
        style={{
          position: "absolute",
          top: "calc(50% - 20px)",
          borderRadius: "64px",
          left: "0px",
          right: "0px",
          height: "64px",
          backgroundColor: "rgb(224, 224, 224)",
          zIndex: 1,
          transform: "translateY(-50%)",
          overflow: "hidden",
          borderRadius: "64px",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: `calc(${progressPercentage}% + 24px)`,
            height: "100%",
            backgroundColor: "rgb(81 142 155 / 63%)",
            transition: "width 0.6s",
            borderRadius: "64px",
          }}
        ></div>
      </div>

      {/* Icons */}
      <div className="percentage-bar-icons"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
          width: "100%",
        }}
      >
        {Array.from({ length: totalSteps }, (_, index) => {
          const step = index + 1;
          return (
            <div style={{ margin: 0, padding: 0, backgroundColor: "#fff", borderRadius: "50%", height: 64 }} key={step}>
              <img
                key={step}
                src={getIconPath(step)}
                alt={getIconLabel(step)}
                style={{
                  width: "64px",
                  height: "64px",
                  margin: "0 auto",
                  padding: "0",
                  opacity: step <= currentStep ? 1 : 0.5,
                  transition: "opacity 0.3s",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Step Text */}
      <p style={{ marginTop: "16px", textAlign: "center" }}>
        Paso {currentStep} de {totalSteps}
      </p>
    </div>
  );
};

export default FormProgress;

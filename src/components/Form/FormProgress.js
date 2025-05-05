import React from "react";

const FormProgress = ({ currentStep, totalSteps }) => {
  const getIconPath = (step) => `/images/icono-${String(step).padStart(2, "0")}.png`;

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Percentage Bar */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: "2px",
          backgroundColor: "#e0e0e0",
          zIndex: 1,
          transform: "translateY(-50%)",
        }}
      >
        <div
          style={{
            width: `${progressPercentage}%`,
            height: "100%",
            backgroundColor: "#4caf50",
            transition: "width 0.3s",
          }}
        ></div>
      </div>

      {/* Icons */}
      <div
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
            <img
              key={step}
              src={getIconPath(step)}
              alt={`Paso ${step}`}
              style={{
                width: "32px",
                opacity: step === currentStep ? 1 : 0.5,
                transition: "opacity 0.3s",
              }}
            />
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

import React from "react";

const FormProgress = ({ currentStep, totalSteps }) => {
  return (
    <div>
      <p>Paso {currentStep} de {totalSteps}</p>
      <progress value={currentStep} max={totalSteps}></progress>
    </div>
  );
};

export default FormProgress;

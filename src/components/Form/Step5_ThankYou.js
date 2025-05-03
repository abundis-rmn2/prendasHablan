import React from "react";

const Step5_ThankYou = ({ onStartNewForm }) => {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>¡Gracias por tu envío!</h1>
      <p>Tu información ha sido enviada exitosamente. Nos pondremos en contacto contigo si así lo indicaste.</p>
      <button
        onClick={onStartNewForm}
        style={{
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Iniciar un nuevo formulario
      </button>
    </div>
  );
};

export default Step5_ThankYou;

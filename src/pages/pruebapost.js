import React from "react";
import { postGoogleSheet } from "../utils/postGoogleSheet";

const PruebaPost = () => {
  const mockData = {
    name: "Juan Pérez",
    location: "Jalisco, México",
    relationship: "Familiar",
    other_relationship: "",
    age: "30",
    last_seen: "2023-01-01, Guadalajara, Jalisco",
    has_job_offer: "Sí",
    job_offer_type: "Construcción",
    contact_medium: "WhatsApp",
    recognized_clothing: "Camisa azul",
    clothing_owner: "Hermano",
    recognition_reason: "Es una prenda que él usaba frecuentemente.",
    contacted_authorities: "Sí",
    authority_details: "Fiscalía del estado, se presentó una denuncia.",
    willing_to_share: "Sí",
    contact_info: "juan.perez@example.com",
    search_file: "No se adjuntó archivo",
    consent: "Aceptado",
  };

  const handleTestPost = async () => {
    const result = await postGoogleSheet(mockData);
    if (result.success) {
      alert("Prueba exitosa: Información enviada correctamente.");
    } else {
      alert(`Prueba fallida: ${result.error}`);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Prueba de postGoogleSheet</h1>
      <p>Este es un ejemplo para probar la función de envío a Google Sheets con datos falsos.</p>
      <pre style={{ background: "#f4f4f4", padding: "1rem", borderRadius: "8px" }}>
        {JSON.stringify(mockData, null, 2)}
      </pre>
      <button
        onClick={handleTestPost}
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
        Enviar Datos de Prueba
      </button>
    </div>
  );
};

export default PruebaPost;

import React, { useState, useEffect } from "react";
import { postGoogleSheet } from "../utils/postGoogleSheet";

const PruebaPost = () => {
  const mockDataVersions = [
    {
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
    },
    {
      name: "Angel Ramirez",
      location: "Guadalajara, Jalisco",
      relationship: "Amigo",
      age: "25",
      last_seen: "2023-02-15, Guadalajara, Jalisco",
      has_job_offer: "No",
      contact_medium: "Correo Electrónico",
      recognized_clothing: "Playera roja",
      contacted_authorities: "No",
      willing_to_share: "No",
      contact_info: "angel.ramirez@example.com",
      consent: "Aceptado",
    },
    {
      name: "María López",
      location: "Zapopan, Jalisco",
      relationship: "Otra",
      other_relationship: "Vecina",
      age: "40",
      last_seen: "",
      has_job_offer: "",
      job_offer_type: "",
      contact_medium: "Llamada telefónica",
      recognized_clothing: "",
      clothing_owner: "",
      recognition_reason: "",
      contacted_authorities: "Sí",
      authority_details: "Se contactó a la policía local.",
      willing_to_share: "Sí",
      contact_info: "maria.lopez@example.com",
      search_file: "",
      consent: "Aceptado",
    },
    {
      name: "Carlos Hernández",
      location: "Tlaquepaque, Jalisco",
      relationship: "Familiar",
      age: "35",
      last_seen: "2023-03-10, Tlaquepaque, Jalisco",
      has_job_offer: "Sí",
      job_offer_type: "Construcción",
      contact_medium: "WhatsApp",
      recognized_clothing: "Sombrero negro",
      clothing_owner: "Hermano",
      recognition_reason: "Siempre lo usaba.",
      contacted_authorities: "",
      authority_details: "",
      willing_to_share: "No",
      contact_info: "",
      search_file: "",
      consent: "Aceptado",
    },
    {
      name: "Lucía Gómez",
      location: "Tlajomulco, Jalisco",
      relationship: "Amiga",
      age: "28",
      last_seen: "2023-04-01, Tlajomulco, Jalisco",
      has_job_offer: "No",
      contact_medium: "Mensaje de texto",
      recognized_clothing: "",
      contacted_authorities: "No",
      willing_to_share: "Sí",
      contact_info: "lucia.gomez@example.com",
      consent: "Aceptado",
    },
  ];

  const [selectedData, setSelectedData] = useState(null);

  // Load a random mock data version on component mount
  useEffect(() => {
    selectRandomData();
  }, []); // Empty dependency array ensures this runs only once on mount

  const selectRandomData = () => {
    const randomIndex = Math.floor(Math.random() * mockDataVersions.length);
    const mockData = mockDataVersions[randomIndex];
    setSelectedData(mockData); // Set the selected mock data for visualization
    console.log("New mock data selected:", mockData);
  };

  const handleTestPost = async () => {
    console.log("Selected mock data:", selectedData);

    try {
      const result = await postGoogleSheet(selectedData);
      if (result.success) {
        alert("Prueba exitosa: Información enviada correctamente.");
        selectRandomData(); // Select a new random case after successful submission
      } else {
        alert(`Prueba fallida: ${result.error}`);
      }
    } catch (error) {
      alert(`Error inesperado: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Prueba de postGoogleSheet</h1>
      <p>Este es un ejemplo para probar la función de envío a Google Sheets con datos aleatorios.</p>
      {selectedData && (
        <div style={{ marginBottom: "2rem", background: "#f4f4f4", padding: "1rem", borderRadius: "8px" }}>
          <h2>Datos Seleccionados:</h2>
          <pre>{JSON.stringify(selectedData, null, 2)}</pre>
        </div>
      )}
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

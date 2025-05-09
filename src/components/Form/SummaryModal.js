import React from "react";
import ReactDOM from "react-dom"; // Import ReactDOM for creating portals
import * as styles from "./FormStyles.module.css"; // Import shared styles
import { postGoogleSheet } from "../../utils/postGoogleSheet"; // Import the utility function
import isMobile from "../../utils/IsMobile"; // Import the isMobile utility function

const SummaryModal = ({ data, onConfirm, onCancel }) => {
  if (!data || Object.keys(data).length === 0) return null;

  const questions = {
    name: "Por favor indica tu nombre completo (opcional)",
    location: "¿Dónde resides actualmente? (estado y municipio)",
    relationship: "¿Qué relación tienes con esta persona?",
    other_relationship: "Si tu respuesta fue 'otra' relación, especifica:",
    age: "Al momento de su desaparición, ¿qué edad tenía la persona?",
    last_seen: "¿Cuándo y dónde se le vio por última vez? (Año, municipio, estado, lugar)",
    has_job_offer: "¿Su desaparición está relacionada con alguna oferta de trabajo?",
    job_offer_type: "¿De qué tipo fue la oferta de trabajo?",
    contact_medium: "¿Sabes por cuál medio recibió la oferta de trabajo?",
    recognized_clothing: "Del catálogo de prendas, ¿qué prendas o indicios lograste reconocer?",
    clothing_owner: "¿A quién pertenecen estas prendas u objetos?",
    recognition_reason: "¿Qué te hizo reconocer la prenda o el indicio?",
    contacted_authorities: "¿Tuviste acercamiento con alguna autoridad?",
    authority_details: "Si tu respuesta fue 'sí', ¿con qué autoridad y cómo fue el acercamiento?",
    willing_to_share: "¿Estarías dispuesta a compartir tu historia?",
    contact_info: "Si tu respuesta fue 'sí', facilítanos un medio de contacto (Teléfono o correo)",
    search_file: "Si deseas compartir la ficha de búsqueda, adjunta el archivo",
    consent: "CONSENTIMIENTO (La información será resguardada y no se compartirá con autoridades)"
  };

  const handleConfirm = async () => {
    const result = await postGoogleSheet(data);
    if (result.success) {
      alert("Información enviada correctamente.");
      onConfirm(); // Call the onConfirm callback to handle post-submission actions
    } else {
      alert(`Hubo un error al enviar la información: ${result.error}`);
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}
         style={{position: isMobile() ? "fixed" : "absolute",       
         }}>
      <div className={styles.modalContent}
         style={{height: isMobile() ? "90%" : "fit-content",       
         }}>
        <h3>Resumen de la Información</h3>
        <ul
          style={{height: isMobile() ? "80%" : "fit-content",
          overflowY: isMobile() ? "scroll" : "auto",       
          }}>
          {Object.entries(data)
            .filter(([key, value]) => key !== "step" && key !== "lastStep" && value) // Exclude step, lastStep, and empty values
            .map(([key, value]) => (
              <li key={key}>
                {questions[key] || key}: <strong>{value.toString()}</strong>
              </li>
            ))}
        </ul>
        <div className={styles.modalActions}>
          <button style={{ backgroundColor: "red" }} className={styles.modalButton} onClick={onCancel}>
            Cancelar
          </button>
          <button className={styles.modalButton} onClick={handleConfirm}>
            Confirmar y Enviar
          </button>
        </div>
      </div>
    </div>,
    document.body // Render the modal content directly under the <body> tag
  );
};

export default SummaryModal;

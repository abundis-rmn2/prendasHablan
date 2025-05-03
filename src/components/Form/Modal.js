import React from "react";
import * as styles from "./FormStyles.module.css"; // Import shared styles

const Modal = ({ show, onContinue, onStartNew, resetFormData, setShowModal }) => {
  if (!show) return null;

  console.log("Modal displayed");

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} style={{ maxWidth: "500px" }}>
        <h3>Formulario Guardado</h3>
        <p>Dejaste un formulario lleno. ¿Quieres continuar donde lo dejaste, iniciar uno nuevo o borrar los datos?</p>
        <div className={styles.modalActions}>
          <button
            className={styles.modalButton}
            onClick={() => {
              console.log("Continue button clicked");
              onContinue();
            }}
          >
            Continuar
          </button>
          <button
            className={styles.modalButton}
            onClick={() => {
              console.log("Start new button clicked");
              onStartNew();
              setShowModal(false); // Hide the modal
            }}
          >
            Iniciar de Nuevo
          </button>
          <button
            className={styles.modalButton}
            onClick={() => {
              console.log("Delete data button clicked");
              resetFormData(); // Properly clear localStorage
              setShowModal(false); // Hide the modal
            }}
          >
            Borrar Datos
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

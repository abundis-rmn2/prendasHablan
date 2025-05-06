import React from "react";
import styles from "./FormStyles.module.css"; // Import FormStyles.module.css

const IndicioForm = ({ context, preselectIndicio, csvData }) => {
  if (context !== "default" && preselectIndicio && csvData.length > 0) {
    const selectedIndicio = csvData[0]; // Assuming the first item in csvData is the selected indicio
    const imageUrl = `https://rancho-izaguirre.abundis.com.mx/indicios/${selectedIndicio.id}.jpg`;

    return (
      <div className="indicio-form-selected">
        <h3>Información del Indicio Seleccionado</h3>
        <p className={styles?.formGroup || ""}><b>Indicio:</b> {selectedIndicio.INDICIO}</p>
        <p className={styles?.formGroup || ""}><b>Tipo:</b> {selectedIndicio.TIPO_DE_INDICIO}</p>
        <p className={styles?.formGroup || ""}><b>Color:</b> {selectedIndicio.COLOR}</p>
        <p className={styles?.formGroup || ""}><b>Marca:</b> {selectedIndicio.MARCA}</p>
        <p className={styles?.formGroup || ""}><b>Talla:</b> {selectedIndicio.TALLA}</p>
        <p className={styles?.formGroup || ""}><b>Observaciones:</b> {selectedIndicio.OBSERVACIONES}</p>
        <img 
          src={imageUrl} 
          alt={selectedIndicio.INDICIO} 
          style={{ maxWidth: "100%", height: "auto", maxHeight: "15rem" }} 
        />
      </div>
    );
  }

  return <div>default</div>;
};

export default IndicioForm;

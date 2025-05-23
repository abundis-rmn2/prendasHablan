import React, { useState, useEffect } from "react";
import * as styles from "./FormStyles.module.css"; // Import shared styles
import isMobile from "../../utils/IsMobile"; // Import isMobile utility

const Step3_Clothing = ({ register, setValue, watch, errors, csvData = [], noIndicioSelected, selectedIndicios, setSelectedIndicios }) => {
  console.log("Step3_Clothing - csvData:", csvData); // Debugging csvData
  

  const contactedAuthorities = watch("contacted_authorities");

  useEffect(() => {
    if (!noIndicioSelected && csvData.length > 0) {
      // Preselect the indicios from the provided csvData
      setSelectedIndicios(csvData);
      if (setValue) {
        setValue("recognized_clothing", csvData.map((item) => item.INDICIO)); // Update form state
      }
    }
  }, [csvData, setValue, noIndicioSelected]);

  const handleSelectChange = (e) => {
    const options = Array.from(e.target.selectedOptions).map((option) => option.value);
    const selectedItems = csvData.filter((item) => options.includes(item.INDICIO));
    console.log("Selected items:", selectedItems);
    setSelectedIndicios(selectedItems); // Update shared state
    if (setValue) {
      setValue("recognized_clothing", options); // Update form state
    }

  };

  const handleDeselect = (id) => {
    const updatedIndicios = selectedIndicios.filter((item) => item.id !== id);
    setSelectedIndicios(updatedIndicios); // Update shared state
    if (setValue) {
      setValue("recognized_clothing", updatedIndicios.map((item) => item.INDICIO)); // Update form state
    }
  };

  return (
    <div>
      <h3>Identificación de Prendas</h3>

      <div className={styles.formGroup}>
        <label>
          Del catálogo de prendas, ¿qué prendas o indicios lograste reconocer? *
          <select
            className={styles.fullWidthInput}
            {...register("recognized_clothing", { required: true })}
            value={selectedIndicios.map((item) => item.INDICIO)} // Use value to control the selected options
            onChange={handleSelectChange}
          >
            {csvData.length > 0 ? (
              csvData.map((item) => (
                <option key={item.id} value={item.INDICIO}>
                  {item.INDICIO}
                </option>
              ))
            ) : (
              <option disabled>No hay datos disponibles</option>
            )}
          </select>
          {errors.recognized_clothing && <span className={styles.errorText}>Campo obligatorio</span>}
        </label>
        {/* Display selected items */}
        {isMobile() && ( selectedIndicios.length > 0 && (
          <div className={styles.selectedItems}>
            <h4>Indicio Ideentificado:</h4>
            <ul>
              {selectedIndicios.map((selectedIndicio) => (
                <li key={selectedIndicio.id} className={styles.selectedItem}>
                  <div className="indicio-form-selected">
                    <p className="image-container-indicio">
                      <img 
                        src={`https://rancho-izaguirre.abundis.com.mx/indicios/${selectedIndicio.id}.jpg`} 
                        alt={selectedIndicio.INDICIO} 
                        style={{ maxWidth: "100%", height: "auto", maxHeight: "20rem", borderBottom: "4px solid #a8c6cd", marginBottom: "1rem" }} 
                      />
                    </p>
                    <p><b>Identificador Único de Indicio:</b> {selectedIndicio.INDICIO}</p>
                    <p><b>Tipo:</b> {selectedIndicio.TIPO_DE_INDICIO}</p>
                    <p><b>Color:</b> {selectedIndicio.COLOR}</p>
                    <p><b>Marca:</b> {selectedIndicio.MARCA}</p>
                    <p><b>Talla:</b> {selectedIndicio.TALLA}</p>
                    <p><b>Observaciones:</b> {selectedIndicio.OBSERVACIONES}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.formGroup}>
        <label>
          ¿A quién pertenecen estas prendas u objetos? *
          <input
            className={styles.fullWidthInput}
            {...register("clothing_owner", { required: true })}
          />
          {errors.clothing_owner && <span className={styles.errorText}>Campo obligatorio</span>}
        </label>
      </div>

      <div className={styles.formGroup}>
        <label>
          ¿Qué te hizo reconocer la prenda o el indicio? *
          <textarea
            className={styles.fullWidthInput}
            {...register("recognition_reason", { required: true })}
          ></textarea>
          {errors.recognition_reason && <span className={styles.errorText}>Campo obligatorio</span>}
        </label>
      </div>

      <div className={styles.formGroup}>
        <label>
        Tras la identificación de esta prenda, ¿tuviste acercamiento con alguna autoridad? *
          <select
            className={styles.fullWidthInput}
            {...register("contacted_authorities", { required: true })}
          >
            <option value="">Selecciona...</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
          {errors.contacted_authorities && <span className={styles.errorText}>Campo obligatorio</span>}
        </label>
      </div>

      {contactedAuthorities === "Sí" && (
        <div className={styles.formGroup}>
          <label>
            Si tu respuesta fue "sí", ¿con qué autoridad y cómo fue el acercamiento? *
            <textarea
              className={styles.fullWidthInput}
              {...register("authority_details", { required: true })}
            ></textarea>
            {errors.authority_details && <span className={styles.errorText}>Campo obligatorio</span>}
          </label>
        </div>
      )}
    </div>
  );
};

export default Step3_Clothing;

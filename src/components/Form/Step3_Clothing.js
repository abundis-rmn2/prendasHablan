import React, { useState, useEffect } from "react";
import * as styles from "./FormStyles.module.css"; // Import shared styles

const Step3_Clothing = ({ register, watch, errors, csvData = [] }) => {
  const [selectedIndicios, setSelectedIndicios] = useState([]);
  const contactedAuthorities = watch("contacted_authorities");

  useEffect(() => {
    if (csvData.length > 0) {
      // Preselect the indicios from the provided csvData
      setSelectedIndicios(csvData);
    }
  }, [csvData]);

  const handleSelectChange = (e) => {
    const options = Array.from(e.target.selectedOptions).map((option) => option.value);
    const selectedItems = csvData.filter((item) => options.includes(item.INDICIO));
    console.log("Selected items:", selectedItems);
    setSelectedIndicios(selectedItems);
  };

  const handleDeselect = (id) => {
    setSelectedIndicios((prev) => prev.filter((item) => item.id !== id));
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
            multiple
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
      </div>

      <div className={styles.gallery}>
        {selectedIndicios.map((item) => (
          <div key={item.id} className={styles.thumbnail}>
            <img
              src={`https://rancho-izaguirre.abundis.com.mx/indicios/${item.id}.jpg`}
              alt={item.INDICIO}
              className={styles.thumbnailImage}
            />
            <button
              type="button"
              className={styles.deselectButton}
              onClick={() => handleDeselect(item.id)}
            >
              ×
            </button>
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
          ¿Tuviste acercamiento con alguna autoridad? *
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

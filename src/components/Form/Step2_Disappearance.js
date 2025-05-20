import React from "react";
import * as styles from "./FormStyles.module.css"; // Import shared styles

const Step2_Disappearance = ({ register, watch, errors }) => {
  const hasJobOffer = watch("has_job_offer");

  return (
    <div>
      <h3>Detalles de la Desaparición</h3>

      <div className={styles.formGroup}>
        <label>
          ¿Cuándo y dónde se le vio por última vez? (Año, municipio, estado, lugar) *
          <textarea
            className={styles.fullWidthInput}
            placeholder="Ejemplo: Central Camionera, Tlaquepaque, Jalisco, 2023."
            {...register("last_seen", { required: true })}
          ></textarea>
          {errors.last_seen && <span className={styles.errorText}>Campo obligatorio</span>}
        </label>
      </div>

      <div className={styles.formGroup}>
        <label>
          ¿Su desaparición está relacionada con alguna oferta de trabajo? *
          <select className={styles.fullWidthInput} {...register("has_job_offer", { required: true })}>
            <option value="">Selecciona...</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
            <option value="No sé">No sé</option>
          </select>
          {errors.has_job_offer && <span className={styles.errorText}>Campo obligatorio</span>}
        </label>
      </div>

      {hasJobOffer === "Sí" && (
        <>
          <div className={styles.formGroup}>
            <label>
              ¿De qué tipo fue la oferta de trabajo? *
              <input
                className={styles.fullWidthInput}
                {...register("job_offer_type", { required: true })}
              />
              {errors.job_offer_type && <span className={styles.errorText}>Campo obligatorio</span>}
            </label>
          </div>

          <div className={styles.formGroup}>
            <label>
              ¿Sabes por cuál medio recibió la oferta de trabajo? *
              <select
                className={styles.fullWidthInput}
                {...register("contact_medium", { required: true })}
              >
                <option value="">Selecciona...</option>
                <option value="Facebook">Facebook</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Correo Electrónico">Correo Electrónico</option>
                <option value="Otro">Otro</option>
              </select>
              {errors.contact_medium && (
                <span className={styles.errorText}>Campo obligatorio</span>
              )}
            </label>
          </div>
        </>
      )}
    </div>
  );
};

export default Step2_Disappearance;

import React from "react";
import * as styles from "./FormStyles.module.css"; // Import shared styles

const Step4_Consent = ({ register, watch, errors }) => {
  const willingToShare = watch("willing_to_share");

  return (
    <div>
      <h3>Consentimiento y Contacto</h3>

      <div className={styles.formGroup}>
        <label>
          ¿Estarías dispuesta a compartir tu historia? *
          <select className={styles.fullWidthInput} {...register("willing_to_share", { required: true })}>
            <option value="">Selecciona...</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
            <option value="Tal vez">Tal vez</option>
          </select>
          {errors.willing_to_share && <span className={styles.errorText}>Campo obligatorio</span>}
        </label>
      </div>

      {willingToShare === "Sí" && (
        <div className={styles.formGroup}>
          <label>
            Si tu respuesta fue "sí", facilítanos un medio de contacto (Teléfono o correo) *
            <input
              className={styles.fullWidthInput}
              {...register("contact_info", { required: true })}
            />
            {errors.contact_info && <span className={styles.errorText}>Campo obligatorio</span>}
          </label>
        </div>
      )}

      <div className={styles.formGroup}>
        <label>
          Si deseas compartir la ficha de búsqueda, adjunta el archivo.
          <input type="file" className={styles.fullWidthInput} {...register("search_file")} />
        </label>
      </div>

      <div className={styles.formGroup}>
        <label>
          CONSENTIMIENTO (La información será resguardada y no se compartirá con autoridades) *
          <input
            type="checkbox"
            className={styles.fullWidthInput}
            {...register("consent", { required: true })}
          />
          {errors.consent && <span className={styles.errorText}>Debes aceptar el consentimiento</span>}
        </label>
      </div>
    </div>
  );
};

export default Step4_Consent;

import React from "react";
import * as styles from "./FormStyles.module.css"; // Import shared styles

const Step1_BasicInfo = ({ register, control, errors }) => {
  return (
    <div>
      <h3>Información Básica</h3>

      <div className={styles.formGroup}>
        <label>
          Por favor indica tu nombre completo (opcional)
          <input className={styles.fullWidthInput} {...register("name")} />
        </label>
      </div>

      <div className={styles.formGroup}>
        <label>
          ¿Dónde resides actualmente? (estado y municipio) *
          <input className={styles.fullWidthInput} {...register("location", { required: true })} />
          {errors.location && <span className={styles.errorText}>Campo obligatorio</span>}
        </label>
      </div>

      <div className={styles.formGroup}>
        <label>
          ¿Qué relación tienes con esta persona? *
          <select className={styles.fullWidthInput} {...register("relationship", { required: true })}>
            <option value="">Selecciona...</option>
            <option value="Familiar">Familiar</option>
            <option value="Amigo">Amigo</option>
            <option value="Otra">Otra</option>
          </select>
          {errors.relationship && <span className={styles.errorText}>Campo obligatorio</span>}
        </label>
      </div>

      <div className={styles.formGroup}>
        <label>
          Si tu respuesta fue "otra" relación, especifica:
          <input className={styles.fullWidthInput} {...register("other_relationship")} />
        </label>
      </div>

      <div className={styles.formGroup}>
        <label>
          Al momento de su desaparición, ¿qué edad tenía la persona? *
          <input
            type="number"
            className={styles.fullWidthInput}
            {...register("age", { required: true })}
          />
          {errors.age && <span className={styles.errorText}>Campo obligatorio</span>}
        </label>
      </div>
    </div>
  );
};

export default Step1_BasicInfo;

import * as React from "react";
import { useState } from "react";
import * as styles from "./index.module.css";

const FormComponent = ({ csvData, selectedIndicio }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    prendaIndicio: selectedIndicio || "", // Set default value from selectedIndicio
    razon: "",
    ultimaVez: "",
    lugarUltimaVez: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/update-csv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Información enviada correctamente.");
        setFormData({ nombre: "", prendaIndicio: "", razon: "", ultimaVez: "", lugarUltimaVez: "" });
      } else {
        alert("Hubo un error al enviar la información.");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Hubo un error al enviar la información.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.formTitle}>Compártenos tu historia</h2>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={styles.formInput}
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Prenda/Indicio:
          <select
            name="prendaIndicio"
            value={formData.prendaIndicio}
            onChange={handleChange}
            className={styles.formSelect}
          >
            <option value="" disabled>Selecciona un indicio</option>
            {csvData.map((item) => (
              <option key={item.id} value={item.INDICIO}>
                {item.INDICIO}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Última vez que lo viste:
          <input
            type="date"
            name="ultimaVez"
            value={formData.ultimaVez}
            onChange={handleChange}
            className={styles.formInput}
          />
        </label>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Razón (por qué crees que es de un desaparecido cercano):
          <textarea
            name="razon"
            value={formData.razon}
            onChange={handleChange}
            className={styles.formTextarea}
          />
        </label>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Dónde fue la última vez que viste a esta persona:
          <input
            type="text"
            name="lugarUltimaVez"
            value={formData.lugarUltimaVez}
            onChange={handleChange}
            className={styles.formTextarea}
          />
        </label>
      </div>
      <button type="submit" className={styles.formButton}>Enviar</button>
    </form>
  );
};

export default FormComponent;

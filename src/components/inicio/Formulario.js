import React from "react";
import FormPage from "../../components/FormPage";

const Formulario = ({ csvData, preselectIndicio }) => (
  <section id="formulario" className="full-page-section" style={{ position: "relative" }}>
    <FormPage
      csvData={csvData}
      preselectIndicio={preselectIndicio}
      formContext="default"
      stepOrder={[3, 2, 1, 4]}
    />
  </section>
);

export default Formulario;

import React from "react";
import FormPage from "../../components/FormPage";

const Formulario = ({ csvData, preselectIndicio }) => (
  <section id="formulario" className="full-page-section">
    <FormPage
      csvData={csvData}
      preselectIndicio={preselectIndicio}
      formContext="default"
      stepOrder={[1, 2, 3, 4]}
    />
  </section>
);

export default Formulario;

import React from "react";

const Catalogo = () => (
  <section
    id="catalogo"
    className="full-page-section"
    style={{ display: "flex", justifyContent: "center", margin: "4rem 0" }}
  >
    <iframe
      src="https://rancho-izaguirre.abundis.com.mx"
      style={{
        width: "50%",
        height: "80vh",
        border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "auto",
      }}
      title="Rancho Izaguirre"
      loading="lazy"
    />
  </section>
);

export default Catalogo;

import React from "react";
import bgComp from "../../images/bg_comp.jpg";
import logotipo from "../../images/logotipo.png";

const Catalogo = () => (
  <section
    id="catalogo"
    className="full-page-section"
    style={{
      display: "flex",
      justifyContent: "center",
      margin: "4rem 0",
      backgroundImage: `url(${bgComp})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <iframe
      src="https://rancho-izaguirre.abundis.com.mx"
      style={{
        width: "50%",
        height: "75vh",
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

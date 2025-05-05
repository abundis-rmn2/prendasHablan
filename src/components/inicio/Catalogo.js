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
      backgroundImage: `url(${bgComp})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <iframe
      src="https://rancho-izaguirre.abundis.com.mx"
      style={{
        width: "100%",
        maxWidth: "1024px",
        height: "75vh",
        borderTop: "1rem solid #518e9b",
        borderBottom: "1rem solid #518e9b",
        overflow: "auto",
      }}
      title="Rancho Izaguirre"
      loading="lazy"
    />
  </section>
);

export default Catalogo;

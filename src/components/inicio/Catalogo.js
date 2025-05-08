import React from "react";
import bgComp from "../../images/bg_comp.jpg";
import logotipo from "../../images/logotipo.png";
import referenceImage from "../../images/recorte.gif";
import isMobile from "../../utils/IsMobile";

const Catalogo = () => (
  <section
    id="catalogo"
    className="full-page-section"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundImage: `url(${bgComp})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      flexDirection: "column",
      textAlign: "center",
      height: isMobile() ? "auto" : "100vh",
      padding: isMobile() ? "2rem 0" : "0",
    }}
  >
    {isMobile() ? (
      <div>
        <a
          href="https://rancho-izaguirre.abundis.com.mx"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "1rem 2rem",
            backgroundColor: "#518e9b",
            color: "#fff",
            fontSize: "1.2rem",
            fontWeight: "bold",
            textDecoration: "none",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
         Ir a Catálogo de Indicios
        </a>
        <p style={{ margin: "1rem", lineHeight: "2rem", fontSize: "1rem", color: "#000" }}>
          Ingresa al catálogo de indicios, reconoce la prenda y da click en el botón rosa como aparece en la imagen.
        </p>
        <img
          src={referenceImage}
          alt="Referencia"
          style={{
            width: "80%",
            maxWidth: "300px",
            marginBottom: "1rem",
          }}
        />
        <a
          href="https://rancho-izaguirre.abundis.com.mx"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "1rem 2rem",
            backgroundColor: "#518e9b",
            color: "#fff",
            fontSize: "1.2rem",
            fontWeight: "bold",
            textDecoration: "none",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
         Ir a Catálogo de Indicios
        </a>
      </div>
    ) : (
      <iframe
        src="https://rancho-izaguirre.abundis.com.mx"
        style={{
          width: "100%",
          maxWidth: "1280px",
          height: "75vh",
          borderTop: "1rem solid #518e9b",
          borderBottom: "1rem solid #518e9b",
          overflow: "auto",
        }}
        title="Rancho Izaguirre"
        loading="lazy"
      />
    )}
  </section>
);

export default Catalogo;

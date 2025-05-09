import React from "react";
import "../../templates/indicio.css"; // Adjust the path as necessary

const IndicioForm = ({ context, preselectIndicio, csvData, selectedIndicios }) => {
  if (context !== "default" && preselectIndicio && csvData.length > 0) {
    const selectedIndicio = csvData[0];
    const imageUrl = `https://rancho-izaguirre.abundis.com.mx/indicios/${selectedIndicio.id}.jpg`;

    return (
      <div className="indicio-form-selected">
        <p className="image-container-indicio">
          <img 
            src={imageUrl} 
            alt={selectedIndicio.INDICIO} 
            style={{ maxWidth: "100%", height: "auto", maxHeight: "20rem", borderBottom: "4px solid #a8c6cd", marginBottom: "1rem" }} 
          />
        </p>
        <p><b>Identificador Único de Indicio:</b> {selectedIndicio.INDICIO}</p>
        <p><b>Tipo:</b> {selectedIndicio.TIPO_DE_INDICIO}</p>
        <p><b>Color:</b> {selectedIndicio.COLOR}</p>
        <p><b>Marca:</b> {selectedIndicio.MARCA}</p>
        <p><b>Talla:</b> {selectedIndicio.TALLA}</p>
        <p><b>Observaciones:</b> {selectedIndicio.OBSERVACIONES}</p>
      </div>
    );
  }

  if (context === "default" && selectedIndicios.length > 0) {
    return (
      <div className="indicio-form-selected">
        {selectedIndicios.map((item) => {
          const imageUrl = `https://rancho-izaguirre.abundis.com.mx/indicios/${item.id}.jpg`;
          return (
            <>
              <p className="image-container-indicio">
                <img 
                  src={imageUrl} 
                  alt={item.INDICIO} 
                  style={{ maxWidth: "100%", height: "auto", maxHeight: "20rem", borderBottom: "4px solid #a8c6cd", marginBottom: "1rem" }} 
                />
              </p>
              <p><b>Identificador Único de Indicio:</b> {item.INDICIO}</p>
              <p><b>Tipo:</b> {item.TIPO_DE_INDICIO}</p>
              <p><b>Color:</b> {item.COLOR}</p>
              <p><b>Marca:</b> {item.MARCA}</p>
              <p><b>Talla:</b> {item.TALLA}</p>
              <p><b>Observaciones:</b> {item.OBSERVACIONES}</p>
              </>
          );
        })}
      </div>
    );
  }

  return null;
};

export default IndicioForm;

import React from "react";

const FormInfo = ({ data }) => {
  if (!data || Object.keys(data).length === 0) return null;

  return (
    <div>
      <h3>Información Guardada</h3>
      <ul>
        {Object.entries(data).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value.toString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormInfo;

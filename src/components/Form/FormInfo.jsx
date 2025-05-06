import React from "react";

const FormInfo = ({ data, keyTexts = {}, keysToShow = [] }) => {
  if (!data || Object.keys(data).length === 0) return null;

  const filteredKeys = keysToShow.filter((key) => key in data);

  return (
    <div>
      <h3>Información Guardada</h3>
      <ul>
        {filteredKeys.map((key) => (
          <li key={key}>
            <strong>{keyTexts[key] || key}:</strong> {data[key]?.toString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormInfo;

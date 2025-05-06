import React from "react";

const FormInfo = ({ data, keyTexts = {}, keysToShowBySection = {}, sectionIcons = {} }) => {
  if (!data || Object.keys(data).length === 0) return null;

  return (
    <div>
      {Object.entries(keysToShowBySection).map(([section, keys]) => {
        const filteredKeys = keys.filter((key) => key in data);
        if (filteredKeys.length === 0) return null;

        return (
          <div key={section} style={{ 
            marginBottom: "0.5rem", 
            marginLeft: "2rem",
            border: "2px solid #86adb5",
            padding: "0.4rem",
            borderRadius: "0.4rem"
          }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
          src={sectionIcons[section]?.path || ""}
          alt={sectionIcons[section]?.label || ""}
          style={{
            width: "16px",
            height: "16px",
            margin: 0,
            marginBottom: 0,
            marginRight: "0.5rem",
          }}
              />
              <h4 style={{ fontSize: "0.8rem", fontWeight: 800, margin: 0 }}>
          {sectionIcons[section]?.label || section}
              </h4>
            </div>
            <ul>
              {filteredKeys.map(key => (
          <li
            style={{
              marginBottom: "0.2rem",
              fontSize: "0.8rem",
              fontWeight: 200,
            }}
            key={key}
          >
            <strong>{keyTexts[key] || key}:</strong>{" "}
            {data[key]?.toString()}
          </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  );
};

export default FormInfo;

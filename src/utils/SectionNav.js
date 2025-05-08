import React from "react";
import { Link } from "gatsby"; // Import Gatsby's Link component
import "../components/index.module.css"; // Ensure styles are imported

const SectionNav = ({ currentPage, sectionNames, onNavigate }) => {
  return (
    <div
      className="react-page-scroller-navigation"
      style={{
        position: "absolute",
        left: "0",
        top: "50%",
        width: "300px",
        height: "50%",
        zIndex: "99",
        transform: "translateY(-50%)",
      }}
    >
      {sectionNames.map((name, pageIndex) => (
        <Link
          key={pageIndex}
          to={`#${name.toLowerCase().replace(/\s+/g, "-")}`} // Generate hash links
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "8px",
            textDecoration: "none",
            transition: "background-color 0.3s ease, color 0.3s ease", // Smooth transition
          }}
          onClick={(e) => {
            e.preventDefault(); // Prevent default link behavior
            onNavigate(pageIndex); // Trigger navigation
          }}
        >
          <div
            className="dot"
            style={{
              width: "12px",
              height: "12px",
              marginRight: "8px",
              backgroundColor: currentPage === pageIndex ? "#000" : "#ccc",
              borderRadius: "50%",
              transition: "background-color 0.3s ease", // Smooth transition
            }}
          />
          <span
            style={{
              fontSize: "12px",
              color: currentPage === pageIndex ? "#000" : "#333",
              transition: "color 0.3s ease", // Smooth transition
            }}
          >
            {name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default SectionNav;

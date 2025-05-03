import React from "react";
import { Link } from "gatsby"; // Import Gatsby's Link component
import "../components/index.module.css"; // Ensure styles are imported

const SectionNavMenu = ({ currentPage, sectionNames = [], onNavigate }) => { // Default sectionNames to an empty array
  return (
    <nav
      style={{
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem 0",
        backgroundColor: "#f9f9f9",
        borderBottom: "1px solid #ccc",
      }}
    >
      {sectionNames.map((name, pageIndex) => (
        <Link
          key={pageIndex}
          to={`#${name.toLowerCase().replace(/\s+/g, "-")}`} // Generate hash links
          style={{
            textDecoration: "none",
            color: currentPage === pageIndex ? "#000" : "#555",
            fontWeight: currentPage === pageIndex ? "bold" : "normal",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            backgroundColor: currentPage === pageIndex ? "#e0e0e0" : "transparent",
          }}
          onClick={(e) => {
            e.preventDefault(); // Prevent default link behavior
            onNavigate(pageIndex); // Trigger navigation
          }}
        >
          {name}
        </Link>
      ))}
    </nav>
  );
};

export default SectionNavMenu;

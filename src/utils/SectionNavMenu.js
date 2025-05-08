import React, { useCallback } from "react";
import { Link } from "gatsby"; // Import Gatsby's Link component
import "../styles/header.css"; // Import styles

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const SectionNavMenu = ({ currentPage, sectionNames = [], onNavigate }) => { // Default sectionNames to an empty array
  const handleNavigate = useCallback(
    debounce((pageIndex) => {
      onNavigate(pageIndex); // Trigger navigation
    }, 300), // 300ms debounce delay
    [onNavigate]
  );

  return (
    <nav className="section-nav-menu">
      {sectionNames.map((name, pageIndex) => (
        <Link
          key={pageIndex}
          to={`#${name.toLowerCase().replace(/\s+/g, "-")}`} // Generate hash links
          className={`section-nav-link ${
            currentPage === pageIndex ? "active" : ""
          }`}
          onClick={(e) => {
            e.preventDefault(); // Prevent default link behavior
            handleNavigate(pageIndex); // Use debounced navigation
          }}
        >
          {name}
        </Link>
      ))}
    </nav>
  );
};

export default SectionNavMenu;

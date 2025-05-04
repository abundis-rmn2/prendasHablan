import * as React from "react";
import { Link } from "gatsby";
import SectionNavMenu from "../utils/SectionNavMenu"; // Import the new SectionNavMenu component
import "../styles/header.css";

const Header = ({ siteTitle, currentPage, setCurrentPage, sectionNames }) => { // Accept props
  return (
    <header className="header-container"> {/* Updated class name */}
      <div className="header-top-container"> {/* Updated class name */}
        <Link to="/" className="header-title">
          Las Prendas Hablan
        </Link>
        <SectionNavMenu
          currentPage={currentPage} // Pass currentPage
          sectionNames={sectionNames} // Pass sectionNames
          onNavigate={setCurrentPage} // Pass setCurrentPage as onNavigate
        />
      </div>
    </header>
  );
};

export default Header;

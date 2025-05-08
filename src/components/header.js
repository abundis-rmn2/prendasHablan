import * as React from "react";
import { Link } from "gatsby";
import SectionNavMenu from "../utils/SectionNavMenu"; // Import the new SectionNavMenu component
import "../styles/header.css";
const isBrowser = typeof window !== "undefined"; // Check for browser environment

const Header = ({ siteTitle, currentPage, setCurrentPage, sectionNames }) => { // Accept props
  return (
    <header className="header-container"> {/* Updated class name */}
      <div className="header-top-container"> {/* Updated class name */}
        <Link to="/" className="header-title">
          Las Prendas Hablan
        </Link>
        <div className="static-content" style={{ display: isBrowser ? 'none' : 'block',}}>
          <p style={{margin:0, color:"white"}}>Esta es una versión limitada, actualice su navegador para ver el sitio completo.</p>
        </div>
        {isBrowser && (
          <SectionNavMenu
          currentPage={currentPage} // Pass currentPage
          sectionNames={sectionNames} // Pass sectionNames
          onNavigate={setCurrentPage} // Pass setCurrentPage as onNavigate
          />
        )}

      </div>
    </header>
  );
};

export default Header;

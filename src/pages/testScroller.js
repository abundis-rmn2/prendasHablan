import React, { useState } from "react";
import ReactPageScroller from "react-page-scroller";
import "../components/index.module.css"; // Asegúrate de importar los estilos
import SectionNav from "../utils/SectionNav"; // Import the reusable component

const TestScroller = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const sectionNames = ["Page 1", "Page 2", "Page 3"]; // Section names

  return (
    <div style={{ position: "relative" }}>
      <ReactPageScroller
        pageOnChange={handlePageChange}
        customPageNumber={currentPage}
      >
        <section style={{ height: "100vh", backgroundColor: "lightblue" }}>
          <h1>Page 1</h1>
        </section>
        <section style={{ height: "100vh", backgroundColor: "lightgreen" }}>
          <h1>Page 2</h1>
        </section>
        <section style={{ height: "100vh", backgroundColor: "lightcoral" }}>
          <h1>Page 3</h1>
        </section>
      </ReactPageScroller>

      {/* Use SectionNav */}
      <SectionNav
        currentPage={currentPage}
        sectionNames={sectionNames}
        onNavigate={setCurrentPage}
      />
    </div>
  );
};

export default TestScroller;

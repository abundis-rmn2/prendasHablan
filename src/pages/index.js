import * as React from "react";
import Layout from "../components/layout";
import useLoadCsvData from "../utils/useLoadCsvData";
import { initGTM, trackEvent } from "../utils/analytics";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";
import useFormStorage from "../hooks/useFormStorage";
import ReactPageScroller from "react-page-scroller";
import "../components/index.module.css";
import SectionNav from "../utils/SectionNav";
import Introduccion from "../components/inicio/Introduccion";
import Catalogo from "../components/inicio/Catalogo";
import Formulario from "../components/inicio/Formulario";
import IntroduccionSimple from "../components/inicio/IntroduccionSimple";
import isMobile from "../utils/IsMobile"; // Import isMobile utility

const sections = [
  { name: "Introducción", hash: "introduccion", component: Introduccion },
  { name: "Catálogo", hash: "catalogo", component: Catalogo },
  { name: "Formulario", hash: "formulario", component: Formulario },
];

const IndexPage = () => {
  const isBrowser = typeof window !== "undefined"; // Check for browser environment
  const location = useLocation(); // Call useLocation unconditionally
  const csvData = useLoadCsvData();
  const preselectIndicio = isBrowser && location.pathname.startsWith("/indicio/");
  const { logAllForms } = useFormStorage();
  const [currentPage, setCurrentPage] = React.useState(0); // Default to the first page

  React.useEffect(() => {
    if (!isBrowser) return; // Ensure this runs only in the browser
    initGTM();
    trackEvent("page_view", "Index", "Index Page Loaded", 1);
    logAllForms();

    const initialHash = window.location.hash.replace("#", "");
    const initialPageIndex = sections.findIndex(
      (section) => section.hash === initialHash
    );
    setCurrentPage(initialPageIndex !== -1 ? initialPageIndex : 0);

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      const pageIndex = sections.findIndex((section) => section.hash === hash);
      if (pageIndex !== -1) {
        setCurrentPage(pageIndex);
      }
    };
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [logAllForms]);

  React.useEffect(() => {
    if (isMobile()) {
      alert("You are using a mobile device.");
    } else {
      alert("You are not using a mobile device.");
    }
  }, []);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
    if (isBrowser) {
      const hash = sections[pageIndex]?.hash;
      if (hash) {
        window.history.replaceState(null, "", `#${hash}`);
      }
    }
  };

  return (
    <Layout
      pageType="index"
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      sectionNames={sections.map((section) => section.name)}
    >
      <Helmet>
        <title>Las Prendas Hablan - Tejer.RED | Inicio</title>
        <meta
          name="description"
          content="Bienvenido a Las Prendas Hablan - Tejer.RED, una plataforma para explorar indicios y más."
        />
      </Helmet>

      <style>{`
        ${!isBrowser ? 'html { overflow: scroll !important; }' : ''}
        ${isMobile() ? 'html { overflow: scroll !important; }' : ''}
      `}</style>

      {isMobile() ? (
        <div className="mobile-content static-content">
          <IntroduccionSimple />
          <Catalogo />
          <Formulario />
        </div>
      ) : (
        <ReactPageScroller
          pageOnChange={handlePageChange}
          customPageNumber={currentPage}
          containerHeight={window.innerHeight}
          containerWidth={window.innerWidth}
          renderAllPagesOnFirstRender={true}
        >
          {sections.map((section, index) => {
            const SectionComponent = section.component;
            return (
              <SectionComponent
                key={index}
                {...(section.hash === "formulario" && {
                  csvData,
                  preselectIndicio,
                })}
              />
            );
          })}
        </ReactPageScroller>
      )}
    </Layout>
  );
};

export default IndexPage;

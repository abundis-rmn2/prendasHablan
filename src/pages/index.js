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

const sections = [
  { name: "Introducción", hash: "introduccion", component: Introduccion },
  { name: "Catálogo", hash: "catalogo", component: Catalogo },
  { name: "Formulario", hash: "formulario", component: Formulario },
];

const IndexPage = () => {
  const csvData = useLoadCsvData();
  const location = useLocation();
  const preselectIndicio = location.pathname.startsWith("/indicio/");
  const { logAllForms } = useFormStorage();
  const [currentPage, setCurrentPage] = React.useState(null);

  React.useEffect(() => {
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

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
    const hash = sections[pageIndex]?.hash;
    if (hash) {
      window.history.replaceState(null, "", `#${hash}`);
    }
  };

  if (currentPage === null) {
    return null;
  }

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

      <ReactPageScroller
        pageOnChange={handlePageChange}
        customPageNumber={currentPage}
        navigation
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

      <SectionNav
        currentPage={currentPage}
        sectionNames={sections.map((section) => section.name)}
        onNavigate={setCurrentPage}
      />
    </Layout>
  );
};

export default IndexPage;

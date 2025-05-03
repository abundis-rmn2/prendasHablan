import * as React from "react";
import Layout from "../components/layout";
import FormPage from "../components/FormPage";
import useLoadCsvData from "../utils/useLoadCsvData";
import * as styles from "../components/index.module.css";
import { initGTM, trackEvent } from "../utils/analytics";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";
import useFormStorage from "../hooks/useFormStorage";
import ReactPageScroller from "react-page-scroller";
import "../components/index.module.css"; // Asegúrate de que este archivo esté correctamente importado
import TestScroller from "./testScroller"; // Importa el componente de prueba
import SectionNav from "../utils/SectionNav"; // Import the reusable component
import Header from "../components/header"; // Ensure Header is imported

const hashToPageIndex = {
  introduccion: 0,
  catalogo: 1,
  formulario: 2,
};

const IndexPage = () => {
  const csvData = useLoadCsvData();
  const location = useLocation();
  const preselectIndicio = location.pathname.startsWith("/indicio/");
  const { logAllForms } = useFormStorage();
  const [currentPage, setCurrentPage] = React.useState(null); // Start with null to delay rendering
  const sectionNames = ["Introducción", "Catálogo", "Formulario"]; // Section names

  React.useEffect(() => {
    initGTM();
    trackEvent("page_view", "Index", "Index Page Loaded", 1);
    logAllForms();

    // Set initial page based on hash
    const initialHash = window.location.hash.replace("#", "");
    if (hashToPageIndex[initialHash] !== undefined) {
      setCurrentPage(hashToPageIndex[initialHash]);
    } else {
      setCurrentPage(0); // Default to the first section if no valid hash is present
    }

    // Listen for hash changes
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hashToPageIndex[hash] !== undefined) {
        setCurrentPage(hashToPageIndex[hash]);
      }
    };
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [logAllForms]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
    const hash = Object.keys(hashToPageIndex).find(
      (key) => hashToPageIndex[key] === pageIndex
    );
    if (hash) {
      window.history.replaceState(null, "", `#${hash}`);
    }
  };

  // Delay rendering ReactPageScroller until currentPage is set
  if (currentPage === null) {
    return null; // Render nothing until the initial page is determined
  }

  return (
    <Layout
      pageType="index"
      currentPage={currentPage} // Pass currentPage
      setCurrentPage={setCurrentPage} // Pass setCurrentPage
      sectionNames={sectionNames} // Pass sectionNames
    >
      <Helmet>
        <title>Las Prendas Hablan - Tejer.RED | Inicio</title>
        <meta name="description" content="Bienvenido a Las Prendas Hablan - Tejer.RED, una plataforma para explorar indicios y más." />
      </Helmet>

      <ReactPageScroller
        pageOnChange={handlePageChange}
        customPageNumber={currentPage}
        navigation // Enable navigation bullets
      >
        {/* 1. Presentación y descripción del proyecto */}
        <section id="introduccion" className="full-page-section">
          <h1>Las Prendas Hablan</h1>
          <div className={styles.textJustify}>
            <p>Desde "Las Prendas Hablan" damos un abrazo solidario a las familias y colectivos de búsqueda de personas desaparecidas de todo el país. Lo que buscamos con este proyecto impulsado por los equipos de <a href="https://animalpolitico.com">Animal Político</a>, <a href="https://adondevanlosdesaparecidos.org/">A dónde van los desaparecidos</a> y <a href="https://www.zonadocs.mx/">ZonaDocs</a>, con el apoyo de <a href="https://tejer.red">Tejer Red</a>, es contribuir a conocer la verdad sobre lo que ocurrió en el rancho Izaguirre en Teuchitlán, Jalisco, y abonar a la búsqueda de verdad.</p>

            <p>El proyecto "Las Prendas Hablan" es una iniciativa de <a href="https://animalpolitico.com">Animal Político</a>, <a href="https://adondevanlosdesaparecidos.org/">A dónde van los desaparecidos</a>, <a href="https://www.zonadocs.mx/">ZonaDocs</a> que busca identificar, junto a familias buscadoras, coincidencias entre las prendas de vestir e indicios localizados en el Rancho Izaguirre en Teuchitlán, Jalisco, y aquellas portadas por personas reportadas como desaparecidas. Esto para identificar cómo opera "el circuito de desaparición", mediante el cual las personas fueron víctimas de reclutamiento forzado.</p>

            <p>Les compartimos esta encuesta mediante la cual esperamos obtener información para realizar la investigación que posteriormente les enviaremos. El objetivo de este formulario es que nos puedan dar datos que ayuden a identificar este circuito y que sea una herramienta que ayude a que todas y todos regresen a casa.</p>

            <p>Cualquier duda por favor contáctenos; tengan certeza que sus datos personales serán cuidados y resguardados. Gracias de antemano.</p>
          </div>
        </section>

        {/* 2. Iframe embed */}
        <section id="catalogo" className="full-page-section" style={{ display: "flex", justifyContent: "center", margin: "4rem 0" }}>
          <iframe
            src="https://rancho-izaguirre.abundis.com.mx"
            style={{
              width: "50%",
              height: "80vh",
              border: "1px solid #ccc",
              borderRadius: "8px",
              overflow: "auto",
            }}
            title="Rancho Izaguirre"
            loading="lazy"
          />
        </section>

        {/* 3. Formulario de contacto */}
        <section id="formulario" className="full-page-section">
          <FormPage 
            csvData={csvData} 
            preselectIndicio={preselectIndicio} 
            formContext="default" 
            stepOrder={[1, 2, 3, 4]} 
          />
        </section>
      </ReactPageScroller>

      {/* Use SectionNav */}
      <SectionNav
        currentPage={currentPage}
        sectionNames={sectionNames}
        onNavigate={setCurrentPage}
      />

      {/* Agrega un enlace temporal para acceder a la página de prueba */}
      <section>
        <a href="/testScroller">Ir a TestScroller</a>
      </section>
    </Layout>
  );
};

export default IndexPage;

import * as React from "react";
import Layout from "../components/layout";
//import IndicioList from "../components/IndicioList";
import FormPage from "../components/FormPage"; // Updated import
import useLoadCsvData from "../utils/useLoadCsvData";
import * as styles from "../components/index.module.css";
import { initGTM, trackEvent } from "../utils/analytics";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router"; // Import useLocation

const IndexPage = () => {
  const csvData = useLoadCsvData();
  const location = useLocation(); // Get the current location
  const preselectIndicio = location.pathname.startsWith("/indicio/"); // Determine if an indicio should be preselected

  React.useEffect(() => {
    initGTM();
    trackEvent("page_view", "Index", "Index Page Loaded", 1);
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Las Prendas Hablan - Tejer.RED | Inicio</title>
        <meta name="description" content="Bienvenido a Las Prendas Hablan - Tejer.RED, una plataforma para explorar indicios y más." />
      </Helmet>
      <div className={styles.textCenter}>
        <h1>Las Prendas Hablan</h1>
      </div>
      {/* Descripción del proyecto */ }
      <div className={styles.textJustify}>
      <p>Desde "Las Prendas Hablan" damos un abrazo solidario a las familias y colectivos de búsqueda de personas desaparecidas de todo el país. Lo que buscamos con este proyecto impulsado por los equipos de <a href="https://animalpolitico.com">Animal Político</a>, <a href="https://adondevanlosdesaparecidos.org/">A dónde van los desaparecidos</a> y <a href="https://www.zonadocs.mx/">ZonaDocs</a>, con el apoyo de <a href="https://tejer.red">Tejer Red</a>, es contribuir a conocer la verdad sobre lo que ocurrió en el rancho Izaguirre en Teuchitlán, Jalisco, y abonar a la búsqueda de verdad.</p>

      <p>El proyecto "Las Prendas Hablan" es una iniciativa de <a href="https://animalpolitico.com">Animal Político</a>, <a href="https://adondevanlosdesaparecidos.org/">A dónde van los desaparecidos</a>, <a href="https://www.zonadocs.mx/">ZonaDocs</a> que busca identificar, junto a familias buscadoras, coincidencias entre las prendas de vestir e indicios localizados en el Rancho Izaguirre en Teuchitlán, Jalisco, y aquellas portadas por personas reportadas como desaparecidas. Esto para identificar cómo opera "el circuito de desaparición", mediante el cual las personas fueron víctimas de reclutamiento forzado.</p>

      <p>Les compartimos esta encuesta mediante la cual esperamos obtener información para realizar la investigación que posteriormente les enviaremos. El objetivo de este formulario es que nos puedan dar datos que ayuden a identificar este circuito y que sea una herramienta que ayude a que todas y todos regresen a casa.</p>

      <p>Cualquier duda por favor contáctenos; tengan certeza que sus datos personales serán cuidados y resguardados. Gracias de antemano.</p>
      </div>
      { /* <IndicioList csvData={csvData} /> */ }
      <FormPage csvData={csvData} preselectIndicio={preselectIndicio} />
    </Layout>
  );
};

export default IndexPage;

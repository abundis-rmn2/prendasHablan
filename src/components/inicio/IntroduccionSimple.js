import React from "react";
import * as styles from "../../components/index.module.css";
import "../../styles/introduccion.css"; // Import the new CSS file
import bgComp from "../../images/bg_comp.jpg";
import logotipo from "../../images/logotipo.png";
import artes01 from "../../images/artes-01.png"; // Import the decorative image
import isMobile from "../../utils/IsMobile"; // Import isMobile utility

const IntroduccionSimple = () => (
  <section id="introduccion" className="full-page-section introduccion-section">
    <div className="introduccion-container">
      {/* Left Div */}
      <div className="introduccion-simple" style={{ paddingTop: "50px", backgroundImage: `url(${bgComp})`, width: "100%", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <img src={logotipo} alt="Logotipo" style={{ width: "300px", height: "auto", margin: "0 auto"}} />
            </div>
            <div className="introduccion-text">
            <p>Desde las <b>"Las Prendas Hablan"</b> damos un abrazo solidario a las familias y colectivos de personas dadas por desaparecidas de todo el país
            </p>
                <p>
                Lo que buscamos con este proyecto impulsado por los equipos de <a href="https://animalpolitico.com">Animal Político</a>, <a href="https://adondevanlosdesaparecidos.org/">A dónde van los desaparecidos</a> y <a href="https://www.zonadocs.mx/">ZonaDocs</a>, con el apoyo de <a href="https://tejer.red">Tejer Red</a>, es contribuir a conocer la verdad sobre lo que ocurrió en el rancho Izaguirre en Teuchitlán, Jalisco, y abonar a la búsqueda de verdad.
                </p>
                <p>
                El proyecto "Las Prendas Hablan" es una iniciativa de <a href="https://animalpolitico.com">Animal Político</a>, <a href="https://adondevanlosdesaparecidos.org/">A dónde van los desaparecidos</a>, <a href="https://www.zonadocs.mx/">ZonaDocs</a> que busca identificar, junto a familias buscadoras, coincidencias entre las prendas de vestir e indicios localizados en el Rancho Izaguirre en Teuchitlán, Jalisco, y aquellas portadas por personas reportadas como desaparecidas. Esto para identificar cómo opera "el circuito de desaparición", mediante el cual las personas fueron víctimas de reclutamiento forzado.
                </p>
                <p>
                Les compartimos esta encuesta mediante la cual esperamos obtener información para realizar la investigación que posteriormente les enviaremos. El objetivo de este formulario es que nos puedan dar datos que ayuden a identificar este circuito y que sea una herramienta que ayude a que todas y todos regresen a casa.
                </p>
                <p><span className="imp">
                Cualquier duda por favor contáctenos; tengan certeza que sus datos personales serán cuidados y resguardados. Gracias de antemano.
                </span></p>
            </div>
        </div>
    </div>
    {/* Decorative Image */}
    <img src={artes01} alt="Decorative" className="introduccion-decorative" />
  </section>
);

export default IntroduccionSimple;

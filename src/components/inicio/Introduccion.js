import React from "react";
import * as styles from "../../components/index.module.css";

const Introduccion = () => (
  <section id="introduccion" className="full-page-section" style={{background: "#d6dfee"}}>
    <h1>Las Prendas Hablan</h1>
    <div className={styles.textJustify}>
      <p>
        Desde "Las Prendas Hablan" damos un abrazo solidario a las familias y colectivos de búsqueda de personas desaparecidas de todo el país. Lo que buscamos con este proyecto impulsado por los equipos de <a href="https://animalpolitico.com">Animal Político</a>, <a href="https://adondevanlosdesaparecidos.org/">A dónde van los desaparecidos</a> y <a href="https://www.zonadocs.mx/">ZonaDocs</a>, con el apoyo de <a href="https://tejer.red">Tejer Red</a>, es contribuir a conocer la verdad sobre lo que ocurrió en el rancho Izaguirre en Teuchitlán, Jalisco, y abonar a la búsqueda de verdad.
      </p>
      <p>
        El proyecto "Las Prendas Hablan" es una iniciativa de <a href="https://animalpolitico.com">Animal Político</a>, <a href="https://adondevanlosdesaparecidos.org/">A dónde van los desaparecidos</a>, <a href="https://www.zonadocs.mx/">ZonaDocs</a> que busca identificar, junto a familias buscadoras, coincidencias entre las prendas de vestir e indicios localizados en el Rancho Izaguirre en Teuchitlán, Jalisco, y aquellas portadas por personas reportadas como desaparecidas. Esto para identificar cómo opera "el circuito de desaparición", mediante el cual las personas fueron víctimas de reclutamiento forzado.
      </p>
      <p>
        Les compartimos esta encuesta mediante la cual esperamos obtener información para realizar la investigación que posteriormente les enviaremos. El objetivo de este formulario es que nos puedan dar datos que ayuden a identificar este circuito y que sea una herramienta que ayude a que todas y todos regresen a casa.
      </p>
      <p>
        Cualquier duda por favor contáctenos; tengan certeza que sus datos personales serán cuidados y resguardados. Gracias de antemano.
      </p>
    </div>
  </section>
);

export default Introduccion;

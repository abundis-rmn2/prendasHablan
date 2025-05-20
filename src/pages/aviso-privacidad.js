import React from "react";
import { Helmet } from "react-helmet"; // Import Helmet
import Layout from "../components/layout"; // Fixed the import to match the correct file

const AvisoPrivacidad = () => {
return (
    <Layout>
        <Helmet>
            <title>Aviso de Privacidad | Las Prendas Hablan</title>
            <meta name="description" content="Aviso de privacidad de Las Prendas Hablan, un proyecto colaborativo para la búsqueda de verdad y justicia." />
        </Helmet>
        <div style={{ 
            padding: "20px", 
            fontFamily: "Arial, sans-serif", 
            maxWidth: "680px",
            margin: "3rem auto",
            overflow: "overlay",
            height: "calc(100dvh - 6rem)"
        }}>
            <h1>Aviso de privacidad</h1>
            <p><strong>Fecha de actualización:</strong> 9 de mayo de 2025</p>
            <p>
                Las Prendas Hablan, proyecto colaborativo de Animal Político, A dónde van los desaparecidos y ZonaDocs, con el apoyo de Tejer en Red, es responsable del tratamiento de sus datos personales.
            </p>
            <h2>Datos personales que se recaban y su finalidad</h2>
            <p>
                <strong>Nombre, municipio y estado de residencia de quien contesta la encuesta</strong><br />
                <strong>Teléfono y correo electrónico de quien contesta la encuesta</strong><br />
                <strong>Datos de la persona desaparecida, relación de quien contesta la encuesta con la persona desaparecida y ficha de búsqueda de la persona desaparecida</strong>
            </p>
            <p>
                La finalidad de estos datos es contribuir al esclarecimiento de lo ocurrido en el rancho Izaguirre en Teuchitlán, Jalisco; identificar cómo opera el "circuito de la desaparición" mediante el cual las personas fueron víctimas de reclutamiento forzado; y abonar a la búsqueda de verdad y justicia para las víctimas y sus familias.
            </p>
            <p>
                En concreto, estos datos ayudarán a la identificación de coincidencias entre las prendas e indicios localizados en el rancho Izaguirre, con aquellas prendas portadas por personas reportadas como desaparecidas, así como acercarnos a personas que quieran compartirnos sus historias.
            </p>
            <p>Los datos anteriores también podrían utilizarse con fines estadísticos.</p>
            <h2>Medios o fuentes de obtención</h2>
            <p>Sus datos personales se obtendrán de los formularios alojados en nuestra página web.</p>
            <h2>Transferencias de datos personales</h2>
            <p>
                Las Prendas Hablan no transferirá los datos personales que recolecta a través de su página web con ninguna autoridad. Los mismos serán utilizados únicamente para las finalidades previamente descritas.
            </p>
            <h2>Derechos ARCO</h2>
            <p>
                Para ejercitar sus derechos ARCO, así como limitar el uso o divulgación de sus datos personales o revocar el consentimiento que nos haya otorgado, deberá enviar su solicitud al siguiente correo electrónico: <a href="mailto:lasprendashablan@gmail.com">lasprendashablan@gmail.com</a>
            </p>
            <h2>Otras consideraciones</h2>
            <p>
                El transcurso del tiempo, el cambio de legislaciones o las actualizaciones derivadas de la investigación Las Prendas Hablan pueden generar modificaciones al aviso de privacidad.
            </p>
            <p>
                Las Prendas Hablan se compromete a poner a su disposición el Aviso de Privacidad actualizado en el portal <a href="https://lasprendashablan.tejer.red" target="_blank" rel="noopener noreferrer">https://lasprendashablan.tejer.red</a>
            </p>
            <p>
                Al navegar en la página web e interactuar con el formulario incluido en ella, usted acepta el tratamiento de sus datos personales. Antes de finalizar dicho formulario, usted dio su consentimiento para que la información sea resguardada y no se comparta con autoridades.
            </p>
        </div>
    </Layout>
);
};

export default AvisoPrivacidad;

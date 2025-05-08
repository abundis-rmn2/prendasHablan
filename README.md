# 📚 Las Prendas Hablan
"Las Prendas Hablan" es un proyecto solidario que busca contribuir a la verdad y la justicia para las familias y colectivos de personas desaparecidas en México. Este esfuerzo es impulsado por los equipos de [Animal Político](https://animalpolitico.com), [A dónde van los desaparecidos](https://adondevanlosdesaparecidos.org/), y [ZonaDocs](https://www.zonadocs.mx/), con el acompañamiento técnico de [Tejer.Red](https://tejer.red).

El objetivo principal del proyecto es identificar coincidencias entre prendas de vestir e indicios localizados en el Rancho Izaguirre en Teuchitlán, Jalisco, y aquellas portadas por personas reportadas como desaparecidas. Esto permitirá entender cómo opera "el circuito de desaparición" y "reclutaamiento forzado" en México. 

## 🖼️ Galería del Proyecto

A continuación, se presentan algunas imágenes representativas del proyecto:

1. **Introducción**  
   ![Introducción](https://rancho-izaguirre.abundis.com.mx/prendas/1.png)

2. **Catálogo**  
   ![Catálogo](https://rancho-izaguirre.abundis.com.mx/prendas/2.png)

3. **Formulario**  
   ![Formulario](https://rancho-izaguirre.abundis.com.mx/prendas/3.png)

## 🚀 Objetivo técnico

El proyecto incluye una API que permite a los usuarios enviar información mediante un formulario. Los datos recopilados se almacenan en un archivo CSV para su análisis posterior. La API está diseñada para garantizar la seguridad y privacidad de los datos, sin exponer su ubicación exacta.

El sistema está alojado en el subdominio [https://lasprendashablan.tejer.red/](https://lasprendashablan.tejer.red/), y el backend incluye un componente en PHP para manejar las solicitudes y el almacenamiento de datos.

## 🛠️ Estructura técnica

A continuación, un vistazo a los principales componentes técnicos del proyecto:

    .
    ├── node_modules
    ├── src
    ├── api
    │   ├── form-handler.php
    │   └── data.csv
    ├── gatsby-config.js
    ├── package.json
    └── README.md

1. **`/src`**: Contiene el código fuente del frontend, desarrollado con React y Gatsby.
2. **`/api/guardar-data.php`**: Un script en PHP que procesa los datos enviados desde el formulario y los guarda en un archivo CSV.
3. **`/api/data.csv`**: Archivo donde se almacenan los datos recopilados de manera segura.
4. **`gatsby-config.js`**: Archivo de configuración principal para el sitio Gatsby.
5. **`package.json`**: Archivo de manifiesto para gestionar dependencias del proyecto.

## 🎓 Cómo ejecutar el proyecto

Si deseas ejecutar el proyecto, puedes clonar este repositorio y seguir los pasos para configurar el entorno de desarrollo:

1. Instala las dependencias del proyecto:
    ```shell
    npm install
    ```

2. Inicia el servidor de desarrollo:
    ```shell
    gatsby develop
    ```

3. Accede al sitio en `http://localhost:8000` y realiza tus cambios.

## 💫 Atribuciones

El apoyo técnico del proyecto fue desarrollado por Ángel Abundis de [Tejer.Red](https://tejer.red) para [Animal Político](https://animalpolitico.com), [A dónde van los desaparecidos](https://adondevanlosdesaparecidos.org/), y [ZonaDocs](https://www.zonadocs.mx/).
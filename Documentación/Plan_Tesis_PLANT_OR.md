UNIVERSIDAD NACIONAL DE LA AMAZONÍA PERUANA

FACULTAD DE INGENIERÍA DE SISTEMAS E INFORMÁTICA

Título

"PLATAFORMA DIGITAL PLANT-OR PARA EL REGISTRO COLABORATIVO, VALIDACIÓN CIENTÍFICA E IDENTIFICACIÓN MORFOLÓGICA DE FLORA ORNAMENTAL URBANA EN IQUITOS, 2026"

PLAN DE TESIS

PARA OBTENER EL TÍTULO DE INGENIERO DE SISTEMAS E INFORMÁTICA


AUTORES: ALVARADO SILVANO LEONARDO DANILO


IQUITOS – PERÚ
2026

ÍNDICE
PORTADA                                                                                          i
ÍNDICE                                                                                           ii
RESUMEN                                                                                          iii
DATOS GENERALES                                                                                  iv
CAPÍTULO I: PLANTEAMIENTO DEL PROBLEMA                                                           1
1.1. Descripción de la situación problemática                                                     1
1.2. Formulación del problema                                                                     3
1.3. Objetivos                                                                                    4
1.3.1. Objetivo general                                                                           4
1.3.2. Objetivos específicos                                                                      4
1.4. Justificación                                                                                5
1.4.1. Importancia                                                                                5
1.4.2. Viabilidad                                                                                 6
1.5. Limitaciones                                                                                 7
CAPÍTULO II: MARCO TEÓRICO                                                                        8
2.1. Antecedentes                                                                                 8
2.2. Bases teóricas                                                                               10
2.3. Definición de términos básicos                                                               12
CAPÍTULO III: HIPÓTESIS Y VARIABLES                                                               14
3.1. Formulación de la hipótesis                                                                  14
3.2. Variables y su operacionalización                                                            14
CAPÍTULO IV: METODOLOGÍA                                                                          17
4.1. Diseño metodológico                                                                          17
4.2. Diseño muestral                                                                              17
4.3. Técnicas e instrumentos de recolección de datos                                              18
4.4. Procesamiento y análisis de datos                                                            19
4.5. Aspectos éticos                                                                              20
PRESUPUESTO                                                                                       21
CRONOGRAMA                                                                                        22
REFERENCIAS BIBLIOGRÁFICAS                                                                        23
ANEXOS                                                                                            25
Anexo 1: Matriz de consistencia                                                                   25
Anexo 2: Ficha de observación estructurada                                                        26
Anexo 3: Ficha de evaluación de instrumento de medición                                           27
Anexo 4: Declaración Jurada de Autenticidad y de no Plagio                                        28
Anexo 5: Declaración Jurada del Asesor                                                            29


Plataforma digital PLANT-OR para el registro colaborativo, validación científica e identificación morfológica de flora ornamental urbana en Iquitos, 2026.
Autores:
ALVARADO SILVANO LEONARDO DANILO


# RESUMEN

La gestión de la información sobre la flora ornamental en la ciudad de Iquitos se realiza actualmente de manera dispersa, dependiendo de libros botánicos poco accesibles, conocimiento empírico no sistematizado y aplicaciones genéricas de identificación por imagen que carecen de precisión para especies amazónicas. Esta situación limita tanto el aprendizaje botánico de los estudiantes como la gestión informada del paisaje urbano por parte de municipalidades y ciudadanos. El presente estudio propone el desarrollo e implementación de PLANT-OR, un sistema multiplataforma compuesto por una aplicación móvil (Android/iOS), un panel administrativo web y un portal público de consulta, diseñado para el registro georreferenciado de plantas ornamentales, la validación científica por docentes especializados y la identificación morfológica asistida mediante filtros dinámicos basados en caracteres visibles. La investigación se centrará en evaluar la influencia del sistema sobre el acceso a la información botánica, la precisión en la identificación de especies, la satisfacción de los usuarios y la participación ciudadana. Se plantea una investigación de tipo aplicada con diseño pre-experimental y enfoque cuantitativo, empleando un muestreo no probabilístico por conveniencia que incluirá estudiantes de diversos cursos de la Facultad de Ciencias Forestales (como principales registradores de información) y ciudadanos interesados en la flora urbana, durante un periodo de prueba de 2 meses. La hipótesis de investigación señala que la implementación de PLANT-OR mejorará significativamente el acceso a la información botánica, la precisión en la identificación morfológica, la satisfacción del usuario y la participación ciudadana en comparación con los métodos tradicionales de consulta (búsqueda en libros botánicos, consultas empíricas, búsqueda en internet o apps genéricas).

Palabras clave:
Flora ornamental, identificación morfológica, ciencia ciudadana, sistema multiplataforma, georreferenciación botánica.


# DATOS GENERALES

- Título: Plataforma digital PLANT-OR para el registro colaborativo, validación científica e identificación morfológica de flora ornamental urbana en Iquitos, 2026.

- Área de Investigación: Ciencias de la Computación.

- Línea de Investigación: Ingeniería de Software.

- Autores: Danilo Leonardo Alvarado Silvano.

- Asesor: Ing. Rafael Vilca Barbarán, Mtro.

- Colaboradores: Facultad de Ciencias Forestales de la UNAP (Ing. Fredy F. Ramírez Arévalo, Dr. Richer Ríos, Ing. Arturo Macedo, Dr. Juan De la Cruz Bardález, Dr. Denilson Del Castillo).

- Duración estimada de ejecución: 4 meses (8 Sprints quincenales).

- Fuentes de financiamiento: Autofinanciado.

- Presupuesto estimado: S/ 2,080.00

- Naturaleza del proyecto: Académico, social y tecnológico (Responsabilidad Social Universitaria).


# CAPÍTULO I: PLANTEAMIENTO DEL PROBLEMA


## Descripción de la situación problemática

Iquitos, como principal ciudad de la Amazonía peruana, posee una alta diversidad de flora ornamental distribuida en sus espacios urbanos: parques, jardines, avenidas, plazas, calles y áreas institucionales. Estas especies cumplen funciones estéticas y ecológicas fundamentales, contribuyendo al paisaje urbano, la regulación ambiental, la mejora del microclima y el bienestar de la población. Sin embargo, a pesar de esta riqueza vegetal, existe una limitada disponibilidad de información sistematizada, accesible y confiable sobre las especies ornamentales presentes en la ciudad.

La identificación de plantas ornamentales en Iquitos depende predominantemente del conocimiento empírico transmitido de forma oral, lo que dificulta su correcta clasificación taxonómica, su uso adecuado en contextos urbanos y su conservación. No existe una base de datos estructurada de plantas ornamentales para la ciudad, no se conoce la ubicación georreferenciada de los individuos, la información botánica no es accesible al ciudadano y la gestión del arbolado urbano se realiza sin soporte técnico.

En el ámbito académico, los conocimientos botánicos teóricos que se imparten en la universidad requieren herramientas prácticas para su aplicación en campo. Los alumnos de diversos cursos de la Facultad de Ciencias Forestales de la UNAP poseen el conocimiento para realizar la caracterización morfológica de especies como parte de su formación, pero carecen de instrumentos digitales especializados que les permitan registrar esta información de manera estructurada y georreferenciada para construir una base de conocimiento compartida. Las herramientas de identificación existentes presentan las siguientes limitaciones:

<table>
  <tr>
    <th>SOLUCIÓN EXISTENTE</th>
    <th>CARACTERÍSTICAS</th>
    <th>LIMITACIONES</th>
    <th>BRECHA IDENTIFICADA</th>
  </tr>
  <tr>
    <td>Libros botánicos impresos</td>
    <td>Información taxonómica detallada</td>
    <td>Poco accesibles, no interactivos, costosos y sin actualización</td>
    <td>No son prácticos para uso en campo ni consulta cotidiana</td>
  </tr>
  <tr>
    <td>Páginas web generales</td>
    <td>Información variada y dispersa</td>
    <td>No adaptada al contexto amazónico, sin rigor científico local</td>
    <td>No permiten identificación estructurada ni aprendizaje morfológico</td>
  </tr>
  <tr>
    <td>Apps genéricas de identificación (PlantNet, PictureThis)</td>
    <td>Reconocimiento por imagen mediante IA</td>
    <td>Baja precisión en especies amazónicas locales, dependencia total de internet</td>
    <td>No fomentan el aprendizaje morfológico ni están adaptadas a Iquitos</td>
  </tr>
  <tr>
    <td>Bases de datos científicas (GBIF, Tropicos)</td>
    <td>Información confiable y verificada</td>
    <td>Lenguaje técnico complejo, interfaz no amigable</td>
    <td>Difícil acceso para estudiantes y ciudadanos comunes</td>
  </tr>
</table>

  Esta problemática se manifiesta en diversas situaciones concretas:

<table>
  <tr>
    <th>ASPECTO</th>
    <th>DESCRIPCIÓN DEL IMPACTO</th>
  </tr>
  <tr>
    <td>Dificultad en la identificación de especies</td>
    <td>Los usuarios no pueden reconocer plantas ornamentales sin conocimiento especializado ni herramientas de apoyo accesibles.</td>
  </tr>
  <tr>
    <td>Falta de información local accesible</td>
    <td>No existen plataformas digitales locales organizadas con fichas técnicas claras, visuales y adaptadas al contexto amazónico.</td>
  </tr>
  <tr>
    <td>Uso inadecuado de especies en el paisaje urbano</td>
    <td>Al carecer de información accesible, los ciudadanos y autoridades siembran plantas en las calles sin conocer sus características físicas, provocando problemas reales a futuro (ej. plantar árboles cuyas raíces terminan rompiendo el pavimento o cuyos frutos ensucian las veredas).</td>
  </tr>
  <tr>
    <td>Limitaciones en el registro de campo</td>
    <td>Los estudiantes de la Facultad de Ciencias Forestales carecen de herramientas digitales especializadas para registrar de forma estructurada y georreferenciada sus hallazgos botánicos en campo.</td>
  </tr>
  <tr>
    <td>Desaprovechamiento de la biodiversidad ornamental</td>
    <td>La flora ornamental local, incluyendo especies nativas amazónicas con alto valor estético, no es valorada ni difundida adecuadamente.</td>
  </tr>
  <tr>
    <td>Ausencia de datos georreferenciados</td>
    <td>No se conoce la distribución espacial de las especies en la ciudad, impidiendo la toma de decisiones informadas sobre arborización y paisajismo.</td>
  </tr>
</table>

La falta de herramientas digitales especializadas tiene un impacto significativo tanto en el ámbito educativo como en el social. Desde el punto de vista académico, limita el desarrollo de competencias prácticas en los estudiantes. Desde el punto de vista social, reduce la valoración y el conocimiento de la biodiversidad local. Desde el punto de vista de la gestión urbana, impide que las municipalidades y los ciudadanos tomen decisiones informadas sobre qué especies plantar, cuáles representan riesgos urbanos y dónde existen brechas de cobertura vegetal.

Por lo descrito, resulta necesario desarrollar una herramienta digital interactiva que permita registrar, validar, georreferenciar e identificar especies de flora ornamental de Iquitos mediante la observación de características morfológicas, facilitando el acceso al conocimiento botánico y su aplicación en contextos urbanos, educativos y de ciencia ciudadana.


## Formulación del problema

Problema General:
¿De qué manera la implementación de la plataforma digital PLANT-OR influye en el acceso a la información botánica, la precisión en la identificación morfológica, la satisfacción del usuario y la participación ciudadana respecto a la flora ornamental urbana en Iquitos, 2026?

Problemas Específicos:
PE1. ¿Cuál es el nivel de accesibilidad a la información botánica de especies ornamentales de Iquitos antes y después de la implementación de PLANT-OR?
PE2. ¿Cuál es el nivel de precisión en la identificación morfológica de especies ornamentales lograda mediante el sistema de filtros dinámicos de PLANT-OR, en comparación con los métodos tradicionales de consulta (libros, búsqueda en internet o apps genéricas)?
PE3. ¿Cuál es el nivel de satisfacción y usabilidad percibida por los usuarios (estudiantes y ciudadanos) respecto a las funcionalidades del sistema PLANT-OR?
PE4. ¿Cuál es el nivel de participación ciudadana y cobertura geográfica alcanzado mediante el módulo de registro colaborativo del sistema?


## Objetivos

### Objetivo general
Desarrollar e implementar la plataforma digital PLANT-OR para optimizar el acceso a la información botánica, la precisión en la identificación morfológica, la satisfacción del usuario y la participación ciudadana respecto a la flora ornamental urbana en Iquitos.

### Objetivos específicos
- OE1. Determinar el nivel de accesibilidad a la información botánica antes y después de la implementación del sistema, evaluando la disponibilidad, organización y facilidad de consulta de fichas técnicas de especies ornamentales.
- OE2. Evaluar la precisión en la identificación morfológica de especies ornamentales lograda mediante los filtros dinámicos del sistema, comparándola con métodos tradicionales de consulta (libros botánicos, conocimiento empírico, búsqueda web o apps genéricas).
- OE3. Medir el nivel de satisfacción y usabilidad percibida por los usuarios (estudiantes de la Facultad de Ciencias Forestales y ciudadanos) respecto a las funcionalidades del sistema.
- OE4. Cuantificar el nivel de participación y la cobertura geográfica de registros botánicos alcanzada mediante el módulo de registro colaborativo (estudiantes y ciudadanos).


## Justificación

### Importancia
La conservación y el aprovechamiento sostenible de la biodiversidad vegetal urbana constituyen una preocupación creciente en las ciudades amazónicas. Iquitos, ubicada en el corazón de la Amazonía peruana, alberga una gran cantidad de especies ornamentales en sus espacios públicos, pero carece de herramientas que permitan su identificación, documentación y valoración por parte de la comunidad.

Desde el punto de vista **académico**, el proyecto proporcionará a los estudiantes de diversos cursos de la Facultad de Ciencias Forestales una herramienta tecnológica que modernizará sus prácticas de campo, permitiéndoles registrar sistemáticamente los caracteres morfológicos de las plantas. Los formularios dinámicos del sistema serán diseñados con la guía de docentes especialistas de la Facultad de Ciencias Forestales, cubriendo de manera exhaustiva los caracteres morfológicos relevantes para cinco hábitos de crecimiento (Árbol, Palmera, Arbusto, Liana y Hierba), incluyendo datos dasométricos, caracteres de tronco/tallo, hojas, flores, frutos, semillas, estado fenológico, valor ornamental e impacto urbano. Cada formulario diferenciado contará con más de 40 campos estructurados según las mejores prácticas de la taxonomía botánica.

Desde el punto de vista **social**, PLANT-OR implementará un modelo de ciencia ciudadana donde estudiantes, docentes y ciudadanos contribuirán colaborativamente a la construcción de una base de datos botánica validada. El sistema diferenciará entre registros de estudiantes (completos, con más de 80 campos morfológicos) y registros de ciudadanos (simplificados, con datos básicos y fotografías), permitiendo que cualquier habitante de Iquitos participe en la documentación de la flora urbana. Este enfoque no solo democratizará el acceso al conocimiento botánico, sino que generará un sentido de pertenencia y corresponsabilidad ambiental.

Desde el punto de vista **tecnológico**, la investigación aportará una solución innovadora que integrará registro móvil con geolocalización, formularios dinámicos por hábito de crecimiento, validación científica por expertos, filtros de búsqueda basados en caracteres morfológicos visibles (diseñados por docentes para traducir lenguaje técnico a términos comprensibles), mapa interactivo con clustering, modo offline con sincronización diferida, y generación automática de certificados digitales de participación. La arquitectura serverless basada en Sanity.io como CMS headless y Clerk como servicio de autenticación permitirá un despliegue económico y escalable.

Desde el punto de vista de la **gestión urbana**, los datos generados por PLANT-OR permitirán conocer qué especies existen en la ciudad, distinguir especies nativas e introducidas, identificar zonas con baja ornamentación, detectar especies que generan daño urbano (raíces que rompen pavimento, frutos que obstruyen desagüe) y orientar decisiones de arborización y jardinería municipal.

Se espera que los resultados de esta investigación contribuyan a demostrar que la implementación de plataformas digitales con enfoque de ciencia ciudadana puede mejorar significativamente el acceso a la información botánica y la gestión del verde urbano en ciudades amazónicas, sirviendo como modelo replicable en otras ciudades de la región.

### Viabilidad
El proyecto es **técnicamente viable** gracias al uso de tecnologías modernas y accesibles:
- React Native con Expo SDK 54 para la aplicación móvil multiplataforma (Android e iOS desde un solo código base).
- React con Vite para el panel administrativo web y el portal público.
- Sanity.io como CMS headless y base de datos documental NoSQL (plan gratuito hasta 250K peticiones API/mes).
- Clerk como servicio de autenticación con gestión de roles (plan gratuito hasta 50K usuarios retenidos/mes).
- Google Maps API para la geolocalización y visualización cartográfica.
- Tamagui como sistema de diseño para garantizar consistencia visual.

Es **operativamente viable** debido a que el levantamiento de datos se realizará en la propia ciudad de Iquitos, los estudiantes de diversos cursos de la Facultad de Ciencias Forestales realizarán prácticas de campo y registro botánico como parte de su currícula, y se contará con el apoyo de docentes especializados de la Facultad de Ciencias Forestales (Ing. Fredy F. Ramírez Arévalo, Dr. Richer Ríos, Ing. Arturo Macedo, entre otros) para la validación taxonómica de los registros.

Es **económicamente viable** ya que se empleará software de código abierto y servicios con planes gratuitos adecuados al volumen académico del proyecto. El presupuesto estimado de S/ 2,500.00 cubrirá únicamente gastos operativos (impresiones, hosting, datos móviles para pruebas de campo).

El plazo establecido de cuatro meses (organizado en Sprints bajo metodología XP) será viable para desarrollar el sistema completo, realizar pruebas de campo con usuarios y evaluar los indicadores propuestos.


## Limitaciones

- La validación taxonómica de los registros botánicos depende de la disponibilidad de tiempo de los docentes especializados de la Facultad de Ciencias Forestales, lo que podría generar cuellos de botella en el flujo de validación. Para mitigar esta limitación, el panel administrativo contará con un módulo específico de registros pendientes que mostrará un contador visual al docente para facilitar su revisión. Además, para mantener el flujo ágil e informado, el sistema enviará notificaciones automáticas por correo electrónico a los estudiantes cuando el docente cambie el estado de su registro (Aceptado, Rechazado u Observado).

- La sincronización de datos con el servidor y la carga visual de los mapas interactivos dependen de la conexión a internet, lo cual puede ser intermitente en zonas periféricas de Iquitos. Cabe aclarar que la captura de coordenadas (geolocalización) utiliza el chip GPS del dispositivo y funciona de manera autónoma sin necesidad de datos móviles; sin embargo, el envío de esa información a la nube sí requiere conectividad. Esta limitación global se abordará mediante un robusto módulo offline que permitirá guardar los registros localmente en el celular (incluyendo coordenadas, fotos y datos morfológicos completos) para que posteriormente, cuando el usuario detecte una conexión estable (Wi-Fi o red móvil), pueda accionar manualmente el botón de sincronización y subir los registros al servidor.

- La investigación se realizará exclusivamente en el ámbito urbano de la ciudad de Iquitos, por lo que los resultados no podrán generalizarse a otras ciudades sin considerar las particularidades de cada contexto local. Sin embargo, la arquitectura del sistema se diseñará de forma escalable para facilitar su adaptación a otras ciudades amazónicas.

- La identificación de estructuras reproductivas (flores, frutos, semillas) depende del estado fenológico de las plantas al momento del registro. Dado que el sistema está diseñado para exigir rigor científico, todos los campos de los formularios son de carácter obligatorio y no permiten avanzar si se dejan vacíos. Por lo tanto, si una especie no presenta estas estructuras durante el periodo de estudio, el usuario se verá en la necesidad de seleccionar las opciones correspondientes a "Ausente", "Ninguno" o "No observable", lo cual, aunque garantiza la completitud de la base de datos, reduce temporalmente la precisión del sistema de filtros morfológicos para esa especie en particular hasta que otro usuario actualice la ficha en su etapa de floración o fructificación.

- Los pocos estudios previos referentes a sistemas de identificación botánica basados en filtros morfológicos para flora amazónica podrían dificultar la construcción del marco teórico con base en antecedentes directos. Se planificará ampliar la búsqueda de referencias a sistemas de ciencia ciudadana botánica y herramientas de identificación morfológica en otras regiones tropicales.


# CAPÍTULO II: MARCO TEÓRICO

## Antecedentes

En 2025, Jaik-Morán et al. publicaron "Censo comunitario del arbolado urbano y su estimación de almacenamiento de carbono: un ejercicio de ciencia ciudadana en Guadalupe Victoria, Durango, México". En este estudio, demostraron que involucrar a la comunidad en el censo y mapeo de árboles mediante tecnología móvil es una herramienta válida y efectiva para gestionar el paisaje urbano. Este antecedente fundamenta la inclusión de un módulo de ciencia ciudadana en PLANT-OR, confirmando que la participación pública permite recolectar datos a una escala geográfica mayor de la que podrían cubrir investigadores aislados. (Jaik-Morán et al. 2025)

En 2023, Castro Tigua, Sócola Riofrio y González Sanango publicaron la investigación "Desarrollo de aplicación móvil con la identificación morfológica de especies vegetales" en la Revista Científica Multidisciplinar G-ner@ndo. El estudio documentó la creación de Botanix, una aplicación móvil que, a diferencia de las herramientas genéricas, utiliza caracteres morfológicos estructurados para incrementar la precisión en la identificación de flora local. Este antecedente respalda el enfoque central de PLANT-OR, demostrando empíricamente que un sistema basado en la taxonomía visual estructurada supera a los métodos genéricos para especies locales. (Castro Tigua et al. 2023)

En 2024, se continuó utilizando como referente global la plataforma iNaturalist, un proyecto de ciencia ciudadana que permite a los usuarios registrar observaciones de la naturaleza desde dispositivos móviles. La plataforma ha generado millones de observaciones, pero carece de formularios especializados de caracteres morfológicos para el entorno universitario, lo que evidencia la necesidad de desarrollar plataformas de nicho como PLANT-OR, adaptadas al contexto educativo y botánico local. (iNaturalist 2024)

En 2022, Sifuentes Díaz y Peralta Luján desarrollaron un modelo de medición y evaluación de calidad del software basado en la norma ISO/IEC 25000 para medir la usabilidad en productos de software académicos universitarios. El estudio determinó que la aplicación de modelos estandarizados mejora la evaluación objetiva de la usabilidad de las herramientas educativas. Este antecedente es clave para PLANT-OR, ya que fundamenta la necesidad de evaluar la satisfacción y usabilidad del sistema en el entorno de la Facultad de Ciencias Forestales. (Sifuentes Díaz y Peralta Luján 2022)

En 2018, Zúñiga et al. publicaron "Flora de la ciudad universitaria, UNAH: un proyecto de ciencia ciudadana realizado por estudiantes universitarios". Este artículo expone cómo el uso de estudiantes universitarios como agentes recolectores mejora drásticamente el mapeo de la biodiversidad urbana y aumenta la accesibilidad a la información botánica. Este antecedente valida directamente la metodología de PLANT-OR, donde los alumnos de la Facultad de Ciencias Forestales actuarán como registradores primarios de la flora ornamental. (Zúñiga et al. 2018)


## Bases teóricas

**Botánica Sistemática y Morfología Vegetal**
La botánica sistemática es la rama de la biología que se encarga de la clasificación, nomenclatura y descripción de las especies vegetales. La identificación morfológica se basa en la observación de caracteres vegetativos (hojas, tallos, raíces) y reproductivos (flores, frutos, semillas) para distinguir y clasificar las especies. En el contexto de la flora ornamental urbana, los caracteres morfológicos relevantes incluyen el hábito de crecimiento (árbol, palmera, arbusto, liana, hierba), datos dasométricos (altura, diámetro de copa, circunferencia del tronco), características de corteza, exudado, hojas, flores, frutos y semillas, así como el estado fenológico y el valor ornamental de cada individuo. (Judd et al. 2016)

**Ciencia Ciudadana y Participación Comunitaria**
La ciencia ciudadana es un modelo de investigación colaborativa en el que ciudadanos no especializados participan en la recolección, clasificación y análisis de datos científicos, generalmente bajo la supervisión de investigadores o instituciones académicas. Plataformas como iNaturalist, eBird y Pl@ntNet han demostrado que la participación masiva puede generar bases de datos de alta calidad cuando se implementan mecanismos de validación por expertos. PLANT-OR adopta este modelo diferenciando entre registros completos de estudiantes (validados por docentes especializados) y registros básicos de ciudadanos (fotografías y datos mínimos), integrando validación académica como filtro de calidad. (Bonney et al. 2014)

**Sistemas de Información Geográfica (GIS) Aplicados a la Botánica Urbana**
Los Sistemas de Información Geográfica permiten la captura, almacenamiento, análisis y visualización de datos vinculados a una localización geográfica. En el contexto del arbolado urbano, el GIS permite mapear la distribución de especies, identificar zonas con baja cobertura vegetal, detectar conflictos entre infraestructura y vegetación, y planificar intervenciones de paisajismo. PLANT-OR integra componentes GIS mediante la captura de coordenadas GPS, la visualización en mapas interactivos con clustering de marcadores y la búsqueda geográfica por distrito, calle o zona. (Chang 2019)

**Ingeniería de Software Ágil: Extreme Programming (XP)**
Extreme Programming es una metodología ágil de desarrollo de software orientada a equipos pequeños que enfrentan requerimientos cambiantes. Se caracteriza por iteraciones cortas (sprints), integración continua, retroalimentación constante del cliente, programación en pares y diseño simple. XP prioriza la entrega frecuente de software funcional sobre la documentación exhaustiva, lo que resulta especialmente adecuado para proyectos académicos con plazos definidos y la necesidad de validar continuamente con usuarios reales. (Beck y Andres 2004)

**Arquitectura Serverless y CMS Headless**
La arquitectura serverless permite construir aplicaciones sin gestionar servidores propios, delegando la infraestructura a proveedores de servicios en la nube. Un CMS headless (como Sanity.io) separa la gestión del contenido de su presentación, permitiendo que múltiples aplicaciones (móvil, web, API) consuman los mismos datos. Esta arquitectura reduce costos operativos, simplifica el mantenimiento y permite escalar bajo demanda, lo que la hace ideal para proyectos académicos con presupuesto limitado. (Fowler 2019)


## Definición de términos básicos

**Sistema Multiplataforma.** Software diseñado para ejecutarse correctamente en diferentes sistemas operativos (Android, iOS) y dispositivos (celulares, computadoras) desde un solo código fuente, garantizando accesibilidad y consistencia funcional. (Sommerville 2016)

**Flora Ornamental.** Conjunto de especies vegetales cultivadas o mantenidas en espacios urbanos por sus características estéticas (flores vistosas, follaje atractivo, forma de copa), funcionales (sombra, barrera visual) o ecológicas (mejora del microclima, atracción de fauna). (Judd et al. 2016)

**Hábito de Crecimiento.** Forma general y estructura arquitectónica que adopta una planta adulta (Judd et al. 2016). En PLANT-OR se distinguirán cinco hábitos: Árbol, Palmera, Arbusto, Liana y Hierba, cada uno con un formulario de caracteres morfológicos específico.

**Identificación Morfológica Asistida.** Proceso de reconocimiento de especies vegetales basado en la observación de caracteres morfológicos visibles (forma de hojas, color de flores, tipo de fruto), facilitado por un sistema digital que sugiere coincidencias probables a partir de la combinación de características seleccionadas por el usuario.

**Filtros Dinámicos.** Sistema de categorías de búsqueda creadas y gestionadas por los docentes validadores desde el panel administrativo, que traducen datos técnicos botánicos a lenguaje simple comprensible para el usuario general (ej. "ramificación verticilada" se traduce como "ramas como hélice de helicóptero").

**Dasometría.** Medición de las dimensiones de los árboles y otras plantas leñosas, incluyendo altura total, circunferencia a la altura del pecho (CAP), diámetro de copa (paralelo y perpendicular a la calle) y altura de inicio de copa. (Prodan et al. 1997)

**Georreferenciación.** Proceso de asignar coordenadas geográficas (latitud y longitud) a un objeto o registro, permitiendo su localización precisa en un mapa (Chang 2019). En PLANT-OR, cada registro botánico incluirá coordenadas GPS capturadas automáticamente y ajustadas manualmente por el usuario.

**Validación Taxonómica.** Proceso de verificación científica de la identificación de una especie, realizado por docentes especializados que revisan los datos morfológicos, las fotografías y la nomenclatura botánica de cada registro antes de su publicación.

**Sincronización Offline.** Capacidad del sistema para almacenar registros completos (datos + fotografías) de manera local en el dispositivo cuando no hay conexión a internet, y sincronizarlos automáticamente con la base de datos central al restablecerse la conectividad (Sommerville 2016).

**CMS Headless (Sanity.io).** Sistema de gestión de contenidos que almacena y expone datos estructurados a través de una API, desacoplado de la presentación visual (Fowler 2019). Permite que múltiples aplicaciones (móvil, web admin, portal público) consuman la misma fuente de datos.

**Ciencia Ciudadana.** Modelo de investigación participativa en el que ciudadanos no especializados contribuyen a la recolección de datos científicos, expandiendo la cobertura geográfica y temporal de los estudios bajo la supervisión de investigadores o instituciones académicas. (Bonney et al. 2014)


# CAPÍTULO III: HIPÓTESIS Y VARIABLES

## Formulación de la hipótesis

Hipótesis General:
La implementación de la plataforma digital PLANT-OR mejora significativamente el acceso a la información botánica, la precisión en la identificación morfológica, la satisfacción del usuario y la participación ciudadana respecto a la flora ornamental urbana en Iquitos.

Hipótesis Específicas:
- HE1: El nivel de accesibilidad a la información botánica de especies ornamentales de Iquitos se incrementa significativamente después de la implementación de PLANT-OR.
- HE2: El nivel de precisión en la identificación morfológica de especies ornamentales mediante los filtros dinámicos de PLANT-OR es significativamente mayor que el obtenido con métodos tradicionales de consulta (libros impresos, internet, apps genéricas).
- HE3: El nivel de satisfacción y usabilidad percibida por los usuarios respecto a PLANT-OR alcanza un nivel adecuado (≥ 70% en escala SUS).
- HE4: La participación ciudadana y la cobertura geográfica de registros botánicos alcanzan un nivel significativo mediante el módulo de registro colaborativo.


## Variables y su operacionalización

Variable Independiente: Plataforma digital PLANT-OR
Sistema digital compuesto por tres aplicaciones integradas (App Móvil, Panel Administrativo Web y Portal Web Público), diseñado para el registro colaborativo, validación científica e identificación morfológica de flora ornamental urbana.

Variable Dependiente: Acceso a la información botánica, identificación morfológica, satisfacción del usuario y participación ciudadana
Conjunto de indicadores que miden la mejora en la disponibilidad de información, la precisión en el reconocimiento de especies, la percepción de los usuarios y el nivel de participación ciudadana tras la implementación del sistema.

Tabla 1. Operacionalización de la Variable Independiente

<table>
  <tr>
    <th>Variable</th>
    <th>Definición</th>
    <th>Tipo por su naturaleza</th>
    <th>Indicador</th>
    <th>Escala de medición</th>
    <th>Categorías</th>
    <th>Valores de categorías</th>
    <th>Medio de verificación</th>
  </tr>
  <tr>
    <td rowspan="4">V.I.: Sistema Multiplataforma PLANT-OR</td>
    <td rowspan="4">Plataforma digital para el registro colaborativo, validación científica e identificación morfológica de flora ornamental urbana, compuesto por App Móvil, Panel Web y Portal Público.</td>
    <td rowspan="4">Cuantitativa</td>
    <td>Registro Colaborativo App Móvil (Nº de registros completados)</td>
    <td>#</td>
    <td>Alto<br>Medio<br>Bajo</td>
    <td>Alto: &gt; 1500<br>Medio: 500-1500<br>Bajo: &lt; 500</td>
    <td>Dashboard del Panel Web</td>
  </tr>
  <tr>
    <td>Validación Panel Web (Tasa de registros validados vs. rechazados)</td>
    <td>%</td>
    <td>Alto<br>Medio<br>Bajo</td>
    <td>Alto: &gt; 80%<br>Medio: 50-80%<br>Bajo: &lt; 50%</td>
    <td>Dashboard del Panel Web</td>
  </tr>
  <tr>
    <td>Configuración de Filtros (Nº de filtros morfológicos creados)</td>
    <td>#</td>
    <td>Alto<br>Medio<br>Bajo</td>
    <td>Alto: &gt; 20<br>Medio: 10-20<br>Bajo: &lt; 10</td>
    <td>Panel Administrativo</td>
  </tr>
  <tr>
    <td>Catálogo Portal Público (Nº de especies validadas y publicadas)</td>
    <td>#</td>
    <td>Alto<br>Medio<br>Bajo</td>
    <td>Alto: &gt; 50<br>Medio: 20-50<br>Bajo: &lt; 20</td>
    <td>Portal Web Público</td>
  </tr>
</table>

Tabla 2. Operacionalización de la Variable Dependiente

<table>
  <tr>
    <th>Variable</th>
    <th>Definición</th>
    <th>Tipo por su naturaleza</th>
    <th>Indicador</th>
    <th>Escala de medición</th>
    <th>Categorías</th>
    <th>Valores de categorías</th>
    <th>Medio de verificación</th>
  </tr>
  <tr>
    <td rowspan="4">V.D.: Acceso a la información, precisión y satisfacción</td>
    <td rowspan="4">Mejora en la disponibilidad de información, la precisión en el reconocimiento de especies, la participación ciudadana y la percepción de los usuarios.</td>
    <td rowspan="4">Cuantitativa</td>
    <td>Accesibilidad de la información (Puntaje promedio de accesibilidad percibida)</td>
    <td>Pts</td>
    <td>Alto<br>Medio<br>Bajo</td>
    <td>Alto: &gt; 4.0 / 5.0<br>Medio: 3.0-4.0<br>Bajo: &lt; 3.0</td>
    <td>Cuestionario Likert (pre-test / post-test)</td>
  </tr>
  <tr>
    <td>Precisión en la identificación (% de aciertos con filtros vs. método tradicional)</td>
    <td>%</td>
    <td>Alto<br>Medio<br>Bajo</td>
    <td>Alto: &gt; 80%<br>Medio: 60-80%<br>Bajo: &lt; 60%</td>
    <td>Prueba de identificación</td>
  </tr>
  <tr>
    <td>Satisfacción y Usabilidad (Puntuación SUS)</td>
    <td>Pts</td>
    <td>Excelente<br>Bueno<br>Pobre</td>
    <td>Excelente: &gt; 80<br>Bueno: 68-80 pts<br>Pobre: &lt; 68 pts</td>
    <td>Cuestionario SUS</td>
  </tr>
  <tr>
    <td>Participación Ciudadana (Nº de usuarios únicos registrados interactuando)</td>
    <td>#</td>
    <td>Alto<br>Medio<br>Bajo</td>
    <td>Alto: &gt; 100 usuarios<br>Medio: 50-100<br>Bajo: &lt; 50</td>
    <td>Base de datos</td>
  </tr>
</table>


# CAPÍTULO IV: METODOLOGÍA

## 4.1. Diseño metodológico.

La investigación será de tipo **Aplicada**, ya que buscará resolver un problema práctico concreto mediante la construcción de un producto de software funcional. El enfoque será **cuantitativo**, dado que se medirán indicadores numéricos de accesibilidad, precisión, satisfacción y participación. (Creswell 2018)

El diseño será **pre-experimental** con un solo grupo y medición antes/después (pre-test / post-test), donde se evaluarán los indicadores de la variable dependiente antes de la implementación del sistema (usando métodos tradicionales de consulta como libros impresos, internet o apps genéricas) y después de la implementación (usando PLANT-OR), para determinar si existen diferencias significativas. (Hernández Sampieri, Fernández Collado y Baptista Lucio 2014)

Para el desarrollo del software se adoptará un enfoque **Ágil (basado en prácticas de Extreme Programming - XP)**. La elección de este enfoque responde a las siguientes características del proyecto:
- Desarrollo iterativo que permite ajustarse rápidamente según la retroalimentación de los docentes de Botánica y los usuarios de campo.
- Necesidad de entregar incrementos funcionales verificables (App, Panel Web, Portal Público) en cada fase.
- Énfasis en la calidad del producto mediante revisión continua, pruebas constantes y refactorización para asegurar la estabilidad del sistema multiplataforma.

## 4.2. Diseño muestral.

**Población de estudio:**
La población está conformada por los estudiantes de diversos cursos de la Facultad de Ciencias Forestales de la UNAP, los docentes de la facultad y los ciudadanos interesados en la flora ornamental urbana de Iquitos.

**Muestra:**
Se empleará un muestreo no probabilístico por conveniencia, considerando:
- Estudiantes: Matriculados en diversos cursos afines de la Facultad de Ciencias Forestales durante el periodo de estudio (estimado: 30-50 estudiantes), quienes actuarán principalmente como registradores de información.
- Ciudadanos: Participantes voluntarios reclutados mediante difusión del proyecto (estimado: 10-20 ciudadanos).
- Docentes validadores: Los docentes del curso que actuarán como validadores taxonómicos (estimado: 3-5 docentes).

**Criterios de Inclusión:**
- Estudiantes matriculados en cursos de la Facultad de Ciencias Forestales de la UNAP durante 2026.
- Ciudadanos mayores de 16 años con acceso a un dispositivo móvil Android.
- Registros botánicos completados con todas las fotografías obligatorias y ubicación GPS confirmada.
- Registros realizados dentro del periodo de análisis.

**Criterios de Exclusión:**
- Registros rechazados durante la validación científica (ej. fotos borrosas donde es imposible identificar la planta).
- Registros duplicados o con coordenadas GPS fuera del ámbito urbano de Iquitos.
- Usuarios que no completaron la prueba de usabilidad.

## Técnicas e instrumentos de recolección de datos.

Se emplearán las siguientes técnicas e instrumentos:

**Para la evaluación de accesibilidad (OE1):**
- Pre-test: Cuestionario sobre conocimiento y acceso actual a información botánica (antes de usar PLANT-OR).
- Post-test: Mismo cuestionario tras 2 meses de uso del sistema.
- Instrumento: Cuestionario estructurado con escala Likert de 5 puntos.

**Para la evaluación de precisión en la identificación (OE2):**
- Prueba práctica de identificación: Se presentarán 20 especies ornamentales en total a cada participante. En la condición control (10 especies), identificarán usando métodos tradicionales (libros impresos, búsqueda en Google o apps genéricas). En la condición experimental (otras 10 especies), identificarán usando los filtros de PLANT-OR.
- Instrumento: Ficha de observación estructurada con registro de aciertos/errores y tiempo de identificación.

**Para la evaluación de usabilidad y satisfacción (OE3):**
- Cuestionario SUS (System Usability Scale): Instrumento estandarizado de 10 ítems para medir la usabilidad percibida.
- Encuesta de satisfacción: Cuestionario propio con preguntas sobre funcionalidades específicas del sistema.
- Instrumento: Cuestionarios impresos y/o digitales (Google Forms).

**Para la evaluación de participación ciudadana (OE4):**
- Análisis de base de datos: Extracción de métricas directamente desde Sanity.io (registros por usuario, distribución geográfica, estados de validación).
- Instrumento: Scripts de consulta GROQ sobre la base de datos de producción.

## Procesamiento y análisis de datos

**Procesamiento:**
- Los datos de los cuestionarios se tabularán en hojas de cálculo y se codificarán para su análisis estadístico.
- Los datos del sistema (registros, validaciones, coordenadas) se extraerán directamente de Sanity.io mediante consultas GROQ y se exportarán en formato CSV.
- Las métricas de participación se calcularán a partir de los registros de Clerk (usuarios) y Sanity (registros botánicos).

**Análisis descriptivo:**
- Media, mediana y desviación estándar de las puntuaciones SUS.
- Distribución de frecuencias de los registros por hábito, distrito y estado de validación.
- Distribución geográfica de los registros para evaluar la cobertura urbana (OE4).

**Análisis inferencial y descriptivo final:**
- Prueba T para muestras pareadas: Para comparar las puntuaciones pre-test y post-test de accesibilidad a la información (OE1).
- Prueba de McNemar: Para comparar la tasa de aciertos vs errores en la identificación con métodos tradicionales vs PLANT-OR (OE2).
- Estadística descriptiva (Media, Mediana): Para caracterizar las puntuaciones SUS de satisfacción (OE3).
- Estadística descriptiva (Frecuencias): Para cuantificar el nivel de participación ciudadana y usuarios activos (OE4).
- Para el análisis estadístico se empleará el software SPSS V. 26 o R Studio.

## Aspectos éticos

Para los aspectos éticos o integridad en este trabajo de investigación se tendrán en cuenta los valores, principios y recomendaciones que el CONCYTEC establece a través del Código Nacional de Integridad Científica (CONCYTEC 2019), donde se considerará lo siguiente:

- **Protección de datos personales:** Se garantizará la privacidad de los usuarios mediante el servicio de autenticación segura Clerk, que almacena credenciales de forma encriptada. El sistema solo solicita datos estrictamente necesarios (correo electrónico, nombre, datos académicos opcionales). Los datos sensibles como el DNI no se muestran públicamente en las fichas técnicas.

- **Consentimiento informado:** Los participantes de las pruebas de usabilidad serán informados sobre los objetivos de la investigación, el uso que se dará a sus datos y su derecho a retirarse en cualquier momento. Se solicitará consentimiento escrito.

- **Propiedad intelectual y crédito:** Todos los registros validados mostrarán públicamente los créditos de autoría del estudiante o ciudadano que aportó la información, fomentando la transparencia y el reconocimiento de la participación.

- **Integridad en las actividades de investigación** y procesamiento de datos.

- **Honestidad intelectual** en todos los aspectos de la investigación.

- **Veracidad, justicia y responsabilidad** en la ejecución y difusión de los resultados.

- **Transparencia**, actuando sin conflicto de interés.


PRESUPUESTO

<table>
  <tr>
    <th>Partida</th>
    <th>Descripción</th>
    <th>Costo Unitario</th>
    <th>Total</th>
  </tr>
  <tr>
    <td>3.1.5.1.2</td>
    <td>Bienes de consumo<br>01 millar de papel A-4<br>01 tinta de impresoras de color negro<br>01 tinta a color</td>
    <td><br>30.00<br>40.00<br>40.00</td>
    <td><br>30.00<br>80.00<br></td>
  </tr>
  <tr>
    <td>2.3.2.7.4.4.2</td>
    <td>Servicios de consultoría<br>Asesoramiento metodológico</td>
    <td><br>1,500.00</td>
    <td><br>1,500.00</td>
  </tr>
  <tr>
    <td>2.3.2.7.4.4.9.9</td>
    <td>Dominio web<br>Datos móviles para pruebas de campo</td>
    <td>----------<br>----------</td>
    <td>40.00<br>280.00</td>
  </tr>
  <tr>
    <td>2.3.2.2.4.4</td>
    <td>Servicios de encuadernado y empastado<br>informe final de la tesis encuadernado.</td>
    <td><br>50.00</td>
    <td><br>150.00</td>
  </tr>
  <tr>
    <td></td>
    <td><b>TOTAL</b></td>
    <td></td>
    <td><b>S/ 2,080.00</b></td>
  </tr>
</table>


# CRONOGRAMA

<table>
  <tr>
    <th>ACTIVIDADES</th>
    <th colspan="8">MESES (Sprints Quincenales)</th>
  </tr>
  <tr>
    <td></td>
    <td>S1</td>
    <td>S2</td>
    <td>S3</td>
    <td>S4</td>
    <td>S5</td>
    <td>S6</td>
    <td>S7</td>
    <td>S8</td>
  </tr>
  <tr>
    <td>Investigación de la problemática y requerimientos</td>
    <td bgcolor="#e0b0ff"></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Diseño y arquitectura del sistema</td>
    <td bgcolor="#e0b0ff"></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Desarrollo de la aplicación móvil</td>
    <td></td>
    <td bgcolor="#e0b0ff"></td>
    <td bgcolor="#e0b0ff"></td>
    <td bgcolor="#e0b0ff"></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Desarrollo del panel administrativo</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td bgcolor="#e0b0ff"></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Desarrollo del portal web público</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td bgcolor="#e0b0ff"></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Pruebas de usabilidad y mejora continua del sistema</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td bgcolor="#e0b0ff"></td>
    <td></td>
  </tr>
  <tr>
    <td>Recolección de datos en campo y aplicación de cuestionarios (SUS)</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td bgcolor="#e0b0ff"></td>
    <td></td>
  </tr>
  <tr>
    <td>Análisis estadístico e interpretación de resultados (SPSS)</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td bgcolor="#e0b0ff"></td>
  </tr>
  <tr>
    <td>Elaboración y estructuración del documento de tesis</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td bgcolor="#e0b0ff"></td>
  </tr>
  <tr>
    <td>Levantamiento de observaciones y preparación de sustentación</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td bgcolor="#e0b0ff"></td>
  </tr>
</table>


# REFERENCIAS BIBLIOGRÁFICAS

BECK, K. y ANDRES, C., 2004. Extreme Programming Explained: Embrace Change. 2. Boston: Addison-Wesley. ISBN 978-0321278654.
BONNEY, R., SHIRK, J.L., PHILLIPS, T.B., WIGGINS, A., BALLARD, H.L., MILLER-RUSHING, A.J. y PARRISH, J.K., 2014. Next steps for citizen science. Science, vol. 343, no. 6178, pp. 1436-1437. DOI 10.1126/science.1251554.
BROOKE, J., 1996. SUS-A quick and dirty usability scale. Usability evaluation in industry, 189(194), 4-7.
CHANG, K., 2019. Introduction to Geographic Information Systems. 9. New York: McGraw-Hill. ISBN 978-1259929649.
CLERK, 2024. Clerk - Authentication and User Management. [en línea]. [consulta: 26 julio 2026]. Disponible en: https://clerk.com/
CONCYTEC, 2019. Código Nacional de Integridad Científica. Lima: CONCYTEC.
CASTRO TIGUA, M.F., SÓCOLA RIOFRIO, J.A. y GONZÁLEZ SANANGO, H., 2023. Desarrollo de aplicación móvil con la identificación morfológica de especies vegetales. Revista Científica Multidisciplinar G-ner@ndo, vol. 4, no. 2. [en línea]. [consulta: 27 julio 2026]. Disponible en: https://dialnet.unirioja.es/servlet/articulo?codigo=9457479 
CRESWELL, J.W., 2018. Research Design: Qualitative, Quantitative, and Mixed Methods Approaches. 5. Los Angeles: SAGE.
FOWLER, M., 2019. Patterns of Enterprise Application Architecture. Boston: Addison-Wesley.
HERNÁNDEZ SAMPIERI, R., FERNÁNDEZ COLLADO, C. y BAPTISTA LUCIO, P., 2014. Metodología de la Investigación. 6. México: McGraw-Hill.
IBM CORP., 2019. IBM SPSS Statistics for Windows, Version 26.0. Armonk, NY: IBM Corp.
iNATURALIST, 2024. iNaturalist.org – A Community for Naturalists. [en línea]. [consulta: 29 julio 2026]. Disponible en: https://www.inaturalist.org/.
JAIK-MORÁN, V.S., MARCELEÑO-FLORES, S.M.L., NÁJERA-GONZÁLEZ, O. y NÁJERA-GONZÁLEZ, A., 2025. Censo comunitario del arbolado urbano y su estimación de almacenamiento de carbono: un ejercicio de ciencia ciudadana en Guadalupe Victoria, Durango, México. Tlamati: Sabiduría en línea, vol. 21, no. 34. [en línea]. [consulta: 29 julio 2026]. Disponible en: https://www.researchgate.net/publication/390426805_Censo_comunitario_del_arbolado_urbano_y_su_estimacion_de_almacenamiento_de_carbono_un_ejercicio_de_ciencia_ciudadana_en 
JUDD, W.S., CAMPBELL, C.S., KELLOGG, E.A., STEVENS, P.F. y DONOGHUE, M.J., 2016. Plant Systematics: A Phylogenetic Approach. 4. Sunderland: Sinauer Associates. ISBN 978-1605353890.
META PLATFORMS INC., 2024. React Native: A framework for building native apps using React. [en línea]. [consulta: 29 julio 2026]. Disponible en: https://reactnative.dev/
PRODAN, M., PETERS, R., COX, F. y REAL, P., 1997. Mensura forestal. Serie Investigación y Educación en Desarrollo Sostenible. San José: IICA/GTZ.
SANITY, 2024. Sanity.io - The Composable Content Cloud. [en línea]. [consulta: 29 julio 2026]. Disponible en: https://www.sanity.io/
SIFUENTES DÍAZ, Y.M. y PERALTA LUJÁN, J.L., 2022. Modelo de medición y evaluación de calidad del software basado en la norma ISO/IEC 25000 para medir la usabilidad en productos de software académicos universitarios. Tecnohumanismo, vol. 2, no. 1. DOI 10.53673/th.v2i4.125.
SOMMERVILLE, I., 2016. Software Engineering. 10. Boston: Pearson. ISBN 978-1-292-09613-1.
ZÚÑIGA, C., et al., 2018. Flora de la ciudad universitaria, UNAH: un proyecto de ciencia ciudadana realizado por estudiantes universitarios. Revista Ciencia y Tecnología, Universidad Nacional Autónoma de Honduras. [en línea]. [consulta: 29 julio 2026]. Disponible en: https://www.camjol.info/index.php/RCT/article/view/6861.


# ANEXOS

## Anexo 1: Matriz de consistencia

<table>
  <tr>
    <th>PROBLEMA</th>
    <th>OBJETIVOS</th>
    <th>HIPÓTESIS</th>
    <th>VARIABLES</th>
    <th>INDICADORES</th>
    <th>METODOLOGÍA</th>
  </tr>
  <tr>
    <td>Problema General:<br>¿De qué manera la implementación de la plataforma digital PLANT-OR influye en el acceso a la información botánica, la precisión en la identificación morfológica, la satisfacción del usuario y la participación ciudadana respecto a la flora ornamental urbana en Iquitos, 2026?<br><br>Problemas Específicos:<br>PE1. ¿Cuál es el nivel de accesibilidad a la información botánica de especies ornamentales de Iquitos antes y después de la implementación de PLANT-OR?<br>PE2. ¿Cuál es el nivel de precisión en la identificación morfológica de especies ornamentales lograda mediante el sistema de filtros dinámicos de PLANT-OR, en comparación con los métodos tradicionales de consulta (libros, búsqueda en internet o apps genéricas)?<br>PE3. ¿Cuál es el nivel de satisfacción y usabilidad percibida por los usuarios (estudiantes y ciudadanos) respecto a las funcionalidades del sistema PLANT-OR?<br>PE4. ¿Cuál es el nivel de participación ciudadana y cobertura geográfica alcanzado mediante el módulo de registro colaborativo del sistema?</td>
    <td>Objetivo General:<br>Desarrollar e implementar la plataforma digital PLANT-OR para optimizar el acceso a la información botánica, la precisión en la identificación morfológica, la satisfacción del usuario y la participación ciudadana respecto a la flora ornamental urbana en Iquitos.<br><br>Objetivos Específicos:<br>OE1. Determinar el nivel de accesibilidad a la información botánica antes y después de la implementación del sistema, evaluando la disponibilidad, organización y facilidad de consulta de fichas técnicas de especies ornamentales.<br>OE2. Evaluar la precisión en la identificación morfológica de especies ornamentales lograda mediante los filtros dinámicos del sistema, comparándola con métodos tradicionales de consulta (libros botánicos, conocimiento empírico, búsqueda web o apps genéricas).<br>OE3. Medir el nivel de satisfacción y usabilidad percibida por los usuarios (estudiantes de la Facultad de Ciencias Forestales y ciudadanos) respecto a las funcionalidades del sistema.<br>OE4. Cuantificar el nivel de participación y la cobertura geográfica de registros botánicos alcanzada mediante el módulo de registro colaborativo (estudiantes y ciudadanos).</td>
    <td>Hipótesis General:<br>La implementación de la plataforma digital PLANT-OR mejora significativamente el acceso a la información botánica, la precisión en la identificación morfológica, la satisfacción del usuario y la participación ciudadana respecto a la flora ornamental urbana en Iquitos.<br><br>Hipótesis Específicas:<br>HE1: El nivel de accesibilidad a la información botánica de especies ornamentales de Iquitos se incrementa significativamente después de la implementación de PLANT-OR.<br>HE2: El nivel de precisión en la identificación morfológica de especies ornamentales mediante los filtros dinámicos de PLANT-OR es significativamente mayor que el obtenido con métodos tradicionales de consulta (libros impresos, internet, apps genéricas).<br>HE3: El nivel de satisfacción y usabilidad percibida por los usuarios respecto a PLANT-OR alcanza un nivel adecuado (≥ 70% en escala SUS).<br>HE4: La participación ciudadana y la cobertura geográfica de registros botánicos alcanzan un nivel significativo mediante el módulo de registro colaborativo.</td>
    <td>Variable Independiente:<br>Plataforma digital PLANT-OR<br>Sistema digital compuesto por tres aplicaciones integradas (App Móvil, Panel Administrativo Web y Portal Web Público), diseñado para el registro colaborativo, validación científica e identificación morfológica de flora ornamental urbana.<br><br>Variable Dependiente:<br>Acceso a la información botánica, identificación morfológica, satisfacción del usuario y participación ciudadana.</td>
    <td>V.I. Indicadores:<br>- Nº de registros completados<br>- Tasa de registros validados vs. rechazados<br>- Nº de filtros morfológicos creados<br>- Nº de especies validadas y publicadas<br><br>V.D. Indicadores:<br>- Puntaje promedio de accesibilidad percibida<br>- % de aciertos con filtros vs. método tradicional<br>- Puntuación SUS<br>- Nº de usuarios únicos registrados interactuando</td>
    <td>Diseño metodológico: Tipo Aplicada, Enfoque Cuantitativo. Diseño pre-experimental (pre-test / post-test). Metodología de desarrollo: Ágil (Extreme Programming - XP).<br><br>Diseño muestral: Muestreo no probabilístico por conveniencia (30-50 estudiantes, 10-20 ciudadanos, 3-5 docentes validadores).<br><br>Técnicas e instrumentos: Cuestionarios, prueba práctica de identificación, cuestionario SUS, análisis de base de datos (GROQ).<br><br>Análisis: Prueba T para muestras pareadas, Prueba de McNemar, estadística descriptiva, software SPSS V.26 o R Studio.</td>
  </tr>
</table>


## Anexo 2: Ficha de Registro de Métricas del Sistema 

**REPORTE DE FUNCIONAMIENTO Y USO DE LA PLATAFORMA (V.I.)**

**Objetivo:** Consolidar las métricas de funcionamiento de la plataforma digital PLANT-OR, extraídas directamente de los dashboards de administración y la base de datos (Sanity/Clerk) al finalizar el periodo de prueba.

**Periodo de Evaluación:** ___/___/2026 al ___/___/2026
**Responsable de Extracción:** ___________________________________

| Dimensión de la V.I. | Indicador a Medir | Valor Obtenido | Fuente de Verificación |
|:---------------------|:------------------|:--------------:|:-----------------------|
| App Móvil            | Nº Total de registros completados enviados. | | Panel Administrativo (Sanity DB) |
| Panel Web            | Tasa de registros validados (%) vs. rechazados (%). | | Panel Administrativo (Sanity DB) |
| Panel Web            | Nº de filtros morfológicos creados por docentes. | | Panel Administrativo |
| Portal Público       | Nº total de especies validadas y publicadas en el catálogo. | | Portal Web Público |

---

## Anexo 3: Instrumento para medir la Accesibilidad (Indicador 1)

**CUESTIONARIO DE ACCESIBILIDAD A LA INFORMACIÓN BOTÁNICA**

**Objetivo:** Medir el nivel de accesibilidad percibida por los usuarios respecto a la información de especies ornamentales, antes y después de usar PLANT-OR.

**Datos Generales:**
- **Fecha:** ___/___/202
- **Participante N°:** ________ (Estudiante [  ] / Ciudadano [  ])
- **Método Evaluado:** Tradicional (Pre-test) [  ] / App PLANT-OR (Post-test) [  ]

**Escala:** 1 (Totalmente en desacuerdo) a 5 (Totalmente de acuerdo).

| N° | Ítem | Puntuación (1-5) |
|:--:|:-----|:----------------:|
| 1 | La información sobre las plantas ornamentales de Iquitos es fácil de encontrar. | |
| 2 | La información disponible está organizada de forma clara y estructurada. | |
| 3 | Puedo acceder rápidamente a las características específicas (taxonomía, morfología) de una planta. | |
| 4 | Es fácil acceder a recursos visuales (fotografías o ilustraciones) de las plantas consultadas. | |
| 5 | Las herramientas de búsqueda me permiten encontrar la información que necesito sin perder tiempo. | |
| 6 | La presentación visual de la información (textos e imágenes) facilita su lectura en la herramienta de consulta utilizada. | |
| 7 | Es sencillo acceder a la información botánica desde esta herramienta de consulta mientras estoy en campo (parques, jardines). | |
| 8 | La información proporcionada es suficiente para conocer a detalle la especie consultada. | |
| 9 | El método o herramienta que estoy utilizando me resulta cómodo y eficiente para mi trabajo o investigación. | |
| 10| En general, considero que el nivel de accesibilidad a la información botánica mediante esta herramienta es excelente. | |

---

## Anexo 4: Instrumento para medir la Precisión (Indicador 2)

**FICHA DE OBSERVACIÓN PRÁCTICA PARA IDENTIFICACIÓN DE ESPECIES**

**Objetivo:** Registrar la precisión (% de aciertos) y el tiempo empleado por los participantes durante la prueba de identificación morfológica.

**Datos Generales:**
- **Fecha:** ___/___/202
- **Participante N°:** ________ (Estudiante [  ] / Ciudadano [  ])
- **Método Evaluado:** Tradicional [  ] / App PLANT-OR [  ]

| N° | Especie Real (Física o Foto) | Especie Identificada por el usuario | Resultado (Acierto=1 / Error=0) | Tiempo (Min:Seg) |
|:--:|:-----------------------------|:-----------------------------------|:-------------------------------:|:----------------:|
| 1  | _________________________  |                                    |                                 |                  |
| 2  | _________________________  |                                    |                                 |                  |
| 3  | _________________________  |                                    |                                 |                  |
| 4  | _________________________  |                                    |                                 |                  |
| 5  | _________________________  |                                    |                                 |                  |
| 6  | _________________________  |                                    |                                 |                  |
| 7  | _________________________  |                                    |                                 |                  |
| 8  | _________________________  |                                    |                                 |                  |
| 9  | _________________________  |                                    |                                 |                  |
| 10 | _________________________  |                                    |                                 |                  |

*Resumen: Total aciertos (de 10 posibles): / 10*

---

## Anexo 5: Instrumento para medir la Usabilidad (Indicador 3)

**CUESTIONARIO SUS (System Usability Scale)**

**Objetivo:** Medir el nivel de usabilidad y satisfacción de la plataforma PLANT-OR.

**Datos Generales:**
- **Fecha:** ___/___/2026
- **Participante N°:** ________ (Estudiante [  ] / Ciudadano [  ])

**Escala:** 1 (Totalmente en desacuerdo) a 5 (Totalmente de acuerdo).

| N° | Ítem (Pregunta estándar SUS) | Puntuación (1-5) |
|:--:|:-----------------------------|:----------------:|
| 1 | Creo que me gustaría utilizar este sistema con frecuencia. | |
| 2 | Encontré el sistema innecesariamente complejo. | |
| 3 | Pensé que el sistema era fácil de usar. | |
| 4 | Creo que necesitaría el apoyo de un técnico para poder usarlo. | |
| 5 | Encontré que las diversas funciones del sistema estaban bien integradas. | |
| 6 | Pensé que había demasiada inconsistencia en este sistema. | |
| 7 | Imagino que la mayoría de las personas aprenderían a usarlo rápido. | |
| 8 | Encontré el sistema muy engorroso de usar. | |
| 9 | Me sentí muy confiado/seguro al utilizar el sistema. | |
| 10| Necesité aprender muchas cosas antes de poder usar el sistema. | |

<br>

**ENCUESTA DE SATISFACCIÓN**

**Objetivo:** Evaluar el nivel de satisfacción del usuario respecto a los módulos principales de la plataforma digital PLANT-OR.
**Escala:** 1 (Totalmente en desacuerdo) a 5 (Totalmente de acuerdo).

| N° | Funcionalidad Evaluada | Ítem a evaluar | Puntuación (1-5) |
|:--:|:-----------------------|:---------------|:----------------:|
| **A** | **PORTAL WEB PÚBLICO** | | |
| 1 | **Inicio (Landing Page)** | La página principal comunica claramente el propósito del proyecto y me invita a explorar. | |
| 2 | **Catálogo Público** | El buscador y los filtros del catálogo facilitan encontrar plantas rápidamente. | |
| 3 | **Fichas Técnicas** | La información detallada (fotografías, taxonomía, morfología) se presenta de forma clara. | |
| 4 | **Mapa Interactivo** | El mapa público carga sin problemas y permite localizar visualmente las especies en la ciudad. | |
| 5 | **Diseño Responsivo** | El portal web se adapta y funciona perfectamente tanto en computadora como en teléfono móvil. | |
| **B** | **APP MÓVIL** | | |
| 6 | **Proceso de Registro** | El flujo para registrar una nueva planta (fotos y datos morfológicos) es ágil e intuitivo. | |
| 7 | **Sincronización** | La funcionalidad de guardar registros y sincronizarlos a la base de datos me da confianza. | |
| 8 | **Estado de Registros** | El panel donde veo si mis aportes fueron aprobados o rechazados por el administrador es claro. | |
| 9 | **Certificados y Perfil** | Las estadísticas personales y los certificados descargables me motivan a seguir colaborando. | |
| 10 | **Rendimiento** | La plataforma funciona de manera fluida y sin interrupciones durante el trabajo de campo. | |

---

## Anexo 6: Instrumento para medir la Participación (Indicador 4)

**REPORTE DE EXTRACCIÓN DE DATOS DE PARTICIPACIÓN CIUDADANA**

**Objetivo:** Cuantificar el volumen de participación ciudadana y cobertura geográfica extraído directamente de la base de datos (Sanity).

**Parámetros de extracción:**
- **Rango de Fechas:** \_\_\_\_\_\_\_\_\_\_ a \_\_\_\_\_\_\_\_\_\_


**Tabla de Consolidado (Estudiantes):**
| Métrica Evaluada | Cantidad / Valor Obtenido | Fuente de Datos |
|:-----------------|:-------------------------:|:----------------|
| **1. Usuarios** | | |
| Total de Usuarios Estudiantes Registrados | | Clerk Auth |
| Promedio de registros enviados por estudiante | | Sanity DB |
| **2. Estados de Validación** | | |
| Total de Registros Enviados | | Sanity DB |
| Registros Validados (Aprobados) | | Sanity DB |
| Registros Pendientes de Validación | | Sanity DB |
| Registros Rechazados | | Sanity DB |
| **3. Distribución Geográfica** | | |
| Cantidad de Zonas/Distritos Cubiertos | | Datos GPS (Sanity) |

**Tabla de Consolidado (Ciudadanos):**
| Métrica Evaluada | Cantidad / Valor Obtenido | Fuente de Datos |
|:-----------------|:-------------------------:|:----------------|
| **1. Usuarios** | | |
| Total de Usuarios Ciudadanos Registrados | | Clerk Auth |
| Promedio de registros enviados por ciudadano | | Sanity DB |
| **2. Estados de Validación** | | |
| Total de Registros Enviados | | Sanity DB |
| Registros Validados (Aprobados) | | Sanity DB |
| Registros Pendientes de Validación | | Sanity DB |
| Registros Rechazados | | Sanity DB |
| **3. Distribución Geográfica** | | |
| Cantidad de Zonas/Distritos Cubiertos | | Datos GPS (Sanity) |


---
## Anexo 7: Ficha de Validación de Instrumentos (Juicio de Expertos)

**FICHA DE EVALUACIÓN DE INSTRUMENTO DE MEDICIÓN**

Esta ficha será entregada a los 3-5 docentes validadores (Expertos) mencionados en la metodología para que certifiquen la validez de los cuestionarios propios diseñados para esta investigación.

**I. DATOS DEL EVALUADOR**
- **Apellidos y Nombres:** __________________________________________________
- **Institución donde labora:** _______________________________________________
- **Cargo actual:** _________________________________________________________
- **Profesión:** ____________________________________________________________
- **Grado académico:** Maestro [  ] / Doctor [  ]

**II. DATOS DEL INSTRUMENTO A EVALUAR**
- **Nombre del instrumento:** _______________________________________________
- **Dirigido a:** Estudiantes Universitarios y Ciudadanos de Iquitos.

**III. CRITERIOS DE EVALUACIÓN**
*(Escala: 1=Deficiente, 2=Regular, 3=Bueno, 4=Muy Bueno, 5=Excelente)*

| N° | Criterios de Evaluación | Puntuación (1-5) | Observaciones / Sugerencias |
|:--:|:------------------------|:----------------:|:----------------------------|
| 1 | **Claridad:** Los ítems están redactados en un lenguaje comprensible. | | |
| 2 | **Objetividad:** Los ítems están expresados en conductas observables. | | |
| 3 | **Actualidad:** Los ítems son adecuados a los avances tecnológicos actuales. | | |
| 4 | **Organización:** Existe un orden lógico en la estructura del instrumento. | | |
| 5 | **Suficiencia:** Los ítems son suficientes para medir la variable/indicador. | | |
| 6 | **Intencionalidad:** Los ítems son coherentes con los objetivos de la investigación. | | |
| 7 | **Consistencia:** Los ítems están basados en aspectos teóricos y científicos reales. | | |

**IV. DICTAMEN DE VALIDACIÓN**
- [  ] Aplicable sin modificaciones
- [  ] Aplicable con modificaciones
- [  ] No aplicable

**Firma del Evaluador experto:** _______________________  
**DNI:** _______________________


# Anexo 8: Declaración Jurada de Autenticidad y de no Plagio
*(Documento legal firmado por los autores)*

# Anexo 9: Declaración Jurada del Asesor
*(Documento legal firmado por el asesor)*

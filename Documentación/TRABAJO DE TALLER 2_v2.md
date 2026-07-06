UNIVERSIDAD NACIONAL DE LA AMAZONÍA PERUANA
FACULTAD DE INGENIERÍA DE SISTEMAS E INFORMÁTICA
“Catálogo virtual de flora ornamental de Iquitoscon identificación morfológica asistida”

DOCENTE:
VILCA BARBARAN RAFAEL

ALUMNOS:
ALVARADO SILVANO, DANILO LEONARDO
CABANILLAS RONDONA, ANGIE DAYANA
RENGIFO GUTIERREZ, MARLON MOISES
RENGIFO PINEDO, BRITTANY ARIANA
ZUMAETA ZEGARRA, WALTER ARMADO
CICLO:
IX

CURSO:
TALLER DE SOFTWARE II

AÑO:
2026






Contenido
1.RESUMEN EJECUTIVO2
2.PROBLEMA Y CONTEXTO3
2.1Contexto General: Realidad de la flora ornamental en Iquitos3
2.2Problema Central3
2.3 Manifestaciones del Problema4
2.4 Magnitud e Impacto del Problema4
2.5 Análisis de Soluciones Existentes y Brechas5
3. PROPUESTA DE SOLUCIÓN6
3.1 Visión del Producto6
3.2 Descripción Funcional del Sistema6
3.3 Alcance del Sistema – Sprint 1 al Sprint 68
3.4 Valor Diferencial y Justificación de la Propuesta9
4. METODOLOGIA: EXTREME PROGRAMMING (XP)10
4.1 Fundamentos de la elección Metodológica10
4.2 Roles Definidos en el Equipo10
4.3 Actividades Realizadas en el Primer Sprint11
4.4 Historias de Usuario12
5. DISEÑO DE LA SOLUCIÓN15
5.1 Principios de Diseño de la Interfaz15
5.2 Flujo de Navegación del Sistema16
5.3 Descripción de Pantallas Principales16
6. ARQUITECTURA Y TECNOLOGÍA17
6.1 Proceso de Selección del Stack Tecnológico17
6.2 Stack Tecnológico Definitivo18
6.3 Arquitectura del Sistema19
7. DESARROLLO POR ITERACIONES20
7.1 Sprint 1 – Detalle de Ejecución20
7.2 Tareas Completadas y Tiempo Invertido22
7.3 Incremento del Producto en el Sprint 125
7.4 Obstáculos Encontrados y Soluciones26
8. PRUEBAS27
8.1 Estrategia General de Pruebas27
8.2 Casos de Prueba Planificados28
8.3 Pruebas de Usabilidad y Diseño Visual28
8.4 Métricas de Rendimiento29
8.5 Criterios de Aceptación Global29
9. VALIDACIÓN CON EL USUARIO29
9.1 Importancia de la Validación en XP29
9.3 Análisis de la Entrevista e Insights30
9.4 Problemas y Oportunidades Detectadas30
9.5 Resultados Cuantitativos31
9.6 Conclusión de la Validación31
10. RESULTADOS DEL SPRINT 131
10.1 Evaluación General del Sprint31
10.2 Indicadores de Desempeño31
10.3 Incremento del Producto31
10.4 Valor Generado32
10.5 Objetivos para el Sprint 232
11. Lecciones Aprendidas — Sprint 133
12. Trabajo Futuro34
13. Anexos35
13.1 Repositorio GitHub del Proyecto35
13.2 Evidencia de la Entrevista con el Usuario35
13.3 Capturas de Pantalla de la Aplicación (Sprint 1)36
13.4 Otros Documentos de Soporte36

# RESUMEN EJECUTIVO
El presente documento constituye el informe de avance correspondiente al desarrollo inicial del proyecto denominado “Catálogo virtual de flora ornamental de Iquitos con identificación morfológica asistida”, ejecutado en el marco del curso de Botánica Sistemática como actividad de Responsabilidad Social Universitaria. Este proyecto tiene como propósito principal la creación de una herramienta digital interactiva que permita identificar especies ornamentales mediante la observación de caracteres morfológicos, facilitando su reconocimiento tanto para estudiantes como para la comunidad en general. Durante esta primera fase, se ha llevado a cabo un proceso de planificación y levantamiento de información que incluye la selección inicial de especies, la estandarización de criterios morfológicos, el diseño de fichas técnicas y la definición de la estructura funcional del catálogo. Asimismo, se realizaron observaciones de campo y recopilación de material fotográfico en distintos espacios urbanos de la ciudad de Iquitos. Los resultados preliminares evidencian la necesidad de contar con herramientas accesibles que sistematicen la información botánica local, ya que actualmente existe limitada disponibilidad de recursos organizados para la identificación de flora ornamental. En respuesta a esta problemática, se propone el desarrollo de un catálogo virtual interactivo, priorizando la facilidad de uso, el valor educativo y la aplicabilidad práctica en contextos urbanos.

| ASPECTO | DETALLE EJECUTIVO |
| --- | --- |
| Nombre del proyecto | Catálogo virtual de flora ornamental de Iquitos con identificación morfológica asistida |
| Problema central | Escasa información sistematizada y accesible sobre especies ornamentales en Iquitos, lo que dificulta su identificación y uso adecuado en contextos urbanos y educativos. |
| Solución propuesta | Desarrollo de un catálogo virtual interactivo con fichas técnicas, banco fotográfico y sistema de búsqueda basado en caracteres morfológicos. |
| Usuario objetivo |  |
| Metodología adoptada | Trabajo por fases: planificación, levantamiento de campo, validación taxonómica, elaboración de fichas técnicas y desarrollo del catálogo digital. |
| Estado actual (Fase inicial) |  |
| Objetivo siguiente fase | Desarrollo funcional del catálogo, integración de base de datos y validación con usuarios. |


# PROBLEMA Y CONTEXTO

## Contexto General: Realidad de la flora ornamental en Iquitos
Iquitos, como principal ciudad de la Amazonía peruana, posee una alta diversidad de flora ornamental distribuida en espacios urbanos como parques, jardines, avenidas y áreas institucionales. Estas especies cumplen funciones importantes tanto estéticas como ecológicas, contribuyendo al paisaje urbano, la regulación ambiental y el bienestar de la población. Sin embargo, a pesar de esta riqueza vegetal, existe una limitada disponibilidad de información sistematizada, accesible y confiable sobre las especies ornamentales presentes en la ciudad. La identificación de plantas suele depender del conocimiento empírico, lo que dificulta su correcta clasificación, uso y conservación. En el ámbito académico, aunque existen conocimientos botánicos teóricos, estos no siempre se traducen en herramientas prácticas accesibles para estudiantes o ciudadanos. Asimismo, no se dispone de plataformas digitales locales que integren información morfológica, visual y taxonómica de manera interactiva.

## Problema Central
La ausencia de una herramienta digital interactiva que permita identificar y consultar especies de flora ornamental de Iquitos mediante características morfológicas, limitando el acceso al conocimiento botánico y su aplicación en contextos urbanos y educativos.La ausencia de una herramienta digital interactiva que permita identificar y consultar especies de flora ornamental de Iquitos mediante características morfológicas, limitando el acceso al conocimiento botánico y su aplicación en contextos urbanos y educativos.El problema que motivo el desarrollo del proyecto se define como





## 2.3 Manifestaciones del Problema
Esta problemática se manifiesta en diversas situaciones. En primer lugar, existe dificultad para identificar correctamente las especies ornamentales debido a la falta de conocimiento especializado y de herramientas de apoyo accesibles. Asimismo, la información disponible no se encuentra organizada de manera clara ni adaptada al contexto local, lo que dificulta su uso por parte de estudiantes y ciudadanos. Por otro lado, la ausencia de recursos digitales interactivos limita el aprendizaje práctico de la botánica, reduciendo la capacidad de los usuarios para reconocer, comparar y diferenciar especies. Esto conlleva a un bajo aprovechamiento de la biodiversidad ornamental y a un uso inadecuado de las especies en espacios urbanos.

| ASPECTO | DESCRIPCION DEL IMPACTO |
| --- | --- |
| Dificultad en la identificación de especies | Los usuarios no pueden reconocer plantas ornamentales sin conocimiento especializado. |
| Falta de información accesible | No existen plataformas locales organizadas con fichas técnicas claras y visuales. |
| Uso inadecuado de especies | Se seleccionan plantas sin criterios técnicos para espacios urbanos. |
| Limitaciones en el aprendizaje | Los estudiantes no cuentan con herramientas prácticas para aplicar la teoría botánica. |
| Desaprovechamiento de la biodiversidad | La flora ornamental local no es valorada ni difundida adecuadamente. |



## 2.4 Magnitud e Impacto del Problema
La falta de herramientas digitales especializadas en flora ornamental tiene un impacto significativo tanto en el ámbito educativo como en el social. Desde el punto de vista académico, limita el desarrollo de competencias prácticas en los estudiantes. Desde el punto de vista social, reduce la valoración y el conocimiento de la biodiversidad local. El desarrollo de un catálogo virtual permitirá mejorar el acceso a la información, facilitar la identificación de especies y promover el uso adecuado de la flora ornamental en la ciudad. Además, contribuirá a la educación ambiental y al fortalecimiento del conocimiento botánico en la población.

| INDICADOR | DETALLE |
| --- | --- |
| Disponibilidad de información | Limitada y dispersa |
| Acceso a herramientas digitales | Muy bajo a nivel local |
| Nivel de conocimiento botánico | Básico en población general |
| Uso de recursos visuales comparativos | Escaso |
| Interés en aprender sobre flora | Alto en estudiantes y comunidad |
| Necesidad de herramientas educativas | Elevada |

d) Perfil del Usuario Objetivo
El proyecto está dirigido a estudiantes, docentes y público en general interesados en la flora ornamental de Iquitos. Estos usuarios presentan un nivel básico o intermedio de conocimiento botánico y requieren una herramienta sencilla, visual e intuitiva que les permita identificar especies de manera práctica.

| DIMENSION | DESCRIPCIÓN |
| --- | --- |
| Usuario principal | Estudiante de Botánica / usuario general |
| Edad | 16 – 60 años |
| Contexto | Académico y urbano |
| Nivel digital | Básico a intermedio |
| Nivel educativo | Secundaria / universitario |
| Necesidad principal | Identificar especies de forma sencilla |
| Expectativa | Plataforma visual, intuitiva y fácil de usar |
| Uso esperado | Consulta, aprendizaje y apoyo en campo |



## 2.5 Análisis de Soluciones Existentes y Brechas
Frente a las limitaciones identificadas en las herramientas existentes, se propone el desarrollo de un catálogo virtual interactivo que integre fichas técnicas, imágenes y un sistema de búsqueda basado en características morfológicas. Esta solución busca ser accesible, fácil de usar y adaptada al contexto local, permitiendo cubrir las necesidades de los usuarios y mejorar el acceso al conocimiento botánico.

| SOLUCIÓN | CARACTERÍSTICAS | LIMITACIONES | BRECHA IDENTIFICADA |
| --- | --- | --- | --- |
| Libros botánicos |  | Poco accesibles y no interactivos | No prácticos para uso cotidiano |
| Páginas web generales | Información variada |  |  |
| Apps de identificación (genéricas) | Reconocimiento por imagen | Baja precisión en especies locales | No adaptadas a Iquitos |
| Bases de datos científicas | Información confiable | Lenguaje técnico complejo | Difícil acceso para usuarios comunes |
| Propuesta del proyecto | Catálogo interactivo con búsqueda morfológica y fichas técnicas | En desarrollo | Adaptado al contexto local y educativo |



# 3. PROPUESTA DE SOLUCIÓN

## 3.1 Visión del Producto
La solución propuesta consiste en el desarrollo de una plataforma digital denominada provisionalmente “Catálogo Virtual de Flora Ornamental de Iquitos”, diseñada como una herramienta interactiva de consulta e identificación botánica basada en características morfológicas.
Desarrollar una herramienta digital accesible, visual e intuitiva que permita a estudiantes, docentes y público en general identificar especies de flora ornamental de Iquitos mediante la observación de sus características morfológicas, facilitando el aprendizaje, la consulta y la valoración de la biodiversidad local.Desarrollar una herramienta digital accesible, visual e intuitiva que permita a estudiantes, docentes y público en general identificar especies de flora ornamental de Iquitos mediante la observación de sus características morfológicas, facilitando el aprendizaje, la consulta y la valoración de la biodiversidad local.




El sistema estará orientado a integrar información científica con recursos visuales, eliminando la dependencia de libros técnicos complejos y permitiendo el acceso desde dispositivos digitales de uso cotidiano.


## 3.2 Descripción Funcional del Sistema
El sistema PLANT-OR se compone de **tres aplicaciones independientes pero integradas**, que comparten la misma base de datos (Sanity.io) y el mismo sistema de autenticación (Clerk):

3.2.1 Aplicación 1: App Móvil 
Aplicación móvil (multiplataforma para Android e iOS), orientada al registro de campo de plantas ornamentales y la consulta del catálogo botánico validado. La aplicación esta organizada en una navegación por pestañas con 5 tabs (Buscador, Mapa, Registro, Pendientes/Sincronización, Perfil) y un sistema de autenticación protegido con redirección automática. Incluye los siguientes módulos funcionales:
Módulo de Autenticación y Seguridad
Gestiona el acceso de los usuarios al sistema, garantizando la seguridad de la información y el control de sesiones. Incluye las siguientes funcionalidades:

-	Inicio de sesión con correo electrónico y contraseña: Pantalla con campos de correo electrónico (con validación de formato), contraseña y botón de inicio de sesión. Al autenticarse correctamente, se establece la sesión activa y se redirige al buscador principal.
-	Inicio de sesión con Google OAuth: Botón de inicio rápido con Google que ejecuta el flujo OAuth completo. Durante la validación del token se muestra un indicador de carga (spinner). Al completarse, se redirige automáticamente al buscador.
-	Registro de cuentas con verificación por correo: Pantalla de registro con campos de correo electrónico y contraseña. Al registrarse, se envía un código de verificación por correo electrónico. La pantalla muestra una segunda vista para ingresar el código de verificación recibido. Una vez verificado, se crea la sesión activa.
-	Caché de sesión y Modo Invitado para uso offline: Clerk (el sistema de login) requiere internet. Para solucionar esto, la app tiene dos mecanismos:
1. Si el usuario inició sesión antes, se guarda una copia de su perfil para recordar quién es y autocompletar sus datos.
2. Si el usuario nunca ha iniciado sesión y abre la app sin internet, el sistema activa un "Modo Invitado Offline". Le permite entrar a la app y registrar plantas escribiendo sus datos manualmente. Cuando vuelva a tener internet y quiera sincronizar ("Pendientes"), la app le exigirá iniciar sesión en ese momento para asociar todos los registros guardados a su cuenta oficial.
-	Gestión de roles: El sistema identifica el rol del usuario (admin, profesor_validador, estudiante y ciudadano). Los roles se gestionan desde Clerk publicMetadata.

---

**Módulo de Catálogo y Búsqueda**
Permite explorar las especies validadas del catálogo botánico. Constituye la pantalla principal de la aplicación (pestaña "Buscador"). Incluye las siguientes funcionalidades:

- **Cabecera personalizada**: Muestra el avatar del usuario (desde Clerk), saludo personalizado con su nombre ("Hola, {nombre}!"), badge de rol (ADMIN o PROFESOR) si corresponde, un subtítulo motivacional y un **ícono de campana interactiva** que abre el modal de "Mis aportes" para revisar el estado de los registros realizados.
- Buscador por texto en tiempo real: Barra de búsqueda que filtra especies conforme el usuario escribe, buscando simultáneamente por nombre común o científico. El filtrado se realiza localmente sobre los datos cargados.
- **Filtro por hábito de crecimiento mediante chips horizontales**: Fila de botones deslizables (chips) con las opciones: Todo, Árbol, Palmera, Arbusto, Liana, Hierba. Al presionar un chip, se filtran las especies por el hábito seleccionado. El chip activo se resalta con color verde (#1FC451).
- **Filtros dinámicos avanzados**: Botón de filtros en la barra de búsqueda que abre un modal con categorías de filtros creados y gestionados por los profesores validadores desde el panel administrativo web. Los filtros se cargan desde la base de datos Sanity (schema "filtro", solo los que están activos). Se agrupan por categoría y soportan selección única o múltiple según la configuración del filtro. Se permite un máximo de 3 filtros simultáneos. Incluye botón de "Limpiar Filtros" y cada filtro puede tener un ícono asociado (MaterialCommunityIcons).
- **Cuadrícula de tarjetas de plantas** (PlantCard.tsx): Las especies se muestran como tarjetas visuales con imagen de la galería (primera foto), nombre común o científico, hábito de crecimiento y familia botánica. Solo se muestran las plantas en estado "Validado". Al presionar una tarjeta, se navega a la ficha técnica completa.

---

**Módulo de Fichas Técnicas**
Presenta la información completa de cada especie validada. Se accede al presionar una tarjeta de planta desde el buscador o desde el mapa interactivo (plant/[id].tsx). Incluye:

- **Carrusel de imágenes**: Galería superior interactiva (deslizamiento y puntos indicadores). Si no hay fotos, muestra un ícono de hoja con el texto "Sin imagen".
- **Cabecera y Taxonomía**: Título principal con los nombres comunes y subtítulo destacado con el nombre científico.
- **Ficha Técnica General**: Bloque con la familia botánica, dirección referencial, hábito de crecimiento y todos los datos reproductivos generales (detalles de flores, frutos y semillas).
- **Caracteres morfológicos dinámicos (Bloques Específicos)**: El sistema detecta el hábito de crecimiento (Árbol, Palmera, Arbusto, Liana o Hierba) y despliega dinámicamente un bloque exclusivo con los datos morfológicos específicos recolectados para esa forma de vida (ej. dasometría, detalles de corteza/tallo, características de hojas).
- **Ubicación y Mapa**: Desglose de la ubicación geográfica (distrito, dirección exacta, sustrato) acompañado de un minimapa interactivo que visualiza el pin exacto de la planta.
- **Impacto Urbano y Valor**: Listado de los valores ornamentales de la especie, posibles impactos urbanos, estado físico del individuo y su estado fenológico.
- **Información del Registrador**: Tarjeta final que otorga crédito al autor del registro, mostrando su nombre completo y, de corresponder, su información académica (facultad y curso).

---

**Módulo de Registro Botánico**
Permite a estudiantes y ciudadanos registrar plantas ornamentales desde sus dispositivos móviles mediante un formulario de 5 pasos secuenciales con barra de progreso visual (registro.tsx, pestaña "Registro"). Incluye las siguientes funcionalidades:

- **Paso 1 – Datos Personales**: Selección de rol del registrador (estudiante o ciudadano) mediante botones de opción. Si el rol es "estudiante", se muestran los campos: nombre completo, DNI (8 dígitos), correo electrónico, curso, facultad, escuela y día de clase. Si el rol es "ciudadano", se omiten los campos académicos (DNI, facultad, escuela, curso, día de clase). Los campos se autocompletan desde el perfil del usuario almacenado en Clerk (unsafeMetadata). No se puede avanzar al paso 2 sin completar los campos obligatorios.
- **Paso 2 – Ubicación con geolocalización**: Captura de coordenadas GPS automática mediante expo-location al ingresar al paso. Se muestra un mapa interactivo (react-native-maps) con un marcador arrastrable que permite al usuario ajustar la ubicación exacta. Incluye campos para: distrito, dirección, tipo de ubicación 1 (Jirón, Avenida, Calle, Pasaje, Parque u otro), tipo de ubicación 2 (Vereda, Berma central u otro), número de casa y sustrato de la planta (En tierra, En macetero u otro). No se puede avanzar sin ubicación confirmada.
- **Paso 3 – Identificación Botánica**: Campos para nombre local, nombre científico y familia botánica. Selección del hábito de la planta (Árbol, Palmera, Arbusto, Liana, Hierba) que activa el formulario dinámico correspondiente. Selección del tipo de vida (Terrestre, Epífita, Parásita). Los formularios dinámicos por hábito son componentes independientes (FormArbol, FormPalmera, FormArbusto, FormLiana, FormHierba) que contienen todos los campos definidos en el documento PLANT-OR: datos dasométricos, tronco/tallo, hojas, flores, frutos, semillas, exudado, ramificación y copa. **Fidelidad Botánica:** Los formularios respetan de manera estricta y al 100% las opciones de *estado fenológico, estado del individuo, valor ornamental e impacto urbano* individualizadas para cada uno de los 5 hábitos de crecimiento, tal como lo define el diagrama de clases original. El sistema carga las listas específicas para cada forma de vida (ej. mostrando "Riesgo de caída de ramas" solo para árboles y "Riesgo de caída de hojas" solo para palmeras), abandonando enfoques de listas compartidas genéricas. Se implementó un sistema de validación exhaustiva por hábito (validation.ts) y una función getMissingSections() que genera un modal con la lista de campos faltantes y botones que hacen scroll automático al campo correspondiente. Los campos numéricos (altura, diámetro, longitud, tamaño de semilla) aplican un filtro regex que solo permite dígitos y puntos decimales, activando automáticamente el teclado numérico en el dispositivo. Para ciudadanos, este paso se omite completamente.
- **Paso 4 – Captura Fotográfica**: Se presentan 5 ranuras obligatorias etiquetadas (planta completa, hoja, flor, fruto, semilla), cada una con la opción de capturar desde la cámara del dispositivo o seleccionar desde la galería (expo-image-picker). Se pueden agregar fotografías extras opcionales. Se muestra vista previa de cada imagen con opción de reemplazo. No se puede avanzar al resumen sin las 5 fotos obligatorias completadas.
- **Paso 5 – Resumen previo al envío**: Vista previa completa de todos los datos ingresados: datos personales, ubicación con mapa, identificación botánica, caracteres morfológicos según hábito y fotografías. Se ofrecen botones para regresar y editar cualquier paso, o confirmar y enviar. Si hay conexión a internet, el registro se sube directamente a Sanity con estado "En revisión". Si no hay conexión, se guarda automáticamente en almacenamiento local (modo offline).
- **Modo de edición de registros observados**: Cuando un profesor marca un registro como "Observado", el usuario puede acceder al formulario de registro precargado con todos los datos existentes del registro (incluyendo fotos ya subidas a Sanity). Se muestra el motivo de observación del profesor. Las fotografías existentes en Sanity se preservan si no se cambian, extrayendo el _ref del asset desde la URL mediante regex para evitar resubir la imagen.
- **Edición de registros locales offline**: Los registros guardados localmente pueden ser editados desde la pestaña "Pendientes", precargando todos los datos almacenados en la cola offline.


---

**Módulo de Mapa Interactivo**
Visualiza las plantas validadas georreferenciadas en un mapa centrado en Iquitos (mapa.tsx, pestaña "Mapa"). Incluye las siguientes funcionalidades:

- **Mapa a pantalla completa**: Mapa centrado en las coordenadas de Iquitos (-3.749, -73.253) con estilo oscuro personalizado (darkMapStyle) para consistencia con el tema general de la aplicación. Utiliza Google Maps como proveedor de mapas.
- **Marcadores de plantas validadas**: Cada planta validada con coordenadas se muestra como un marcador verde en el mapa. Solo se muestran plantas en estado "Validado".
- **Clustering automático**: Los marcadores cercanos se agrupan automáticamente en clusters con un contador numérico (react-native-map-clustering), mejorando el rendimiento en dispositivos de gama media al reducir la carga de renderizado.
- **Tarjeta flotante al presionar marcador**: Al seleccionar un marcador, el mapa se anima suavemente hacia la ubicación y aparece una tarjeta flotante en la parte inferior con la miniatura de la planta (primera imagen de la galería), nombre científico o común, hábito de crecimiento y familia botánica.
- **Navegación a ficha técnica**: Al presionar la tarjeta flotante, se navega a la ficha técnica completa de la planta seleccionada (plant/[id]).
- **Barra de búsqueda geográfica**: Barra flotante en la parte superior que permite filtrar los marcadores por texto, buscando en: nombre de la planta, nombre científico, distrito, dirección, tipo de ubicación y número de casa. Se muestra un contador de resultados encontrados.
- **Descartar selección**: Al presionar cualquier zona del mapa fuera de un marcador, se cierra la tarjeta flotante.

---

**Módulo Offline y Sincronización**
Permite registrar plantas sin conexión a internet y gestionar los registros pendientes de sincronización (sync.tsx, pestaña "Pendientes"). Incluye las siguientes funcionalidades:

- **Guardado automático offline**: Cuando el usuario completa un registro sin conexión a internet, el sistema guarda automáticamente todos los datos del formulario en almacenamiento local (AsyncStorage) mediante las funciones CRUD de offline-storage.ts. Las fotografías se copian desde la ubicación temporal de expo-image-picker al directorio permanente de la aplicación (FileSystem.documentDirectory) mediante la función persistImage(), evitando la pérdida de fotos al cerrar la app.
- **Indicador de conectividad**: En la cabecera de la pestaña se muestra un badge visual con el estado de conexión: "Conectado" (verde con ícono wifi) o "Sin conexión" (rojo con ícono wifi-off). La detección de red se realiza mediante expo-network con la función checkIsOffline() que verifica tanto el estado de la red como la accesibilidad real a internet.
- **Lista de registros pendientes**: Se muestran todos los registros guardados localmente como tarjetas con el nombre científico (o "Por identificar"), hábito de la planta, fecha de guardado y mensajes de error de sincronización previos si los hubiere.
- **Botón "Sincronizar Todo"**: Sube secuencialmente todos los registros pendientes a Sanity incluyendo las fotografías. La función syncRegistro() sube cada foto como asset de Sanity y crea el documento de planta con todas las referencias. Los registros sincronizados exitosamente se eliminan de la cola local. Se muestra un mensaje con el conteo de registros sincronizados. El botón se desactiva si no hay conexión o si ya está sincronizando.
- **Eliminación individual de registros locales**: Cada registro tiene un botón de eliminar que muestra un modal de confirmación con título, descripción del riesgo ("Esta acción no se puede deshacer") y botones de Cancelar/Eliminar.
- **Edición de registros pendientes**: Al presionar una tarjeta de registro, se navega al formulario de registro en modo edición con los datos precargados desde la cola local, permitiendo modificar la información antes de sincronizar.
- **Requerimiento de sesión para sincronizar**: Si el usuario no tiene una sesión activa de Clerk al intentar sincronizar, se muestra un mensaje y se redirige a la pantalla de inicio de sesión. Al sincronizar, se sobrescriben los datos del autor con los datos de la cuenta de Clerk para garantizar la trazabilidad.
- **Pull-to-refresh**: El usuario puede arrastrar hacia abajo para actualizar la lista de registros pendientes y el estado de conectividad.

---

**Módulo de Notificaciones In-App**
Mantiene informado al registrador sobre el estado de sus registros botánicos. Integrado en la pantalla del buscador principal (index.tsx). Incluye las siguientes funcionalidades:

- **Ícono de campana con indicador de cambios**: En la cabecera del buscador se muestra un ícono de campana. Cuando hay cambios en el estado de los registros del usuario (nuevas validaciones, observaciones o rechazos), se muestra un punto rojo indicador de notificaciones no leídas.
- **Detección inteligente de cambios**: El sistema genera una "firma" del estado actual de los registros (concatenación de IDs y estados) y la compara con la firma almacenada previamente en AsyncStorage. Si difieren, se activa el indicador de no leídas. Al abrir las notificaciones, se guarda la firma actualizada y se resetea el indicador.
- **Modal "Mis Aportes"**: Al presionar la campana, se abre un modal con la lista completa de los registros del usuario, mostrando el nombre de la planta y el estado actual de cada registro con colores diferenciados: "En revisión" (blanco), "Observado" (naranja), "Validado" (verde), "Rechazado" (rojo).
- **Navegación contextual desde notificaciones**: Al presionar un registro observado, se cierra el modal y se navega al formulario de registro en modo edición con los datos precargados del registro. Al presionar un registro validado, se navega a la ficha técnica completa de la planta.

---

**Módulo de Perfil y Gestión de Cuenta**
Permite al usuario gestionar su información personal, académica y de participación en el proyecto (profile.tsx, pestaña "Perfil"). Incluye las siguientes funcionalidades:

- **Foto de perfil editable**: Muestra la foto de perfil del usuario (o sus iniciales si no tiene foto). Al presionar la foto: si no tiene foto, abre directamente la galería; si ya tiene foto, muestra un modal con opciones de "Cambiar foto" o "Eliminar foto". La imagen se recorta en proporción 1:1 con calidad al 50%, se convierte a base64 y se sube a Clerk. La eliminación envía null a Clerk.
- **Datos personales y correo electrónico**: Muestra el nombre completo del usuario y su correo electrónico principal.
- **Formulario de edición de datos**: Al tocar el nombre o el enlace "Toca para editar tus datos y perfil académico", se activa un modo de edición con campos de: nombre, apellido, DNI (validación de 8 dígitos), facultad, escuela, curso y día de clase. Incluye un toggle para mostrar/ocultar los campos de estudiante. Se muestran botones de "Guardar" y "Cancelar". Los datos se persisten en Clerk (unsafeMetadata) y se autocompletan en futuros registros botánicos.
- **Estadísticas de registros**: Sección con contadores visuales de los registros del usuario consultados en tiempo real desde Sanity: total de registros enviados, registros validados, registros observados y registros rechazados.
- **Barra de progreso hacia certificado**: Muestra una barra de progreso visual que indica el avance hacia la obtención del certificado digital. El umbral es diferenciado por rol: 20 registros validados para estudiantes y 100 para ciudadanos. La barra muestra el porcentaje de avance y los contadores (e.g., "5/20 registros validados").
- **Generación de certificados digitales PDF**: Al alcanzar el umbral de registros validados, se habilita el botón "Generar Certificado". El certificado se genera como un documento HTML/CSS renderizado con expo-print en formato A4 horizontal. Incluye: nombre del proyecto (configurable desde Sanity), título del certificado, nombre completo del participante, texto descriptivo con conteo de registros validados, tipo de participación (Estudiante/Ciudadano) y periodo de participación (calculado automáticamente desde la fecha del primer al último registro validado), firmas digitales de los responsables del proyecto (imágenes cargadas desde Sanity schema "configuracion"), fecha de emisión, código de verificación único (formato CERT-YYYYMMDD-XXXXXX) y URL de validación en línea. El certificado se registra en Sanity (schema "certificado" — **Nota**: un *Schema* o esquema en Sanity es el "molde" o modelo de datos que define qué campos e información se guardará, equivalente a una tabla en una base de datos) con código único. Si el certificado ya existe, se auto-actualiza el conteo de registros validados si ha aumentado. El PDF se puede compartir/descargar mediante expo-sharing.
- **Acceso a "Acerca del Proyecto"**: Botón que navega a la pantalla informativa (about.tsx) con la presentación del proyecto, justificación, objetivo, funcionalidades disponibles, información académica (curso, institución, ámbito) y datos de Responsabilidad Social Universitaria.
- **Cierre de sesión**: Botón de "Cerrar sesión" (SignOutButton.tsx) que muestra un modal de confirmación antes de cerrar la sesión. Al confirmar, se cierra la sesión de Clerk y se redirige a la pantalla de inicio de sesión.


### 3.2.2 Aplicación 2: Panel Administrativo Web (Vite + React)
Aplicación web diseñada exclusivamente para el equipo de profesores validadores y administradores del proyecto. Construida con React, Vite y protegida mediante Clerk, proporciona un entorno seguro para la gestión integral de los registros botánicos. Incluye los siguientes módulos funcionales:

- **Módulo de Autenticación y Control de Acceso (Clerk)**:
  - Sistema de inicio de sesión exclusivo para roles autorizados (`admin` y `profesor_validador`).
  - Protección de rutas: si un usuario sin los permisos requeridos intenta acceder, es redirigido automáticamente a una página de acceso denegado.
  - Gestión de sesiones segura integrada directamente con el ecosistema de Clerk.

- **Módulo de Dashboard (Panel de Control)**:
  - Vista principal que muestra métricas clave del proyecto en tiempo real: número total de especies validadas, registros pendientes de revisión, usuarios activos y estadísticas de participación por facultad.
  - Gráficos estadísticos que resumen el avance de las recolecciones de información a lo largo del tiempo.

- **Módulo de Validación de Registros**:
  - Interfaz de revisión tipo bandeja de entrada (inbox) donde los profesores pueden evaluar los registros enviados por estudiantes y ciudadanos ("En revisión").
  - Vista detallada del registro que muestra en paralelo las fotografías enviadas y los datos morfológicos ingresados.
  - Opciones de acción: **Validar** (aprueba el registro para el catálogo público), **Observar** (devuelve el registro al estudiante con comentarios específicos obligatorios indicando qué debe corregir) y **Rechazar** (descarta el registro definitivamente).
  - Al cambiar de estado, se actualiza automáticamente el documento en Sanity y dispara la notificación in-app en la aplicación móvil del registrador.

- **Módulo de Gestión de Filtros Dinámicos**:
  - Interfaz CRUD (Crear, Leer, Actualizar, Eliminar) para administrar los filtros avanzados utilizados en la aplicación móvil.
  - Permite crear categorías de filtro (ej. "Tipo de Inflorescencia", "Color de Flor"), definir sus opciones y establecer si permiten selección múltiple o única.
  - Posibilidad de activar o desactivar filtros globalmente, reflejándose los cambios en tiempo real en la app móvil gracias a las consultas hacia Sanity.

- **Módulo de Catálogo y Mapa Global**:
  - Tabla de datos avanzada para consultar todos los registros validados, con capacidades de búsqueda, paginación y exportación de datos para fines de investigación académica.
  - Mapa interactivo global que muestra la geolocalización de todos los registros del proyecto, permitiendo evaluar la distribución urbana de la flora en Iquitos.

- **Módulo de Gestión de Certificados**:
  - Panel para visualizar, buscar y verificar la autenticidad de los certificados digitales emitidos a estudiantes y ciudadanos.
  - Registro auditable de los umbrales alcanzados por los usuarios.

### 3.2.3 Aplicación 3: Portal Web Público
Página web de acceso libre orientada al público general. Desarrollada con React y Vite, comparte repositorio con el panel administrativo pero actúa como la interfaz pública del proyecto. No requiere autenticación e incluye los siguientes módulos funcionales:

- **Módulo de Catálogo Interactivo (Vistas Múltiples)**:
  - Es la pantalla principal de la plataforma. Ofrece dos modos de visualización intercambiables:
  - **Vista de Exhibición (Showcase / Galería)**: Una interfaz visual minimalista y elegante donde se destaca en gran formato la fotografía principal de la especie seleccionada, acompañada de su nombre común, científico y clasificación. A un lado, se presenta un carrusel vertical con miniaturas del resto de especies para una navegación rápida y fluida.
  - **Vista de Mapa Georreferenciado**: Un mapa interactivo (Leaflet con modo claro/oscuro automático) que muestra la ubicación exacta de las especies en la ciudad de Iquitos, incluyendo agrupación de marcadores (clustering).

- **Módulo de Búsqueda y Filtros Avanzados**:
  - **Buscador en tiempo real**: Permite localizar especies por nombre científico, nombre común, distrito o calle.
  - **Filtros Dinámicos**: Integrados directamente con la base de datos (Sanity), permitiendo a los ciudadanos realizar búsquedas avanzadas por hábito de crecimiento, estado fenológico, colores, tipos de hoja/fruto y valor ornamental.

- **Módulo de Ficha Técnica (Modal de Detalle)**:
  - Al seleccionar una especie desde el túnel o el mapa, se despliega un modal responsivo que centraliza toda la información técnica validada (galería fotográfica, taxonomía, morfología específica según hábito e impacto urbano).
  - Incluye la funcionalidad de "Ver en el mapa", que cierra el modal y centra el mapa global en las coordenadas exactas de esa planta específica.

- **Módulo de Validación de Certificados Públicos**:
  - Ruta de acceso libre (`/validar`) que permite a cualquier persona o institución ingresar el código único de un certificado digital generado por la app.
  - Consulta en tiempo real a la base de datos para confirmar la autenticidad, mostrando a quién pertenece y el número de registros validados por dicho usuario.




## 3.3 Alcance del Sistema – Sprint 1 al Sprint 6
El desarrollo del catálogo virtual se organizó en seis sprints. A continuación se detalla el alcance comprometido y el resultado real de cada iteración:

| SPRINT | OBJETIVO | ALCANCE COMPROMETIDO / RESULTADO |
| --- | --- | --- |
| Sprint 1 | Problema validado | Investigación del problema, definición del proyecto, autenticación, buscador con filtros, fichas técnicas, panel Sanity Studio. |
| Sprint 2 | Registro botánico | Formulario de registro completo (5 pasos), geolocalización con mapa, captura fotográfica, formularios dinámicos por hábito (Árbol, Palmera, Arbusto, Liana, Hierba), validación de campos. |
| Sprint 3 | MVP funcional | Modo offline con almacenamiento local, sincronización de registros pendientes, roles estudiante/ciudadano, notificaciones in-app, filtros dinámicos desde la base de datos. |
| Sprint 4 | Sistema completo | Mapa interactivo con clustering, edición de registros observados, perfil editable con datos académicos, foto de perfil, panel administrativo web con validaciones y filtros. |
| Sprint 5 | Optimización | Certificados digitales PDF, estadísticas del usuario, portal web público, optimizaciones de UX y rendimiento. |
| Sprint 6 | Producto final | Validación final con usuarios e instituciones, generación del APK, documentación completa, presentación final. |






## 3.4 Valor Diferencial y Justificación de la Propuesta
La propuesta se diferencia de otras soluciones existentes por los siguientes aspectos:
- Enfoque local: El catálogo está diseñado específicamente para la flora ornamental de Iquitos, priorizando especies presentes en el contexto amazónico.
- Accesibilidad: La herramienta será de fácil acceso y uso, orientada a usuarios sin conocimientos especializados en botánica.
- Enfoque educativo: Integra teoría y práctica, permitiendo a los estudiantes aplicar conocimientos morfológicos en situaciones reales.
- Sistema de identificación progresiva: A diferencia de herramientas tradicionales, permite identificar especies mediante la combinación de características visibles.
- Apoyo visual: El uso de imágenes comparativas mejora la comprensión y precisión en la identificación.
- Desarrollo colaborativo: El sistema se construye con información recolectada por estudiantes, fortaleciendo el aprendizaje y la validación académica.


# 4. METODOLOGIA: EXTREME PROGRAMMING (XP)

## 4.1 Fundamentos de la elección Metodológica
El equipo adoptó la metodología Extreme Programming (XP) como marco de trabajo para el desarrollo del proyecto “Catálogo virtual de flora ornamental de Iquitos con identificación morfológica asistida”, en concordancia con los lineamientos académicos del curso.
XP es una metodología ágil orientada al desarrollo iterativo e incremental, que permite construir soluciones funcionales mediante ciclos cortos de trabajo, con validación constante y mejora continua. Este enfoque resulta especialmente adecuado para proyectos académicos que requieren integrar investigación, desarrollo tecnológico y validación con usuarios.
La elección de XP frente a otras metodologías ágiles responde a las características específicas del proyecto:
- Equipos de trabajo colaborativos:XP se adapta a equipos pequeños, facilitando la coordinación entre los distintos roles del proyecto (levantamiento de información, validación botánica, desarrollo y contenido).
- Iteraciones cortas con entregables funcionales:Cada sprint permite avanzar progresivamente en la construcción del catálogo, integrando componentes como fichas técnicas, banco de imágenes y sistema de búsqueda morfológica.
- Retroalimentación continua:El proyecto incorpora validaciones constantes por parte de estudiantes, docentes y usuarios potenciales, asegurando que el catálogo sea comprensible, útil y funcional.
- Flexibilidad en el desarrollo:La información botánica y los requerimientos del sistema pueden ajustarse a lo largo del proceso, permitiendo mejorar la estructura del catálogo y la calidad de los datos sin afectar el avance general.
- Enfoque en la calidad del producto:XP promueve la revisión continua de la información, garantizando la consistencia en las fichas técnicas, la correcta identificación de especies y la calidad del contenido visual.


## 4.2 Roles Definidos en el Equipo

| ROL XP | ASIGNADO(a) | RESPONSABILIDADES |
| --- | --- | --- |
| Cliente (Tracker del usuario) |  | Mantener comunicación con el usuario real, validar entregas, recopilar feedback y traducirlo en ajustes de requerimientos. |
| Programador / Líder técnico | Danilo Alvarado Marlon Rengifo | Liderar las decisiones de arquitectura, gestionar el repositorio GitHub, desarrollar las funcionalidades críticas. |
| Programador / Tester | Angie Cabanillas Brittany Rengifo Walter Zumaeta | Desarrollar funcionalidades, diseñar y ejecutar casos de prueba, garantizar la calidad de cada entrega. |



## 4.3 Actividades Realizadas en el Primer Sprint
Durante el Sprint 1, el equipo se enfocó en la comprensión del problema, la definición del producto y la planificación técnica del sistema. Las actividades realizadas fueron las siguientes:
4.3.1. Investigación y análisis del problema: Se investigó la situación actual de la información disponible sobre flora ornamental en Iquitos. Se identificó la ausencia de herramientas digitales accesibles y especializadas.
4.3.2. Definición del proyecto: Se definió el nombre, alcance, objetivos y módulos funcionales del catálogo virtual, alineados con el Plan del Proyecto del curso de Botánica Sistemática.
4.3.2. Identificación del usuario real: Se identificó al usuario objetivo principal (estudiantes de Botánica Sistemática y público interesado en flora ornamental) y se realizó una entrevista de validación.
4.3.4. Selección del stack tecnológico: Se evaluaron diversas opciones y se seleccionó React Native con Expo para la app móvil, Sanity como CMS y base de datos, y Clerk para la autenticación de usuarios.
4.3.5. Diseño de la estructura de datos: Se definió el schema de la base de datos en Sanity con los campos necesarios para las fichas técnicas botánicas, organizados en el siguiente orden: galería fotográfica, nombres comunes, nombre científico, familia botánica, origen, hábito de crecimiento, caracteres diagnósticos, tipo de flor, color de flor principal, tipo de fruto, tipo de inflorescencia, tipo de semilla, tipo de infrutescencia, tipo y color de exudado, valor ornamental, descripción morfológica básica y usos urbanos.
4.3.6. Configuración del entorno de desarrollo: Se configuró el repositorio en GitHub, el proyecto de Expo, la conexión con Sanity y la integración con Clerk para autenticación por correo electrónico y Google OAuth.
4.3.7. Elaboración de prototipos iniciales: Se diseñaron wireframes de las pantallas principales del sistema.





## 4.4 Historias de Usuario

| CÓDIGO: HU-01 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como usuario, quiero registrarme con mi correo electrónico para acceder al catálogo. |
| CRITERIO DE ACEPTACIÓN | El usuario puede crear una cuenta con correo y contraseña. Se envía un código de verificación al correo. Los mensajes de error aparecen en español. |
| PRIORIDAD | Alta |



| CÓDIGO: HU-02 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como usuario, quiero iniciar sesión con Google para acceder de forma rápida |
| CRITERIO DE ACEPTACIÓN | El usuario puede autenticarse mediante Google OAuth. Se muestra un spinner de carga mientras se valida el token. Al completarse, se redirige al buscador principal. |
| PRIORIDAD | Alta |



| CÓDIGO: HU-03 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como usuario, quiero buscar plantas por nombre científico o común. |
| CRITERIO DE ACEPTACIÓN | El buscador filtra las especies en tiempo real conforme el usuario escribe. Se busca tanto por nombre científico como por nombres comunes. |
| PRIORIDAD | Alta |





| CÓDIGO: HU-04 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como usuario, quiero filtrar plantas por hábito de crecimiento. |
| CRITERIO DE ACEPTACIÓN | Se muestran chips horizontales (Todo, Árbol, Arbusto, Hierba, etc.) que filtran las especies al presionarlos. |
| PRIORIDAD | Alta |



| CÓDIGO: HU-05 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como usuario, quiero aplicar filtros morfológicos avanzados para encontrar especies. |
| CRITERIO DE ACEPTACIÓN | Un modal permite seleccionar filtros por: color de flor, tipo de inflorescencia, tipo de fruto, tipo de semilla y tipo de exudado. Los filtros se combinan entre sí. |
| PRIORIDAD | Alta |



| CÓDIGO: HU-06 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como usuario, quiero ver la ficha técnica completa de una planta. |
| CRITERIO DE ACEPTACIÓN | Al presionar una tarjeta de planta, se abre la vista de detalle con: galería de imágenes (carrusel), nombre científico, nombre común, familia botánica, origen, hábito de crecimiento, caracteres diagnósticos, tipo de flor, color de flor principal, tipo de fruto, tipo de inflorescencia, tipo de semilla, tipo de infrutescencia, tipo y color de exudado, valor ornamental, descripción morfológica básica y usos urbanos. Los campos vacíos no se muestran. |
| PRIORIDAD | Alta |



| CÓDIGO: HU-07 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como usuario, quiero ver imágenes de la planta en un carrusel. |
| CRITERIO DE ACEPTACIÓN | La galería muestra múltiples imágenes con navegación horizontal y puntos indicadores. Si no hay imágenes, se muestra un ícono de hoja. |
| PRIORIDAD | Alta |



| CÓDIGO: HU-08 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como usuario, quiero ver información sobre el proyecto. |
| CRITERIO DE ACEPTACIÓN | La pantalla "Acerca del Proyecto" muestra la presentación, justificación, objetivo, funcionalidades, información académica y datos de RSU. |
| PRIORIDAD | Media |




| CÓDIGO: HU-09 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como usuario, quiero cerrar sesión. |
| CRITERIO DE ACEPTACIÓN | Al presionar "Cerrar sesión" en el perfil, saldrá un modal para confirmar el cierre de sesión y después se redirige directamente a la pantalla de inicio de sesión. |
| PRIORIDAD | Alta |






| CÓDIGO: HU-10 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como administrador, quiero gestionar las fichas técnicas desde un panel web. |
| CRITERIO DE ACEPTACIÓN | Sanity Studio permite crear, editar y eliminar fichas de plantas con todos sus campos y galería de imágenes. |
| PRIORIDAD | Alta |



| CÓDIGO: HU-11 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como estudiante, quiero registrar una planta ornamental desde mi celular con un formulario completo de datos personales, ubicación, identificación botánica, fotografías y resumen. |
| CRITERIO DE ACEPTACIÓN | El formulario se divide en 5 pasos secuenciales. Los campos de datos personales se autocompletan desde el perfil del usuario. El paso 1 incluye nombre, DNI, email, curso, facultad, escuela y día de clase. No se puede avanzar sin completar los campos obligatorios de cada paso. |
| PRIORIDAD | Alta |



| CÓDIGO: HU-12 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como ciudadano, quiero registrar una planta ornamental con un formulario simplificado que solo requiera nombre, email, ubicación y fotografías. |
| CRITERIO DE ACEPTACIÓN | Al seleccionar el rol "ciudadano", el formulario omite los campos académicos (DNI, facultad, escuela, curso) en el paso 1 y salta directamente del paso 2 (ubicación) al paso 4 (fotografías), omitiendo el formulario botánico detallado. |
| PRIORIDAD | Alta |



| CÓDIGO: HU-13 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como registrador, quiero capturar la ubicación GPS automáticamente y ajustarla en un mapa interactivo. |
| CRITERIO DE ACEPTACIÓN | El paso 2 del registro captura las coordenadas GPS automáticamente al entrar. Se muestra un mapa con un marcador arrastrable para ajustar la ubicación. Se deben completar distrito, dirección, tipo de ubicación (Jirón, Avenida, Calle, Pasaje, Parque u otro) y sustrato de la planta (En tierra, En macetero u otro). No se puede avanzar sin ubicación confirmada. |
| PRIORIDAD | Alta |



| CÓDIGO: HU-14 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como estudiante, quiero que el formulario botánico se adapte dinámicamente según el hábito de la planta seleccionado. |
| CRITERIO DE ACEPTACIÓN | Al seleccionar un hábito (Árbol, Palmera, Arbusto, Liana o Hierba), se muestra un formulario específico con los campos correspondientes según el documento PLANT-OR: datos dasométricos, tronco/tallo, hojas, flores, frutos, semillas y secciones compartidas (estado fenológico, estado del individuo, valor ornamental e impacto urbano). Los campos se validan según obligatoriedad definida por hábito. |
| PRIORIDAD | Alta |



| CÓDIGO: HU-15 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como registrador, quiero capturar 5 fotografías obligatorias (planta completa, hoja, flor, fruto, semilla) y fotos adicionales opcionales. |
| CRITERIO DE ACEPTACIÓN | El paso 4 del registro presenta 5 ranuras obligatorias con etiquetas. Cada ranura permite capturar desde la cámara o seleccionar de la galería. Se pueden agregar fotografías extras. No se puede avanzar al resumen sin las 5 fotos obligatorias. Se muestra vista previa de cada imagen con opción de reemplazo. |
| PRIORIDAD | Alta |



| CÓDIGO: HU-16 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como registrador, quiero ver un resumen completo de todos los datos ingresados antes de enviar el registro. |
| CRITERIO DE ACEPTACIÓN | El paso 5 muestra un resumen con datos personales, ubicación en mapa, identificación botánica, caracteres morfológicos y fotografías. Se ofrecen botones para regresar y editar o confirmar y enviar. El registro se envía con estado "En revisión". |
| PRIORIDAD | Alta |



| CÓDIGO: HU-17 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como registrador en campo, quiero poder registrar plantas sin conexión a internet. |
| CRITERIO DE ACEPTACIÓN | Si no hay conexión disponible, el registro se guarda localmente en el dispositivo con las fotografías persistidas. Se muestra un mensaje indicando que el registro fue guardado offline. El usuario puede ver sus registros pendientes en la pestaña "Pendientes". |
| PRIORIDAD | Alta |



| CÓDIGO: HU-18 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como usuario, quiero sincronizar mis registros guardados offline cuando tenga conexión. |
| CRITERIO DE ACEPTACIÓN | La pestaña "Pendientes" muestra todos los registros guardados localmente con nombre, hábito, fecha y estado. Se muestra indicador de conectividad (Conectado/Sin conexión). El botón "Sincronizar Todo" sube todos los registros a Sanity incluyendo las fotografías. Los registros sincronizados se eliminan de la cola local. Los errores de sincronización se muestran por registro. Se puede eliminar registros locales individualmente con confirmación. |
| PRIORIDAD | Alta |



| CÓDIGO: HU-19 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como usuario, quiero ver las plantas registradas en un mapa interactivo. |
| CRITERIO DE ACEPTACIÓN | La pestaña "Mapa" muestra un mapa centrado en Iquitos con marcadores de plantas validadas. Los marcadores cercanos se agrupan en clusters con contador numérico. Al presionar un marcador, se muestra una tarjeta flotante con imagen, nombre, hábito y familia. Al presionar la tarjeta se navega a la ficha técnica completa. Incluye barra de búsqueda para filtrar por planta, calle o distrito. Se muestra estilo oscuro del mapa en dark mode. |
| PRIORIDAD | Alta |



| CÓDIGO: HU-20 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como registrador, quiero recibir notificaciones sobre el estado de mis registros. |
| CRITERIO DE ACEPTACIÓN | En la pantalla del buscador aparece un ícono de campana con indicador rojo cuando hay actualizaciones en los registros del usuario. Al presionar la campana, se muestra un modal con la lista de "Mis Aportes" mostrando el nombre y estado actual (En revisión, Observado, Validado, Rechazado) de cada registro con colores diferenciados. El indicador se resetea al abrir las notificaciones. |
| PRIORIDAD | Media |



| CÓDIGO: HU-21 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como registrador, quiero editar un registro que fue observado por un profesor. |
| CRITERIO DE ACEPTACIÓN | Desde las notificaciones, al presionar un registro observado se navega al formulario de registro precargado con los datos existentes. Se muestra el motivo de observación del profesor. Se pueden modificar los datos y reenviar el registro. Las fotografías existentes se preservan si no se cambian. |
| PRIORIDAD | Alta |



| CÓDIGO: HU-22 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como usuario, quiero editar mi perfil con datos personales y académicos. |
| CRITERIO DE ACEPTACIÓN | La pantalla de perfil permite editar nombre, apellido, DNI, facultad, escuela, curso y día de clase. Se activa un modo de edición con botones de guardar y cancelar. Si se completan datos académicos (DNI, facultad, escuela), se valida que estén correctos (DNI de 8 dígitos). Los datos del perfil se persisten en Clerk y se autocompletan en futuros registros. |
| PRIORIDAD | Media |



| CÓDIGO: HU-23 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como usuario, quiero cambiar o eliminar mi foto de perfil. |
| CRITERIO DE ACEPTACIÓN | Al presionar la foto de perfil, se puede seleccionar una imagen de la galería del dispositivo. Si ya tiene foto, se muestra la opción de cambiar o eliminar. La foto se recorta en proporción 1:1 y se sube a Clerk. |
| PRIORIDAD | Baja |



| CÓDIGO: HU-24 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como registrador, quiero generar un certificado digital PDF al alcanzar el umbral de registros validados. |
| CRITERIO DE ACEPTACIÓN | En el perfil se muestra una barra de progreso hacia el certificado (20 validados para estudiantes, 100 para ciudadanos). Al alcanzar el umbral, se habilita el botón "Generar Certificado". El certificado PDF incluye nombre del participante, número de registros validados, tipo de participación, periodo, código único de verificación y firmas de los responsables del proyecto (configurables desde Sanity). El PDF se genera en formato A4 horizontal y se puede compartir/descargar. El certificado se registra en la base de datos con código único para verificación en línea. |
| PRIORIDAD | Media |



| CÓDIGO: HU-25 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como usuario, quiero filtrar plantas con filtros dinámicos creados por los profesores validadores. |
| CRITERIO DE ACEPTACIÓN | En el buscador principal, al presionar el botón de filtros avanzados, se abre un modal con categorías de filtros agrupadas (creadas por profesores desde el panel admin). Los filtros pueden ser de selección única o múltiple según configuración. Los filtros se combinan entre sí y con la búsqueda por texto y hábito. Se muestra contador de filtros activos. Al limpiar filtros se restaura la vista completa. |
| PRIORIDAD | Alta |





## 5.1 Principios de Diseño de la Interfaz
El diseño de la interfaz se basa en los siguientes principios:
- Accesibilidad visual: Se utilizó un esquema de colores oscuro (dark mode) con acentos en verde (#1FC451) que evoca la temática botánica y reduce la fatiga visual en uso prolongado.
- Simplicidad de navegación: Se implementó una barra de navegación inferior con cinco pestañas (Buscador, Mapa, Registro, Pendientes y Perfil), organizando las funcionalidades de forma clara.
- Feedback inmediato: Los filtros se aplican en tiempo real, las transiciones entre pantallas incluyen animaciones de deslizamiento, y los estados de carga se indican con spinners.
- Diseño mobile-first: Toda la interfaz está optimizada para dispositivos móviles Android, con soporte táctil, teclados adaptativos y áreas de toque amplias.
- Consistencia visual: Se utiliza la librería Tamagui como sistema de diseño, garantizando consistencia en tipografía, espaciado y componentes a lo largo de toda la aplicación.

## 5.2 Flujo de Navegación del Sistema
El flujo de navegación del sistema es el siguiente:
- El usuario abre la aplicación.
- Si no tiene sesión activa, se muestra la pantalla de Inicio de Sesión.
- Desde Inicio de Sesión puede:
  - Iniciar sesión con correo y contraseña.
  - Iniciar sesión con Google.
  - Navegar a la pantalla de Registro de cuenta.
- Al autenticarse exitosamente, se redirige al Buscador Principal.
- La barra de navegación inferior contiene 5 pestañas:
  1. **Buscador**: Explorar especies validadas con filtros por texto, hábito y filtros dinámicos. Al presionar una tarjeta se abre la ficha técnica. Incluye campana de notificaciones.
  2. **Mapa**: Visualizar las plantas en un mapa interactivo con clustering y búsqueda geográfica.
  3. **Registro (+)**: Formulario de 5 pasos para registrar una planta nueva.
  4. **Pendientes**: Cola de registros guardados offline, con opción de sincronizar.
  5. **Perfil**: Datos del usuario, estadísticas, certificados, edición de perfil y cierre de sesión.


## 5.3 Descripción de Pantallas Principales
- Pantalla de Inicio de Sesión (sign-in.tsx):
  - Contiene el logo de la aplicación, campos de correo electrónico y contraseña (con toggle de visibilidad), botón de inicio de sesión, botón de inicio con Google y enlace para registrarse.
- Pantalla de Registro de Cuenta (sign-up.tsx):
  - Similar a la anterior, con campos de correo y contraseña. Al registrarse, se envía un código de verificación por correo. Incluye una segunda vista para ingresar el código de verificación.
- Buscador Principal (index.tsx):
  - Muestra el saludo personalizado con avatar del usuario, badge de rol si es admin o profesor, barra de búsqueda con botón de filtros dinámicos avanzados, chips de hábitos de crecimiento, cuadrícula de tarjetas de plantas con imagen, nombre, hábito y familia. Solo muestra plantas en estado "Validado". Incluye campana de notificaciones con indicador de no leídas. Soporta pull-to-refresh y estado vacío diferenciado para offline vs. sin resultados.
- Mapa Interactivo (mapa.tsx):
  - Mapa a pantalla completa centrado en Iquitos (-3.749, -73.253) con estilo oscuro. Muestra marcadores de plantas validadas con clustering automático. Al presionar un marcador aparece una tarjeta flotante con miniatura, nombre, hábito y familia, que al presionarla navega a la ficha técnica. Incluye barra de búsqueda flotante para filtrar por planta, calle o distrito, y contador de resultados.
- Registro Botánico (registro.tsx):
  - Formulario de 5 pasos secuenciales con barra de progreso visual:
    - Paso 1 – Datos Personales: Selección de rol (estudiante/ciudadano), nombre, DNI, email, curso, facultad, escuela, día de clase. Los campos se autocompletan desde el perfil de Clerk.
    - Paso 2 – Ubicación: Mapa interactivo con marcador arrastrable, GPS automático, campos de distrito, dirección, tipo de ubicación 1 (Jirón, Avenida, etc.), tipo de ubicación 2 (Vereda, Berma central, etc.), número de casa y sustrato (En tierra, En macetero).
    - Paso 3 – Identificación Botánica: Nombre local, nombre científico, familia, hábito de la planta (activa formulario dinámico), tipo de vida, formulario específico por hábito (FormArbol, FormPalmera, FormArbusto, FormLiana, FormHierba), caracteres reproductivos (flores, frutos, semillas), y formulario compartido (estado fenológico, estado del individuo, valor ornamental, impacto urbano). Incluye modal de campos faltantes con scroll al campo.
    - Paso 4 – Fotografías: 5 ranuras obligatorias (planta completa, hoja, flor, fruto, semilla) con captura desde cámara o galería, más fotografías extra opcionales. Vista previa con opción de zoom y reemplazo.
    - Paso 5 – Resumen: Vista previa completa de todos los datos antes de enviar. Si hay conexión, sube a Sanity directamente; si no hay conexión, guarda offline.
- Sincronización / Pendientes (sync.tsx):
  - Muestra indicador de conectividad (Conectado/Sin conexión). Lista de registros guardados offline con nombre, hábito y fecha. Botón "Sincronizar Todo" para subir todos los registros pendientes. Cada registro puede ser editado (navega al formulario) o eliminado con confirmación.
- Ficha Técnica (plant/[id].tsx):
  - Presenta un carrusel de imágenes en la parte superior, seguido del nombre de la planta, nombre científico, y una sección de "Ficha Técnica" con todos los caracteres morfológicos organizados en ítems con íconos. Los campos sin datos no se muestran. Incluye secciones de descripción morfológica y usos urbanos.
- Perfil (profile.tsx):
  - Muestra la foto de perfil del usuario (editable con cámara/galería), nombre y correo electrónico. Incluye estadísticas de registros (total, validados, observados, rechazados), barra de progreso hacia certificado, botón para generar certificado PDF, formulario de edición de datos académicos (nombre, DNI, facultad, escuela, curso, día de clase), acceso a "Acerca del Proyecto" y botón de cerrar sesión.
- Acerca del Proyecto (about.tsx):
  - Página informativa con la presentación del proyecto, justificación, objetivo, funcionalidades disponibles, información académica (curso, institución, ámbito) y datos de RSU.

# 6. ARQUITECTURA Y TECNOLOGÍA

## 6.1 Proceso de Selección del Stack Tecnológico
La selección del stack tecnológico se realizó considerando los siguientes criterios:
- Accesibilidad multiplataforma: Se requería una solución que funcionara en dispositivos Android de gama baja a media, comunes entre los estudiantes de la UNAP.
- Velocidad de desarrollo: Al tratarse de un proyecto académico con plazos definidos por sprints, se priorizaron herramientas que permitieran un desarrollo ágil.
- Gestión de contenido flexible: La información botánica necesita ser actualizada constantemente por múltiples colaboradores (estudiantes del curso de Botánica Sistemática), por lo que se requería un CMS accesible desde la web.
- Autenticación segura: Se necesitaba un sistema de autenticación robusto que permita controlar el acceso al catálogo.
- Costo: Se priorizaron herramientas con planes gratuitos o de bajo costo para proyectos académicos.

## 6.2 Stack Tecnológico Definitivo

**App Móvil (React Native + Expo)**

| CAPA | TECNOLOGÍA | VERSIÓN | JUSTIFICACIÓN |
| --- | --- | --- | --- |
| Framework | React Native + Expo | RN 0.81 / Expo 54 | Framework multiplataforma que permite desarrollar para Android e iOS desde un solo código base. |
| UI Components | Tamagui | 1.135 | Librería de componentes UI optimizada para React Native con sistema de diseño consistente. |
| Navegación | Expo Router (Stack + Tabs) | 4.x | Sistema de navegación basado en archivos con JS Stack para animaciones bidireccionales. |
| Mapas | react-native-maps + react-native-map-clustering | - | Mapas nativos de Google Maps con clustering automático de marcadores. |
| Geolocalización | expo-location | 18.x | Acceso al GPS del dispositivo con diferentes niveles de precisión. |
| Cámara y Galería | expo-image-picker | 16.x | Captura fotográfica desde cámara y selección desde galería del dispositivo. |
| Generación PDF | expo-print + expo-sharing | - | Generación de certificados PDF y compartir archivos. |
| Almacenamiento local | @react-native-async-storage/async-storage | - | Almacenamiento persistente para registros offline y caché. |
| Sistema de archivos | expo-file-system | - | Persistencia de imágenes en el directorio del dispositivo para modo offline. |
| Red | expo-network | - | Detección de estado de conectividad para modo online/offline. |
| Almacenamiento seguro | expo-secure-store | 15.x | Almacenamiento encriptado para tokens de autenticación. |
| Íconos | @expo/vector-icons | 15.x | Íconos vectoriales (MaterialCommunityIcons, Feather, AntDesign). |

**Panel Administrativo Web (Vite + React)**

| CAPA | TECNOLOGÍA | VERSIÓN | JUSTIFICACIÓN |
| --- | --- | --- | --- |
| Framework | Vite + React | - | Build tool rápido con React para desarrollo de SPA. Permite una experiencia de desarrollo ágil y compilación optimizada. |
| Autenticación | @clerk/clerk-react | - | Integración de Clerk para autenticación web con control de roles. |
| Routing | React Router DOM | 6.x | Navegación SPA con rutas protegidas para admin. |
| Estilos y UI | Tailwind CSS + Shadcn UI | - | Tailwind permite estilado mediante clases utilitarias para mantener consistencia, mientras Shadcn UI provee componentes accesibles (tablas, modales, formularios) que aceleran el desarrollo del panel. |
| Gestión de Estado | Zustand / React Query | - | Zustand para estados globales ligeros y React Query para manejar el fetching de datos, caché y sincronización eficiente con la base de datos. |
| Notificaciones | Sonner | - | Sistema de notificaciones toast con temas oscuros. |
| Íconos | Lucide React | - | Librería de íconos SVG modernos. |

**Portal Web Público (Landing Page y Catálogo)**

| CAPA | TECNOLOGÍA | VERSIÓN | JUSTIFICACIÓN |
| --- | --- | --- | --- |
| Framework | Vite + React | - | Construcción rápida de una web optimizada orientada a la presentación pública, asegurando fluidez en la carga. |
| Animaciones | GSAP | - | Librería profesional de animaciones (GreenSock), utilizada para crear la experiencia inmersiva y fluida (ej. animación 3D tipo túnel al inicio). |
| Estilos | Tailwind CSS | - | Permite implementar un diseño altamente visual y adaptativo (mobile-first) de forma rápida y concisa, clave para una landing page atractiva. |
| Modelado 3D | Three.js / R3F | - | Combinado con GSAP, permite renderizar escenas y modelos 3D directamente en el navegador, brindando un aspecto moderno e innovador a la web. |
| Integración CMS | @sanity/client | - | Cliente ligero para consultar las especies validadas directamente desde la base de datos y presentarlas al público sin requerir autenticación. |

**Servicios Compartidos**

| CAPA | TECNOLOGÍA | JUSTIFICACIÓN |
| --- | --- | --- |
| Backend / CMS | Sanity.io | CMS headless como base de datos NoSQL. Schemas: planta (25KB), filtro, certificado, configuracion. |
| Autenticación | Clerk | Autenticación multi-plataforma con roles (admin, profesor_validador, usuario). |
| Lenguaje | TypeScript 5.9 | Superset tipado de JavaScript para ambas aplicaciones. |
| Control de versiones | Git + GitHub | Repositorio único con las 3 aplicaciones. |


## 6.3 Arquitectura del Sistema
La arquitectura del sistema se compone de tres aplicaciones cliente que comparten los mismos servicios backend:

- **App Móvil (React Native + Expo)**:
  - Aplicación compilada con Expo que se ejecuta en dispositivos Android. Incluye autenticación, buscador con filtros dinámicos, fichas técnicas, registro botánico con geolocalización y fotografías, mapa interactivo con clustering, modo offline con sincronización, perfil con estadísticas y generación de certificados PDF.

- **Panel Administrativo Web (Vite + React)**:
  - SPA desplegada en la web para profesores validadores y administradores. Acceso protegido por roles de Clerk (solo admin y profesor_validador). Incluye dashboard, panel de validación de registros, gestión de filtros dinámicos, mapa de registros, catálogo completo y gestión de certificados.

- **Portal Web Público**:
  - Página web estática con landing page animada (GSAP) y catálogo público de especies validadas. Acceso libre sin autenticación.

- **Capa de Datos (Sanity.io)**:
  - Base de datos NoSQL con 4 schemas principales: planta (campos morfológicos completos por hábito, galería, geolocalización, estados de revisión), filtro (filtros dinámicos configurables por profesores), certificado (certificados digitales con código de verificación) y configuracion (parámetros globales del proyecto). Se accede mediante @sanity/client. *(Nota: Un "Schema" en este contexto es un archivo de configuración que define la estructura exacta, los tipos de datos y las reglas de validación de un documento en la base de datos).*

- **Capa de Autenticación (Clerk)**:
  - Servicio externo compartido por la app móvil (@clerk/clerk-expo) y el panel admin (@clerk/clerk-react). Gestiona registro, login (correo + Google OAuth), roles de usuario (publicMetadata) y datos académicos (unsafeMetadata).


# 7. DESARROLLO POR ITERACIONES

| 7.1 Sprint 1 – Detalle de Ejecución |  |
| --- | --- |
| Objetivo del Sprint | Validar el problema, definir el proyecto y establecer la base técnica del sistema. |
| Duración | 3 semanas |
| Actividades principales | - Investigación de la problemática de flora ornamental en Iquitos. - Revisión de soluciones existentes (libros botánicos, apps genéricas, bases de datos científicas). - Definición del alcance y los 4 módulos funcionales del sistema. - Selección y configuración del stack tecnológico. - Diseño del schema de base de datos en Sanity. - Implementación del sistema de autenticación (registro, inicio de sesión, Google OAuth). - Desarrollo de la pantalla principal del buscador con filtros por hábito. - Creación del componente de tarjeta de planta (PlantCard). - Implementación de la vista de detalle con ficha técnica. - Configuración del panel administrativo (Sanity Studio). - Entrevista de validación con usuario real. |





## 7.2 Tareas Completadas y Tiempo Invertido


| TAREA 01 | Investigación del problema y contexto |
| --- | --- |
| RESPONSABLE(S) | Todo el equipo |
| TIEMPO ESTIMADO | 1 semana |
| ESTADO | Completado |



| TAREA 02 | Definición del proyecto y módulos |
| --- | --- |
| RESPONSABLE(S) | Todo el equipo |
| TIEMPO ESTIMADO | 3 días |
| ESTADO | Completado |



| TAREA 03 | Configuración del entorno (Expo, Sanity, Clerk, GitHub) |
| --- | --- |
| RESPONSABLE(S) | Danilo Alvarado |
| TIEMPO ESTIMADO | 2 días |
| ESTADO | Completado |



| TAREA 04 | Diseño del schema de base de datos |
| --- | --- |
| RESPONSABLE(S) | Danilo Alvarado, Marlon Rengifo |
| TIEMPO ESTIMADO | 1 día |
| ESTADO | Completado |



| TAREA 05 | Sistema de autenticación (correo + Google) |
| --- | --- |
| RESPONSABLE(S) | Danilo Alvarado |
| TIEMPO ESTIMADO | 3 días |
| ESTADO | Completado |



| TAREA 06 | Pantalla del buscador principal |
| --- | --- |
| RESPONSABLE(S) | Danilo Alvarado, Marlon Rengifo |
| TIEMPO ESTIMADO | 2 días |
| ESTADO | Completado |



| TAREA 07 | Filtros morfológicos avanzados |
| --- | --- |
| RESPONSABLE(S) | Danilo Alvarado |
| TIEMPO ESTIMADO | 2 días |
| ESTADO | Completado |



| TAREA 08 | Vista de detalle (ficha técnica) |
| --- | --- |
| RESPONSABLE(S) | Danilo Alvarado, Marlon Rengifo |
| TIEMPO ESTIMADO | 2 días |
| ESTADO | Completado |



| TAREA 09 | Pantalla de perfil y "Acerca del proyecto" |
| --- | --- |
| RESPONSABLE(S) | Danilo Alvarado |
| TIEMPO ESTIMADO | 1 día |
| ESTADO | Completado |



| TAREA 10 | Entrevista con usuario real |
| --- | --- |
| RESPONSABLE(S) | Angie Cabanillas, Brittany Rengifo |
| TIEMPO ESTIMADO | 1 día |
| ESTADO | Completado |



| TAREA 11 | Elaboración del documento del Sprint 1 |
| --- | --- |
| RESPONSABLE(S) | Walter Zumaeta, Angie Cabanillas |
| TIEMPO ESTIMADO | 3 días |
| ESTADO | Completado |




| 7.3 Incremento del Producto en el Sprint 1 Al finalizar el Sprint 1, el producto cuenta con las siguientes funcionalidades operativas: | - Sistema de autenticación funcional (registro por correo con verificación, inicio de sesión, Google OAuth). - Traducción de mensajes de error de Clerk al español. - Toggle de visibilidad de contraseña. - Spinner de carga durante la autenticación con Google. - Buscador principal con filtro por texto (nombre científico y común). - Filtro por hábito de crecimiento mediante chips interactivos. - Modal de filtros morfológicos avanzados (color de flor, inflorescencia, fruto, semilla, exudado). - Tarjetas de plantas con imagen, nombre, hábito y familia. - Vista de detalle con carrusel de imágenes y ficha técnica completa. - Campos vacíos se ocultan automáticamente en la ficha técnica. - Pantalla de perfil con datos del usuario y cierre de sesión. - Pantalla "Acerca del Proyecto" con información de RSU. - Panel administrativo (Sanity Studio) para gestión de fichas botánicas. - Navegación con animaciones de deslizamiento bidireccionales. |
| --- | --- |






## 7.4 Obstáculos Encontrados y Soluciones


| OBSTÁCULO | Doble vista durante OAuth |
| --- | --- |
| DESCRIPCIÓN | Al iniciar sesión con Google, el usuario veía un parpadeo entre la pantalla de login y el buscador antes de la redirección final. |
| SOLUCIÓN APLICADA | Se implementó un spinner de carga a pantalla completa que se activa tras el login exitoso, ocultando la transición mientras Clerk valida el token. |




| OBSTÁCULO | Animaciones de navegación en Android |
| --- | --- |
| DESCRIPCIÓN | La librería Native Stack de React Navigation no mostraba animaciones de retroceso en Android. |
| SOLUCIÓN APLICADA | Se migró a JS Stack (@react-navigation/stack) con CardStyleInterpolators.forHorizontalIOS para garantizar animaciones bidireccionales consistentes. |



| OBSTÁCULO | Sombras fantasmas en tarjetas |
| --- | --- |
| DESCRIPCIÓN | Los componentes Card de Tamagui mostraban sombras dobles no deseadas cuando la propiedad "elevate" estaba activada. |
| SOLUCIÓN APLICADA | Se eliminó la propiedad "elevate" de todos los componentes Card en las pantallas de autenticación. |





| OBSTÁCULO | Mensajes de error en inglés |
| --- | --- |
| DESCRIPCIÓN | Los errores de Clerk (correo inválido, contraseña incorrecta, cuenta duplicada) aparecían en inglés. |
| SOLUCIÓN APLICADA | Se implementó un sistema de traducción de errores en el catch de cada formulario, mapeando los códigos de error de Clerk a mensajes en español. |



## 7.5 Sprint 2 – Registro Botánico Completo

| Sprint 2 – Detalle de Ejecución |  |
| --- | --- |
| Objetivo del Sprint | Implementar el módulo de registro botánico completo desde dispositivos móviles, incluyendo geolocalización, formularios dinámicos por hábito y captura fotográfica. |
| Duración | 3 semanas |
| Historias de Usuario | HU-11, HU-13, HU-14, HU-15, HU-16 |
| Actividades principales | - Diseño e implementación del formulario de registro de 5 pasos secuenciales con barra de progreso. - Integración de geolocalización (expo-location) con captura GPS automática. - Implementación de mapa interactivo (react-native-maps) con marcador arrastrable para selección de ubicación. - Desarrollo de 5 formularios dinámicos específicos por hábito: FormArbol.tsx (23KB), FormPalmera.tsx (30KB), FormArbusto.tsx (26KB), FormLiana.tsx (26KB), FormHierba.tsx (21KB). - Implementación de FormCompartido.tsx para campos compartidos entre todos los hábitos (estado fenológico, estado del individuo, valor ornamental, impacto urbano). - Creación del componente CustomSelectors (RadioSelect) para selectores con opción "Otro". - Desarrollo del módulo de captura fotográfica con expo-image-picker (cámara y galería) para 5 fotos obligatorias + extras. - Implementación de validation.ts (28KB) con funciones de validación por hábito (validateArbol, validatePalmera, validateArbusto, validateLiana, validateHierba) y getMissingSections. - Sistema de resumen previo al envío (paso 5) con vista previa completa. - Subida de imágenes a Sanity mediante API REST con autenticación por token. - Integración con el schema de planta en Sanity (25KB) con campos morfológicos completos organizados por hábito (arbol_datos, palmera_datos, arbusto_datos, liana_datos, hierba_datos). |


### 7.5.1 Tareas Completadas – Sprint 2

| TAREA | DESCRIPCIÓN |
| --- | --- |
| T2-01 | Diseño del formulario de registro en 5 pasos con barra de progreso |
| T2-02 | Integración de expo-location para geolocalización automática |
| T2-03 | Implementación de mapa interactivo con marcador arrastrable |
| T2-04 | Desarrollo de FormArbol con 12 secciones (dasometría, tronco, exudado, copa, hojas, flores, frutos, semillas, etc.) |
| T2-05 | Desarrollo de FormPalmera con secciones específicas (tipo palmera, tallo/estípite, inflorescencia, espinas) |
| T2-06 | Desarrollo de FormArbusto con secciones de tallo, ramificación y hojas |
| T2-07 | Desarrollo de FormLiana con mecanismo de fijación, tipo de soporte y crecimiento |
| T2-08 | Desarrollo de FormHierba con tipo de crecimiento y tallo herbáceo |
| T2-09 | Implementación de FormCompartido (estado fenológico, individuo, valor ornamental, impacto urbano) |
| T2-10 | Sistema de captura fotográfica (5 obligatorias + extras) con cámara y galería |
| T2-11 | Módulo de validación por hábito (validation.ts) con modal de campos faltantes |
| T2-12 | Resumen previo al envío con vista previa de todos los datos |
| T2-13 | Subida de registros a Sanity con fotos como assets |
| T2-14 | Actualización del schema de planta en Sanity con campos por hábito |

### 7.5.2 Incremento del Producto – Sprint 2
Al finalizar el Sprint 2, el producto incorpora:
- Formulario de registro botánico completo de 5 pasos funcional en la app móvil.
- Geolocalización con GPS automático y mapa interactivo con marcador arrastrable.
- 5 formularios dinámicos específicos por hábito con todos los campos definidos en el documento PLANT-OR.
- Captura fotográfica con 5 fotos obligatorias (planta completa, hoja, flor, fruto, semilla) y fotos adicionales.
- Validación exhaustiva de campos obligatorios por hábito con modal de navegación a campos faltantes.
- Resumen previo al envío con vista previa completa antes de confirmar.
- Pestaña "Registro (+)" en la barra de navegación inferior.

### 7.5.3 Obstáculos – Sprint 2

| OBSTÁCULO | Formularios extensos causan pérdida de scroll |
| --- | --- |
| DESCRIPCIÓN | Los formularios de Árbol y Palmera tienen más de 12 secciones, lo que dificultaba encontrar campos incompletos. |
| SOLUCIÓN APLICADA | Se implementó un sistema de refs por campo con getMissingSections() que genera un modal con la lista de campos faltantes y botones que hacen scroll automático al campo correspondiente. |



| OBSTÁCULO | Sanitización de campos numéricos |
| --- | --- |
| DESCRIPCIÓN | Los usuarios ingresaban texto en campos que esperaban valores numéricos (altura, diámetro, etc.). |
| SOLUCIÓN APLICADA | Se implementó un filtro en updateBotanic() que detecta campos numéricos por nombre y aplica regex para permitir solo dígitos y puntos decimales. |


---

## 7.6 Sprint 3 – MVP Funcional (Offline, Roles, Filtros)

| Sprint 3 – Detalle de Ejecución |  |
| --- | --- |
| Objetivo del Sprint | Convertir el sistema en un MVP funcional incorporando modo offline, diferenciación de roles, notificaciones y filtros dinámicos. |
| Duración | 3 semanas |
| Historias de Usuario | HU-12, HU-17, HU-18, HU-20, HU-25 |
| Actividades principales | - Implementación del modo offline con almacenamiento local (offline-storage.ts). - Desarrollo de la pestaña "Pendientes" (sync.tsx) para gestión y sincronización de registros offline. - Implementación de persistencia de imágenes en el directorio del dispositivo (expo-file-system). - Detección automática de conectividad (network.ts con expo-network). - Diferenciación de roles registrador (estudiante vs ciudadano) con formulario adaptativo. - Sistema de notificaciones in-app con campana e indicador de no leídas. - Integración de filtros dinámicos desde Sanity (schema "filtro") con agrupación por categoría. - Caché de perfil offline para permitir registro sin conexión a Clerk. |


### 7.6.1 Tareas Completadas – Sprint 3

| TAREA | DESCRIPCIÓN |
| --- | --- |
| T3-01 | Desarrollo de offline-storage.ts con funciones CRUD para cola de registros locales |
| T3-02 | Implementación de persistImage() para copiar fotos temporales al directorio persistente |
| T3-03 | Implementación de syncRegistro() para subir registros con fotos a Sanity |
| T3-04 | Desarrollo de sync.tsx con lista de pendientes, botón "Sincronizar Todo" y eliminación individual |
| T3-05 | Detección de conectividad con checkIsOffline() (network.ts) |
| T3-06 | Diferenciación de rol estudiante/ciudadano con formulario adaptativo (skip del paso 3 para ciudadano) |
| T3-07 | Sistema de notificaciones con campana, indicador rojo y modal de "Mis Aportes" |
| T3-08 | Integración de filtros dinámicos desde Sanity con selección única/múltiple por categoría |
| T3-09 | Caché de perfil offline (AsyncStorage) para registro sin sesión activa |
| T3-10 | Modal de confirmación para eliminar registros locales |

### 7.6.2 Incremento del Producto – Sprint 3
Al finalizar el Sprint 3, el producto incorpora:
- Modo offline completo: registro de plantas sin internet con persistencia local de datos y fotos.
- Pestaña "Pendientes" con indicador de conectividad, lista de registros guardados y sincronización masiva.
- Rol diferenciado: los ciudadanos tienen un formulario simplificado (sin datos académicos ni botánica detallada).
- Notificaciones in-app sobre el estado de registros del usuario con indicador de cambios no leídos.
- Filtros dinámicos avanzados cargados desde la base de datos, creados y gestionados por profesores.
- Navegación actualizada a 4 pestañas: Buscador, Registro, Pendientes, Perfil.

### 7.6.3 Obstáculos – Sprint 3

| OBSTÁCULO | Pérdida de fotos temporales al cerrar la app |
| --- | --- |
| DESCRIPCIÓN | Las URIs de expo-image-picker apuntan a archivos temporales que se eliminan al cerrar la aplicación. |
| SOLUCIÓN APLICADA | Se implementó persistImage() que copia cada foto al directorio permanente de la app (FileSystem.documentDirectory) antes de guardar el registro offline. |



| OBSTÁCULO | Sincronización sin sesión de Clerk |
| --- | --- |
| DESCRIPCIÓN | Si un usuario registra offline sin haber iniciado sesión, al sincronizar no tiene user ID. |
| SOLUCIÓN APLICADA | Se requiere inicio de sesión antes de sincronizar. El sistema detecta si el usuario no está logueado y lo redirige a sign-in. Al sincronizar, se sobrescriben los datos del autor con los de Clerk. |


---

## 7.7 Sprint 4 – Sistema Completo (Mapa, Edición, Perfil)

| Sprint 4 – Detalle de Ejecución |  |
| --- | --- |
| Objetivo del Sprint | Completar el sistema con mapa interactivo, edición de registros observados, perfil editable completo y panel administrativo web. |
| Duración | 3 semanas |
| Historias de Usuario | HU-19, HU-21, HU-22, HU-23 |
| Actividades principales | - Desarrollo de la pestaña Mapa (mapa.tsx) con react-native-map-clustering. - Implementación de búsqueda geográfica por planta, calle o distrito en el mapa. - Tarjeta flotante al presionar marcador con miniatura, nombre y navegación a ficha técnica. - Implementación de edición de registros observados (precarga de datos existentes en formulario). - Manejo de fotos existentes de Sanity en modo edición (extracción de _ref desde URL). - Desarrollo del perfil editable con datos académicos (profile.tsx). - Subida y eliminación de foto de perfil con expo-image-picker y Clerk. - Estadísticas del usuario (total, validados, observados, rechazados) consultadas desde Sanity. - Desarrollo inicial del panel administrativo web (admin-web) con Vite + React. |


### 7.7.1 Tareas Completadas – Sprint 4

| TAREA | DESCRIPCIÓN |
| --- | --- |
| T4-01 | Desarrollo de mapa.tsx con MapView, clustering, dark mode y coordenadas de Iquitos |
| T4-02 | Barra de búsqueda flotante en mapa con filtro por texto |
| T4-03 | Tarjeta flotante de planta al presionar marcador con thumbnail y navegación |
| T4-04 | Edición de registros observados con precarga de datos desde Sanity |
| T4-05 | Manejo de fotos existentes en modo edición (preservar assets de Sanity) |
| T4-06 | Formulario de edición de perfil con campos académicos |
| T4-07 | Subida/eliminación de foto de perfil con ImagePicker y Clerk |
| T4-08 | Consulta de estadísticas del usuario desde Sanity |
| T4-09 | Creación del proyecto admin-web con Vite + React + Clerk |
| T4-10 | Panel de validaciones con modal para aprobar/observar/rechazar |

### 7.7.2 Incremento del Producto – Sprint 4
Al finalizar el Sprint 4, el producto incorpora:
- Pestaña Mapa con visualización georreferenciada de plantas validadas, clustering y búsqueda geográfica.
- Edición completa de registros observados con precarga de datos y fotos existentes.
- Perfil editable con datos personales y académicos, foto de perfil, estadísticas de registros.
- Navegación final de 5 pestañas: Buscador, Mapa, Registro, Pendientes, Perfil.
- Panel administrativo web funcional con dashboard, validaciones y detalle de plantas.

### 7.7.3 Obstáculos – Sprint 4

| OBSTÁCULO | Fotos de Sanity en modo edición |
| --- | --- |
| DESCRIPCIÓN | Al editar un registro, las fotos ya están en Sanity como assets con _ref, pero el formulario espera URIs locales. |
| SOLUCIÓN APLICADA | Se implementó detección de URLs que empiezan con "http" en uploadFoto(). Para fotos existentes, se extrae el _ref del asset desde la URL mediante regex, evitando resubir la imagen. |



| OBSTÁCULO | Rendimiento del mapa con muchos marcadores |
| --- | --- |
| DESCRIPCIÓN | Al cargar cientos de marcadores en el mapa, el rendimiento se degradaba significativamente en dispositivos de gama media. |
| SOLUCIÓN APLICADA |  |


---

## 7.8 Sprint 5 – Optimización (Certificados, Estadísticas, Portal)

| Sprint 5 – Detalle de Ejecución |  |
| --- | --- |
| Objetivo del Sprint | Optimizar la experiencia del usuario con certificados digitales, estadísticas completas, portal web público y mejoras generales de UX. |
| Duración | 3 semanas |
| Historias de Usuario | HU-24 |
| Actividades principales | - Implementación de generación de certificados PDF con expo-print y expo-sharing. - Diseño del certificado en HTML/CSS con formato A4 horizontal, firmas digitales y código de verificación. - Creación del schema "certificado" en Sanity con código único, usuario, conteo y periodo. - Barra de progreso hacia certificado diferenciada por rol (20 para estudiantes, 100 para ciudadanos). - Integración con schema "configuracion" en Sanity para textos, firmas y responsables del certificado. - Implementación de la página de verificación de certificados (ValidarCertificadoPage). - Desarrollo del portal web público con catálogo de especies. - Gestión de filtros dinámicos desde el panel administrativo (FiltrosPage). - Gestión de certificados emitidos desde el panel administrativo (CertificadosPage). |


### 7.8.1 Tareas Completadas – Sprint 5

| TAREA | DESCRIPCIÓN |
| --- | --- |
| T5-01 | Generación de certificados PDF con expo-print (HTML template con CSS) |
| T5-02 | Compartir/descargar certificado con expo-sharing |
| T5-03 | Schema "certificado" en Sanity (codigo, usuario_id, registros_validados, tipo_participacion, periodo) |
| T5-04 | Schema "configuracion" en Sanity (titulo, texto, firmas, responsables del certificado) |
| T5-05 | Barra de progreso hacia certificado con umbral por rol |
| T5-06 | Auto-actualización del conteo de registros validados en certificado existente |
| T5-07 | Página de verificación de certificados en admin-web (ValidarCertificadoPage) |
| T5-08 | Gestión de certificados emitidos en admin-web (CertificadosPage) |
| T5-09 | Gestión de filtros dinámicos en admin-web (FiltrosPage) con CRUD completo |
| T5-10 | Mapa de registros en admin-web (MapaPage) |
| T5-11 | Portal web público con catálogo de especies (CatalogPage) |

### 7.8.2 Incremento del Producto – Sprint 5
Al finalizar el Sprint 5, el producto incorpora:
- Generación de certificados digitales PDF con diseño profesional, firmas de responsables y código de verificación único.
- Barra de progreso motivacional hacia el certificado diferenciada por rol de usuario.
- Verificación en línea de certificados mediante código único.
- Panel administrativo web completo con dashboard, validaciones, filtros dinámicos, mapa, catálogo y certificados.
- Portal web público con catálogo de especies validadas.

### 7.8.3 Obstáculos – Sprint 5

| OBSTÁCULO | Generación de PDF con firmas dinámicas |
| --- | --- |
| DESCRIPCIÓN | Las firmas de los responsables del proyecto son imágenes almacenadas en Sanity, y expo-print requiere HTML estático. |
| SOLUCIÓN APLICADA | Se obtiene la configuración dinámica desde Sanity (responsable_1_firma, responsable_2_firma) y se genera la URL de la imagen con urlFor(), incrustándola como `<img>` en el HTML del certificado antes de pasarlo a expo-print. |


# 8. PRUEBAS

## 8.1 Estrategia General de Pruebas
La estrategia de pruebas del proyecto se basa en los principios de la metodología Extreme Programming (XP), priorizando la validación continua del sistema en cada iteración del desarrollo. El objetivo es garantizar que cada funcionalidad implementada cumpla con los requisitos definidos y proporcione una experiencia de usuario adecuada.
Las pruebas se realizaron tanto en emuladores (Expo Go) como en dispositivos Android reales de gama media, con el fin de evaluar el comportamiento del sistema en condiciones cercanas al entorno real de uso.
Se definieron cuatro niveles de prueba:
- Pruebas de componente: Evaluación individual de cada pantalla (inicio de sesión, registro, buscador, ficha técnica, perfil).
- Pruebas de integración: Validación de la interacción entre componentes (por ejemplo, aplicación de filtros y actualización de resultados).
- Pruebas de aceptación: Verificación del cumplimiento de las historias de usuario definidas.
- Pruebas de usabilidad (UI/UX): Evaluación de la facilidad de uso, claridad visual y navegación del sistema.
En este último nivel, se tomó como referencia un diseño moderno basado en tarjetas visuales e interfaces tipo catálogo, priorizando el uso de imágenes, iconos y colores temáticos (verde sobre modo oscuro), con el fin de facilitar la identificación de especies de manera intuitiva.

## 8.2 Casos de Prueba Planificados
Durante el Sprint 1 se ejecutaron un total de 13 casos de prueba funcionales, obteniendo los siguientes resultados:
- Casos ejecutados: 13
- Casos aprobados: 13
- Tasa de éxito: 100%
- Errores detectados: 3
- Errores corregidos: 100%
Los principales errores identificados estuvieron relacionados con:
- Mensajes de error en inglés durante la autenticación
- Transiciones visuales en el inicio de sesión con Google
- Problemas de navegación en Android
Estos fueron solucionados mediante la implementación de traducción de errores, uso de indicadores de carga (spinner) y ajuste en la navegación.


## 8.3 Pruebas de Usabilidad y Diseño Visual
Se evaluó la interacción del usuario con la interfaz, considerando los siguientes aspectos:
- Comprensión del diseño basado en tarjetas de plantas
- Facilidad para utilizar el buscador y los filtros morfológicos
- Claridad de la información mostrada en la ficha técnica
Resultados observados:
- El diseño visual facilita la identificación rápida de especies
- Las imágenes tienen un rol fundamental en la experiencia del usuario
- Los iconos (tipo, clima, características) permiten reducir la carga cognitiva
- La navegación es intuitiva y no requiere aprendizaje previo
Esto confirma que un enfoque visual tipo catálogo es adecuado para el objetivo del sistema.





## 8.4 Métricas de Rendimiento
Se obtuvieron las siguientes métricas en pruebas preliminares:
- Tiempo de carga del buscador: 1.5 – 2.2 segundos
- Tiempo de autenticación: 2 – 3 segundos
- Tiempo de apertura de ficha técnica: menor a 1.5 segundos
Estos valores son aceptables para dispositivos de gama media, aunque se plantea optimizar el rendimiento en futuras iteraciones.


## 8.5 Criterios de Aceptación Global
El sistema se considera aceptable si cumple con:
- Implementación completa de las historias de usuario del sprint
- Interfaz totalmente en español
- Navegación fluida y sin errores visuales
- Correcta visualización de datos desde la base de datos
- Funcionamiento estable en dispositivos Android
Criterios de rechazo:
- Tiempos de respuesta mayores a 3 segundos
- Errores en autenticación
- Información incompleta o mal presentada



# 9. VALIDACIÓN CON EL USUARIO

## 9.1 Importancia de la Validación en XP
9.2 Perfil del Usuario Validado

## 9.3 Análisis de la Entrevista e Insights

## 9.4 Problemas y Oportunidades Detectadas

## 9.5 Resultados Cuantitativos

## 9.6 Conclusión de la Validación


# 10. RESULTADOS ACUMULADOS (Sprint 1 al Sprint 5)

## 10.1 Evaluación General
Los Sprints 1 al 5 se completaron satisfactoriamente, alcanzando los objetivos planteados en cada iteración. El equipo logró construir un sistema funcional compuesto por tres aplicaciones integradas que cubren el ciclo completo de registro, validación y consulta de flora ornamental.

## 10.2 Indicadores de Desempeño Acumulados
- Sprints completados: 5 de 6
- Historias de usuario implementadas: 25 (HU-01 a HU-25)
- Pantallas en app móvil: 9 (sign-in, sign-up, buscador, mapa, registro, sync, plant/[id], profile, about)
- Páginas en panel admin web: 7 (Dashboard, Validaciones, PlantaDetail, Mapa, Filtros, Certificados, ValidarCertificado)
- Formularios dinámicos por hábito: 5 (FormArbol, FormPalmera, FormArbusto, FormLiana, FormHierba)
- Schemas de Sanity: 4 (planta, filtro, certificado, configuracion)
- Líneas de código app móvil: ~10,000+ (solo pantallas principales)

## 10.3 Incremento del Producto
El producto obtenido al finalizar el Sprint 5 es un sistema funcional completo que incluye:

**App Móvil:**
- Sistema de autenticación completo (correo + Google OAuth) con verificación
- Buscador con filtros dinámicos por texto, hábito y caracteres morfológicos
- Fichas técnicas interactivas con carrusel de imágenes
- Formulario de registro botánico de 5 pasos con formularios dinámicos por hábito
- Geolocalización con GPS y mapa interactivo
- Captura fotográfica (5 obligatorias + extras)
- Modo offline con sincronización
- Mapa interactivo con clustering
- Notificaciones in-app
- Edición de registros observados
- Perfil editable con estadísticas y certificados PDF

**Panel Administrativo Web:**
- Dashboard, validaciones, filtros dinámicos, mapa, certificados
- Control de acceso por roles

**Portal Web Público:**
- Landing page con animación 3D y catálogo de especies

## 10.4 Valor Generado
Los 5 sprints permitieron:
- Validar la viabilidad técnica y la necesidad del usuario
- Crear un sistema completo de registro participativo de flora ornamental
- Habilitar la recolección de datos en campo incluso sin conectividad
- Implementar un flujo de validación académica por profesores
- Generar incentivos para los participantes mediante certificados digitales
- Establecer un catálogo público consultable de especies ornamentales de Iquitos

## 10.5 Objetivos para el Sprint 6
- Validación final con usuarios e instituciones
- Generación del APK para distribución
- Pruebas en dispositivos de gama baja
- Documentación completa y final
- Presentación final del proyecto







# 11. Lecciones Aprendidas — Sprint 1
Durante el desarrollo del Sprint 1, el equipo identificó cinco lecciones clave que orientarán el trabajo en los siguientes sprints. Estas lecciones surgen de los obstáculos encontrados, las decisiones técnicas tomadas y la retroalimentación obtenida en la validación con el usuario.


| N° | Lección Aprendida | Descripción / Impacto |
| --- | --- | --- |
| Lección 1 | La elección del stack tecnológico impacta directamente en la productividad | La combinación React Native + Expo + Sanity permitió avanzar rápidamente, pero requirió un período de aprendizaje para comprender las particularidades de cada herramienta. |
| Lección 2 | Los detalles de UX marcan la diferencia | Aspectos como la traducción de mensajes de error al español, el spinner de carga durante el OAuth y el toggle de visibilidad de contraseña mejoran significativamente la experiencia del usuario. |
| Lección 3 | La validación temprana evita retrabajo | La entrevista con el usuario real confirmó que la dirección del proyecto era correcta y ayudó a priorizar funcionalidades clave. |
| Lección 4 | La documentación debe ir a la par del desarrollo | Dejar la documentación para después del desarrollo genera inconsistencias y dificulta la trazabilidad del trabajo realizado. |
| Lección 5 | Android requiere atención especial en navegación | Las animaciones que funcionan correctamente en iOS pueden no funcionar en Android, lo que requiere soluciones específicas como el uso de JS Stack con CardStyleInterpolators. |



# 12. Trabajo Futuro
Con base en los resultados de los Sprints 1 al 5 y las lecciones aprendidas, el trabajo restante se concentra en el Sprint 6 (Producto Final):


| Sprint | Objetivo | Funcionalidades / Actividades Planificadas |
| --- | --- | --- |
| Sprint 6 | Producto final | Validación final con usuarios e instituciones. Generación del APK de producción. Pruebas en dispositivos de gama baja. Despliegue del panel admin y portal público. Documentación completa y final. Presentación final del proyecto. |

**Áreas de mejora identificadas para futuras iteraciones o versiones:**
- Sistema de favoritos para que los usuarios marquen especies de interés.
- Navegación entre especies similares o de la misma familia.
- Mejora de accesibilidad (fuentes escalables, modo alto contraste).
- Pruebas automatizadas de componentes (Jest + React Testing Library).
- Soporte para iOS (la app está preparada por Expo pero no ha sido probada aún en iOS).
- Internacionalización (soporte para idiomas adicionales al español).
- Optimización de consultas GROQ para mejorar tiempos de carga con volúmenes altos de datos.



# 13. Anexos

## 13.1 Repositorio GitHub del Proyecto
El código fuente del proyecto se encuentra alojado en el repositorio GitHub del equipo. Los detalles se resumen a continuación:


| Campo | Detalle |
| --- | --- |
| URL del repositorio | https://github.com/daniloalvarado/App-de-Taller-2 |
| App móvil | Código fuente React Native + Expo (raíz del proyecto) |
| Panel administrativo web | Carpeta admin-web/ (Vite + React) |
| Portal web público | Carpeta Usuario/ (HTML + GSAP) |
| Sanity CMS | Carpeta sanity/ (schemas y configuración) |
| Documentación | Carpeta Documentación/ |
| Configuración | Archivo .env con variables de entorno y claves de API |



## 13.2 Evidencia de la Entrevista con el Usuario
Se adjunta la evidencia fotográfica y el registro de la entrevista realizada con el usuario real. Esta evidencia respalda la validación del problema y la pertinencia de las funcionalidades planificadas.


| [ Fotografía de la entrevista — Agregar imagen aquí ] (Por agregar) |
| --- |



| [ Captura de pantalla / documento adicional — Agregar aquí ] (Por agregar) |
| --- |






## 13.3 Capturas de Pantalla de la Aplicación (Sprint 1)
Se adjuntan capturas de las pantallas principales desarrolladas durante el Sprint


















## 13.4 Otros Documentos de Soporte
Espacio reservado para cualquier documento adicional relevante para el Sprint 1 (actas, esquemas, diagramas, etc.).

Diagrama de Clase


















Diagrama de Secuencia del Buscador

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
Contenido2
1. RESUMEN EJECUTIVO3
2. PROBLEMA Y CONTEXTO4
2.1 Contexto General: Realidad de la flora ornamental en Iquitos4
2.2 Problema Central5
2.3 Manifestaciones del Problema5
2.4 Magnitud e Impacto del Problema6
2.5 Análisis de Soluciones Existentes y Brechas7
3. 3. PROPUESTA DE SOLUCIÓN7
3.1 Visión del Producto7
3.2 Descripción Funcional del Sistema8
3.2.1 Aplicación 1: App Móvil8
Módulo de Autenticación y Seguridad8
Módulo de Catálogo y Búsqueda9
Módulo de Notificaciones10
Módulo de Fichas Técnicas10
Módulo de Mapa Interactivo11
Módulo de Registro Botánico12
Módulo Offline y Sincronización43
Módulo de Perfil y Gestión de Cuenta44
3.2.2 Aplicación 2: Panel Administrativo Web47
3.3 Alcance del Sistema – Sprint 1 al Sprint 647
3.4 Valor Diferencial y Justificación de la Propuesta48
4. 4. METODOLOGIA: EXTREME PROGRAMMING (XP)49
4.1 Fundamentos de la elección Metodológica49
4.2 Roles Definidos en el Equipo50
4.3 Actividades Realizadas en el Primer Sprint50
4.4 Historias de Usuario51
5. 5. DISEÑO DE LA SOLUCIÓN55
5.1 Principios de Diseño de la Interfaz55
5.2 Flujo de Navegación del Sistema55
5.3 Descripción de Pantallas Principales56
6. 6. ARQUITECTURA Y TECNOLOGÍA57
6.1 Proceso de Selección del Stack Tecnológico57
6.2 Stack Tecnológico Definitivo57
6.3 Arquitectura del Sistema59
7. 7. DESARROLLO POR ITERACIONES59
2.3 7.1 Sprint 1 – Detalle de Ejecución59
7.2 Tareas Completadas y Tiempo Invertido60
2.4 7.3 Incremento del Producto en el Sprint 163
7.4 Obstáculos Encontrados y Soluciones64
8. 8. PRUEBAS65
8.1 Estrategia General de Pruebas65
8.2 Casos de Prueba Planificados66
8.3 Pruebas de Usabilidad y Diseño Visual66
8.4 Métricas de Rendimiento67
8.5 Criterios de Aceptación Global67
9. 9. VALIDACIÓN CON EL USUARIO67
9.1 Importancia de la Validación en XP67
9.3 Análisis de la Entrevista e Insights67
9.4 Problemas y Oportunidades Detectadas67
9.5 Resultados Cuantitativos67
9.6 Conclusión de la Validación67
10. 10. RESULTADOS DEL SPRINT 168
10.1 Evaluación General del Sprint68
10.2 Indicadores de Desempeño68
10.3 Incremento del Producto68
10.4 Valor Generado68
10.5 Objetivos para el Sprint 268
11. 11. Lecciones Aprendidas — Sprint 169
12. 12. Trabajo Futuro70
13. 13. Anexos72
13.1 Repositorio GitHub del Proyecto72
13.2 Evidencia de la Entrevista con el Usuario72
13.3 Capturas de Pantalla de la Aplicación (Sprint 1)73
13.4 Otros Documentos de Soporte74

# RESUMEN EJECUTIVO
El presente documento constituye el informe de avance correspondiente al desarrollo inicial del proyecto denominado “Catálogo virtual de flora ornamental de Iquitos con identificación morfológica asistida”, ejecutado en el marco del curso de Botánica Sistemática como actividad de Responsabilidad Social Universitaria. Este proyecto tiene como propósito principal la creación de una herramienta digital interactiva que permita identificar especies ornamentales mediante la observación de caracteres morfológicos, facilitando su reconocimiento tanto para estudiantes como para la comunidad en general. Durante esta primera fase, se ha llevado a cabo un proceso de planificación y levantamiento de información que incluye la selección inicial de especies, la estandarización de criterios morfológicos, el diseño de fichas técnicas y la definición de la estructura funcional del catálogo. Asimismo, se realizaron observaciones de campo y recopilación de material fotográfico en distintos espacios urbanos de la ciudad de Iquitos. Los resultados preliminares evidencian la necesidad de contar con herramientas accesibles que sistematicen la información botánica local, ya que actualmente existe limitada disponibilidad de recursos organizados para la identificación de flora ornamental. En respuesta a esta problemática, se propone el desarrollo de un catálogo virtual interactivo, priorizando la facilidad de uso, el valor educativo y la aplicabilidad práctica en contextos urbanos.

<table>
  <tr>
    <th>ASPECTO</th>
    <th>DETALLE EJECUTIVO</th>
  </tr>
  <tr>
    <td>Nombre del proyecto</td>
    <td>Catálogo virtual de flora ornamental de Iquitos con identificación morfológica asistida</td>
  </tr>
  <tr>
    <td>Problema central</td>
    <td>Escasa información sistematizada y accesible sobre especies ornamentales en Iquitos, lo que dificulta su identificación y uso adecuado en contextos urbanos y educativos.</td>
  </tr>
  <tr>
    <td>Solución propuesta</td>
    <td>Desarrollo de un catálogo virtual interactivo con fichas técnicas, banco fotográfico y sistema de búsqueda basado en caracteres morfológicos.</td>
  </tr>
  <tr>
    <td>Usuario objetivo</td>
    <td></td>
  </tr>
  <tr>
    <td>Metodología adoptada</td>
    <td>Trabajo por fases: planificación, levantamiento de campo, validación taxonómica, elaboración de fichas técnicas y desarrollo del catálogo digital.</td>
  </tr>
  <tr>
    <td>Estado actual (Fase inicial)</td>
    <td></td>
  </tr>
  <tr>
    <td>Objetivo siguiente fase</td>
    <td>Desarrollo funcional del catálogo, integración de base de datos y validación con usuarios.</td>
  </tr>
</table>


# PROBLEMA Y CONTEXTO

## Contexto General: Realidad de la flora ornamental en Iquitos
Iquitos, como principal ciudad de la Amazonía peruana, posee una alta diversidad de flora ornamental distribuida en espacios urbanos como parques, jardines, avenidas y áreas institucionales. Estas especies cumplen funciones importantes tanto estéticas como ecológicas, contribuyendo al paisaje urbano, la regulación ambiental y el bienestar de la población. Sin embargo, a pesar de esta riqueza vegetal, existe una limitada disponibilidad de información sistematizada, accesible y confiable sobre las especies ornamentales presentes en la ciudad. La identificación de plantas suele depender del conocimiento empírico, lo que dificulta su correcta clasificación, uso y conservación. En el ámbito académico, aunque existen conocimientos botánicos teóricos, estos no siempre se traducen en herramientas prácticas accesibles para estudiantes o ciudadanos. Asimismo, no se dispone de plataformas digitales locales que integren información morfológica, visual y taxonómica de manera interactiva.

## Problema Central
La ausencia de una herramienta digital interactiva que permita identificar y consultar especies de flora ornamental de Iquitos mediante características morfológicas, limitando el acceso al conocimiento botánico y su aplicación en contextos urbanos y educativos.La ausencia de una herramienta digital interactiva que permita identificar y consultar especies de flora ornamental de Iquitos mediante características morfológicas, limitando el acceso al conocimiento botánico y su aplicación en contextos urbanos y educativos.El problema que motivo el desarrollo del proyecto se define como





## 2.3 Manifestaciones del Problema
Esta problemática se manifiesta en diversas situaciones. En primer lugar, existe dificultad para identificar correctamente las especies ornamentales debido a la falta de conocimiento especializado y de herramientas de apoyo accesibles. Asimismo, la información disponible no se encuentra organizada de manera clara ni adaptada al contexto local, lo que dificulta su uso por parte de estudiantes y ciudadanos. Por otro lado, la ausencia de recursos digitales interactivos limita el aprendizaje práctico de la botánica, reduciendo la capacidad de los usuarios para reconocer, comparar y diferenciar especies. Esto conlleva a un bajo aprovechamiento de la biodiversidad ornamental y a un uso inadecuado de las especies en espacios urbanos.

<table>
  <tr>
    <th>ASPECTO</th>
    <th>DESCRIPCION DEL IMPACTO</th>
  </tr>
  <tr>
    <td>Dificultad en la identificación de especies</td>
    <td>Los usuarios no pueden reconocer plantas ornamentales sin conocimiento especializado.</td>
  </tr>
  <tr>
    <td>Falta de información accesible</td>
    <td>No existen plataformas locales organizadas con fichas técnicas claras y visuales.</td>
  </tr>
  <tr>
    <td>Uso inadecuado de especies</td>
    <td>Se seleccionan plantas sin criterios técnicos para espacios urbanos.</td>
  </tr>
  <tr>
    <td>Limitaciones en el aprendizaje</td>
    <td>Los estudiantes no cuentan con herramientas prácticas para aplicar la teoría botánica.</td>
  </tr>
  <tr>
    <td>Desaprovechamiento de la biodiversidad</td>
    <td>La flora ornamental local no es valorada ni difundida adecuadamente.</td>
  </tr>
</table>



## 2.4 Magnitud e Impacto del Problema
La falta de herramientas digitales especializadas en flora ornamental tiene un impacto significativo tanto en el ámbito educativo como en el social. Desde el punto de vista académico, limita el desarrollo de competencias prácticas en los estudiantes. Desde el punto de vista social, reduce la valoración y el conocimiento de la biodiversidad local. El desarrollo de un catálogo virtual permitirá mejorar el acceso a la información, facilitar la identificación de especies y promover el uso adecuado de la flora ornamental en la ciudad. Además, contribuirá a la educación ambiental y al fortalecimiento del conocimiento botánico en la población.

<table>
  <tr>
    <th>INDICADOR</th>
    <th>DETALLE</th>
  </tr>
  <tr>
    <td>Disponibilidad de información</td>
    <td>Limitada y dispersa</td>
  </tr>
  <tr>
    <td>Acceso a herramientas digitales</td>
    <td>Muy bajo a nivel local</td>
  </tr>
  <tr>
    <td>Nivel de conocimiento botánico</td>
    <td>Básico en población general</td>
  </tr>
  <tr>
    <td>Uso de recursos visuales comparativos</td>
    <td>Escaso</td>
  </tr>
  <tr>
    <td>Interés en aprender sobre flora</td>
    <td>Alto en estudiantes y comunidad</td>
  </tr>
  <tr>
    <td>Necesidad de herramientas educativas</td>
    <td>Elevada</td>
  </tr>
</table>

d) Perfil del Usuario Objetivo
El proyecto está dirigido a estudiantes, docentes y público en general interesados en la flora ornamental de Iquitos. Estos usuarios presentan un nivel básico o intermedio de conocimiento botánico y requieren una herramienta sencilla, visual e intuitiva que les permita identificar especies de manera práctica.

<table>
  <tr>
    <th>DIMENSION</th>
    <th>DESCRIPCIÓN</th>
  </tr>
  <tr>
    <td>Usuario principal</td>
    <td>Estudiante de Botánica / usuario general</td>
  </tr>
  <tr>
    <td>Edad</td>
    <td>16 – 60 años</td>
  </tr>
  <tr>
    <td>Contexto</td>
    <td>Académico y urbano</td>
  </tr>
  <tr>
    <td>Nivel digital</td>
    <td>Básico a intermedio</td>
  </tr>
  <tr>
    <td>Nivel educativo</td>
    <td>Secundaria / universitario</td>
  </tr>
  <tr>
    <td>Necesidad principal</td>
    <td>Identificar especies de forma sencilla</td>
  </tr>
  <tr>
    <td>Expectativa</td>
    <td>Plataforma visual, intuitiva y fácil de usar</td>
  </tr>
  <tr>
    <td>Uso esperado</td>
    <td>Consulta, aprendizaje y apoyo en campo</td>
  </tr>
</table>



## 2.5 Análisis de Soluciones Existentes y Brechas
Frente a las limitaciones identificadas en las herramientas existentes, se propone el desarrollo de un catálogo virtual interactivo que integre fichas técnicas, imágenes y un sistema de búsqueda basado en características morfológicas. Esta solución busca ser accesible, fácil de usar y adaptada al contexto local, permitiendo cubrir las necesidades de los usuarios y mejorar el acceso al conocimiento botánico.

<table>
  <tr>
    <th>SOLUCIÓN</th>
    <th>CARACTERÍSTICAS</th>
    <th>LIMITACIONES</th>
    <th>BRECHA IDENTIFICADA</th>
  </tr>
  <tr>
    <td>Libros botánicos</td>
    <td></td>
    <td>Poco accesibles y no interactivos</td>
    <td>No prácticos para uso cotidiano</td>
  </tr>
  <tr>
    <td>Páginas web generales</td>
    <td>Información variada</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Apps de identificación (genéricas)</td>
    <td>Reconocimiento por imagen</td>
    <td>Baja precisión en especies locales</td>
    <td>No adaptadas a Iquitos</td>
  </tr>
  <tr>
    <td>Bases de datos científicas</td>
    <td>Información confiable</td>
    <td>Lenguaje técnico complejo</td>
    <td>Difícil acceso para usuarios comunes</td>
  </tr>
  <tr>
    <td>Propuesta del proyecto</td>
    <td>Catálogo interactivo con búsqueda morfológica y fichas técnicas</td>
    <td>En desarrollo</td>
    <td>Adaptado al contexto local y educativo</td>
  </tr>
</table>



# 3. PROPUESTA DE SOLUCIÓN

## 3.1 Visión del Producto
La solución propuesta consiste en el desarrollo de una plataforma digital denominada provisionalmente “Catálogo Virtual de Flora Ornamental de Iquitos”, diseñada como una herramienta interactiva de consulta e identificación botánica basada en características morfológicas.
Desarrollar una herramienta digital accesible, visual e intuitiva que permita a estudiantes, docentes y público en general identificar especies de flora ornamental de Iquitos mediante la observación de sus características morfológicas, facilitando el aprendizaje, la consulta y la valoración de la biodiversidad local.Desarrollar una herramienta digital accesible, visual e intuitiva que permita a estudiantes, docentes y público en general identificar especies de flora ornamental de Iquitos mediante la observación de sus características morfológicas, facilitando el aprendizaje, la consulta y la valoración de la biodiversidad local.




El sistema estará orientado a integrar información científica con recursos visuales, eliminando la dependencia de libros técnicos complejos y permitiendo el acceso desde dispositivos digitales de uso cotidiano.


## 3.2 Descripción Funcional del Sistema
El sistema PLANT-OR se compone de tres aplicaciones independientes pero integradas, que comparten la misma base de datos (Sanity.io) y el mismo sistema de autenticación (Clerk):


### 3.2.1 Aplicación 1: App Móvil
Aplicación móvil (multiplataforma para Android e iOS), orientada al registro de campo de plantas ornamentales y la consulta del catálogo botánico validado. La aplicación esta organizada en una navegación por pestañas con 5 tabs (Buscador, Mapa, Registro, Pendientes/Sincronización, Perfil) y un sistema de autenticación protegido con redirección automática. Incluye los siguientes módulos funcionales:


#### Módulo de Autenticación y Seguridad
Gestiona el acceso de los usuarios al sistema, garantizando la seguridad de la información y el control de sesiones. Incluye las siguientes funcionalidades y apartados visuales:
- - Inicio de sesión con correo electrónico y contraseña: Pantalla con campos de correo electrónico (con validación de formato), contraseña y botón de inicio de sesión. Al autenticarse correctamente, se establece la sesión activa y se redirige al buscador principal.

- - Inicio de sesión con Google OAuth: Botón de inicio rápido con Google que ejecuta el flujo OAuth completo. Durante la validación del token se muestra un indicador de carga (spinner). Al completarse, se redirige automáticamente al buscador.

- - Registro de cuentas con verificación por correo: Pantalla de registro con campos de correo electrónico y contraseña. Al registrarse, se envía un código de verificación por correo electrónico. La pantalla muestra una segunda vista para ingresar el código de verificación recibido. Una vez verificado, se crea la sesión activa.

- - Caché de sesión y Modo Invitado para uso offline: Clerk (el sistema de login) requiere internet. Para solucionar esto, la app tiene dos mecanismos:
- 1. Si el usuario inició sesión antes, se guarda una copia de su perfil para recordar quién es y autocompletar sus datos.
- 2. Si el usuario nunca ha iniciado sesión y abre la app sin internet, el sistema activa un "Modo Invitado Offline". Le permite entrar a la app y registrar plantas escribiendo sus datos manualmente. Cuando vuelva a tener internet y quiera sincronizar ("Pendientes"), la app le exigirá iniciar sesión en ese momento para asociar todos los registros guardados a su cuenta oficial.

- - Gestión de roles: El sistema identifica el rol del usuario (admin, profesor_validador, estudiante y ciudadano). Los roles se gestionan desde Clerk publicMetadata.


#### Módulo de Catálogo y Búsqueda
Permite explorar las especies validadas del catálogo botánico. Constituye la pantalla principal de la aplicación (pestaña "Buscador"). Incluye las siguientes funcionalidades y apartados visuales:
-  Cabecera personalizada: Muestra el avatar del usuario (desde Clerk), saludo personalizado con su nombre, badge de rol (ADMIN o PROFESOR) si corresponde, un subtítulo motivacional y un ícono de campana interactiva que abre el modal de "Mis aportes" para revisar el estado de los registros realizados.
- Buscador por texto en tiempo real: Barra de búsqueda que filtra especies conforme el usuario escribe, buscando simultáneamente por nombre común o científico. El filtrado se realiza localmente sobre los datos cargados.
- Filtro por hábito de crecimiento mediante chips horizontales: Fila de botones deslizables (chips) con las opciones: Todo, Árbol, Palmera, Arbusto, Liana, Hierba. Al presionar un chip, se filtran las especies por el hábito seleccionado. El chip activo se resalta con color verde.
- Filtros dinámicos avanzados: Botón de filtros en la barra de búsqueda que abre un modal con categorías de filtros creados y gestionados por los profesores validadores desde el panel administrativo web. Los filtros se cargan desde la base de datos, se agrupan por categoría y soportan selección única o múltiple según la configuración del filtro. Se permite un máximo de 3 filtros simultáneos. Incluye botón de "Limpiar Filtros" y cada filtro puede tener un ícono asociado.
- Cuadrícula de tarjetas de plantas: Las plantas se muestran como tarjetas visuales con imagen de la galería (primera foto), nombre común o científico, hábito de crecimiento y familia botánica. Solo se muestran las plantas en estado "Validado". Al presionar una tarjeta, se navega a la ficha técnica completa.


#### Módulo de Notificaciones
Mantiene informado al registrador sobre el estado de sus registros botánicos. Integrado en la pantalla del buscador principal. Incluye las siguientes funcionalidades y apartados visuales:
- Ícono de campana con indicador de cambios: En la cabecera del buscador se muestra un ícono de campana. Cuando hay cambios en el estado de los registros del usuario (nuevas validaciones, observaciones o rechazos), se muestra un punto rojo indicador de notificaciones no leídas.
- Detección inteligente de cambios: El sistema genera una "firma" del estado actual de los registros (concatenación de IDs y estados) y la compara con la firma almacenada previamente. Si difieren, se activa el indicador de no leídas. Al abrir las notificaciones, se guarda la firma actualizada y se reinicia el indicador.
- Modal "Mis Aportes": Al presionar la campana, se abre un modal con la lista completa de los registros del usuario, mostrando el nombre de la planta, código y el estado actual de cada registro con colores diferenciados: "En revisión" (amarillo), "Observado" (naranja), "Validado" (verde), "Rechazado" (rojo).
- Navegación contextual desde notificaciones: Al presionar un registro observado, se cierra el modal y se navega al formulario de registro en modo edición con los datos precargados del registro. Al presionar un registro validado, se navega a la ficha técnica completa de la planta.


#### Módulo de Fichas Técnicas
Presenta la información completa de cada especie validada. Se accede al presionar una tarjeta de planta desde el buscador o desde el mapa interactivo. Incluye:
- Carrusel de imágenes: Galería horizontal en la parte superior con navegación por deslizamiento y puntos indicadores de posición. Si la planta no tiene imágenes, se muestra un ícono de hoja por defecto con el texto "Sin imagen" debajo.
- Cabecera y Taxonomía: Título principal con los nombres comunes y subtítulo destacado con el nombre científico.
- Ficha Técnica General: Bloque con la familia botánica, dirección referencial, hábito de crecimiento y todos los datos reproductivos generales (detalles de flores, frutos y semillas).
- Caracteres morfológicos dinámicos (Bloques Específicos): La aplicación detecta el hábito de crecimiento (Árbol, Palmera, Arbusto, Liana o Hierba) y despliega dinámicamente un bloque exclusivo con los datos morfológicos específicos recolectados para esa forma de vida (ej. dasometría, detalles de corteza/tallo, características de hojas).
- Ubicación y Mapa: Desglose de la ubicación geográfica (distrito, dirección exacta, número de casa, sustrato) acompañado de un minimapa interactivo que visualiza el pin exacto de la planta.
- Impacto Urbano y Valor: Listado de los valores ornamentales de la especie, posibles impactos urbanos, estado físico del individuo y su estado fenológico.
- Información del Registrador: Tarjeta final que otorga crédito al autor del registro, mostrando su nombre completo y, de corresponder, su información académica (facultad y curso).


#### Módulo de Mapa Interactivo
Visualiza las plantas validadas georreferenciadas en un mapa centrado en Iquitos (pestaña "Mapa"). Incluye las siguientes funcionalidades y apartados visuales:
- Mapa a pantalla completa: Mapa centrado en las coordenadas de Iquitos (-3.749, -73.253). Utiliza Google Maps como proveedor de mapas.
- Marcadores de plantas validadas: Cada planta validada con coordenadas se muestra como un marcador verde en el mapa. Solo se muestran plantas en estado "Validado".
- Clustering automático: Los marcadores cercanos se agrupan automáticamente en clusters con un contador numérico, mejorando el rendimiento en dispositivos de gama media al reducir la carga de renderizado.
- Tarjeta flotante al presionar marcador: Al seleccionar un marcador, el mapa se anima suavemente hacia la ubicación y aparece una tarjeta flotante en la parte inferior con la miniatura de la planta (primera imagen de la galería), nombres comunes, nombres científicos, hábito de crecimiento y familia botánica.
- Navegación a ficha técnica: Al presionar la tarjeta flotante, se navega a la ficha técnica completa de la planta seleccionada.
- Barra de búsqueda geográfica: Barra flotante en la parte superior que permite filtrar los marcadores por texto, buscando en: nombre de la planta, nombre científico, distrito, dirección, tipo de ubicación y número de casa. Se muestra un contador de resultados encontrados.
- Descartar selección: Al presionar cualquier zona del mapa fuera de un marcador, se cierra la tarjeta flotante.





#### Módulo de Registro Botánico
Permite a estudiantes y ciudadanos registrar plantas ornamentales desde sus dispositivos móviles mediante un formulario de 5 bloques secuenciales. Incluye las siguientes funcionalidades y apartados visuales:
- Bloque 1 – Datos Personales: Selección de rol del registrador (estudiante o ciudadano) mediante botones de opción. Si el rol es "estudiante", se muestran los campos: nombre completo, DNI (8 dígitos), correo electrónico, curso, facultad, escuela y día de clase. Si el rol es "ciudadano", se omiten los campos académicos (DNI, facultad, escuela, curso, día de clase). No se puede avanzar al paso 2 sin completar los campos obligatorios.
- Bloque 2 – Ubicación con geolocalización: Captura de coordenadas GPS automática al ingresar al bloque. Se muestra un mapa interactivo con un marcador arrastrable que permite al usuario ajustar la ubicación exacta. Incluye campos para: distrito, dirección, tipo de ubicación 1 (Jirón, Avenida, Calle, Pasaje, Parque u otro), tipo de ubicación 2 (Vereda, Berma central u otro), número de casa y sustrato de la planta (En tierra, En macetero u otro). No se puede avanzar sin ubicación confirmada.
- Bloque 3 – Identificación y Hábito: Campos para nombre local, nombre científico y familia botánica. Selección del hábito de la planta (Árbol, Palmera, Arbusto, Liana, Hierba) que activa el formulario dinámico correspondiente. Selección del tipo de vida (Terrestre, Epífita, Parásita). Los formularios dinámicos por hábito son componentes independientes:
1. Árbol
I. Datos dasométricos (obligatorio – primer bloque)
•Altura total aproximada: ___ m
•Circunferencia a la altura del pecho (CAP): ___ cm
•Diámetro de copa paralelo a la calle: ___ m
•Diámetro de copa perpendicular a la calle: ___ m
•Altura de inicio de copa: ___ m
Raíces visibles (solo una alternativa)
•Sin raíces visibles
•Raíces tablares
•Raíces zancudas
•Raíces superficiales
•Raíces adventicias
•Otro: ___

II. Tronco y corteza
Número de troncos desde la base:
Forma del tronco (solo una)
•Recto
•Inclinado (a la izquierda, a la derecha, hacia la calle, hacia la casa)
•Torcido
•Otro: ___
Corteza externa (solo una)
•Lisa
•Rugosa
•Aspera
•Agrietada
•Estriada
•Escamosa
•Con placas
•Laminar
•Otro: ___
Lenticelas (solo una)
•Con lenticelas
•Sin lenticelas
Color de corteza (Mútiple)
•Gris
•Marrón
•Verde
•Rojiza
•Negruzca
•Otro: ___
Olor de corteza (solo una)
•Sin olor
•Aromático
•Cítrico
•Resinoso
•Desagradable
•Otro: ___
Espinas (solo una)
•Con espinas
•Sin espinas

III. Exudado
Presencia (solo una)
•Sí
•No
Tipo (solo una, si aplica)
•Savia
•Látex
•Resina
•Goma
Color al corte (solo una)
•Incoloro
•Blanco
•Amarillo
•Rojizo
•Marrón
•Otro: ___


IV. Ramificación y copa
Tipo de ramificación (solo una)
•Ramas hacia arriba
•Ramas como hélice de helicóptero
•Ramas colgantes
•Ramas irregulares
•Otro: ___
Forma de copa (solo una)
•Redondeada
•Alargada
•Extendida
•Tipo paraguas
•Irregular
•Otro: ___
Densidad de copa (solo una)
•Densa
•Media
•Rala

V. Hojas
Tipo de hoja (solo una)
•Simple
•Compuesta
Disposición (Múltiple)
•Alternas – dísticas
•Alternas - espiraladas
•Opuestas – dísticas
•Opuestas - decusadas
•Agrupadas al final de las ramas
•No agrupadas al final de las ramas

Forma (solo una)
•Ovalada
•Alargada
•Redonda
•Acorazonada
•Palmada
•Otro: ___
Borde (solo una)
•Entero
•Dentado
•Ondulado
•Otro: ___
Textura (solo una)
•Papirácea
•Cartácea
•Coriácea
Color del envés (solo una)
•Verde claro
•Verde oscuro
•Grisáceo
•Marrón
•Blanquecino
•Otro: ___
Presencia de pelos (puede marcar varias)
•Sin pelos (haz)
•Con pelos (haz)
•Sin pelos (envés)
•Con pelos (envés)
Tipo de peciolo
•Circular
•Plano
•Sésil
Longitud del peciolo cm
Diámetro del peciolo mm
Peciolo con pulvino
•Sí
•No

VI. Flores
Presencia (solo una)
•Con flores
•Sin flores visibles
Color de pétalos (solo una)
•Blanco
•Amarillo
•Rojo
•Rosado
•Morado
•Anaranjado
•Verde
•Crema
•Otro: ___
Tamaño de flor
Largo___ cm
Ancho___ cm

Agrupación (solo una)
•Solitaria
•En racimo
•En manojo
•En espiga
•En cabezuela
•Otro: ___
Olor (solo una)
•Sin olor
•Aromático
•Dulce
•Desagradable
•Otro: ___

VII. Frutos
Presencia (solo una)
•Con frutos
•Sin frutos visibles
Textura (solo una)
•Carnoso
•Seco
Estado al madurar (solo una)
•Entero
•Se abre (partido)
Forma (solo una)
•Redondo
•Ovalado
•Alargado
•Aplanado
•Irregular
•Otro: ___
Tamaño del fruto
Largo___ cm
Ancho___ cm

Color del fruto maduro (solo una)
•Verde
•Amarillo
•Rojo
•Morado
•Negro
•Marrón
•Crema
•Otro: ___
Superficie (solo una)
•Lisa
•Rugosa
•Espinosa
•Con costillas
•Otro: ___

VIII. Semillas
Presencia visible (solo una)
•Sí
•No
Número de semillas
Tamaño de semilla
Largo___ cm
Ancho___ cm
Color de cáscara (solo una)
•Blanco
•Crema
•Marrón
•Negro
•Rojizo
•Otro: ___


IX. Estado fenológico (puede marcar varias)
•Solo hojas
•Con flores
•Con frutos
•Sin hojas

X. Estado del individuo (puede marcar varias)
•Bueno
•Regular
•Malo
•Podado
•Enfermo
•Con plagas visibles
•Con daño mecánico

XI. Valor ornamental (puede marcar varias)
•Da sombra
•Tiene flores vistosas
•Tiene frutos vistosos
•Tiene copa atractiva
•Atrae fauna
•Valor cultural
•Valor alimenticio
•Valor medicinal
•Mejora el microclima
•Otro: ___

XII. Impacto urbano (puede marcar varias)
•No genera daño
•Frutos ensucian la vía
•Frutos obstruyen desagüe
•Raíces rompen el piso
•Raíces afectan veredas
•Raíces afectan cimientos
•Levanta pavimento
•Interfiere con cableado
•Interfiere con luminarias
•Riesgo de caída de ramas
•Tronco inclinado (riesgo)
•Otro: ___
2. Palmera
I. Datos dasométricos (obligatorio – primer bloque)
•Altura total aproximada: ___ m
•Circunferencia del tallo a 1.30 m (CAP): ___ cm
•Diámetro de copa paralelo: ___ m
•Diámetro de copa perpendicular: ___ m
•Altura de inicio de copa: ___ m
Número de tallos (solo una alternativa)
•Un solo tallo
•Varios tallos
•Otro: ___
Raíces visibles (solo una alternativa)
•Sin raíces visibles
•Raíces superficiales
•Raíces zancudas
•Raíces de soporte
•Raíces adventicias
•Otro: ___

II. Tipo de palmera (solo una alternativa)
•Arborescente
•Arbustiva
•Lianescente
•Sin tallo visible
•Otro: ___

III. Tallo (estípite) (puede marcar varias)
•Liso
•Con anillos visibles
•Con fibras
•Con restos de hojas
•Con espinas
•Sin espinas
•Otro: ___

IV. Hojas (carácter principal)
Tipo de hoja (solo una alternativa)
•Tipo pluma (pinnada)
•Tipo abanico (palmada)
•Simple entera
•Simple bífida
•Otro: ___
Segmentos (puede marcar varias)
•En un plano
•En varios planos
•Rígidos
•Colgantes
•Otro: ___
Tamaño de hoja (incluye peciolo)
•Largo: ___ m
•Ancho: ___ m
Tamaño de peciolo
•Largo: ___ m
•Diámetro: ___ cm

Color (solo una alternativa)
•Verde claro
•Verde oscuro
•Verde azulado
•Amarillento
•Otro: ___

V. Espinas (puede marcar varias)
•Ausentes
•En tallo
•En pecíolo
•En vaina
•Otro: ___

VI. Inflorescencia
Presencia (solo una alternativa)
•Con inflorescencia
•Sin inflorescencia visible
Posición (puede marcar varias)
•Interfoliar (entre hojas)
•Infrafoliar (debajo de hojas)
•Axilar
•Apical
•Otro: ___
Forma (solo una alternativa)
•Erecta
•Colgante
•Otro: ___
Presencia de espata (solo una alternativa)
•Sí
•No

VII. Frutos
Presencia (solo una alternativa)
•Con frutos
•Sin frutos visibles
Tipo (solo una alternativa)
•Baya
•Drupa
•Otro: ___
Forma (solo una alternativa)
•Redondo
•Ovalado
•Alargado
•Aplanado
•Curvo
•Irregular
•Otro: ___
Superficie (solo una alternativa)
•Lisa
•Brillante
•Opaca
•Rugosa
•Con estrías
•Con surcos
•Escamosa
•Fibrosa
•Espinosa
•Aguijonosa
•Verrugosa
•Otro: ___
Tamaño del fruto
•Largo: ___ cm
•Ancho: ___ cm
Color del fruto maduro (solo una alternativa)
•Verde
•Amarillo
•Rojo
•Anaranjado
•Morado
•Negro
•Marrón
•Otro: ___

VIII. Semillas
Número de semillas por fruto

Tamaño de semilla
•Largo: ___ mm o cm
•Ancho: ___ mm o cm

IX. Estado fenológico (puede marcar varias)
•Solo hojas
•Con flores
•Con frutos

X. Estado del individuo (puede marcar varias)
•Bueno
•Regular
•Malo
•Con plagas
•Con daño
•Hojas secas abundantes

XI. Valor ornamental (puede marcar varias)
•Genera sombra
•Tiene flores vistosas
•Tiene frutos vistosos
•Tiene hojas vistosas
•Forma de copa atractiva
•Mejora el microclima
•Atrae fauna
•Valor cultural
•Valor alimenticio
•Valor medicinal
•Otro: ___

XII. Impacto urbano (puede marcar varias)
•No genera daño
•Frutos ensucian la vía
•Frutos obstruyen desagüe
•Frutos resbalosos
•Raíces levantan vereda
•Raíces afectan cimientos
•Levanta pavimento
•Interfiere con cableado
•Interfiere con luminarias
•Riesgo de caída de hojas
•Tronco inclinado (riesgo)
•Otro: ___

3. Arbusto
I. Datos dasométricos (obligatorio – primer bloque)
•Altura total aproximada: ___ m
•Diámetro de copa paralelo: ___ m
•Diámetro de copa perpendicular: ___ m
•Altura de inicio de ramificación: ___ m
Número de tallos (solo una alternativa)
•Un tallo principal
•Varios tallos desde la base
•Otro: ___
Forma general del arbusto (solo una alternativa)
•Redondeado
•Compacto
•Extendido
•Irregular
•Colgante
•Otro: ___
Densidad del follaje (solo una alternativa)
•Denso
•Medio
•Ralo

II. Tallo y ramificación
Tipo de ramificación (solo una alternativa)
•Erecta
•Abierta
•Colgante
•Irregular
•Otro: ___
Tipo de tallo (solo una alternativa)
•Leñoso
•Semileñoso
•Flexible
•Otro: ___
Presencia de espinas (solo una alternativa)
•Con espinas
•Sin espinas

III. Hojas
Tipo de hoja (solo una alternativa)
•Simple
•Compuesta
•Otro: ___
Si es compuesta (solo una alternativa)
•Bifoliada
•Trifoliada
•Palmada
•Pinnada
•Bipinnada

Forma (solo una alternativa)
•Ovalada
•Alargada
•Redonda
•Lanceolada
•Acorazonada
•Otro: ___
Disposición (solo una alternativa)
•Alternas
•Opuestas
•Otro: ___
Borde (solo una alternativa)
•Entero
•Dentado
•Ondulado
•Otro: ___
Color (solo una alternativa)
•Verde claro
•Verde oscuro
•Variegado
•Rojizo
•Otro: ___

IV. Flores (clave ornamental)
Presencia (solo una alternativa)
•Con flores
•Sin flores visibles
Color de pétalos (solo una alternativa)
•Blanco
•Amarillo
•Rojo
•Rosado
•Morado
•Anaranjado
•Otro: ___
Tamaño de flor ___ cm
Forma (solo una alternativa)
•Tubular
•Abierta
•Estrellada
•Campanulada
•Otro: ___
Agrupación (solo una alternativa)
•Solitaria
•En racimos
•En ramilletes
•Otro: ___

V. Frutos
Presencia (solo una alternativa)
•Con frutos
•Sin frutos visibles
Textura (solo una alternativa)
•Carnoso
•Seco
•Otro: ___
Forma (solo una alternativa)
•Redondo
•Ovalado
•Alargado
•Aplanado
•Otro: ___
Tamaño del fruto ___ cm
Color del fruto maduro (solo una alternativa)
•Verde
•Amarillo
•Rojo
•Morado
•Negro
•Otro: ___

VI. Semillas
Número de semillas
Tamaño de semilla ___ mm o cm

VII. Estado fenológico (puede marcar varias)
•Vegetativo
•Con flores
•Con frutos

VIII. Estado del individuo (puede marcar varias)
•Bueno
•Regular
•Malo
•Podado
•Con plagas
•Con daño

IX. Valor ornamental (puede marcar varias)
•Genera sombra
•Tiene flores vistosas
•Tiene frutos vistosos
•Tiene hojas vistosas
•Forma atractiva
•Mejora el microclima
•Atrae fauna
•Valor cultural
•Valor alimenticio
•Valor medicinal
•Otro: ___


X. Impacto urbano (puede marcar varias)
•No genera daño
•Frutos ensucian la vía
•Frutos obstruyen desagüe
•Raíces afectan vereda
•Interfiere con infraestructura
•Dificulta mantenimiento
•Otro: ___

4. Liana
I. Datos dasométricos (obligatorio – primer bloque)
•Longitud visible aproximada: ___ m
•Altura máxima alcanzada en el soporte: ___ m
•Diámetro del tallo principal: ___ cm
Número de tallos (solo una alternativa)
•Un tallo principal
•Varios tallos
•Otro: ___

II. Tipo de soporte (solo una alternativa)
•Árbol
•Arbusto
•Cerca / estructura artificial
•Suelo (rastrera)
•Múltiples soportes
•Otro: ___

III. Forma de crecimiento (solo una alternativa)
•Trepadora (sube activamente)
•Enredadera (se enrolla)
•Colgante
•Rastrera
•Escandente (se apoya sin enrollarse)
•Otro: ___

IV. Mecanismo de fijación (puede marcar varias)
•Con zarcillos
•Con raíces adherentes
•Con espinas o ganchos
•Por enrollamiento del tallo
•No visible
•Otro: ___

V. Tallo
Tipo de tallo (solo una alternativa)
•Leñoso
•Semileñoso
•Flexible
•Otro: ___
Espinas (solo una alternativa)
•Con espinas
•Sin espinas
Exudado (solo una alternativa)
•Presente
•Ausente
Tipo de exudado
•Látex
•Savia
•Goma
•Resina


Color del exudado

VI. Hojas
Tipo de hoja (solo una alternativa)
•Simple
•Compuesta
•Otro: ___
Forma (solo una alternativa)
•Ovalada
•Alargada
•Acorazonada
•Lobulada
•Otro: ___
Disposición (solo una alternativa)
•Alterna dística
•Alterna espiralada
•Opuesta dística
•Opuesta decusada
•Otro: ___
Textura (solo una alternativa)
•Papirácea
•Cartácea
•Coriácea
•Otro: ___

VII. Flores
Presencia (solo una alternativa)
•Con flores
•Sin flores visibles
Color de pétalos (solo una alternativa)
•Blanco
•Amarillo
•Rojo
•Rosado
•Morado
•Anaranjado
•Otro: ___
Tamaño de flor ___ cm
Tipo de agrupación (solo una alternativa)
•Solitaria
•En racimos
•En ramilletes
•Otro: ___

VIII. Frutos
Presencia (solo una alternativa)
•Con frutos
•Sin frutos visibles
Textura (solo una alternativa)
•Carnoso
•Seco
•Otro: ___
Forma (solo una alternativa)
•Redondo
•Ovalado
•Alargado
•Aplanado
•Otro: ___
Tamaño del fruto ___ cm
Color del fruto maduro (solo una alternativa)
•Verde
•Amarillo
•Rojo
•Morado
•Negro
•Otro: ___

IX. Semillas
Número de semillas
Tamaño de semilla ___ mm o cm

X. Estado fenológico (puede marcar varias)
•Vegetativo
•Con flores
•Con frutos

XI. Estado del individuo (puede marcar varias)
•Bueno
•Regular
•Malo
•Con plagas
•Con daño

XII. Valor ornamental (puede marcar varias)
•Genera sombra
•Flores vistosas
•Frutos vistosos
•Hojas vistosas
•Cubre estructuras
•Atrae fauna
•Valor cultural
•Valor alimenticio
•Valor medicinal
•Otro: ___

XIII. Impacto urbano (puede marcar varias)
•No genera daño
•Cubre infraestructura
•Interfiere con cableado
•Invade estructuras
•Dificulta mantenimiento
•Genera humedad en paredes
•Otro: ___

5. Hierba
I. Datos dasométricos (obligatorio – primer bloque)
•Altura total aproximada: ___ cm
•Cobertura aproximada de la planta (diámetro): ___ cm
Número de tallos visibles (solo una alternativa)
•Uno
•Varios
•Muchos
•Sin tallo visible
•Otro: ___

II. Tipo de crecimiento (solo una alternativa)
•Erecta
•Rastrera
•Colgante
•En roseta
•Formando mata
•Otro: ___


III. Tipo de tallo (solo una alternativa)
•Herbáceo
•Carnoso
•Hueco
•Rastrero
•Trepador
•Sin tallo visible
•Otro: ___

IV. Hojas
Tipo de hoja (solo una alternativa)
•Simple
•Compuesta
•Otro: ___
Disposición (solo una alternativa)
•Alternas dísticas
•Alternas espiraladas
•Opuestas dísticas
•Opuestas decusadas
•En roseta basal
•Agrupadas
•Otro: ___
Forma (solo una alternativa)
•Ovalada
•Alargada
•Redonda
•Acorazonada
•Lanceolada
•Otro: ___


Color (solo una alternativa)
•Verde claro
•Verde oscuro
•Rojizo
•Morado
•Variegado
•Otro: ___
Textura (solo una alternativa)
•Delgada
•Carnosa
•Áspera
•Suave
•Otro: ___

V. Flores
Presencia (solo una alternativa)
•Con flores
•Sin flores visibles
Color de pétalos (solo una alternativa)
•Blanco
•Amarillo
•Rojo
•Rosado
•Morado
•Anaranjado
•Verde
•Otro: ___
Tamaño de flor ___ cm
Agrupación (solo una alternativa)
•Solitaria
•En racimo
•En ramillete
•En espiga
•En cabezuela
•Otro: ___

VI. Frutos
Presencia (solo una alternativa)
•Con frutos
•Sin frutos visibles
Textura (solo una alternativa)
•Carnoso
•Seco
•Otro: ___
Forma (solo una alternativa)
•Redondo
•Ovalado
•Alargado
•Aplanado
•Irregular
•Otro: ___
Color del fruto maduro (solo una alternativa)
•Verde
•Amarillo
•Rojo
•Morado
•Negro
•Marrón
•Otro: ___



VII. Semillas
Visibles (solo una alternativa)
•Sí
•No
Número de semillas

Tamaño de semilla ___ mm o cm

VIII. Estado fenológico (puede marcar varias)
•Solo hojas
•Con flores
•Con frutos
•Con flores y frutos
•Secándose

IX. Estado del individuo (puede marcar varias)
•Bueno
•Regular
•Malo
•Con plagas
•Con daño

X. Valor ornamental (puede marcar varias)
•Flores vistosas
•Hojas vistosas
•Frutos vistosos
•Cubre suelo
•Forma bordes o jardines
•Atrae fauna
•Valor cultural
•Valor alimenticio
•Valor medicinal
•Mejora el microclima
•Otro: ___

XI. Impacto urbano (puede marcar varias)
•No genera daño
•Invade jardines
•Invade veredas
•Cubre drenajes
•Dificulta mantenimiento
•Puede ser resbalosa
•Puede atraer plagas
•Otro: ___

Se implementó un sistema de validación exhaustiva por hábito y una función que genera un modal con la lista de campos faltantes y botones que hacen scroll automático al campo correspondiente. Los campos numéricos (altura, diámetro, longitud) aplican un filtro que solo permite dígitos y puntos decimales. Para ciudadanos, este paso se omite completamente.

- Bloque 4 – Fotografías: Se presentan 5 ranuras obligatorias etiquetadas (planta completa, hoja, flor, fruto, semilla), cada una con la opción de capturar desde la cámara del dispositivo o seleccionar desde la galería. Se pueden agregar fotografías extras opcionales. Se muestra vista previa de cada imagen con opción de reemplazo. No se puede avanzar al resumen sin las 5 fotos obligatorias completadas.







- Bloque 5 – Resumen del Registro: Vista previa completa de todos los datos ingresados: datos personales, ubicación con mapa, identificación botánica, caracteres morfológicos según hábito y fotografías. Se ofrecen botones para regresar y editar cualquier paso, o confirmar y enviar. Si hay conexión a internet, el registro se sube directamente a Sanity con estado "En revisión". Si no hay conexión, se guarda automáticamente en almacenamiento local (modo offline).

- Modo de edición de registros observados: Cuando un profesor marca un registro como "Observado", el usuario puede acceder al formulario de registro precargado con todos los datos existentes del registro (incluyendo fotos ya subidas a Sanity) desde “Mis Aportes”. Se muestra el motivo de observación del profesor. Las fotografías existentes en Sanity se preservan si no se cambian.- Edición de registros locales offline: Los registros guardados localmente pueden ser editados desde la pestaña "Pendientes", precargando todos los datos almacenados en la cola offline.


#### Módulo Offline y Sincronización
Permite registrar plantas sin conexión a internet y gestionar los registros pendientes de sincronización (pestaña "Pendientes"). Incluye las siguientes funcionalidades y apartados visuales:
- Guardado automático offline: Cuando el usuario completa un registro sin conexión a internet, el sistema guarda automáticamente todos los datos del formulario en almacenamiento local. Las fotografías se copian desde la ubicación temporal al directorio permanente de la aplicación evitando la pérdida de fotos al cerrar la app.
- Indicador de conectividad: En la cabecera de la pestaña se muestra un badge visual con el estado de conexión: "Conectado" (verde con ícono wifi) o "Sin conexión" (rojo con ícono wifi-off). La detección de red se realiza mediante expo-network que verifica tanto el estado de la red como la accesibilidad real a internet.
- Lista de registros pendientes: Se muestran todos los registros guardados localmente como tarjetas con el nombre común, nombre científico, hábito de la planta, fecha de guardado y mensajes de error de sincronización previos si los hubiere.
- Botón "Sincronizar Todo": Sube secuencialmente todos los registros pendientes a Sanity incluyendo las fotografías. Los registros sincronizados exitosamente se eliminan de la cola local. Se muestra un mensaje con el conteo de registros sincronizados. El botón se desactiva si no hay conexión o si ya está sincronizando.
- Eliminación individual de registros locales: Cada registro tiene un botón de eliminar que muestra un modal de confirmación con título, descripción del riesgo ("Esta acción no se puede deshacer") y botones de Cancelar/Eliminar.
- Edición de registros pendientes: Al presionar una tarjeta de registro, se navega al formulario de registro en modo edición con los datos precargados desde la cola local, permitiendo modificar la información antes de sincronizar.
- Requerimiento de sesión para sincronizar: Si el usuario no tiene una sesión activa de Clerk al intentar sincronizar, se muestra un mensaje y se redirige a la pantalla de inicio de sesión. Al sincronizar, se sobrescriben los datos del autor con los datos de la cuenta de Clerk para garantizar la trazabilidad.
- Pull-to-refresh: El usuario puede arrastrar hacia abajo para actualizar la lista de registros pendientes y el estado de conectividad.


#### Módulo de Perfil y Gestión de Cuenta
Permite al usuario gestionar su información personal, académica y de participación en el proyecto (profile.tsx, pestaña "Perfil"). Incluye las siguientes funcionalidades y apartados visuales:
- Foto de perfil editable: Muestra la foto de perfil del usuario (o un avatar automático si no tiene foto). Al presionar la foto: si no tiene foto, abre directamente la galería; si ya tiene foto, muestra un modal con opciones de "Cambiar foto" o "Eliminar foto". La imagen se recorta en proporción 1:1 con calidad al 50% y se sube a Clerk. La eliminación envía null a Clerk y se muestra un avatar automático.
- Datos personales y correo electrónico: Muestra el nombre completo del usuario y su correo electrónico principal.
- Formulario de edición de datos: Al tocar el nombre o el enlace "Toca para editar tus datos y perfil académico", se activa un modo de edición con campos de: nombre, apellido, DNI (validación de 8 dígitos), facultad, escuela, curso y día de clase. Incluye un toggle para mostrar/ocultar los campos de estudiante y los llena si lo es o por el contrario los dejas vacío. Se muestran botones de "Guardar" y "Cancelar". Los datos se persisten en Clerk y se autocompletan en futuros registros botánicos.
- Barra de progreso hacia certificado: Muestra una barra de progreso visual que indica el avance hacia la obtención del certificado digital. El umbral es diferenciado por rol: 20 registros validados para estudiantes y 100 para ciudadanos. La barra muestra visualmente el avance y los contadores (e.g., "5/20 registros validados").
- Estadísticas de registros: Sección con contadores visuales de los registros del usuario consultados en tiempo real desde Sanity: total de registros enviados, registros validados, registros observados y registros rechazados.
- Generación de certificados digitales PDF: Al alcanzar el umbral de registros validados, se habilita el botón "Generar Certificado". El certificado se genera como un documento HTML/CSS en formato A4 horizontal. Incluye: nombre del proyecto (configurable desde Sanity), título del certificado, nombre completo del participante, texto descriptivo el tipo de participación (Estudiante/Ciudadano), periodo de participación (calculado automáticamente desde la fecha del primer al último registro validado),  conteo de registros validados, firmas digitales de los responsables del proyecto (imágenes cargadas desde Sanity), fecha de emisión,  URL de validación en línea y código de verificación único (formato CERT-YYYYMMDD-XXXXXX). El certificado se registra en Sanity con código único. Si el certificado ya existe, se auto-actualiza el conteo de registros validados si ha aumentado. El PDF se puede compartir/descargar.
- Acceso a "Acerca del Proyecto": Botón que navega a la pantalla informativa con la presentación del proyecto, justificación, objetivo, funcionalidades disponibles, datos de Responsabilidad Social Universitaria e información académica.
- Cierre de sesión: Botón de "Cerrar sesión" que muestra un modal de confirmación antes de cerrar la sesión. Al confirmar, se cierra la sesión de Clerk y se redirige a la pantalla de inicio de sesión.






























### 3.2.2 Aplicación 2: Panel Administrativo Web
Aplicación web diseñada exclusivamente para el equipo de profesores validadores y administradores del proyecto. Construida con React, Vite y protegida mediante Clerk, proporciona un entorno seguro para la gestión integral de los registros botánicos. Incluye los siguientes módulos funcionales:


#### Módulo de Autenticación y Control de Acceso (Clerk)
- Sistema de inicio de sesión exclusivo para roles autorizados (`admin` y `profesor_validador`).
- Protección de rutas: si un usuario sin los permisos requeridos intenta acceder, es redirigido automáticamente a una página de acceso denegado.
- Gestión de sesiones segura integrada directamente con el ecosistema de Clerk.


#### Módulo de Dashboard (Panel de Control):
- Vista principal que muestra métricas clave del proyecto en tiempo real: número total de especies validadas, registros pendientes de revisión, usuarios activos, registros observados, registros rechazados, actividad reciente, top estudiantes y cantidad de registros por habito.


#### Módulo de Validación de Registros:
- Interfaz de revisión tipo bandeja de entrada donde los profesores pueden evaluar los registros enviados por estudiantes y ciudadanos ("En revisión").
- Vista detallada del registro que muestra en paralelo las fotografías enviadas y los datos morfológicos ingresados.
- Opciones de acción: Aprobar (aprueba el registro para el catálogo público), Observar (devuelve el registro al estudiante con comentarios específicos obligatorios indicando qué debe corregir) y Rechazar (descarta el registro definitivamente).
- Al cambiar de estado, se actualiza automáticamente el documento en Sanity y dispara la notificación en la aplicación móvil del registrador.




#### Módulo de Gestión de Filtros Dinámicos:
- Interfaz CRUD (Crear, Leer, Actualizar, Eliminar) para administrar los filtros avanzados utilizados en la aplicación móvil.
- Permite crear categorías de filtro (ej. "Tipo de Inflorescencia", "Color de Flor"), definir sus opciones y establecer si permiten selección múltiple o única.
- Posibilidad de activar o desactivar filtros globalmente, reflejándose los cambios en tiempo real en la app móvil.


#### Módulo de Catálogo y Mapa Global:
- Tabla de datos avanzada para consultar todos los registros validados, con capacidades de búsqueda, paginación y exportación de datos para fines de investigación académica.
- Mapa interactivo global que muestra la geolocalización de todos los registros del proyecto, permitiendo evaluar la distribución urbana de la flora en Iquitos.


#### Módulo de Gestión de Certificados:
- Panel para visualizar, buscar y verificar la autenticidad de los certificados digitales emitidos a estudiantes y ciudadanos.
- Registro auditable de los umbrales alcanzados por los usuarios.


### 3.2.3 Aplicación 3: Portal Web Público
Página web de acceso libre orientada al público general y a la difusión del proyecto. Desarrollada con React, Vite, actúa como la carta de presentación de "PLANT-OR" hacia la comunidad. Incluye los siguientes módulos:


#### Módulo de Catálogo Interactivo (Vistas Múltiples):
Es la pantalla principal de la plataforma. Ofrece dos modos de visualización intercambiables:
- Vista de Exhibición (Galería): Una interfaz visual minimalista y elegante donde se destaca en gran formato la fotografía principal de la especie seleccionada, acompañada de su nombre común, científico y clasificación. A un lado, se presenta un carrusel vertical con miniaturas del resto de especies para una navegación rápida y fluida.
- Vista de Mapa Georreferenciado: Un mapa interactivo (Leaflet con modo claro/oscuro automático) que muestra la ubicación exacta de las especies en la ciudad de Iquitos, incluyendo agrupación de marcadores (clustering).


#### Módulo de Búsqueda y Filtros Avanzados:
- Buscador en tiempo real: Permite localizar especies por nombre científico, nombre común, distrito o calle.
- Filtros Dinámicos: Integrados directamente con la base de datos (Sanity), permitiendo a los ciudadanos realizar búsquedas avanzadas por hábito de crecimiento, estado fenológico, colores, tipos de hoja/fruto y valor ornamental.


#### Módulo de Ficha Técnica (Modal de Detalle):
- Al seleccionar una especie desde la galería o el mapa, se despliega un modal responsivo que centraliza toda la información técnica validada (galería fotográfica, taxonomía, morfología específica según hábito e impacto urbano).
- Incluye la funcionalidad de "Ver en el mapa", que cierra el modal y centra el mapa global en las coordenadas exactas de esa planta específica.


#### Módulo de Validación de Certificados Públicos:
- Ruta de acceso libre que permite a cualquier persona o institución ingresar el código único de un certificado digital generado por la app.
- Consulta en tiempo real a la base de datos para confirmar la autenticidad, mostrando a quién pertenece y el número de registros validados por dicho usuario.


## 3.3 Alcance del Sistema – Sprint 1 al Sprint 6
El desarrollo del catálogo virtual se organizará en seis sprints:

<table>
  <tr>
    <th>SPRINT</th>
    <th></th>
    <th>ALCANCE COMPROMETIDO</th>
  </tr>
  <tr>
    <td>Sprint 1</td>
    <td>Investigación y Requerimientos</td>
    <td>Investigación del problema, definición del proyecto, selección inicial de especies, estructura de fichas técnicas.</td>
  </tr>
  <tr>
    <td>Sprint 2</td>
    <td>Desarrollo de la Aplicación Móvil (Fase 1)</td>
    <td>Catálogo de especies, fichas técnicas y mapa interactivo.</td>
  </tr>
  <tr>
    <td>Sprint 3</td>
    <td>Desarrollo de la Aplicación Móvil (Fase 2)</td>
    <td>Módulo de registro botánico completo y sincronización offline.</td>
  </tr>
  <tr>
    <td>Sprint 4</td>
    <td>Desarrollo de la Aplicación Móvil (Fase 3)</td>
    <td>Filtros morfológicos, edición de perfil y roles de usuario.</td>
  </tr>
  <tr>
    <td>Sprint 5</td>
    <td>Desarrollo del Panel Administrativo</td>
    <td>Dashboard, gestión de registros (aprobación/rechazo) y emisión de certificados.</td>
  </tr>
  <tr>
    <td>Sprint 6</td>
    <td>Portal Público y Pruebas</td>
    <td>Desarrollo de la web ciudadana, pruebas de usabilidad y redacción del informe.</td>
  </tr>
</table>






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

<table>
  <tr>
    <th>ROL XP</th>
    <th>ASIGNADO(a)</th>
    <th>RESPONSABILIDADES</th>
  </tr>
  <tr>
    <td>Cliente (Tracker del usuario)</td>
    <td></td>
    <td>Mantener comunicación con el usuario real, validar entregas, recopilar feedback y traducirlo en ajustes de requerimientos.</td>
  </tr>
  <tr>
    <td>Programador / Líder técnico</td>
    <td>Danilo Alvarado<br>Marlon Rengifo</td>
    <td>Liderar las decisiones de arquitectura, gestionar el repositorio GitHub, desarrollar las funcionalidades críticas.</td>
  </tr>
  <tr>
    <td>Programador / Tester</td>
    <td>Angie Cabanillas<br>Brittany Rengifo<br>Walter Zumaeta</td>
    <td>Desarrollar funcionalidades, diseñar y ejecutar casos de prueba, garantizar la calidad de cada entrega.</td>
  </tr>
</table>



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

<table>
  <tr>
    <th>CÓDIGO: HU-01</th>
    <th></th>
  </tr>
  <tr>
    <td>HISTORIA DE USUARIO</td>
    <td>Como usuario, quiero registrarme con mi correo electrónico para acceder al catálogo.</td>
  </tr>
  <tr>
    <td>CRITERIO DE ACEPTACIÓN</td>
    <td>El usuario puede crear una cuenta con correo y contraseña. Se envía un código de verificación al correo. Los mensajes de error aparecen en español.</td>
  </tr>
  <tr>
    <td>PRIORIDAD</td>
    <td>Alta</td>
  </tr>
</table>




<table>
  <tr>
    <th>CÓDIGO: HU-02</th>
    <th></th>
  </tr>
  <tr>
    <td>HISTORIA DE USUARIO</td>
    <td>Como usuario, quiero iniciar sesión con Google para acceder de forma rápida</td>
  </tr>
  <tr>
    <td>CRITERIO DE ACEPTACIÓN</td>
    <td>El usuario puede autenticarse mediante Google OAuth. Se muestra un spinner de carga mientras se valida el token. Al completarse, se redirige al buscador principal.</td>
  </tr>
  <tr>
    <td>PRIORIDAD</td>
    <td>Alta</td>
  </tr>
</table>



<table>
  <tr>
    <th>CÓDIGO: HU-03</th>
    <th></th>
  </tr>
  <tr>
    <td>HISTORIA DE USUARIO</td>
    <td>Como usuario, quiero buscar plantas por nombre científico o común.</td>
  </tr>
  <tr>
    <td>CRITERIO DE ACEPTACIÓN</td>
    <td>El buscador filtra las especies en tiempo real conforme el usuario escribe. Se busca tanto por nombre científico como por nombres comunes.</td>
  </tr>
  <tr>
    <td>PRIORIDAD</td>
    <td>Alta</td>
  </tr>
</table>





<table>
  <tr>
    <th>CÓDIGO: HU-04</th>
    <th></th>
  </tr>
  <tr>
    <td>HISTORIA DE USUARIO</td>
    <td>Como usuario, quiero filtrar plantas por hábito de crecimiento.</td>
  </tr>
  <tr>
    <td>CRITERIO DE ACEPTACIÓN</td>
    <td>Se muestran chips horizontales (Todo, Árbol, Palmera, Arbusto, Hierba y Liana.) que filtran las especies al presionarlos.</td>
  </tr>
  <tr>
    <td>PRIORIDAD</td>
    <td>Alta</td>
  </tr>
</table>





<table>
  <tr>
    <th>CÓDIGO: HU-05</th>
    <th></th>
  </tr>
  <tr>
    <td>HISTORIA DE USUARIO</td>
    <td>Como usuario, quiero aplicar filtros morfológicos avanzados para encontrar especies.</td>
  </tr>
  <tr>
    <td>CRITERIO DE ACEPTACIÓN</td>
    <td>Un modal permite seleccionar filtros por: color de flor, tipo de inflorescencia, tipo de fruto, tipo de semilla y tipo de exudado. Los filtros se combinan entre sí.</td>
  </tr>
  <tr>
    <td>PRIORIDAD</td>
    <td>Alta</td>
  </tr>
</table>



<table>
  <tr>
    <th>CÓDIGO: HU-06</th>
    <th></th>
  </tr>
  <tr>
    <td>HISTORIA DE USUARIO</td>
    <td>Como usuario, quiero ver la ficha técnica completa de una planta.</td>
  </tr>
  <tr>
    <td>CRITERIO DE ACEPTACIÓN</td>
    <td>Al presionar una tarjeta de planta en el buscador, se abre la vista de detalle con: galería de imágenes (carrusel), nombre común, nombre científico, familia botánica, origen, hábito de crecimiento, caracteres diagnósticos, tipo de flor, color de flor principal, tipo de fruto, tipo de inflorescencia, tipo de semilla, tipo de infrutescencia, tipo y color de exudado, valor ornamental, descripción morfológica básica y usos urbanos. Los campos vacíos no se muestran.</td>
  </tr>
  <tr>
    <td>PRIORIDAD</td>
    <td>Alta</td>
  </tr>
</table>



<table>
  <tr>
    <th>CÓDIGO: HU-07</th>
    <th></th>
  </tr>
  <tr>
    <td>HISTORIA DE USUARIO</td>
    <td>Como usuario, quiero ver imágenes de la planta en un carrusel.</td>
  </tr>
  <tr>
    <td>CRITERIO DE ACEPTACIÓN</td>
    <td>La galería muestra múltiples imágenes con navegación horizontal y puntos indicadores. Si no hay imágenes, se muestra un ícono de hoja.</td>
  </tr>
  <tr>
    <td>PRIORIDAD</td>
    <td>Alta</td>
  </tr>
</table>



<table>
  <tr>
    <th>CÓDIGO: HU-08</th>
    <th></th>
  </tr>
  <tr>
    <td>HISTORIA DE USUARIO</td>
    <td>Como usuario, quiero ver información sobre el proyecto.</td>
  </tr>
  <tr>
    <td>CRITERIO DE ACEPTACIÓN</td>
    <td>La pantalla "Acerca del Proyecto" muestra la presentación, justificación, objetivo, funcionalidades, información académica y datos de RSU.</td>
  </tr>
  <tr>
    <td>PRIORIDAD</td>
    <td>Media</td>
  </tr>
</table>




<table>
  <tr>
    <th>CÓDIGO: HU-09</th>
    <th></th>
  </tr>
  <tr>
    <td>HISTORIA DE USUARIO</td>
    <td>Como usuario, quiero cerrar sesión.</td>
  </tr>
  <tr>
    <td>CRITERIO DE ACEPTACIÓN</td>
    <td>Al presionar "Cerrar sesión" en el perfil, saldrá un modal para confirmar el cierre de sesión y después se redirige directamente a la pantalla de inicio de sesión.</td>
  </tr>
  <tr>
    <td>PRIORIDAD</td>
    <td>Alta</td>
  </tr>
</table>




<table>
  <tr>
    <th>CÓDIGO: HU-10</th>
    <th></th>
  </tr>
  <tr>
    <td>HISTORIA DE USUARIO</td>
    <td>Como administrador, quiero gestionar las fichas técnicas desde un panel web.</td>
  </tr>
  <tr>
    <td>CRITERIO DE ACEPTACIÓN</td>
    <td>Sanity Studio permite crear, editar y eliminar fichas de plantas con todos sus campos y galería de imágenes.</td>
  </tr>
  <tr>
    <td>PRIORIDAD</td>
    <td>Alta</td>
  </tr>
</table>




<table>
  <tr>
    <th>CÓDIGO: HU-11</th>
    <th></th>
  </tr>
  <tr>
    <td>HISTORIA DE USUARIO</td>
    <td>Como estudiante, quiero registrar una planta ornamental desde mi celular con un formulario completo de datos personales, ubicación, identificación botánica, fotografías y resumen.</td>
  </tr>
  <tr>
    <td>CRITERIO DE ACEPTACIÓN</td>
    <td>El formulario se divide en 5 pasos secuenciales. Los campos de datos personales se autocompletan desde el perfil del usuario. El paso 1 incluye nombre, DNI, email, curso, facultad, escuela y día de clase. No se puede avanzar sin completar los campos obligatorios de cada paso.</td>
  </tr>
  <tr>
    <td>PRIORIDAD</td>
    <td>Alta</td>
  </tr>
</table>



<table>
  <tr>
    <th>CÓDIGO: HU-12</th>
    <th></th>
  </tr>
  <tr>
    <td>HISTORIA DE USUARIO</td>
    <td>Como ciudadano, quiero registrar una planta ornamental con un formulario simplificado que solo requiera nombre, email, ubicación y fotografías.</td>
  </tr>
  <tr>
    <td>CRITERIO DE ACEPTACIÓN</td>
    <td>Al seleccionar el rol "ciudadano", el formulario omite los campos académicos (DNI, facultad, escuela, curso) en el paso 1 y salta directamente del paso 2 (ubicación) al paso 4 (fotografías), omitiendo el formulario botánico detallado.</td>
  </tr>
  <tr>
    <td>PRIORIDAD</td>
    <td>Alta</td>
  </tr>
</table>








<table>
  <tr>
    <th>CÓDIGO: HU-13</th>
    <th></th>
  </tr>
  <tr>
    <td>HISTORIA DE USUARIO</td>
    <td>Como registrador, quiero capturar la ubicación GPS automáticamente y ajustarla en un mapa interactivo.</td>
  </tr>
  <tr>
    <td>CRITERIO DE ACEPTACIÓN</td>
    <td>El paso 2 del registro captura las coordenadas GPS automáticamente al entrar. Se muestra un mapa con un marcador arrastrable para ajustar la ubicación. Se deben completar distrito, dirección, tipo de ubicación (Jirón, Avenida, Calle, Pasaje, Parque u otro) y sustrato de la planta (En tierra, En macetero u otro). No se puede avanzar sin ubicación confirmada.</td>
  </tr>
  <tr>
    <td>PRIORIDAD</td>
    <td>Alta</td>
  </tr>
</table>



<table>
  <tr>
    <th>CÓDIGO: HU-14</th>
    <th></th>
  </tr>
  <tr>
    <td>HISTORIA DE USUARIO</td>
    <td>Como estudiante, quiero que el formulario botánico se adapte dinámicamente según el hábito de la planta seleccionado.</td>
  </tr>
  <tr>
    <td>CRITERIO DE ACEPTACIÓN</td>
    <td>Al seleccionar un hábito (Árbol, Palmera, Arbusto, Liana o Hierba), se muestra un formulario específico con los campos correspondientes: datos dasométricos, tronco/tallo, hojas, flores, frutos, semillas, estado fenológico, estado del individuo, valor ornamental e impacto urbano. Los campos se validan según obligatoriedad definida por hábito.</td>
  </tr>
  <tr>
    <td>PRIORIDAD</td>
    <td>Alta</td>
  </tr>
</table>






<table>
  <tr>
    <th>CÓDIGO: HU-15</th>
    <th></th>
  </tr>
  <tr>
    <td>HISTORIA DE USUARIO</td>
    <td>Como registrador, quiero capturar 5 fotografías obligatorias (planta completa, hoja, flor, fruto, semilla) y fotos adicionales opcionales.</td>
  </tr>
  <tr>
    <td>CRITERIO DE ACEPTACIÓN</td>
    <td>El paso 4 del registro presenta 5 ranuras obligatorias con etiquetas. Cada ranura permite capturar desde la cámara o seleccionar de la galería. Se pueden agregar fotografías extras. No se puede avanzar al resumen sin las 5 fotos obligatorias. Se muestra vista previa de cada imagen con opción de reemplazo.</td>
  </tr>
  <tr>
    <td>PRIORIDAD</td>
    <td>Alta</td>
  </tr>
</table>



<table>
  <tr>
    <th>CÓDIGO: HU-16</th>
    <th></th>
  </tr>
  <tr>
    <td>HISTORIA DE USUARIO</td>
    <td>Como registrador, quiero ver un resumen completo de todos los datos ingresados antes de enviar el registro.</td>
  </tr>
  <tr>
    <td>CRITERIO DE ACEPTACIÓN</td>
    <td>El paso 5 muestra un resumen con datos personales, ubicación en mapa, identificación botánica, caracteres morfológicos y fotografías. Se ofrecen botones para regresar y editar o confirmar y enviar. El registro se envía con estado "En revisión".</td>
  </tr>
  <tr>
    <td>PRIORIDAD</td>
    <td>Alta</td>
  </tr>
</table>



<table>
  <tr>
    <th>CÓDIGO: HU-17</th>
    <th></th>
  </tr>
  <tr>
    <td>HISTORIA DE USUARIO</td>
    <td>Como registrador en campo, quiero poder registrar plantas sin conexión a internet.</td>
  </tr>
  <tr>
    <td>CRITERIO DE ACEPTACIÓN</td>
    <td>Si no hay conexión disponible, el registro se guarda localmente en el dispositivo con las fotografías persistidas. Se muestra un mensaje indicando que el registro fue guardado offline. El usuario puede ver sus registros pendientes en la pestaña "Pendientes".</td>
  </tr>
  <tr>
    <td>PRIORIDAD</td>
    <td>Alta</td>
  </tr>
</table>



<table>
  <tr>
    <th>CÓDIGO: HU-18</th>
    <th></th>
  </tr>
  <tr>
    <td>HISTORIA DE USUARIO</td>
    <td>Como usuario, quiero sincronizar mis registros guardados offline cuando tenga conexión.</td>
  </tr>
  <tr>
    <td>CRITERIO DE ACEPTACIÓN</td>
    <td>La pestaña "Pendientes" muestra todos los registros guardados localmente con nombre, hábito, fecha y estado. Se muestra indicador de conectividad (Conectado/Sin conexión). El botón "Sincronizar Todo" sube todos los registros a Sanity incluyendo las fotografías. Los registros sincronizados se eliminan de la cola local. Los errores de sincronización se muestran por registro. Se puede eliminar registros locales individualmente con confirmación.</td>
  </tr>
  <tr>
    <td>PRIORIDAD</td>
    <td>Alta</td>
  </tr>
</table>



<table>
  <tr>
    <th>CÓDIGO: HU-19</th>
    <th></th>
  </tr>
  <tr>
    <td>HISTORIA DE USUARIO</td>
    <td>Como usuario, quiero ver las plantas registradas en un mapa interactivo.</td>
  </tr>
  <tr>
    <td>CRITERIO DE ACEPTACIÓN</td>
    <td>La pestaña "Mapa" muestra un mapa centrado en Iquitos con marcadores de plantas validadas. Los marcadores cercanos se agrupan en clusters con contador numérico. Al presionar un marcador, se muestra una tarjeta flotante con imagen, nombre, hábito y familia. Al presionar la tarjeta se navega a la ficha técnica completa. Incluye barra de búsqueda para filtrar por planta, calle o distrito.</td>
  </tr>
  <tr>
    <td>PRIORIDAD</td>
    <td>Alta</td>
  </tr>
</table>



<table>
  <tr>
    <th>CÓDIGO: HU-20</th>
    <th></th>
  </tr>
  <tr>
    <td>HISTORIA DE USUARIO</td>
    <td>Como registrador, quiero recibir notificaciones sobre el estado de mis registros.</td>
  </tr>
  <tr>
    <td>CRITERIO DE ACEPTACIÓN</td>
    <td>En la pantalla del buscador aparece un ícono de campana con indicador rojo cuando hay actualizaciones en los registros del usuario. Al presionar la campana, se muestra un modal con la lista de "Mis Aportes" mostrando el nombre y estado actual (En revisión, Observado, Validado, Rechazado) de cada registro con colores diferenciados. El indicador se resetea al abrir las notificaciones.</td>
  </tr>
  <tr>
    <td>PRIORIDAD</td>
    <td>Alta</td>
  </tr>
</table>



<table>
  <tr>
    <th>CÓDIGO: HU-21</th>
    <th></th>
  </tr>
  <tr>
    <td>HISTORIA DE USUARIO</td>
    <td>Como registrador, quiero editar un registro que fue observado por un profesor.</td>
  </tr>
  <tr>
    <td>CRITERIO DE ACEPTACIÓN</td>
    <td>Desde las notificaciones, al presionar un registro observado se navega al formulario de registro precargado con los datos existentes. Se muestra el motivo de observación del profesor. Se pueden modificar los datos y reenviar el registro. Las fotografías existentes se preservan si no se cambian.</td>
  </tr>
  <tr>
    <td>PRIORIDAD</td>
    <td>Alta</td>
  </tr>
</table>



<table>
  <tr>
    <th>CÓDIGO: HU-22</th>
    <th></th>
  </tr>
  <tr>
    <td>HISTORIA DE USUARIO</td>
    <td>Como usuario, quiero editar mi perfil con datos personales y académicos.</td>
  </tr>
  <tr>
    <td>CRITERIO DE ACEPTACIÓN</td>
    <td>La pantalla de perfil permite editar nombre, apellido, DNI, facultad, escuela, curso y día de clase. Se activa un modo de edición con botones de guardar y cancelar. Si se completan datos académicos (DNI, facultad, escuela), se valida que estén correctos (DNI de 8 dígitos). Los datos del perfil se persisten en Clerk y se autocompletan en futuros registros.</td>
  </tr>
  <tr>
    <td>PRIORIDAD</td>
    <td>Alta</td>
  </tr>
</table>



<table>
  <tr>
    <th>CÓDIGO: HU-23</th>
    <th></th>
  </tr>
  <tr>
    <td>HISTORIA DE USUARIO</td>
    <td>Como registrador, quiero generar un certificado digital PDF al alcanzar el umbral de registros validados.</td>
  </tr>
  <tr>
    <td>CRITERIO DE ACEPTACIÓN</td>
    <td>En el perfil se muestra una barra de progreso hacia el certificado (20 validados para estudiantes, 100 para ciudadanos). Al alcanzar el umbral, se habilita el botón "Generar Certificado". El certificado PDF incluye nombre del participante, número de registros validados, tipo de participación, periodo, código único de verificación y firmas de los responsables del proyecto (configurables desde Sanity). El PDF se genera en formato A4 horizontal y se puede compartir/descargar. El certificado se registra en la base de datos con código único para verificación en línea.</td>
  </tr>
  <tr>
    <td>PRIORIDAD</td>
    <td>Alta</td>
  </tr>
  <tr>
    <td>CÓDIGO: HU-24</td>
    <td></td>
  </tr>
  <tr>
    <td>HISTORIA DE USUARIO</td>
    <td>Como usuario, quiero filtrar plantas con filtros dinámicos creados por los profesores validadores.</td>
  </tr>
  <tr>
    <td>CRITERIO DE ACEPTACIÓN</td>
    <td>En el buscador principal, al presionar el botón de filtros avanzados, se abre un modal con categorías de filtros agrupadas (creadas por profesores desde el panel admin). Los filtros pueden ser de selección única o múltiple según configuración. Los filtros se combinan entre sí y con la búsqueda por texto y hábito. Se muestra contador de filtros activos. Al limpiar filtros se restaura la vista completa.</td>
  </tr>
  <tr>
    <td>PRIORIDAD</td>
    <td>Alta</td>
  </tr>
</table>



# 5. DISEÑO DE LA SOLUCIÓN

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
- Navegar a la pantalla de Registro.
- Al autenticarse exitosamente, se redirige al Buscador Principal.
5. La barra de navegación inferior contiene 5 pestañas:
1. Buscador: Explorar especies validadas con filtros por texto, hábito y filtros dinámicos. Al presionar una tarjeta se abre la ficha técnica. Incluye campana de notificaciones.
2. Mapa: Visualizar las plantas en un mapa interactivo con clustering y búsqueda geográfica.
3. Registro: Formulario de 5 pasos para registrar una planta nueva.
4. Pendientes: Cola de registros guardados offline, con opción de sincronizar.
5. Perfil: Datos del usuario, estadísticas, certificados, edición de perfil y cierre de sesión.

## 5.3 Descripción de Pantallas Principales
- Pantalla de Inicio de Sesión: Contiene el logo de la aplicación, campos de correo electrónico y contraseña, botón de inicio de sesión, botón de inicio con Google y enlace para registrarse.
- Pantalla de Registro de Cuenta: Similar a la anterior, con campos de correo y contraseña. Al registrarse, se envía un código de verificación por correo. Incluye una segunda vista para ingresar el código de verificación.
- Buscador Principal: Muestra el saludo personalizado con avatar del usuario, badge de rol si es admin o profesor, barra de búsqueda con botón de filtros dinámicos avanzados, chips de hábitos de crecimiento, cuadrícula de tarjetas de plantas con imagen, nombre, hábito y familia. Solo muestra plantas en estado "Validado". Incluye campana de notificaciones con indicador de no leídas.
- Mapa Interactivo: Mapa a pantalla completa centrado en Iquitos (-3.749, -73.253) con estilo oscuro. Muestra marcadores de plantas validadas con clustering automático. Al presionar un marcador aparece una tarjeta flotante con miniatura, nombre, hábito y familia, que al presionarla navega a la ficha técnica. Incluye barra de búsqueda flotante para filtrar por planta, calle o distrito, y contador de resultados.
- Registro Botánico: Formulario de 5 pasos secuenciales con barra de progreso visual:
- Paso 1 – Datos Personales: Selección de rol (estudiante/ciudadano), nombre, DNI, email, curso, facultad, escuela, día de clase. Los campos se autocompletan desde el perfil de Clerk.
- Paso 2 – Ubicación: Mapa interactivo con marcador arrastrable, GPS automático, campos de distrito, dirección, tipo de ubicación 1 (Jirón, Avenida, etc.), tipo de ubicación 2 (Vereda, Berma central, etc.), número de casa y sustrato (En tierra, En macetero).
- Paso 3 – Identificación Botánica: Nombre local, nombre científico, familia, hábito de la planta (activa formulario dinámico), tipo de vida, formulario específico por hábito (FormArbol, FormPalmera, FormArbusto, FormLiana, FormHierba), estado fenológico, estado del individuo, valor ornamental y impacto urbano). Incluye modal de campos faltantes con scroll al campo.
- Paso 4 – Fotografías: 5 ranuras obligatorias (planta completa, hoja, flor, fruto, semilla) con captura desde cámara o galería, más fotografías extra opcionales. Vista previa con opción de zoom y reemplazo.
- Paso 5 – Resumen: Vista previa completa de todos los datos antes de enviar. Si hay conexión, sube a Sanity directamente; si no hay conexión, guarda offline.
- Pendientes: Muestra indicador de conectividad (Conectado/Sin conexión). Lista de registros guardados offline con nombre, hábito y fecha. Botón "Sincronizar Todo" para subir todos los registros pendientes. Cada registro puede ser editado (navega al formulario) o eliminado con confirmación.
- Ficha Técnica: Presenta un carrusel de imágenes en la parte superior, seguido del nombre de la planta, nombre científico, y una sección de "Ficha Técnica" con todos los caracteres morfológicos organizados en ítems con íconos. Los campos sin datos no se muestran. Incluye secciones de descripción morfológica y usos urbanos.
- Perfil: Muestra la foto de perfil del usuario (editable con cámara/galería), nombre y correo electrónico. Incluye estadísticas de registros (total, validados, observados, rechazados), barra de progreso hacia certificado, botón para generar certificado PDF, formulario de edición de datos académicos (nombre, DNI, facultad, escuela, curso, día de clase), acceso a "Acerca del Proyecto" y botón de cerrar sesión.


- Acerca del Proyecto: Página informativa con la presentación del proyecto, justificación, objetivo, funcionalidades disponibles, información académica (curso, institución, ámbito) y datos de RSU.



# 6. ARQUITECTURA Y TECNOLOGÍA

## 6.1 Proceso de Selección del Stack Tecnológico
La selección del stack tecnológico se realizó considerando los siguientes criterios:
- Accesibilidad multiplataforma: Se requería una solución que funcionara en dispositivos Android de gama baja a media, comunes entre los estudiantes de la UNAP.
- Velocidad de desarrollo: Al tratarse de un proyecto académico con plazos definidos por sprints, se priorizaron herramientas que permitieran un desarrollo ágil.
- Gestión de contenido flexible: La información botánica necesita ser actualizada constantemente por múltiples colaboradores (estudiantes del curso de Botánica Sistemática), por lo que se requería un CMS accesible desde la web.
- Autenticación segura: Se necesitaba un sistema de autenticación robusto que permita controlar el acceso al catálogo.
- Costo: Se priorizaron herramientas con planes gratuitos o de bajo costo para proyectos académicos.

## 6.2 Stack Tecnológico Definitivo

### 6.2.1 App Móvil


<table>
  <tr>
    <th>Frontend (App Móvil):<br>- React Native + Expo<br>- React Native 0.81 / Expo 54</th>
    <th>Framework multiplataforma que permite desarrollar para Android e iOS desde un solo código base. Expo simplifica la configuración y el despliegue.</th>
  </tr>
  <tr>
    <td>UI Components:<br>- Tamagui 1.135</td>
    <td>Librería de componentes UI optimizada para React Native que proporciona un sistema de diseño consistente con soporte para temas y tokens de diseño.</td>
  </tr>
  <tr>
    <td>Navegación:<br>- Expo Router (Stack + Tabs)</td>
    <td>Sistema de navegación basado en archivos con JS Stack para animaciones bidireccionales.</td>
  </tr>
  <tr>
    <td>Mapas:- react-native-maps + react-native-map-clustering</td>
    <td>Mapas nativos de Google Maps con clustering automático de marcadores.</td>
  </tr>
  <tr>
    <td>Geolocalización:<br>- expo-location</td>
    <td>Acceso al GPS del dispositivo con diferentes niveles de precisión.</td>
  </tr>
  <tr>
    <td>Cámara y Galería:<br>- expo-image-picker</td>
    <td>Captura fotográfica desde cámara y selección desde galería del dispositivo.</td>
  </tr>
  <tr>
    <td>Almacenamiento local:<br>- @react-native-async-storage/async-storage</td>
    <td>Almacenamiento persistente para registros offline y caché.</td>
  </tr>
  <tr>
    <td>Sistema de archivos:<br>- expo-file-system</td>
    <td>Persistencia de imágenes en el directorio del dispositivo para modo offline.</td>
  </tr>
  <tr>
    <td>Red:<br>- expo-network</td>
    <td>Detección de estado de conectividad para modo online/offline.</td>
  </tr>
  <tr>
    <td>Almacenamiento seguro:<br>- expo-secure-store</td>
    <td>Almacenamiento encriptado para tokens de autenticación.</td>
  </tr>
  <tr>
    <td>Íconos:<br>- @expo/vector-icons</td>
    <td>Íconos vectoriales (MaterialCommunityIcons, Feather, AntDesign).</td>
  </tr>
</table>










### 6.2.2 Panel Administrativo Web

<table>
  <tr>
    <th>Framework:<br>-Vite + React</th>
    <th>Build tool rápido con React para desarrollo de SPA.</th>
  </tr>
  <tr>
    <td>Autenticación:<br>-@clerk/clerk-react</td>
    <td>Integración de Clerk para autenticación web con control de roles.</td>
  </tr>
  <tr>
    <td>Routing:<br>- React Router DOM</td>
    <td>Navegación SPA con rutas protegidas para admin.</td>
  </tr>
  <tr>
    <td>Notificaciones;<br>- Sonner</td>
    <td>Sistema de notificaciones toast con temas oscuros.</td>
  </tr>
  <tr>
    <td>Geolocalización:<br>- expo-location</td>
    <td>Acceso al GPS del dispositivo con diferentes niveles de precisión.</td>
  </tr>
  <tr>
    <td>Íconos:<br>- Lucide React</td>
    <td>Librería de íconos SVG modernos.</td>
  </tr>
</table>



### 6.2.1 Servicios Compartidos

<table>
  <tr>
    <th>Framework:<br>-Vite + React</th>
    <th>Build tool rápido con React para desarrollo de SPA.</th>
  </tr>
  <tr>
    <td>Autenticación:<br>-@clerk/clerk-react</td>
    <td>Integración de Clerk para autenticación web con control de roles.</td>
  </tr>
  <tr>
    <td>Routing:<br>- React Router DOM</td>
    <td>Navegación SPA con rutas protegidas para admin.</td>
  </tr>
  <tr>
    <td>Notificaciones;<br>- Sonner</td>
    <td>Sistema de notificaciones toast con temas oscuros.</td>
  </tr>
  <tr>
    <td>Geolocalización:<br>- expo-location</td>
    <td>Acceso al GPS del dispositivo con diferentes niveles de precisión.</td>
  </tr>
  <tr>
    <td>Íconos:<br>- Lucide React</td>
    <td>Librería de íconos SVG modernos.</td>
  </tr>
</table>





## 6.3 Arquitectura del Sistema
La arquitectura del sistema sigue un patrón de tres capas:
- - App Móvil: Aplicación compilada con Expo que se ejecuta en dispositivos Android. Incluye autenticación, buscador con filtros dinámicos, fichas técnicas, registro botánico con geolocalización y fotografías, mapa interactivo con clustering, modo offline con sincronización, perfil con estadísticas y generación de certificados PDF.

- - Panel Administrativo Web: SPA desplegada en la web para profesores validadores y administradores. Acceso protegido por roles de Clerk (solo admin y profesor_validador). Incluye dashboard, panel de validación de registros, gestión de filtros dinámicos, mapa de registros, catálogo completo y gestión de certificados.

- - Portal Web Público: Página web estática con landing page animada (GSAP) y catálogo público de especies validadas. Acceso libre sin autenticación.

- - Capa de Datos: Base de datos NoSQL con 4 schemas principales: planta (campos morfológicos completos por hábito, galería, geolocalización, estados de revisión), filtro (filtros dinámicos configurables por profesores), certificado (certificados digitales con código de verificación) y configuracion (parámetros globales del proyecto). Se accede mediante.

- - Capa de Autenticación (Clerk): Servicio externo compartido por la app móvil (@clerk/clerk-expo) y el panel admin (@clerk/clerk-react). Gestiona registro, login (correo + Google OAuth), roles de usuario y datos académicos.


# 7. DESARROLLO POR ITERACIONES

## 7.1 Sprint 1 – Detalle de Ejecución

<table>
  <tr>
    <th>Objetivo del Sprint</th>
    <th>Validar el problema, definir el proyecto y establecer la base técnica del sistema.</th>
  </tr>
  <tr>
    <td>Duración</td>
    <td>3 semanas</td>
  </tr>
  <tr>
    <td>Actividades principales</td>
    <td>- Investigación de la problemática de flora ornamental en Iquitos.<br>- Revisión de soluciones existentes (libros botánicos, apps genéricas, bases de datos científicas).<br>- Definición del alcance y los 4 módulos funcionales del sistema.<br>- Selección y configuración del stack tecnológico.<br>- Diseño del schema de base de datos en Sanity.<br>- Implementación del sistema de autenticación (registro, inicio de sesión, Google OAuth).<br>- Desarrollo de la pantalla principal del buscador con filtros por hábito.<br>- Creación del componente de tarjeta de planta (PlantCard).<br>- Implementación de la vista de detalle con ficha técnica.<br>- Configuración del panel administrativo (Sanity Studio).<br>- Entrevista de validación con usuario real.</td>
  </tr>
</table>





### 7.1.1 Tareas Completadas – Sprint 1


<table>
  <tr>
    <th>TAREA 01</th>
    <th>Investigación del problema y contexto</th>
  </tr>
  <tr>
    <td>RESPONSABLE(S)</td>
    <td>Todo el equipo</td>
  </tr>
  <tr>
    <td>TIEMPO ESTIMADO</td>
    <td>1 semana</td>
  </tr>
  <tr>
    <td>ESTADO</td>
    <td>Completado</td>
  </tr>
</table>



<table>
  <tr>
    <th>TAREA 02</th>
    <th>Definición del proyecto y módulos</th>
  </tr>
  <tr>
    <td>RESPONSABLE(S)</td>
    <td>Todo el equipo</td>
  </tr>
  <tr>
    <td>TIEMPO ESTIMADO</td>
    <td>3 días</td>
  </tr>
  <tr>
    <td>ESTADO</td>
    <td>Completado</td>
  </tr>
</table>



<table>
  <tr>
    <th>TAREA 03</th>
    <th>Configuración del entorno (Expo, Sanity, Clerk, GitHub)</th>
  </tr>
  <tr>
    <td>RESPONSABLE(S)</td>
    <td>Danilo Alvarado</td>
  </tr>
  <tr>
    <td>TIEMPO ESTIMADO</td>
    <td>2 días</td>
  </tr>
  <tr>
    <td>ESTADO</td>
    <td>Completado</td>
  </tr>
</table>



<table>
  <tr>
    <th>TAREA 04</th>
    <th>Diseño del schema de base de datos</th>
  </tr>
  <tr>
    <td>RESPONSABLE(S)</td>
    <td>Danilo Alvarado, Marlon Rengifo</td>
  </tr>
  <tr>
    <td>TIEMPO ESTIMADO</td>
    <td>1 día</td>
  </tr>
  <tr>
    <td>ESTADO</td>
    <td>Completado</td>
  </tr>
</table>



<table>
  <tr>
    <th>TAREA 05</th>
    <th>Sistema de autenticación (correo + Google)</th>
  </tr>
  <tr>
    <td>RESPONSABLE(S)</td>
    <td>Danilo Alvarado</td>
  </tr>
  <tr>
    <td>TIEMPO ESTIMADO</td>
    <td>3 días</td>
  </tr>
  <tr>
    <td>ESTADO</td>
    <td>Completado</td>
  </tr>
</table>



<table>
  <tr>
    <th>TAREA 06</th>
    <th>Pantalla del buscador principal</th>
  </tr>
  <tr>
    <td>RESPONSABLE(S)</td>
    <td>Danilo Alvarado, Marlon Rengifo</td>
  </tr>
  <tr>
    <td>TIEMPO ESTIMADO</td>
    <td>2 días</td>
  </tr>
  <tr>
    <td>ESTADO</td>
    <td>Completado</td>
  </tr>
</table>



<table>
  <tr>
    <th>TAREA 07</th>
    <th>Filtros morfológicos avanzados</th>
  </tr>
  <tr>
    <td>RESPONSABLE(S)</td>
    <td>Danilo Alvarado</td>
  </tr>
  <tr>
    <td>TIEMPO ESTIMADO</td>
    <td>2 días</td>
  </tr>
  <tr>
    <td>ESTADO</td>
    <td>Completado</td>
  </tr>
</table>



<table>
  <tr>
    <th>TAREA 08</th>
    <th>Vista de detalle (ficha técnica)</th>
  </tr>
  <tr>
    <td>RESPONSABLE(S)</td>
    <td>Danilo Alvarado, Marlon Rengifo</td>
  </tr>
  <tr>
    <td>TIEMPO ESTIMADO</td>
    <td>2 días</td>
  </tr>
  <tr>
    <td>ESTADO</td>
    <td>Completado</td>
  </tr>
</table>



<table>
  <tr>
    <th>TAREA 09</th>
    <th>Pantalla de perfil y "Acerca del proyecto"</th>
  </tr>
  <tr>
    <td>RESPONSABLE(S)</td>
    <td>Danilo Alvarado</td>
  </tr>
  <tr>
    <td>TIEMPO ESTIMADO</td>
    <td>1 día</td>
  </tr>
  <tr>
    <td>ESTADO</td>
    <td>Completado</td>
  </tr>
</table>



<table>
  <tr>
    <th>TAREA 10</th>
    <th>Entrevista con usuario real</th>
  </tr>
  <tr>
    <td>RESPONSABLE(S)</td>
    <td>Angie Cabanillas, Brittany Rengifo</td>
  </tr>
  <tr>
    <td>TIEMPO ESTIMADO</td>
    <td>1 día</td>
  </tr>
  <tr>
    <td>ESTADO</td>
    <td>Completado</td>
  </tr>
</table>



<table>
  <tr>
    <th>TAREA 11</th>
    <th>Elaboración del documento del Sprint 1</th>
  </tr>
  <tr>
    <td>RESPONSABLE(S)</td>
    <td>Walter Zumaeta, Angie Cabanillas</td>
  </tr>
  <tr>
    <td>TIEMPO ESTIMADO</td>
    <td>3 días</td>
  </tr>
  <tr>
    <td>ESTADO</td>
    <td>Completado</td>
  </tr>
</table>









### 7.1.2 Incremento del Producto - Sprint 1

<table>
  <tr>
    <th>Al finalizar el Sprint 1, el producto cuenta con las siguientes funcionalidades operativas:</th>
    <th>- Sistema de autenticación funcional (registro por correo con verificación, inicio de sesión, Google OAuth).<br>- Traducción de mensajes de error de Clerk al español.<br>- Toggle de visibilidad de contraseña.<br>- Spinner de carga durante la autenticación con Google.<br>- Buscador principal con filtro por texto (nombre científico y común).<br>- Filtro por hábito de crecimiento mediante chips interactivos.<br>- Modal de filtros morfológicos avanzados (color de flor, inflorescencia, fruto, semilla, exudado).<br>- Tarjetas de plantas con imagen, nombre, hábito y familia.<br>- Vista de detalle con carrusel de imágenes y ficha técnica completa.<br>- Campos vacíos se ocultan automáticamente en la ficha técnica.<br>- Pantalla de perfil con datos del usuario y cierre de sesión.<br>- Pantalla "Acerca del Proyecto" con información de RSU.<br>- Panel administrativo (Sanity Studio) para gestión de fichas botánicas.<br>- Navegación con animaciones de deslizamiento bidireccionales.</th>
  </tr>
</table>






### 7.1.3 Obstáculos Encontrados y Soluciones – Sprint 1


<table>
  <tr>
    <th>OBSTÁCULO</th>
    <th>Doble vista durante OAuth</th>
  </tr>
  <tr>
    <td>DESCRIPCIÓN</td>
    <td>Al iniciar sesión con Google, el usuario veía un parpadeo entre la pantalla de login y el buscador antes de la redirección final.</td>
  </tr>
  <tr>
    <td>SOLUCIÓN APLICADA</td>
    <td>Se implementó un spinner de carga a pantalla completa que se activa tras el login exitoso, ocultando la transición mientras Clerk valida el token.</td>
  </tr>
</table>




<table>
  <tr>
    <th>OBSTÁCULO</th>
    <th>Animaciones de navegación en Android</th>
  </tr>
  <tr>
    <td>DESCRIPCIÓN</td>
    <td>La librería Native Stack de React Navigation no mostraba animaciones de retroceso en Android.</td>
  </tr>
  <tr>
    <td>SOLUCIÓN APLICADA</td>
    <td>Se migró a JS Stack (@react-navigation/stack) con CardStyleInterpolators.forHorizontalIOS para garantizar animaciones bidireccionales consistentes.</td>
  </tr>
</table>



<table>
  <tr>
    <th>OBSTÁCULO</th>
    <th>Sombras fantasmas en tarjetas</th>
  </tr>
  <tr>
    <td>DESCRIPCIÓN</td>
    <td>Los componentes Card de Tamagui mostraban sombras dobles no deseadas cuando la propiedad "elevate" estaba activada.</td>
  </tr>
  <tr>
    <td>SOLUCIÓN APLICADA</td>
    <td>Se eliminó la propiedad "elevate" de todos los componentes Card en las pantallas de autenticación.</td>
  </tr>
</table>








<table>
  <tr>
    <th>OBSTÁCULO</th>
    <th>Mensajes de error en inglés</th>
  </tr>
  <tr>
    <td>DESCRIPCIÓN</td>
    <td>Los errores de Clerk (correo inválido, contraseña incorrecta, cuenta duplicada) aparecían en inglés.</td>
  </tr>
  <tr>
    <td>SOLUCIÓN APLICADA</td>
    <td>Se implementó un sistema de traducción de errores en el catch de cada formulario, mapeando los códigos de error de Clerk a mensajes en español.</td>
  </tr>
</table>



## 7.2 Sprint 2 – Registro Botánico Completo

<table>
  <tr>
    <th>Objetivo del Sprint</th>
    <th>Implementar el módulo de registro botánico completo desde dispositivos móviles, incluyendo geolocalización, formularios dinámicos por hábito y captura fotográfica.</th>
  </tr>
  <tr>
    <td>Duración</td>
    <td>3 semanas</td>
  </tr>
  <tr>
    <td>Actividades principales</td>
    <td>- Diseño e implementación del formulario de registro de 5 pasos secuenciales.<br>- Integración de geolocalización con captura GPS automática.<br>- Implementación de mapa interactivo con marcador arrastrable para selección de ubicación.<br>- Desarrollo de 5 formularios dinámicos específicos por hábito: FormArbol.tsx, FormPalmera.tsx, FormArbusto.tsx, FormLiana.tsx, FormHierba.tsx.<br>- Creación del componente CustomSelectors (RadioSelect) para selectores con opción "Otro".<br>- Desarrollo del módulo de captura fotográfica (cámara y galería) para 5 fotos obligatorias + extras.<br>- Implementación de validation.ts con funciones de validación por hábito (validateArbol, validatePalmera, validateArbusto, validateLiana, validateHierba) y getMissingSections.<br>- Sistema de resumen previo al envío (paso 5) con vista previa completa.<br>- Subida de imágenes a Sanity mediante API REST con autenticación por token.</td>
  </tr>
</table>



### 7.2.1 Tareas Completadas – Sprint 2

<table>
  <tr>
    <th>TAREA</th>
    <th>DESCRIPCIÓN</th>
  </tr>
  <tr>
    <td>T2-01</td>
    <td>Diseño del formulario de registro en 5 pasos con barra de progreso</td>
  </tr>
  <tr>
    <td>T2-02</td>
    <td>Integración de expo-location para geolocalización automática</td>
  </tr>
  <tr>
    <td>T2-03</td>
    <td>Implementación de mapa interactivo con marcador arrastrable</td>
  </tr>
  <tr>
    <td>T2-04</td>
    <td>Desarrollo de FormArbol con 12 secciones (dasometría, tronco, exudado, copa, hojas, flores, frutos, semillas, etc.)</td>
  </tr>
  <tr>
    <td>T2-05</td>
    <td>Desarrollo de FormPalmera con secciones específicas (tipo palmera, tallo/estípite, inflorescencia, espinas)</td>
  </tr>
  <tr>
    <td>T2-06</td>
    <td>Desarrollo de FormArbusto con secciones de tallo, ramificación y hojas</td>
  </tr>
  <tr>
    <td>T2-07</td>
    <td>Desarrollo de FormLiana con mecanismo de fijación, tipo de soporte y crecimiento</td>
  </tr>
  <tr>
    <td>T2-08</td>
    <td>Desarrollo de FormHierba con tipo de crecimiento y tallo herbáceo</td>
  </tr>
  <tr>
    <td>T2-09</td>
    <td>Sistema de captura fotográfica (5 obligatorias + extras) con cámara y galería</td>
  </tr>
  <tr>
    <td>T2-10</td>
    <td>Módulo de validación por hábito (validation.ts) con modal de campos faltantes</td>
  </tr>
  <tr>
    <td>T2-11</td>
    <td>Resumen previo al envío con vista previa de todos los datos</td>
  </tr>
  <tr>
    <td>T2-12</td>
    <td>Resumen previo al envío con vista previa de todos los datos</td>
  </tr>
  <tr>
    <td>T2-13</td>
    <td>Subida de registros a Sanity con fotos como assets</td>
  </tr>
  <tr>
    <td>T2-14</td>
    <td>Actualización del schema de planta en Sanity con campos por hábito</td>
  </tr>
</table>




### 7.2.2 Incremento del Producto – Sprint 2
Al finalizar el Sprint 2, el producto incorpora:
- Formulario de registro botánico completo de 5 pasos funcional en la app móvil.
- Geolocalización con GPS automático y mapa interactivo con marcador arrastrable.
- 5 formularios dinámicos específicos por hábito con todos los campos requeridos.
- Captura fotográfica con 5 fotos obligatorias (planta completa, hoja, flor, fruto, semilla) y fotos adicionales.
- Validación exhaustiva de campos obligatorios por hábito con modal de navegación a campos faltantes.
- Resumen previo al envío con vista previa completa antes de confirmar.
- Pestaña "Registro" en la barra de navegación inferior.


### 7.2.3 Obstáculos Encontrados y Soluciones – Sprint 2

<table>
  <tr>
    <th>OBSTÁCULO</th>
    <th>Formularios extensos causan pérdida de scroll</th>
  </tr>
  <tr>
    <td>DESCRIPCIÓN</td>
    <td>Los formularios de Árbol y Palmera tienen más de 12 secciones, lo que dificultaba encontrar campos incompletos.</td>
  </tr>
  <tr>
    <td>SOLUCIÓN APLICADA</td>
    <td>Se implementó un sistema de refs por campo con getMissingSections() que genera un modal con la lista de campos faltantes y botones que hacen scroll automático al campo correspondiente.</td>
  </tr>
</table>



<table>
  <tr>
    <th>OBSTÁCULO</th>
    <th>Sanitización de campos numéricos</th>
  </tr>
  <tr>
    <td>DESCRIPCIÓN</td>
    <td>Los usuarios ingresaban texto en campos que esperaban valores numéricos (altura, diámetro, etc.).</td>
  </tr>
  <tr>
    <td>SOLUCIÓN APLICADA</td>
    <td>Se implementó un filtro que detecta campos numéricos por nombre para permitir solo dígitos y puntos decimales.</td>
  </tr>
</table>




<table>
  <tr>
    <th>OBSTÁCULO</th>
    <th>Sanitización de campos numéricos</th>
  </tr>
  <tr>
    <td>DESCRIPCIÓN</td>
    <td>Los usuarios ingresaban texto en campos que esperaban valores numéricos (altura, diámetro, etc.).</td>
  </tr>
  <tr>
    <td>SOLUCIÓN APLICADA</td>
    <td>Se implementó un filtro que detecta campos numéricos por nombre para permitir solo dígitos y puntos decimales.</td>
  </tr>
</table>



## 7.3 Sprint 3 – MVP Funcional (Offline, Roles, Filtros)

<table>
  <tr>
    <th>Objetivo del Sprint</th>
    <th>Convertir el sistema en un MVP funcional incorporando modo offline, diferenciación de roles, notificaciones y filtros dinámicos.</th>
  </tr>
  <tr>
    <td>Duración</td>
    <td>3 semanas</td>
  </tr>
  <tr>
    <td>Actividades principales</td>
    <td>- Implementación del modo offline con almacenamiento local.<br>- Desarrollo de la pestaña "Pendientes" para gestión y sincronización de registros offline.<br>- Implementación de persistencia de imágenes en el directorio del dispositivo<br>- Detección automática de conectividad<br>- Diferenciación de roles registrador (estudiante vs ciudadano) con formulario adaptativo.<br>- Sistema de notificaciones con campana e indicador de no leídas.<br>- Integración de filtros dinámicos desde Sanity con agrupación por categoría.<br>- Caché de perfil offline para permitir registro sin conexión a Clerk.</td>
  </tr>
</table>








### 7.3.1 Tareas Completadas – Sprint 3

<table>
  <tr>
    <th>TAREA</th>
    <th>DESCRIPCIÓN</th>
  </tr>
  <tr>
    <td>T3-01</td>
    <td>Desarrollo de offline-storage.ts para cola de registros locales</td>
  </tr>
  <tr>
    <td>T3-02</td>
    <td>Implementación de persistImage() para copiar fotos temporales al directorio persistente</td>
  </tr>
  <tr>
    <td>T3-03</td>
    <td>Implementación de syncRegistro() para subir registros con fotos a Sanity</td>
  </tr>
  <tr>
    <td>T3-04</td>
    <td>Desarrollo de sync.tsx con lista de pendientes, botón "Sincronizar Todo" y eliminación individual</td>
  </tr>
  <tr>
    <td>T3-05</td>
    <td>Detección de conectividad con checkIsOffline() (network.ts)</td>
  </tr>
  <tr>
    <td>T3-06</td>
    <td>Sistema de notificaciones con campana, indicador rojo y modal de "Mis Aportes"</td>
  </tr>
  <tr>
    <td>T3-07</td>
    <td>Integración de filtros dinámicos desde Sanity con selección única/múltiple por categoría</td>
  </tr>
  <tr>
    <td>T3-08</td>
    <td>Caché de perfil offline (AsyncStorage) para registro sin sesión activa</td>
  </tr>
  <tr>
    <td>T3-09</td>
    <td>Modal de confirmación para eliminar registros locales</td>
  </tr>
</table>



### 7.3.2 Incremento del Producto – Sprint 3
Al finalizar el Sprint 3, el producto incorpora:
- Modo offline completo: registro de plantas sin internet con persistencia local de datos y fotos.
- Pestaña "Pendientes" con indicador de conectividad, lista de registros guardados y sincronización masiva.
- Rol diferenciado: los ciudadanos tienen un formulario simplificado (sin datos académicos ni botánica detallada).
- Notificaciones sobre el estado de registros del usuario con indicador de cambios no leídos.
- Filtros dinámicos avanzados cargados desde la base de datos, creados y gestionados por profesores.
- Navegación actualizada a 4 pestañas: Buscador, Registro, Pendientes, Perfil.


### 7.3.3 Obstáculos Encontrados y Soluciones – Sprint 3

<table>
  <tr>
    <th>OBSTÁCULO</th>
    <th>Pérdida de fotos temporales al cerrar la app</th>
  </tr>
  <tr>
    <td>DESCRIPCIÓN</td>
    <td>Las URIs de expo-image-picker apuntan a archivos temporales que se eliminan al cerrar la aplicación.</td>
  </tr>
  <tr>
    <td>SOLUCIÓN APLICADA</td>
    <td>Se implementó persistImage() que copia cada foto al directorio permanente de la app antes de guardar el registro offline.</td>
  </tr>
</table>



<table>
  <tr>
    <th>OBSTÁCULO</th>
    <th>Sincronización sin sesión de Clerk</th>
  </tr>
  <tr>
    <td>DESCRIPCIÓN</td>
    <td>Si un usuario registra offline sin haber iniciado sesión, al sincronizar no tiene user ID.</td>
  </tr>
  <tr>
    <td>SOLUCIÓN APLICADA</td>
    <td>Se requiere inicio de sesión antes de sincronizar. El sistema detecta si el usuario no está logueado y lo redirige a sign-in. Al sincronizar, se sobrescriben los datos del autor con los de Clerk.</td>
  </tr>
</table>




## 7.4 Sprint 4 – Sistema Completo (Mapa, Edición, Perfil)

<table>
  <tr>
    <th>Objetivo del Sprint</th>
    <th>Completar el sistema con mapa interactivo, edición de registros observados, perfil editable completo.</th>
  </tr>
  <tr>
    <td>Duración</td>
    <td>3 semanas</td>
  </tr>
  <tr>
    <td>Actividades principales</td>
    <td>- Desarrollo de la pestaña Mapa.<br>- Implementación de búsqueda geográfica por planta, calle o distrito en el mapa.<br>- Tarjeta flotante al presionar marcador con miniatura, nombre y navegación a ficha técnica.<br>- Implementación de edición de registros observados (precarga de datos existentes en formulario).<br>- Desarrollo del perfil editable con datos académicos.<br>- Subida y eliminación de foto de perfil.<br>- Estadísticas del usuario (total, validados, observados, rechazados) consultadas desde Sanity.</td>
  </tr>
</table>



### 7.4.1 Tareas Completadas – Sprint 4

<table>
  <tr>
    <th>TAREA</th>
    <th>DESCRIPCIÓN</th>
  </tr>
  <tr>
    <td>T4-01</td>
    <td>Desarrollo de mapa.tsx con MapView, clustering y coordenadas de Iquitos</td>
  </tr>
  <tr>
    <td>T4-02</td>
    <td>Barra de búsqueda flotante en mapa con filtro por texto</td>
  </tr>
  <tr>
    <td>T4-03</td>
    <td>Tarjeta flotante de planta al presionar marcador con thumbnail y navegación</td>
  </tr>
  <tr>
    <td>T4-04</td>
    <td>Edición de registros observados con precarga de datos desde Sanity</td>
  </tr>
  <tr>
    <td>T4-05</td>
    <td>Formulario de edición de perfil con campos académicos</td>
  </tr>
  <tr>
    <td>T4-06</td>
    <td>Subida/eliminación de foto de perfil con ImagePicker y Clerk</td>
  </tr>
  <tr>
    <td>T4-07</td>
    <td>Consulta de estadísticas del usuario desde Sanity</td>
  </tr>
</table>



### 7.4.2 Incremento del Producto – Sprint 4
Al finalizar el Sprint 4, el producto incorpora:
- Pestaña Mapa con visualización georreferenciada de plantas validadas, clustering y búsqueda geográfica.
- Edición completa de registros observados con precarga de datos y fotos existentes.
- Perfil editable con datos personales y académicos, foto de perfil, estadísticas de registros.
- Navegación final de 5 pestañas: Buscador, Mapa, Registro, Pendientes, Perfil.





### 7.7.3 Obstáculos Encontrados y Soluciones – Sprint 4

<table>
  <tr>
    <th>OBSTÁCULO</th>
    <th>Fotos de Sanity en modo edición</th>
  </tr>
  <tr>
    <td>DESCRIPCIÓN</td>
    <td>Al editar un registro, las fotos ya están en Sanity como assets con _ref, pero el formulario espera URIs locales.</td>
  </tr>
  <tr>
    <td>SOLUCIÓN APLICADA</td>
    <td>Se implementó detección de URLs que empiezan con "http" en uploadFoto(). Para fotos existentes, se extrae el _ref del asset desde la URL mediante regex, evitando resubir la imagen.</td>
  </tr>
</table>



<table>
  <tr>
    <th>OBSTÁCULO</th>
    <th>Rendimiento del mapa con muchos marcadores</th>
  </tr>
  <tr>
    <td>DESCRIPCIÓN</td>
    <td>Al cargar cientos de marcadores en el mapa, el rendimiento se degradaba significativamente en dispositivos de gama media.</td>
  </tr>
  <tr>
    <td>SOLUCIÓN APLICADA</td>
    <td>Se integró react-native-map-clustering que agrupa automáticamente marcadores cercanos en clusters con contador, reduciendo la carga de renderizado.</td>
  </tr>
</table>



## 7.5 Sprint 5 – Optimización (Certificados y Estadísticas)

<table>
  <tr>
    <th>Objetivo del Sprint</th>
    <th>Optimizar la experiencia del usuario con certificados digitales y estadísticas completas.</th>
  </tr>
  <tr>
    <td>Duración</td>
    <td>3 semanas</td>
  </tr>
  <tr>
    <td>Actividades principales</td>
    <td>- Implementación de generación de certificados PDF.<br>- Diseño del certificado en HTML/CSS con formato A4 horizontal, firmas digitales y código de verificación.<br>- Creación del schema "certificado" en Sanity con código único, usuario, conteo y periodo. - Barra de progreso hacia certificado diferenciada por rol (20 para estudiantes, 100 para ciudadanos).</td>
  </tr>
</table>





### 7.5.1 Tareas Completadas – Sprint 5

<table>
  <tr>
    <th>TAREA</th>
    <th>DESCRIPCIÓN</th>
  </tr>
  <tr>
    <td>T5-01</td>
    <td>Generación de certificados PDF con expo-print (HTML template con CSS)</td>
  </tr>
  <tr>
    <td>T5-02</td>
    <td>Schema "certificado" en Sanity (codigo, usuario_id, registros_validados, tipo_participacion, periodo)</td>
  </tr>
  <tr>
    <td>T5-03</td>
    <td>Barra de progreso hacia certificado con umbral por rol</td>
  </tr>
  <tr>
    <td>T5-04</td>
    <td>Auto-actualización del conteo de registros validados en certificado existente</td>
  </tr>
</table>



### 7.5.2 Incremento del Producto – Sprint 5
Al finalizar el Sprint 5, el producto incorpora:
- Generación de certificados digitales PDF con diseño profesional, firmas de responsables y código de verificación único.
- Barra de progreso motivacional hacia el certificado diferenciada por rol de usuario.

### 7.5.3 Obstáculos Encontrados y Soluciones – Sprint 4

<table>
  <tr>
    <th>OBSTÁCULO</th>
    <th>Generación de PDF con firmas dinámicas</th>
  </tr>
  <tr>
    <td>DESCRIPCIÓN</td>
    <td>Las firmas de los responsables del proyecto son imágenes almacenadas en Sanity, y expo-print requiere HTML estático.</td>
  </tr>
  <tr>
    <td>SOLUCIÓN APLICADA</td>
    <td>Se obtiene la configuración dinámica desde Sanity (responsable_1_firma, responsable_2_firma) y se genera la URL de la imagen, incrustándola como imagen en el HTML del certificado.</td>
  </tr>
</table>








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


# 10. RESULTADOS ACUMULADOS (Sprint 1 al Sprint 5)

## 10.1 Evaluación General
Los Sprints 1 al 5 se completaron satisfactoriamente, alcanzando los objetivos planteados en cada iteración. El equipo logró construir un sistema funcional compuesto por tres aplicaciones integradas que cubren el ciclo completo de registro, validación y consulta de flora ornamental.


## 10.2 Indicadores de Desempeño Acumulados
- Sprints completados: 5 de 6
- Historias de usuario implementadas: 25 (HU-01 a HU-25)
- Pantallas en app móvil: 9 (sign-in, sign-up, buscador, mapa, registro, sync, plant/[id], profile, about)
- Páginas en panel admin web: 7 (Dashboard, Validaciones, PlantaDetail, Mapa, Filtros, Certificados, Validar Certificado)
- Formularios dinámicos por hábito: 5 (FormArbol, FormPalmera, FormArbusto, FormLiana, FormHierba)


## 10.3 Incremento del Producto
El producto obtenido al finalizar el Sprint 5 es un sistema funcional completo que incluye:

App Móvil:
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

Panel Administrativo Web:
- Dashboard, validaciones, filtros dinámicos, mapa, certificados
- Control de acceso por roles

Portal Web Público:
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


<table>
  <tr>
    <th>N°</th>
    <th>Lección Aprendida</th>
    <th>Descripción / Impacto</th>
  </tr>
  <tr>
    <td>Lección 1</td>
    <td>La elección del stack tecnológico impacta directamente en la productividad</td>
    <td>La combinación React Native + Expo + Sanity permitió avanzar rápidamente, pero requirió un período de aprendizaje para comprender las particularidades de cada herramienta.</td>
  </tr>
  <tr>
    <td>Lección 2</td>
    <td>Los detalles de UX marcan la diferencia</td>
    <td>Aspectos como la traducción de mensajes de error al español, el spinner de carga durante el OAuth y el toggle de visibilidad de contraseña mejoran significativamente la experiencia del usuario.</td>
  </tr>
  <tr>
    <td>Lección 3</td>
    <td>La validación temprana evita retrabajo</td>
    <td>La entrevista con el usuario real confirmó que la dirección del proyecto era correcta y ayudó a priorizar funcionalidades clave.</td>
  </tr>
  <tr>
    <td>Lección 4</td>
    <td>La documentación debe ir a la par del desarrollo</td>
    <td>Dejar la documentación para después del desarrollo genera inconsistencias y dificulta la trazabilidad del trabajo realizado.</td>
  </tr>
  <tr>
    <td>Lección 5</td>
    <td>Android requiere atención especial en navegación</td>
    <td>Las animaciones que funcionan correctamente en iOS pueden no funcionar en Android, lo que requiere soluciones específicas como el uso de JS Stack con CardStyleInterpolators.</td>
  </tr>
</table>



# 12. Trabajo Futuro
Con base en los resultados de los Sprints 1 al 5 y las lecciones aprendidas, el trabajo restante se concentra en el Sprint 6 (Producto Final):


<table>
  <tr>
    <th>Sprint</th>
    <th>Objetivo</th>
    <th>Funcionalidades / Actividades Planificadas</th>
  </tr>
  <tr>
    <td>Sprint 2</td>
    <td>Prototipo con datos reales</td>
    <td>Carga masiva de fichas técnicas botánicas validadas<br>Banco fotográfico de campo<br>Mejora del diseño visual y UX.</td>
  </tr>
  <tr>
    <td>Sprint 3</td>
    <td>MVP funcional completo</td>
    <td>Optimización del buscador morfológico<br>Pruebas con múltiples usuarios.</td>
  </tr>
  <tr>
    <td>Sprint 4</td>
    <td>Sistema completo</td>
    <td>Mejora de la galería fotográfica<br>Optimización de rendimiento.</td>
  </tr>
  <tr>
    <td>Sprint 5</td>
    <td>Optimización y estabilidad</td>
    <td>Corrección de errores reportados<br>mejoras de accesibilidad<br>pruebas en dispositivos de gama baja.</td>
  </tr>
  <tr>
    <td>Sprint 6</td>
    <td>Producto final</td>
    <td>Validación final con usuarios e instituciones<br>Generación del APK<br>Documentación completa;<br>Presentación final.</td>
  </tr>
</table>




# 13. Anexos

## 13.1 Repositorio GitHub del Proyecto
El código fuente del proyecto se encuentra alojado en el repositorio GitHub del equipo. Los detalles se resumen a continuación:


<table>
  <tr>
    <th>Campo</th>
    <th>Detalle</th>
  </tr>
  <tr>
    <td>URL del repositorio</td>
    <td>https://github.com/daniloalvarado/App-de-Taller-2.</td>
  </tr>
  <tr>
    <td>Contenido principal</td>
    <td>Código fuente de la app móvil (React Native + Expo)</td>
  </tr>
  <tr>
    <td>Panel administrativo</td>
    <td>Carpeta admin-web/ (Vite + React)</td>
  </tr>
  <tr>
    <td>Portal web público</td>
    <td>Carpeta Usuario/ (HTML + GSAP)</td>
  </tr>
  <tr>
    <td>Sanity CMS</td>
    <td>Carpeta sanity/ (schemas y configuración)</td>
  </tr>
  <tr>
    <td>Documentación</td>
    <td>Carpeta Documentación/</td>
  </tr>
  <tr>
    <td>Configuración</td>
    <td>Archivo .env con variables de entorno y claves de API</td>
  </tr>
</table>



## 13.2 Evidencia de la Entrevista con el Usuario
Se adjunta la evidencia fotográfica y el registro de la entrevista realizada con el usuario real. Esta evidencia respalda la validación del problema y la pertinencia de las funcionalidades planificadas.


<table>
  <tr>
    <th>[ Fotografía de la entrevista — Agregar imagen aquí ]<br>(Por agregar)</th>
  </tr>
</table>



<table>
  <tr>
    <th>[ Captura de pantalla / documento adicional — Agregar aquí ]<br>(Por agregar)</th>
  </tr>
</table>






## 13.3 Capturas de Pantalla de la Aplicación (Sprint 1)
Se adjuntan capturas de las pantallas principales desarrolladas durante el Sprint












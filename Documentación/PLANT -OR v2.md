PLANT-OR
Catálogo Virtual de Plantas Ornamentales Amazónicas
Proyecto de Responsabilidad Social Universitaria (RSU)
Autores
Investigadores principales
- Ing. Fredy F. Ramírez Arévalo – Facultad de Ciencias Forestales
- Ing. Rafael Vilca Barbarán – Facultad de Ingeniería de Sistemas
Coinvestigadores (Facultad de Ciencias Forestales)
- Dr. Richer Ríos
- Ing. Arturo Macedo
- Dr. Juan De la Cruz Bardález
- Dr. Denilson Del Castillo
1. Problema
En la ciudad de Iquitos:
- No existe una base de datos estructurada de plantas ornamentales
- No se conoce la ubicación de los individuos
- La información botánica no es accesible al ciudadano
- La gestión urbana se realiza sin soporte técnico
Conclusión: la ciudad tiene plantas, pero no tiene información utilizable.

2. Solución
Desarrollar PLANT-OR, una plataforma digital que permita:
- Registrar especies desde celulares
- Validar información científicamente
- Visualizar especies mediante imágenes
- Ubicar cada individuo en un mapa
- Identificar plantas mediante filtros simples

3. Objetivo General
Desarrollar un sistema digital multiplataforma para el registro, validación e identificación de plantas ornamentales urbanas.
4. Concepto del sistema
4.1 Registro
Se realiza desde dispositivos móviles.
Incluye:
- Datos personales
- Ubicación (GPS + mapa)
- Identificación básica
- Caracterización por hábito
- Fotografías
Resultado:👉 Registro en estado EN REVISIÓN

4.2 Validación
Realizada por docentes desde la plataforma web.
Acciones:
- Aprobar → VALIDADO
- Observar → OBSERVADO
- Rechazar → RECHAZADO
Incluye:
- Revisión técnica
- Correcciones
- Construcción de filtros

4.3 Publicación
Solo registros validados.
Genera:
- Ficha técnica pública
- Visualización en mapa
- Galería de imágenes
Restricción:
- No se publican registros sin validar

4.4 Consulta
Acceso para cualquier usuario.
Incluye:
- Búsqueda mediante filtros simples
- Visualización de especies
- Consulta por mapa
- Acceso a fichas técnicas

Lógica del sistema
- Sin registro → no hay datos
- Sin validación → no hay calidad
- Sin publicación → no hay acceso
- Sin consulta → no hay uso

5. Participación (núcleo del proyecto)
5.1 Estudiantes (Ciencias Forestales y Biológicas)
- Registro técnico
- Datos científicos
- Fotografías
- Georreferenciación
5.2 Estudiantes (Ingeniería de Sistemas)
- Desarrollo del sistema
- Base de datos
- Filtros
- Interfaz
- Automatización
5.3 Participación ciudadana
- Registro básico
- Fotografías
- Ampliación de cobertura
Enfoque integrador
- Botánica genera datos
- Sistemas crea la herramienta
- Ciudadanos expanden cobertura

6. Plataformas

| Función | Plataforma |
| --- | --- |
| Registro | Celular |
| Validación | Web |
| Consulta | Celular + Web |


7. Flujo del sistema
- Registro → EN REVISIÓN
- Validación → aprobado / observado / rechazado
- Publicación → solo validado
- Consulta → filtros + imágenes

8. Registro de datos
8.1 Estudiantes (completo – estructurado)
Condición
- 20 especies distintas (individuos adultos)

Estructura del formulario
1. Datos personales
- Nombre completo
- DNI
- Email
- Curso
- Facultad
- Escuela
- Día de clase
- Fecha de registro (autogenerado)

2. Ubicación (con geolocalización integrada)
- GPS automático
- Punto en mapa (obligatorio)
- Tipo de ubicación 1:
  - Jirón
  - Avenida
  - Calle
  - Pasaje
  - Parque
- Tipo de ubicación 2:
  - Vereda
  - Berma central

- Dirección:
- N° de casa:
- Ubicación de la planta
  - Tierra
  - Macetero

3. Identificación
- Nombre científico
- Nombre local
- Familia
- Número de planta (autogenerado por registrador…debe llegar solo a 20)

4. Hábito de la planta
- Árbol
- Palmera
- Arbusto
- Liana
- Hierba

5. Tipo de vida
- Terrestre
- Epífita
- Parásita



6. Formulario dinámico por hábito
Cada hábito activa su propio bloque:
6.1. Árbol
I. Datos dasométricos (obligatorio – primer bloque)
- Altura total aproximada: ___ m
- Circunferencia a la altura del pecho (CAP): ___ cm
- Diámetro de copa paralelo a la calle: ___ m
- Diámetro de copa perpendicular a la calle: ___ m
- Altura de inicio de copa: ___ m
Raíces visibles (solo una alternativa)
- Sin raíces visibles
- Raíces tablares
- Raíces zancudas
- Raíces superficiales
- Raíces adventicias
- Otro: ___

II. Tronco y corteza
Número de troncos desde la base:
Forma del tronco (solo una)
- Recto
- Inclinado (a la izquierda, a la derecha, hacia la calle, hacia la casa)
- Torcido
- Otro: ___
Corteza externa (solo una)
- Lisa
- Rugosa
- Aspera
- Agrietada
- Estriada
- Escamosa
- Con placas
- Laminar
- Otro: ___
Lenticelas (solo una)
- Con lenticelas
- Sin lenticelas
Color de corteza (Mútiple)
- Gris
- Marrón
- Verde
- Rojiza
- Negruzca
- Otro: ___
Olor de corteza (solo una)
- Sin olor
- Aromático
- Cítrico
- Resinoso
- Desagradable
- Otro: ___
Espinas (solo una)
- Con espinas
- Sin espinas

III. Exudado
Presencia (solo una)
- Sí
- No
Tipo (solo una, si aplica)
- Savia
- Látex
- Resina
- Goma
Color al corte (solo una)
- Incoloro
- Blanco
- Amarillo
- Rojizo
- Marrón
- Otro: ___

IV. Ramificación y copa
Tipo de ramificación (solo una)
- Ramas hacia arriba
- Ramas como hélice de helicóptero
- Ramas colgantes
- Ramas irregulares
- Otro: ___
Forma de copa (solo una)
- Redondeada
- Alargada
- Extendida
- Tipo paraguas
- Irregular
- Otro: ___
Densidad de copa (solo una)
- Densa
- Media
- Rala

V. Hojas
Tipo de hoja (solo una)
- Simple
- Compuesta
Disposición (Múltiple)
- Alternas – dísticas
- Alternas - espiraladas
- Opuestas – dísticas
- Opuestas - decusadas
- Agrupadas al final de las ramas
- No agrupadas al final de las ramas
Forma (solo una)
- Ovalada
- Alargada
- Redonda
- Acorazonada
- Palmada
- Otro: ___
Borde (solo una)
- Entero
- Dentado
- Ondulado
- Otro: ___
Textura (solo una)
- Papirácea
- Cartácea
- Coriácea
Color del envés (solo una)
- Verde claro
- Verde oscuro
- Grisáceo
- Marrón
- Blanquecino
- Otro: ___
Presencia de pelos (puede marcar varias)
- Sin pelos (haz)
- Con pelos (haz)
- Sin pelos (envés)
- Con pelos (envés)
Tipo de peciolo
- Circular
- Plano
- Sésil


Longitud del peciolo cm

Diámetro del peciolo mm

Peciolo con pulvino
- Sí
- No



VI. Flores
Presencia (solo una)
- Con flores
- Sin flores visibles
Color de pétalos (solo una)
- Blanco
- Amarillo
- Rojo
- Rosado
- Morado
- Anaranjado
- Verde
- Crema
- Otro: ___
Tamaño de flor
Largo___ cm
Ancho___ cm

Agrupación (solo una)
- Solitaria
- En racimo
- En manojo
- En espiga
- En cabezuela
- Otro: ___
Olor (solo una)
- Sin olor
- Aromático
- Dulce
- Desagradable
- Otro: ___

VII. Frutos
Presencia (solo una)
- Con frutos
- Sin frutos visibles
Textura (solo una)
- Carnoso
- Seco
Estado al madurar (solo una)
- Entero
- Se abre (partido)
Forma (solo una)
- Redondo
- Ovalado
- Alargado
- Aplanado
- Irregular
- Otro: ___
Tamaño del fruto
Largo___ cm
Ancho___ cm

Color del fruto maduro (solo una)
- Verde
- Amarillo
- Rojo
- Morado
- Negro
- Marrón
- Crema
- Otro: ___
Superficie (solo una)
- Lisa
- Rugosa
- Espinosa
- Con costillas
- Otro: ___

VIII. Semillas
Presencia visible (solo una)
- Sí
- No
Número de semillas
Tamaño de semilla
Largo___ cm
Ancho___ cm
Color de cáscara (solo una)
- Blanco
- Crema
- Marrón
- Negro
- Rojizo
- Otro: ___

IX. Estado fenológico (puede marcar varias)
- Solo hojas
- Con flores
- Con frutos
- Sin hojas

X. Estado del individuo (puede marcar varias)
- Bueno
- Regular
- Malo
- Podado
- Enfermo
- Con plagas visibles
- Con daño mecánico

XI. Valor ornamental (puede marcar varias)
- Da sombra
- Tiene flores vistosas
- Tiene frutos vistosos
- Tiene copa atractiva
- Atrae fauna
- Valor cultural
- Valor alimenticio
- Valor medicinal
- Mejora el microclima
- Otro: ___

XII. Impacto urbano (puede marcar varias)
- No genera daño
- Frutos ensucian la vía
- Frutos obstruyen desagüe
- Raíces rompen el piso
- Raíces afectan veredas
- Raíces afectan cimientos
- Levanta pavimento
- Interfiere con cableado
- Interfiere con luminarias
- Riesgo de caída de ramas
- Tronco inclinado (riesgo)
- Otro: ___

6.2. Palmera
I. Datos dasométricos (obligatorio – primer bloque)
- Altura total aproximada: ___ m
- Circunferencia del tallo a 1.30 m (CAP): ___ cm
- Diámetro de copa paralelo: ___ m
- Diámetro de copa perpendicular: ___ m
- Altura de inicio de copa: ___ m
Número de tallos (solo una alternativa)
- Un solo tallo
- Varios tallos
- Otro: ___
Raíces visibles (solo una alternativa)
- Sin raíces visibles
- Raíces superficiales
- Raíces zancudas
- Raíces de soporte
- Raíces adventicias
- Otro: ___

II. Tipo de palmera (solo una alternativa)
- Arborescente
- Arbustiva
- Lianescente
- Sin tallo visible
- Otro: ___

III. Tallo (estípite) (puede marcar varias)
- Liso
- Con anillos visibles
- Con fibras
- Con restos de hojas
- Con espinas
- Sin espinas
- Otro: ___

IV. Hojas (carácter principal)
Tipo de hoja (solo una alternativa)
- Tipo pluma (pinnada)
- Tipo abanico (palmada)
- Simple entera
- Simple bífida
- Otro: ___
Segmentos (puede marcar varias)
- En un plano
- En varios planos
- Rígidos
- Colgantes
- Otro: ___
Tamaño de hoja (incluye peciolo)
- Largo: ___ m
- Ancho: ___ m
Tamaño de peciolo
- Largo: ___ m
- Diámetro: ___ cm

Color (solo una alternativa)
- Verde claro
- Verde oscuro
- Verde azulado
- Amarillento
- Otro: ___

V. Espinas (puede marcar varias)
- Ausentes
- En tallo
- En pecíolo
- En vaina
- Otro: ___

VI. Inflorescencia
Presencia (solo una alternativa)
- Con inflorescencia
- Sin inflorescencia visible
Posición (puede marcar varias)
- Interfoliar (entre hojas)
- Infrafoliar (debajo de hojas)
- Axilar
- Apical
- Otro: ___
Forma (solo una alternativa)
- Erecta
- Colgante
- Otro: ___
Presencia de espata (solo una alternativa)
- Sí
- No

VII. Frutos
Presencia (solo una alternativa)
- Con frutos
- Sin frutos visibles
Tipo (solo una alternativa)
- Baya
- Drupa
- Otro: ___
Forma (solo una alternativa)
- Redondo
- Ovalado
- Alargado
- Aplanado
- Curvo
- Irregular
- Otro: ___
Superficie (solo una alternativa)
- Lisa
- Brillante
- Opaca
- Rugosa
- Con estrías
- Con surcos
- Escamosa
- Fibrosa
- Espinosa
- Aguijonosa
- Verrugosa
- Otro: ___
Tamaño del fruto
- Largo: ___ cm
- Ancho: ___ cm
Color del fruto maduro (solo una alternativa)
- Verde
- Amarillo
- Rojo
- Anaranjado
- Morado
- Negro
- Marrón
- Otro: ___

VIII. Semillas
Número de semillas por fruto

Tamaño de semilla
- Largo: ___ mm o cm
- Ancho: ___ mm o cm

IX. Estado fenológico (puede marcar varias)
- Solo hojas
- Con flores
- Con frutos

X. Estado del individuo (puede marcar varias)
- Bueno
- Regular
- Malo
- Con plagas
- Con daño
- Hojas secas abundantes

XI. Valor ornamental (puede marcar varias)
- Genera sombra
- Tiene flores vistosas
- Tiene frutos vistosos
- Tiene hojas vistosas
- Forma de copa atractiva
- Mejora el microclima
- Atrae fauna
- Valor cultural
- Valor alimenticio
- Valor medicinal
- Otro: ___

XII. Impacto urbano (puede marcar varias)
- No genera daño
- Frutos ensucian la vía
- Frutos obstruyen desagüe
- Frutos resbalosos
- Raíces levantan vereda
- Raíces afectan cimientos
- Levanta pavimento
- Interfiere con cableado
- Interfiere con luminarias
- Riesgo de caída de hojas
- Tronco inclinado (riesgo)
- Otro: ___

6.3. Arbusto
I. Datos dasométricos (obligatorio – primer bloque)
- Altura total aproximada: ___ m
- Diámetro de copa paralelo: ___ m
- Diámetro de copa perpendicular: ___ m
- Altura de inicio de ramificación: ___ m
Número de tallos (solo una alternativa)
- Un tallo principal
- Varios tallos desde la base
- Otro: ___
Forma general del arbusto (solo una alternativa)
- Redondeado
- Compacto
- Extendido
- Irregular
- Colgante
- Otro: ___
Densidad del follaje (solo una alternativa)
- Denso
- Medio
- Ralo

II. Tallo y ramificación
Tipo de ramificación (solo una alternativa)
- Erecta
- Abierta
- Colgante
- Irregular
- Otro: ___
Tipo de tallo (solo una alternativa)
- Leñoso
- Semileñoso
- Flexible
- Otro: ___
Presencia de espinas (solo una alternativa)
- Con espinas
- Sin espinas

III. Hojas
Tipo de hoja (solo una alternativa)
- Simple
- Compuesta
- Otro: ___
Si es compuesta (solo una alternativa)
- Bifoliada
- Trifoliada
- Palmada
- Pinnada
- Bipinnada

Forma (solo una alternativa)
- Ovalada
- Alargada
- Redonda
- Lanceolada
- Acorazonada
- Otro: ___
Disposición (solo una alternativa)
- Alternas
- Opuestas
- Otro: ___
Borde (solo una alternativa)
- Entero
- Dentado
- Ondulado
- Otro: ___
Color (solo una alternativa)
- Verde claro
- Verde oscuro
- Variegado
- Rojizo
- Otro: ___

IV. Flores (clave ornamental)
Presencia (solo una alternativa)
- Con flores
- Sin flores visibles
Color de pétalos (solo una alternativa)
- Blanco
- Amarillo
- Rojo
- Rosado
- Morado
- Anaranjado
- Otro: ___
Tamaño de flor ___ cm
Forma (solo una alternativa)
- Tubular
- Abierta
- Estrellada
- Campanulada
- Otro: ___
Agrupación (solo una alternativa)
- Solitaria
- En racimos
- En ramilletes
- Otro: ___

V. Frutos
Presencia (solo una alternativa)
- Con frutos
- Sin frutos visibles
Textura (solo una alternativa)
- Carnoso
- Seco
- Otro: ___
Forma (solo una alternativa)
- Redondo
- Ovalado
- Alargado
- Aplanado
- Otro: ___
Tamaño del fruto ___ cm
Color del fruto maduro (solo una alternativa)
- Verde
- Amarillo
- Rojo
- Morado
- Negro
- Otro: ___

VI. Semillas
Número de semillas

Tamaño de semilla ___ mm o cm

VII. Estado fenológico (puede marcar varias)
- Vegetativo
- Con flores
- Con frutos

VIII. Estado del individuo (puede marcar varias)
- Bueno
- Regular
- Malo
- Podado
- Con plagas
- Con daño

IX. Valor ornamental (puede marcar varias)
- Genera sombra
- Tiene flores vistosas
- Tiene frutos vistosos
- Tiene hojas vistosas
- Forma atractiva
- Mejora el microclima
- Atrae fauna
- Valor cultural
- Valor alimenticio
- Valor medicinal
- Otro: ___

X. Impacto urbano (puede marcar varias)
- No genera daño
- Frutos ensucian la vía
- Frutos obstruyen desagüe
- Raíces afectan vereda
- Interfiere con infraestructura
- Dificulta mantenimiento
- Otro: ___

6.4. Liana
I. Datos dasométricos (obligatorio – primer bloque)
- Longitud visible aproximada: ___ m
- Altura máxima alcanzada en el soporte: ___ m
- Diámetro del tallo principal: ___ cm
Número de tallos (solo una alternativa)
- Un tallo principal
- Varios tallos
- Otro: ___

II. Tipo de soporte (solo una alternativa)
- Árbol
- Arbusto
- Cerca / estructura artificial
- Suelo (rastrera)
- Múltiples soportes
- Otro: ___

III. Forma de crecimiento (solo una alternativa)
- Trepadora (sube activamente)
- Enredadera (se enrolla)
- Colgante
- Rastrera
- Escandente (se apoya sin enrollarse)
- Otro: ___

IV. Mecanismo de fijación (puede marcar varias)
- Con zarcillos
- Con raíces adherentes
- Con espinas o ganchos
- Por enrollamiento del tallo
- No visible
- Otro: ___

V. Tallo
Tipo de tallo (solo una alternativa)
- Leñoso
- Semileñoso
- Flexible
- Otro: ___
Espinas (solo una alternativa)
- Con espinas
- Sin espinas
Exudado (solo una alternativa)
- Presente
- Ausente
Tipo de exudado
- Látex
- Savia
- Goma
- Resina

Color del exudado

VI. Hojas
Tipo de hoja (solo una alternativa)
- Simple
- Compuesta
- Otro: ___
Forma (solo una alternativa)
- Ovalada
- Alargada
- Acorazonada
- Lobulada
- Otro: ___
Disposición (solo una alternativa)
- Alterna dística
- Alterna espiralada
- Opuesta dística
- Opuesta decusada
- Otro: ___
Textura (solo una alternativa)
- Papirácea
- Cartácea
- Coriácea
- Otro: ___

VII. Flores
Presencia (solo una alternativa)
- Con flores
- Sin flores visibles
Color de pétalos (solo una alternativa)
- Blanco
- Amarillo
- Rojo
- Rosado
- Morado
- Anaranjado
- Otro: ___
Tamaño de flor ___ cm
Tipo de agrupación (solo una alternativa)
- Solitaria
- En racimos
- En ramilletes
- Otro: ___

VIII. Frutos
Presencia (solo una alternativa)
- Con frutos
- Sin frutos visibles
Textura (solo una alternativa)
- Carnoso
- Seco
- Otro: ___
Forma (solo una alternativa)
- Redondo
- Ovalado
- Alargado
- Aplanado
- Otro: ___
Tamaño del fruto ___ cm
Color del fruto maduro (solo una alternativa)
- Verde
- Amarillo
- Rojo
- Morado
- Negro
- Otro: ___

IX. Semillas
Número de semillas

Tamaño de semilla ___ mm o cm

X. Estado fenológico (puede marcar varias)
- Vegetativo
- Con flores
- Con frutos

XI. Estado del individuo (puede marcar varias)
- Bueno
- Regular
- Malo
- Con plagas
- Con daño

XII. Valor ornamental (puede marcar varias)
- Genera sombra
- Flores vistosas
- Frutos vistosos
- Hojas vistosas
- Cubre estructuras
- Atrae fauna
- Valor cultural
- Valor alimenticio
- Valor medicinal
- Otro: ___

XIII. Impacto urbano (puede marcar varias)
- No genera daño
- Cubre infraestructura
- Interfiere con cableado
- Invade estructuras
- Dificulta mantenimiento
- Genera humedad en paredes
- Otro: ___

6.5. Hierba
I. Datos dasométricos (obligatorio – primer bloque)
- Altura total aproximada: ___ cm
- Cobertura aproximada de la planta (diámetro): ___ cm
Número de tallos visibles (solo una alternativa)
- Uno
- Varios
- Muchos
- Sin tallo visible
- Otro: ___

II. Tipo de crecimiento (solo una alternativa)
- Erecta
- Rastrera
- Colgante
- En roseta
- Formando mata
- Otro: ___

III. Tipo de tallo (solo una alternativa)
- Herbáceo
- Carnoso
- Hueco
- Rastrero
- Trepador
- Sin tallo visible
- Otro: ___

IV. Hojas
Tipo de hoja (solo una alternativa)
- Simple
- Compuesta
- Otro: ___
Disposición (solo una alternativa)
- Alternas dísticas
- Alternas espiraladas
- Opuestas dísticas
- Opuestas decusadas
- En roseta basal
- Agrupadas
- Otro: ___
Forma (solo una alternativa)
- Ovalada
- Alargada
- Redonda
- Acorazonada
- Lanceolada
- Otro: ___
Color (solo una alternativa)
- Verde claro
- Verde oscuro
- Rojizo
- Morado
- Variegado
- Otro: ___
Textura (solo una alternativa)
- Delgada
- Carnosa
- Áspera
- Suave
- Otro: ___

V. Flores
Presencia (solo una alternativa)
- Con flores
- Sin flores visibles
Color de pétalos (solo una alternativa)
- Blanco
- Amarillo
- Rojo
- Rosado
- Morado
- Anaranjado
- Verde
- Otro: ___
Tamaño de flor ___ cm
Agrupación (solo una alternativa)
- Solitaria
- En racimo
- En ramillete
- En espiga
- En cabezuela
- Otro: ___

VI. Frutos
Presencia (solo una alternativa)
- Con frutos
- Sin frutos visibles
Textura (solo una alternativa)
- Carnoso
- Seco
- Otro: ___
Forma (solo una alternativa)
- Redondo
- Ovalado
- Alargado
- Aplanado
- Irregular
- Otro: ___
Color del fruto maduro (solo una alternativa)
- Verde
- Amarillo
- Rojo
- Morado
- Negro
- Marrón
- Otro: ___

VII. Semillas
Visibles (solo una alternativa)
- Sí
- No
Número de semillas

Tamaño de semilla ___ mm o cm

VIII. Estado fenológico (puede marcar varias)
- Solo hojas
- Con flores
- Con frutos
- Con flores y frutos
- Secándose

IX. Estado del individuo (puede marcar varias)
- Bueno
- Regular
- Malo
- Con plagas
- Con daño

X. Valor ornamental (puede marcar varias)
- Flores vistosas
- Hojas vistosas
- Frutos vistosos
- Cubre suelo
- Forma bordes o jardines
- Atrae fauna
- Valor cultural
- Valor alimenticio
- Valor medicinal
- Mejora el microclima
- Otro: ___

XI. Impacto urbano (puede marcar varias)
- No genera daño
- Invade jardines
- Invade veredas
- Cubre drenajes
- Dificulta mantenimiento
- Puede ser resbalosa
- Puede atraer plagas
- Otro: ___

Bloque final obligatorio para todos los hábitos
Valor ornamental (puede marcar varias)
- Genera sombra
- Tiene flores vistosas
- Tiene frutos vistosos
- Tiene hojas vistosas
- Tiene copa o forma atractiva
- Mejora el microclima
- Atrae fauna
- Tiene valor cultural
- Tiene valor alimenticio
- Tiene valor medicinal
- Otro: ___
Impacto urbano (puede marcar varias)
- No genera daño
- Frutos ensucian la vía
- Frutos obstruyen desagüe
- Frutos resbalosos
- Raíces levantan vereda
- Raíces afectan cimientos o paredes
- Levanta pavimento
- Interfiere con cableado
- Interfiere con luminarias
- Riesgo de caída de ramas
- Riesgo de caída de hojas
- Tronco o tallo inclinado
- Invade estructuras
- Dificulta mantenimiento
- Otro: ___

7. Fotografías (obligatorio)
- Planta completa
- Hoja
- Flor
- Fruto
- Semilla
Regla clave
Datos personales → Ubicación → Identificación → Hábito → Tipo de vida → Caracteres

8.2 Ciudadanos (registro básico)
- Datos personales
- Nombre local
- Coordenadas
- Dirección
- 5 fotos
Estado: preliminar

9. Datos para filtros
- Generados por estudiantes
- Definidos por docentes
- Implementados por sistemas
Ejemplo:

| Dato técnico | Filtro |
| --- | --- |
| Ramificación verticilada | Ramas como hélice |
| Fruto carnoso | Fruto blando |


10. Diseño de búsqueda
Reglas
- Lenguaje simple
- Íconos
- Máximo 3 filtros
Secuencia
- Tipo de planta
- Tipo de vida
- Característica visible

11. Visualización
- Galería
- Click → ficha técnica
- Fotos
- Mapa
- Registrador

12. Módulos del sistema
1. Registro móvil (incluye geolocalización)
Función
Permitir el registro completo, estructurado y validado de plantas desde dispositivos móviles (Android / iPhone), integrando datos, ubicación y evidencia fotográfica en una sola interfaz.

1.1 Formulario completo (flujo secuencial obligatorio)
El formulario debe dividirse en pantallas o bloques:
Bloque 1: Datos personales
- Apellidos y nombres (obligatorio)
- DNI (validación de formato)
- Email (validación de correo)
- Curso
- Facultad
- Escuela
- Día del curso

Bloque 2: Ubicación (con geolocalización integrada)
- Coordenadas GPS (captura automática)
- Mapa interactivo (obligatorio):
  - Mostrar punto actual
  - Permitir mover marcador con el dedo
  - Botón: “Confirmar ubicación”
- Dirección referencial (campo texto)
- Tipo de ubicación (radio button):
  - Jirón
  - Avenida
  - Vereda
  - Berma central
  - Dentro del domicilio
  - En tierra
  - En macetero
  - Otro

Bloque 3: Identificación básica
- Especie
- Nombre local
- Familia
- Número de planta
- Fecha (automática)

Bloque 4: Hábito de la planta
(pantalla clave → activa formulario dinámico)
- Árbol
- Palmera
- Arbusto
- Liana
- Hierba

Bloque 5: Tipo de vida
- Terrestre
- Epífita
- Parásita

Bloque 6: Caracterización específica
- Formulario dinámico según hábito
- Mostrar solo campos relevantes
- Validar obligatoriedad de datos clave

1.2 Geolocalización (integrada)
Componentes
- GPS del dispositivo
- Mapa interactivo (Leaflet / Google Maps)
Funciones
- Capturar coordenadas automáticamente
- Permitir corrección manual
- Mostrar latitud y longitud
- Validar precisión (±5–10 m recomendado)
Regla crítica
👉 No permitir guardar registro sin ubicación confirmada

1.3 Registro fotográfico
Requisitos
- Mínimo 5 fotografías obligatorias:
  - Planta completa
  - Hoja
  - Flor
  - Fruto
  - Semilla
Funciones
- Captura desde cámara
- Carga desde galería
- Vista previa
- Eliminación/reemplazo
Validación
- No permitir envío con menos de 5 fotos

1.4 Validaciones del sistema
Antes de guardar
- Campos obligatorios completos
- Ubicación confirmada
- Fotografías completas
- Tipo de hábito seleccionado
- Tamaños con unidades
Validaciones específicas
- Email válido
- DNI correcto
- Coordenadas existentes
- No duplicar número de planta

1.5 Guardado y envío
Opciones
- Guardar borrador (opcional pero recomendable)
- Enviar registro
Estado del registro
- EN REVISIÓN

1.6 Resumen previo al envío
Pantalla final obligatoria:
- Mostrar todos los datos ingresados
- Mostrar ubicación en mapa
- Mostrar fotos
Botones:
- Editar
- Confirmar y enviar

1.7 Confirmación
Después del envío:
- Mensaje: “Registro enviado correctamente”
- Envío automático de email al usuario
- Código de registro generado

1.8 Consideraciones técnicas
- Diseño responsive
- Optimizado para campo (uso con poca señal)
- Posibilidad de modo offline (altamente recomendado)
- Sincronización cuando haya internet

2. Validación web
Función
Permitir que los docentes:
- Validen los registros
- Construyan los filtros de búsqueda a partir de los datos reales registrados por los estudiantes

2.1 Usuarios autorizados
- Docentes validadores
- Administradores

2.2 Panel de revisión de registros
Muestra:
- Lista de registros
- Estado:
  - En revisión
  - Observado
  - Validado
  - Rechazado

2.3 Validación de registros
El docente puede:
- Aprobar → VALIDADO
- Observar → OBSERVADO
- Rechazar → RECHAZADO
Cada acción registra:
- Docente
- Fecha
- Comentario

2.4 Módulo de creación de filtros (CLAVE DEL SISTEMA)
Función
Permitir que el docente transforme los datos técnicos en filtros simples para el usuario.

2.4.1 Fuente de los filtros
Los filtros NO se inventan.
Se generan a partir de:
- Datos registrados por estudiantes
- Caracteres frecuentes
- Variabilidad observada en campo

2.4.2 Proceso
Paso 1: Visualización de datos
El sistema debe permitir ver:
- Listado de valores registradosEjemplo:
- Ramificación: erecta, verticilada, pendiente

Paso 2: Creación de categoría de filtro
El docente define:
- Nombre del filtroEjemplo:
- “Forma de ramas”

Paso 3: Traducción a lenguaje simple
Ejemplo:

| Dato técnico | Filtro visible |
| --- | --- |
| Erecta | Ramas hacia arriba |
| Verticilada | Ramas como hélice de helicóptero |
| Pendiente | Ramas colgantes |


Paso 4: Configuración del filtro
El docente define:
- Tipo:
  - Selección única
  - Selección múltiple
- Ícono asociado
- Orden de aparición

2.4.3 Tipos de filtros que debe permitir el sistema
- Por hábito
- Por tipo de vida
- Por forma
- Por color
- Por tamaño
- Por textura
- Por estructura

2.4.4 Reglas del sistema
- Los filtros deben ser editables
- No deben estar codificados de forma fija
- Deben poder:
  - Crearse
  - Modificarse
  - Activarse o desactivarse

2.4.5 Resultado
El sistema logra:
- Adaptarse a la realidad local
- Mejorar con cada registro
- Facilitar la identificación al usuario

2.5 Relación clave del sistema
- Estudiantes → generan datos
- Docentes → interpretan datos
- Sistema → convierte datos en filtros

3. Notificaciones
Función
Mantener informado al registrador sobre el avance y estado de sus registros dentro de PLANT-OR.

3.1 Tipos de notificación
1. Registro enviado
Se envía automáticamente cuando el estudiante o ciudadano completa y envía un registro.
Debe incluir:
- Código del registro
- Nombre local de la planta
- Fecha de envío
- Estado inicial: EN REVISIÓN

2. Registro observado
Se envía cuando el docente solicita correcciones.
Debe incluir:
- Código del registro
- Campo observado
- Comentario del docente
- Indicaciones para corregir
- Estado: OBSERVADO

3. Registro validado
Se envía cuando el docente aprueba el registro.
Debe incluir:
- Código del registro
- Nombre local
- Nombre científico, si fue confirmado
- Estado: VALIDADO

4. Registro rechazado
Se envía cuando el registro no cumple los requisitos mínimos.
Debe incluir:
- Código del registro
- Motivo del rechazo
- Estado: RECHAZADO

3.2 Reporte semestral
Cada 6 meses, el sistema enviará al registrador un resumen de sus registros publicados.
Debe incluir:
- Número total de registros enviados
- Número de registros validados
- Número de registros observados
- Número de registros rechazados
- Lista de registros publicados

3.3 Regla del sistema
Cada cambio de estado debe generar una notificación automática por email.
Estados:
- En revisión
- Observado
- Validado
- Rechazado
- Publicado

3.4 Resultado
El registrador sabe qué pasó con su información y mantiene vínculo con el proyecto.
“Sin comunicación, la participación se enfría.”

4. Publicación
Función
Mostrar al público únicamente información validada, organizada en fichas claras y útiles para identificación y consulta.

4.1 Criterio de publicación
- Solo se publican registros en estado: VALIDADO
- Registros en:
  - En revisión
  - Observado
  - Rechazado👉 No son visibles al público

4.2 Generación de ficha pública
Cada registro validado genera automáticamente una ficha técnica pública.

4.3 Contenido de la ficha
A. Identificación
- Nombre local
- Nombre científico (si está confirmado)
- Familia

B. Ubicación
- Mapa interactivo con punto exacto
- Dirección referencial
- Tipo de ubicación (vereda, avenida, etc.)

C. Características
- Hábito
- Tipo de vida
- Rasgos principales (según hábito)
- Datos dasométricos
- Características visibles clave

D. Fotografías
- Planta completa
- Hoja
- Flor
- Fruto
- Semilla

E. Valor ornamental
Lista seleccionada por el registrador

F. Impacto urbano
Lista de posibles efectos detectados

G. Información del registrador
- Nombre del registrador (visible)
- Institución / curso (opcional)

4.4 Restricciones
- ❌ No permitir descarga de base de datos
- ❌ No permitir descarga masiva de imágenes
- ❌ No mostrar datos personales sensibles (DNI, email)

4.5 Visualización
- Galería de imágenes
- Fichas individuales
- Integración con filtros
- Visualización en mapa

4.6 Actualización
- Si un registro es corregido → se actualiza la ficha
- Si se invalida → se retira de la publicación

4.7 Resultado
PLANT-OR se convierte en una plataforma pública confiable, no en un repositorio sin control.

5. Certificación
Función
Reconocer formalmente la participación activa de estudiantes y ciudadanos en el proyecto PLANT-OR, incentivando la calidad y continuidad de los registros.

5.1 Criterio principal
- ≥ 100 registros validados (no repetidos) → certificado digital
Solo cuentan los registros en estado VALIDADO.

5.2 Condiciones para obtener certificación
- Registros completos (datos + fotos + ubicación)
- Registros no duplicados
- Registros correctamente validados por docentes
- Participación activa dentro del periodo definido

5.3 Tipo de certificado
- Certificado digital en PDF
- Generado automáticamente por el sistema

5.4 Contenido del certificado
- Nombre completo del participante
- Número total de registros validados
- Nombre del proyecto: PLANT-OR
- Tipo de participación:
  - Estudiante
  - Ciudadano
- Periodo de participación
- Firma digital de los responsables del proyecto
- Código de verificación

5.5 Generación automática
El sistema debe:
- Contar registros validados por usuario
- Verificar que cumpla el umbral
- Generar certificado automáticamente
- Enviar por email

5.6 Verificación
- Cada certificado debe tener:
  - Código único
  - Enlace de validación en la web

5.7 Resultado
- Incentiva participación
- Mejora calidad de datos
- Genera compromiso con el proyecto
16. Propiedad
- Fredy Ramírez
- Rafael Vilca

17. Arquitectura
Función
Definir la estructura tecnológica mínima para desarrollar PLANT-OR como una plataforma estable, escalable y georreferenciada.

17.1 Backend
Función
Gestionar la lógica del sistema.
Debe permitir
- Registro de usuarios
- Registro de plantas
- Validación de formularios
- Gestión de estados:
  - En revisión
  - Observado
  - Validado
  - Rechazado
  - Publicado
- Notificaciones por email
- Generación de certificados
- Administración de filtros dinámicos
Tecnologías sugeridas
- Node.js
- Django
- Laravel

17.2 Frontend
Función
Permitir la interacción del usuario con la plataforma.
Debe incluir
- Interfaz móvil para registro
- Interfaz web para validación docente
- Interfaz pública para consulta
- Galería de especies
- Fichas públicas
- Panel administrativo
Tecnologías sugeridas
- React
- Vue
- Angular

17.3 Base de datos espacial
Función
Almacenar datos botánicos, usuarios, fotografías, filtros y coordenadas.
Debe permitir
- Guardar registros de plantas
- Asociar coordenadas geográficas
- Asociar fotos por individuo
- Consultas por distrito, calle o zona
- Filtros por caracteres morfológicos
- Historial de validación
Tecnología sugerida
- PostgreSQL + PostGIS

17.4 Mapas
Función
Visualizar la ubicación de cada individuo registrado.
Debe permitir
- Captura de punto en el registro móvil
- Corrección manual del punto
- Visualización pública de registros validados
- Consulta por mapa
- Agrupación de puntos cercanos
Tecnologías sugeridas
- Leaflet
- Google Maps API
- Mapbox

17.5 Estructura general
Usuario móvil → Frontend → Backend → Base de datos espacial → Mapa público


18. Resultado esperado
Función
Definir los productos concretos que debe generar PLANT-OR al finalizar su implementación.

18.1 Identificación de plantas
El sistema permitirá que estudiantes, docentes, vecinos y usuarios reconozcan plantas ornamentales mediante:
- Fotografías validadas
- Fichas públicas
- Filtros simples
- Íconos visuales
- Caracteres fáciles de observar

18.2 Ubicación precisa
Cada planta registrada contará con:
- Coordenadas GPS
- Punto corregido manualmente en mapa
- Dirección referencial
- Distrito
- Tipo de ubicación urbana

18.3 Datos científicos
PLANT-OR generará una base de datos con:
- Identificación taxonómica
- Caracteres morfológicos
- Datos dasométricos
- Estado fenológico
- Valor ornamental
- Impacto urbano
- Registro fotográfico

18.4 Apoyo a la gestión urbana
La información permitirá:
- Conocer qué especies existen en la ciudad
- Distinguir especies nativas e introducidas
- Identificar zonas con baja ornamentación
- Detectar especies que generan daño urbano
- Orientar arborización y jardinería urbana


19. Enfoque final
Esto no es un catálogo estático ni una simple colección de imágenes.
Es un sistema de identificación construido a partir de datos reales, generados en campo, validados por especialistas y organizados para su uso práctico.

Principios del enfoque
1. Basado en evidencia
Cada registro:
- Tiene ubicación exacta
- Tiene respaldo fotográfico
- Ha sido validado por docentes

2. Construido desde campo
- Los datos no provienen de libros
- Provienen de observación directa
- Reflejan la realidad de la ciudad

3. Traduce ciencia en lenguaje simple
- Datos técnicos → filtros comprensibles
- Botánica → herramientas para el usuario
- Complejidad → decisiones simples

4. Sistema dinámico
- Mejora con cada registro
- Se adapta a nuevas especies
- Evoluciona con el tiempo

5. Integra actores clave
- Estudiantes → generan datos
- Docentes → validan y estructuran
- Sistemas → desarrollan la herramienta
- Ciudadanos → amplían cobertura

Resultado conceptual
Un sistema que permite:
- Identificar plantas sin ser botánico
- Ubicar individuos con precisión
- Generar conocimiento aplicable
- Tomar decisiones urbanas informadas

Mensaje clave
- Sin estudiantes → no hay datos
- Sin sistemas → no hay herramienta
- Sin ciudadanos → no hay cobertura

Frase final
“PLANT-OR conecta conocimiento, tecnología y ciudad.”

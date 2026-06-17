# Mapeo de cau-ucayali.org

Revisión realizada el 15 de junio de 2026 sobre las páginas públicas del
Colegio de Abogados de Ucayali.

## Arquitectura compartida

Todas las páginas revisadas usan la misma estructura:

1. Encabezado con logotipo.
2. Menú principal:
   - Institucional
     - Quiénes somos
     - Junta directiva
   - Colegiatura
     - Requisitos para colegiarse
     - Requisitos para fondos intangibles
   - Publicaciones
   - Enlaces
     - Enlaces
     - Intranet
     - Bibliotecario
     - Aula virtual
3. Botón "Centro de arbitraje".
4. Contenido específico de la página.
5. Pie con dirección, horarios, teléfonos y correos.

### Datos compartidos del pie

- Dirección: Jr. Progreso N. 174, 25000 Pucallpa.
- Caja: lunes a viernes, 08:00-13:00 y 14:00-17:45.
- Secretaría y arbitraje: 08:00-13:00 y 14:00-18:00.
- Caja: 920 558 904.
- Secretaría: 972 927 907.
- Arbitraje: 995 304 792.
- Correo de arbitraje: centrodearbitraje@cau.org.pe.
- Correo de secretaría: secretaria@cau.org.pe.

## Páginas solicitadas

### Quiénes somos

- Ruta: `/quienes-somos/`
- WordPress ID: `3487`
- Tipo de contenido: presentación institucional.
- Secciones:
  - Misión.
  - Visión.
  - Valores.
- Valores publicados: Ética, Respeto, Compromiso y Servicio.
- Imagen principal:
  `wp-content/uploads/2025/05/imagen_2025-05-02_045017862.png`
- Observaciones:
  - No tiene un `h1`; los títulos comienzan en `h2`.
  - La imagen tiene `alt` vacío.
  - Conviene corregir la redacción y dividir la misión en párrafos breves.

### Junta directiva

- Ruta: `/junta-directiva/`
- WordPress ID: `3585`
- Tipo de contenido: directorio de autoridades.
- Periodo mostrado: `2023-2025`.
- Integrantes:

| Cargo | Nombre publicado |
| --- | --- |
| Decano | BILLLY ALLAN EYZAGUIRRE TUESTA |
| Vicedecano | JUSTO ROSALES MAYNAS |
| Secretaria general | ANGÉLICA M. VILLAVICENCIO ROJAS |
| Director de Economía | PAUL ERNESTO ZEGARRA PINCHI |
| Director de Defensa Gremial y Derechos Humanos | ROYER RUIZ VÁSQUEZ |
| Directora de Asistencia Social | LESSLY E. RAMÍREZ GALLARDO |
| Directora de Conferencias | ROCÍO DÍAZ SEGURA |
| Directora de Publicaciones | KERLY KEREN PARDO RUIZ |
| Directora de Biblioteca, Prensa y Propaganda | KARLA PAOLA HUAYABAN MACEDO |
| Fiscal | VICTOR KERVIN MATHEWS VÁSQUEZ |

- Recursos: diez retratos JPEG ubicados en
  `wp-content/uploads/2025/06/`.
- Observaciones:
  - El periodo `2023-2025` está vencido respecto a la fecha de revisión.
  - Revisar la aparente errata `BILLLY`.
  - Todas las fotografías tienen `alt` vacío.
  - Cada integrante debe implementarse como una tarjeta con nombre, cargo y
    texto alternativo.

### Requisitos para colegiarse

- Ruta: `/requisitos-para-colegiarse/`
- WordPress ID: `3523`
- Tipo de contenido: requisitos de trámite.
- Contenido actual: una imagen JPG, sin transcripción HTML.
- Imagen:
  `wp-content/uploads/2025/05/Imagen-de-WhatsApp-2025-05-04-a-las-17.36.35_99047500.jpg`
- Observaciones:
  - Los requisitos no son indexables ni accesibles.
  - El usuario no puede buscar, seleccionar o copiar el contenido.
  - Debe transcribirse a una lista HTML y conservar la imagen solo como
    descarga o respaldo.

### Requisitos para fondos intangibles

- Ruta: `/requisitos-para-fondos-intangibles/`
- WordPress ID: `3533`
- Tipo de contenido: requisitos de trámite.
- Contenido actual: dos imágenes JPG, sin transcripción HTML.
- Imágenes:
  - `wp-content/uploads/2025/05/Imagen-de-WhatsApp-2025-05-04-a-las-17.36.36_22cad833.jpg`
  - `wp-content/uploads/2025/05/Imagen-de-WhatsApp-2025-05-04-a-las-17.36.35_415681d2.jpg`
- Observaciones:
  - Presenta los mismos problemas de accesibilidad y SEO.
  - Debe convertirse en contenido estructurado con requisitos, importes,
    documentos y pasos claramente separados.

## Rutas relacionadas detectadas

| Ruta | Uso |
| --- | --- |
| `/` | Inicio |
| `/publicaciones/` | Publicaciones |
| `/enlaces/` | Enlaces externos |
| `/contactenos/` | Contacto |
| `/consulta-de-habilidad/` | Consulta de habilidad |
| `/junta-y-arbitraje/` | Entrada al Centro de Arbitraje |
| `/arbitraje/` | Información de arbitraje |
| `/junta-de-resolucion-de-disputas/` | Junta de resolución de disputas |
| `/calculadora-de-albitraje/` | Calculadora; la ruta contiene la errata "albitraje" |

También existen páginas aparentemente residuales que no deberían formar parte
de la navegación pública: `/elementor-4053/`, `/pagina/`, `/prueba-nombre/`,
`/director/` y `/requisitos-para-colegiarse-v1/`.

## Enlaces externos

- Intranet: `https://cau-ucayali.org.pe/intranet/login.php`
- Biblioteca: `https://cau-ucayali.org.pe/biblioteca/`
- Aula virtual: `https://cau-ucayali.org.pe/aula/login/index.php`

## Problemas globales a corregir

1. El enlace principal "COLEGIATURA" apunta erróneamente a
   `http://Colegiatura`.
2. Ninguna de las cuatro páginas usa un `h1`.
3. Faltan descripciones SEO y metadatos sociales específicos.
4. El logotipo y las imágenes de contenido tienen textos alternativos vacíos.
5. El menú se duplica en el HTML para escritorio y móvil.
6. El pie contiene la errata "de de 08:00 AM".
7. Aparece publicidad técnica de "PHP Code Snippets / XYZScripts".
8. El contenido común debe convertirse en componentes reutilizables:
   encabezado, navegación, título de página y pie.

## Estructura recomendada para la versión local

```text
index.html
quienes-somos.html
junta-directiva.html
requisitos-para-colegiarse.html
requisitos-para-fondos-intangibles.html
publicaciones.html
enlaces.html
contactenos.html
assets/
  css/
  js/
  img/
    institucional/
    junta-directiva/
    colegiatura/
```


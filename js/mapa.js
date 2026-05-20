document.addEventListener("DOMContentLoaded", function () {
    // Crear el mapa
    var map = L.map('map');

    // Añadir capa de mapa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Función para establecer la vista inicial y agregar el marcador de "Estas aquí"
    function setInitialView(lat, lon) {
        map.setView([lat, lon], 14); // Nivel de zoom 14 es aproximadamente 5 km

        // Agregar marcador "Estas aquí"
        var marker = L.marker([lat, lon]).addTo(map);
        marker.bindPopup('<b>Estás aquí</b>').openPopup();
    }

    // Geolocalización
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            setInitialView(lat, lon);
        }, function() {
            alert("No se pudo obtener su ubicación. Se utilizará la vista predeterminada.");
            setInitialView(15.7835, -90.2308); // Coordenadas centrales de Guatemala
        });
    } else {
        alert("Geolocalización no soportada por su navegador. Se utilizará la vista predeterminada.");
        setInitialView(15.7835, -90.2308); // Coordenadas centrales de Guatemala
    }

    // Datos de las instituciones
    var instituciones = [
        { nombre: "Casa Alianza Guatemala", coordenadas: [14.6094, -90.5167], tipo: 'refugio', horarios: '24/7', contacto: '+502 2312 0600', url: "https://casa-alianza.org.gt/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "Fundación Sobrevivientes", coordenadas: [14.6349, -90.5114], tipo: 'asesoría legal', horarios: 'L-V: 8:00 - 17:00', contacto: '+502 2202 1500', url: "https://sobrevivientes.org/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "Asociación La Alianza", coordenadas: [14.6346, -90.5069], tipo: 'refugio', horarios: '24/7', contacto: '+502 2440 1491', url: "https://laalianza.org.gt/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "Ministerio Público - Fiscalía de la Mujer", coordenadas: [14.6295, -90.5165], tipo: 'fiscalía', horarios: 'L-V: 8:00 - 16:00', contacto: '+502 2411 9191', url: "https://redciudadana.org/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "Procuraduría de los Derechos Humanos (PDH)", coordenadas: [14.6219, -90.516], tipo: 'defensoría', horarios: 'L-V: 8:00 - 16:00', contacto: '+502 2424 1717', url: "https://www.pdh.org.gt/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "Instituto de la Defensa Pública Penal", coordenadas: [14.6276, -90.5123], tipo: 'defensa legal', horarios: 'L-V: 8:00 - 16:00', contacto: '+502 2245 4400', url: "https://redciudadana.org/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "Refugio de la Mujer - Guatemala City", coordenadas: [14.6248, -90.5111], tipo: 'refugio', horarios: '24/7', contacto: '+502 2440 0600', url: "https://redciudadana.org/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "Oficina de la Mujer - Municipalidad de Mixco", coordenadas: [14.6386, -90.607], tipo: 'oficina de atención', horarios: 'L-V: 8:00 - 16:00', contacto: '+502 2412 1212', url: "https://redciudadana.org/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "Centro de Apoyo Integral para Mujeres (CAIMUS)", coordenadas: [14.6407, -90.5133], tipo: 'centro integral', horarios: 'L-V: 8:00 - 17:00', contacto: '+502 7888 1234', url: "https://caimus.org.gt/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "Mujeres Transformando el Mundo", coordenadas: [14.6254, -90.5167], tipo: 'ong', horarios: 'L-V: 8:00 - 17:00', contacto: '+502 2385 2800', url: "https://mujerestransformandoelmundo.org/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "Organización de Mujeres en Solidaridad (AMES)", coordenadas: [14.6331, -90.512], tipo: 'ong', horarios: 'L-V: 8:00 - 17:00', contacto: '+502 2234 5678', url: "https://amesguatemala.org/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "Refugio La Rosa - Antigua Guatemala", coordenadas: [14.5605, -90.7331], tipo: 'refugio', horarios: '24/7', contacto: '+502 7832 1234', url: "https://redciudadana.org/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "Fundación Sobrevivientes - Quetzaltenango", coordenadas: [14.8447, -91.5182], tipo: 'asesoría legal', horarios: 'L-V: 8:00 - 17:00', contacto: '+502 7767 8900', url: "https://sobrevivientes.org/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "Mujeres Ixchel", coordenadas: [14.6556, -90.5066], tipo: 'ong', horarios: 'L-V: 8:00 - 17:00', contacto: '+502 2365 4321', url: "https://mujeresixchel.org.gt/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "Casa María Amor", coordenadas: [14.592, -90.5], tipo: 'refugio', horarios: '24/7', contacto: '+502 2223 4567', url: "https://redciudadana.org/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "Centro de Atención Psicológica - USAC", coordenadas: [14.6056, -90.511], tipo: 'atención psicológica', horarios: 'L-V: 8:00 - 16:00', contacto: '+502 2338 1212', url: "https://redciudadana.org/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "Red de Derivación - Chiquimula", coordenadas: [14.7999, -89.5451], tipo: 'red de apoyo', horarios: 'L-V: 8:00 - 16:00', contacto: '+502 7943 6789', url: "https://redciudadana.org/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "Asociación Coincidir", coordenadas: [14.651, -90.5135], tipo: 'ong', horarios: 'L-V: 8:00 - 17:00', contacto: '+502 2451 7890', url: "https://coincidir.org.gt/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "Centro de Estudios de Género - UVG", coordenadas: [14.6037, -90.4885], tipo: 'centro de investigación', horarios: 'L-V: 8:00 - 16:00', contacto: '+502 2368 1234', url: "https://www.uvg.edu.gt/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "Clínica Jurídica de la Universidad Rafael Landívar", coordenadas: [14.6312, -90.5148], tipo: 'clínica jurídica', horarios: 'L-V: 8:00 - 16:00', contacto: '+502 2426 2626', url: "https://principal.url.edu.gt/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "Refugio Seguro - Cobán", coordenadas: [15.4675, -90.371], tipo: 'refugio', horarios: '24/7', contacto: '+502 2251 1234', url: "https://redciudadana.org/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "Mujeres en Acción - Escuintla", coordenadas: [14.3051, -90.7852], tipo: 'ong', horarios: 'L-V: 8:00 - 17:00', contacto: '+502 7888 1234', url: "https://mujeresenaccion.org/lander", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "Fundación Guatemala", coordenadas: [14.6298, -90.5099], tipo: 'ong', horarios: 'L-V: 8:00 - 17:00', contacto: '+502 2334 5678', url: "https://fundacionguatemala.org/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "Proyecto Mujer", coordenadas: [14.628, -90.5098], tipo: 'ong', horarios: 'L-V: 8:00 - 17:00', contacto: '+502 2389 1234', url: "https://proyectomujer.org.gt/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "Red Nacional de Mujeres", coordenadas: [14.6396, -90.5154], tipo: 'red de apoyo', horarios: 'L-V: 8:00 - 17:00', contacto: '+502 2398 1234', url: "https://rednacionaldemujeres.org/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "Centro de Derechos de Mujeres", coordenadas: [14.6114, -90.521], tipo: 'derechos humanos', horarios: 'L-V: 8:00 - 17:00', contacto: '+502 2238 1234', url: "https://centrodederechos.org/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "Alianza de Mujeres Indígenas", coordenadas: [14.6341, -90.5098], tipo: 'ong', horarios: 'L-V: 8:00 - 17:00', contacto: '+502 2301 1234', url: "https://alianzadeindigenas.org/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "Mujeres Ixchel - Quetzaltenango", coordenadas: [14.8483, -91.4985], tipo: 'ong', horarios: 'L-V: 8:00 - 17:00', contacto: '+502 2312 1234', url: "https://mujeresixchel.org.gt/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "Defensa de la Mujer Indígena (DEMI)", coordenadas: [14.6242, -90.5161], tipo: 'defensa legal', horarios: 'L-V: 8:00 - 16:00', contacto: '+502 2253 1234', url: "https://redciudadana.org/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "Centro de Justicia para Mujeres", coordenadas: [14.6248, -90.5113], tipo: 'justicia integral', horarios: 'L-V: 8:00 - 16:00', contacto: '+502 2333 1234', url: "https://centrojusticia.org/", imagen: "/ELEMENTOS/institucion.png" }
    ];
    

    // Variable para almacenar los marcadores
    var markers = [];

    // Función para agregar marcadores de instituciones
    function addMarkers(filter) {
        // Eliminar marcadores existentes
        markers.forEach(marker => map.removeLayer(marker));
        markers = [];

        // Agregar marcadores según el filtro
        instituciones.forEach(function(institucion) {
            if (filter === 'todos' || institucion.tipo === filter) {
                // Crear icono personalizado
                var customIcon = L.icon({
                    iconUrl: institucion.imagen, // Ruta del icono personalizado
                    iconSize: [32, 32], // Tamaño del icono
                    iconAnchor: [16, 32], // Punto del icono que corresponde a la ubicación del marcador
                    popupAnchor: [0, -32] // Punto desde el cual se abrirá el popup
                });

                var marker = L.marker(institucion.coordenadas, { icon: customIcon }).addTo(map);
                var popupContent = `
                    <div class="popup-content">
                        <img src="${institucion.imagen}" alt="${institucion.nombre}" style="width: 30px; height: 30px; margin-bottom:5px"><br>
                        <b>${institucion.nombre}</b><br>
                        <b>Tipo:</b> ${institucion.tipo}<br>
                        <b>Horarios de Atención:</b> ${institucion.horarios}<br>
                        <b>Contacto:</b> ${institucion.contacto}<br>
                        <button class="btn2" onclick="window.location.href='${institucion.url}'">Ir a la página</button>
                    </div>`;
                marker.bindPopup(popupContent);
                markers.push(marker);
            }
        });
    }

    // Agregar los marcadores iniciales (mostrar todos)
    addMarkers('todos');

    // Manejar el cambio en el filtro
    document.getElementById('tipo-institucion').addEventListener('change', function() {
        var filter = this.value;
        addMarkers(filter);
    });
});

let coordenadasDB;

let incidents;

// Función para convertir texto a formato título
function toTitleCase(str) {
    return str.toLowerCase().split(' ').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

// Colores actualizados con un esquema más profesional
const tipoColores = {
    'RETENCIÓN / CONGESTIÓN': '#FF0000',         // Rojo brillante
    'DESVÍO OPERATIVO': '#00FF00',               // Verde brillante
    'OTROS': '#0000FF',                          // Azul brillante
    'OBRA / MANTENIMIENTO VIA': '#FF9900',       // Naranja brillante
    'RESTRICCIONES EN ACCESOS': '#9900FF',       // Púrpura brillante
    'OBSTÁCULO FIJO': '#FF00FF',                 // Magenta brillante
    'CARRIL DE ALTA OCUPACIÓN ABIERTO': '#00FFFF', // Cian brillante
    'INUNDACIÓN': '#000',                   // Negro
};

function isValidValenciaCoordinate(lat, lon) {
    return lat >= 37.8 && lat <= 40.8 && lon >= -1.5 && lon <= 0.5;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function isWithinValenciaRadius(lat, lon) {
    const valenciaLat = 39.47391;
    const valenciaLon = -0.37966;
    return calculateDistance(valenciaLat, valenciaLon, lat, lon) <= 300;
}

async function init() {
    try {
        const response = await fetch('coordenadas.json');
        const coordenadasDB = await response.json();

        incidents = await fetch('incidentes.json').then(response => response.json());

        const validPoints = [];
        const map = L.map('map').setView([39.47391, -0.37966], 9);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Conjunto para trackear los tipos de incidentes que realmente aparecen
        const tiposActivos = new Set();

        // Procesar incidentes
        incidents.forEach(incident => {
            const startCoords = coordenadasDB[incident.carretera]?.[incident.km_inicio.toString()];
            if (!startCoords ||
                !isWithinValenciaRadius(startCoords.lat, startCoords.lon)) {
                console.log(`Ignorando punto: ${incident.carretera} km ${incident.km_inicio}`);
                return;
            }

            const color = tipoColores[incident.tipo] || '#gray';
            tiposActivos.add(incident.tipo);
            validPoints.push([startCoords.lat, startCoords.lon]);

            L.circleMarker(
                [startCoords.lat, startCoords.lon],
                {
                    color: 'white',        // Color del borde
                    fillColor: color,      // Color del relleno
                    fillOpacity: 1,
                    radius: 10,
                    weight: 3             // Borde un poco más grueso
                }
            ).addTo(map)
                .bindPopup(`
                    <strong>${incident.carretera}</strong><br>
                    <strong>${incident.tipo}</strong><br>
                    ${incident.ubicacion}<br>
                    ${incident.km_fin ?
                        `PKs: ${incident.km_inicio} - ${incident.km_fin}` :
                        `PK: ${incident.km_inicio}`}
                `);
        });

        // Añadir leyenda solo con los tipos activos
        const legend = L.control({ position: 'bottomright' });
        legend.onAdd = function (map) {
            const div = L.DomUtil.create('div', 'legend');
            let content = '<h4>Tipos de Incidentes</h4>';

            // Solo iterar sobre los tipos que están activos
            for (const tipo of tiposActivos) {
                const color = tipoColores[tipo];
                // Convertir el texto a formato título para mejor legibilidad
                const displayText = toTitleCase(tipo);
                content += `<div style="padding: 4px 0;">
                    <i style="background: ${color}; opacity: 0.8;"></i>
                    ${displayText}
                </div>`;
            }

            div.innerHTML = content;
            return div;
        };
        legend.addTo(map);

        // Ajustar el mapa a los puntos válidos
        if (validPoints.length > 0) {
            map.fitBounds(validPoints);
        }

    } catch (error) {
        console.error('Error cargando coordenadas:', error);
    }
}

document.addEventListener('DOMContentLoaded', init);

function scheduleReload() {
    setTimeout(() => {
        window.location.reload();
    }, 5 * 60 * 1000);  // 5 minutes
}

scheduleReload();
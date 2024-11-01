let coordenadasDB;

// Datos de incidentes
const incidents = [
    {
        "carretera": "A-3",
        "km_inicio": 340.97,
        "ubicacion": "Polígono Industrial Sur",
        "tipo": "Corte de un carril"
    },
    {
        "carretera": "A-7",
        "km_inicio": 429,
        "ubicacion": "Atzeneta d'Albaida",
        "tipo": "Sentido decreciente de la kilometración"
    },
    {
        "carretera": "A-7",
        "km_inicio": 327,
        "ubicacion": "Cañada",
        "tipo": "Corte de un carril en ambos sentidos"
    },
    {
        "carretera": "A-7",
        "km_inicio": 335.8,
        "km_fin": 343.76,
        "ubicacion": "Polígono Industrial Sur a Masia del Juez",
        "tipo": "Corte total hacia Alicante"
    },
    {
        "carretera": "V-31",
        "km_inicio": 5,
        "km_fin": 12,
        "ubicacion": "Silla a Horno de Alcedo",
        "tipo": "Carriles izquierdo y central cerrados"
    },
    {
        "carretera": "CV-41",
        "km_inicio": 10.5,
        "km_fin": 12,
        "ubicacion": "Manuel",
        "tipo": "Condiciones difíciles"
    },
    {
        "carretera": "CV-425",
        "km_inicio": 28,
        "km_fin": 33,
        "ubicacion": "Cortes de Pallás",
        "tipo": "Condiciones difíciles"
    },
    {
        "carretera": "CV-455",
        "km_inicio": 2,
        "km_fin": 11,
        "ubicacion": "Azagador a Ruices",
        "tipo": "Condiciones difíciles"
    },
    {
        "carretera": "CV-384",
        "km_inicio": 0,
        "km_fin": 5.4,
        "ubicacion": "Cheste",
        "tipo": "Condiciones difíciles"
    },
    {
        "carretera": "CV-446",
        "km_inicio": 5,
        "km_fin": 8.9,
        "ubicacion": "Campo Arcís a La Portera",
        "tipo": "Condiciones difíciles"
    },
    {
        "carretera": "CV-392",
        "km_inicio": 0,
        "km_fin": 9,
        "ubicacion": "Utiel a Estenas",
        "tipo": "Condiciones difíciles"
    },
    {
        "carretera": "AP-7",
        "km_inicio": 592,
        "ubicacion": "Oliva",
        "tipo": "Sentido decreciente"
    },
    {
        "carretera": "CV-460",
        "km_inicio": 0,
        "km_fin": 11,
        "ubicacion": "Utiel a Ruices",
        "tipo": "Condiciones difíciles"
    },
    {
        "carretera": "CV-381",
        "km_inicio": 10,
        "km_fin": 0,
        "ubicacion": "Pedralba a Chiva",
        "tipo": "Condiciones difíciles"
    },
    {
        "carretera": "CV-394",
        "km_inicio": 0,
        "km_fin": 7,
        "ubicacion": "La Ermita a Losa del Obispo",
        "tipo": "Condiciones difíciles"
    },
    {
        "carretera": "V-30",
        "km_inicio": 11,
        "km_fin": 3,
        "ubicacion": "Quart de Poblet a Castellar-Oliveral",
        "tipo": "Corte total"
    },
    {
        "carretera": "CV-416",
        "km_inicio": 0,
        "km_fin": 15.8,
        "ubicacion": "Montserrat a Chiva",
        "tipo": "Corte total"
    },
    {
        "carretera": "CV-50",
        "km_inicio": 58,
        "km_fin": 58.5,
        "ubicacion": "Turís",
        "tipo": "Corte total"
    },
    {
        "carretera": "CV-50",
        "km_inicio": 45.5,
        "ubicacion": "Llombai",
        "tipo": "Corte total"
    },
    {
        "carretera": "CV-50",
        "km_inicio": 73.5,
        "km_fin": 74.5,
        "ubicacion": "Chiva a Cheste",
        "tipo": "Corte total"
    },
    {
        "carretera": "CV-379",
        "km_inicio": 0,
        "km_fin": 20.5,
        "ubicacion": "Chiva a Gestalgar",
        "tipo": "Corte total"
    },
    {
        "carretera": "CV-374",
        "km_inicio": 0,
        "km_fin": 7,
        "ubicacion": "Ventas del Poyo a Riba-Roja de Túria",
        "tipo": "Corte total"
    },
    {
        "carretera": "CV-435",
        "km_inicio": 20.5,
        "ubicacion": "Dos Aguas",
        "tipo": "Corte total"
    },
    {
        "carretera": "CV-42",
        "km_inicio": 3.1,
        "km_fin": 5,
        "ubicacion": "Raval a Carrascalet",
        "tipo": "Corte total"
    },
    {
        "carretera": "CV-511",
        "km_inicio": 0,
        "km_fin": 2,
        "ubicacion": "Fortaleny a Riola",
        "tipo": "Corte total"
    },
    {
        "carretera": "CV-380",
        "km_inicio": 11.8,
        "ubicacion": "Pedralba",
        "tipo": "Corte total"
    },
    {
        "carretera": "CV-372",
        "km_inicio": 4.2,
        "km_fin": 4.4,
        "ubicacion": "Riba-Roja de Túria",
        "tipo": "Corte total"
    },
    {
        "carretera": "CV-415",
        "km_inicio": 10,
        "km_fin": 21,
        "ubicacion": "Montserrat a Turís",
        "tipo": "Corte total"
    },
    {
        "carretera": "CV-383",
        "km_inicio": 0,
        "km_fin": 1.4,
        "ubicacion": "Cheste",
        "tipo": "Corte total"
    },
    {
        "carretera": "CV-576",
        "km_inicio": 1.5,
        "km_fin": 6.1,
        "ubicacion": "Berfull a L'Ènova",
        "tipo": "Corte total"
    },
    {
        "carretera": "CV-390",
        "km_inicio": 4,
        "ubicacion": "Tuejar",
        "tipo": "Corte total"
    },
    {
        "carretera": "CV-390",
        "km_inicio": 13.5,
        "ubicacion": "Benagéber",
        "tipo": "Corte total"
    },
    {
        "carretera": "CV-345",
        "km_inicio": 0,
        "km_fin": 0.3,
        "ubicacion": "Casinos",
        "tipo": "Corte total"
    },
    {
        "carretera": "CV-354",
        "km_inicio": 3.93,
        "ubicacion": "Cañada Seca",
        "tipo": "Corte total"
    },
    {
        "carretera": "CV-473",
        "km_inicio": 1,
        "km_fin": 2,
        "ubicacion": "Cuevas",
        "tipo": "Corte total"
    },
    {
        "carretera": "CV-396",
        "km_inicio": 0,
        "km_fin": 10.9,
        "ubicacion": "Bugarra a Villar del Arzobispo",
        "tipo": "Corte total"
    },
    {
        "carretera": "CV-429",
        "km_inicio": 0,
        "km_fin": 28.75,
        "ubicacion": "Macastre a Hortunas",
        "tipo": "Corte total"
    },
    {
        "carretera": "CV-377",
        "km_inicio": 0,
        "km_fin": 1.2,
        "ubicacion": "Pedralba",
        "tipo": "Corte total"
    },
    {
        "carretera": "CV-545",
        "km_inicio": 0,
        "km_fin": 4.5,
        "ubicacion": "Alberic a Pobla Llarga",
        "tipo": "Corte total"
    },
    {
        "carretera": "CV-401",
        "km_inicio": 0,
        "km_fin": 6.8,
        "ubicacion": "Sedaví a El Saler",
        "tipo": "Corte total"
    },
    {
        "carretera": "CV-603",
        "km_inicio": 0,
        "km_fin": 7.5,
        "ubicacion": "Masia del Racó a Tavernes de la Valldigna",
        "tipo": "Corte total"
    },
    {
        "carretera": "CV-523",
        "km_inicio": 0,
        "km_fin": 2.3,
        "ubicacion": "Guadassuar a Raval",
        "tipo": "Corte total"
    },
    {
        "carretera": "CV-544",
        "km_inicio": 0,
        "km_fin": 4.68,
        "ubicacion": "Guadassuar",
        "tipo": "Corte total"
    },
    {
        "carretera": "CV-515",
        "km_inicio": 0,
        "km_fin": 10,
        "ubicacion": "Algemesí a Sueca",
        "tipo": "Corte total"
    },
    {
        "carretera": "CV-507",
        "km_inicio": 0,
        "km_fin": 1.13,
        "ubicacion": "Polinyà de Xúquer a Benicull de Xúquer",
        "tipo": "Corte total"
    },
    {
        "carretera": "CV-512",
        "km_inicio": 0,
        "km_fin": 1.2,
        "ubicacion": "Algemesí a Polinyà de Xúquer",
        "tipo": "Corte total"
    }
];

// Colores para tipos de incidente
const tipoColores = {
    'Corte total': '#000000',
    'Corte de un carril': '#cc0000',
    'Condiciones difíciles': '#ffa500',
    'Carriles izquierdo y central cerrados': '#00FFFF',
    'Corte de un carril en ambos sentidos': '#899000',
    'Sentido decreciente de la kilometración': '#FF00FF',
    'Sentido decreciente': '#FF69B4'
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
    return calculateDistance(valenciaLat, valenciaLon, lat, lon) <= 120;
}

async function init() {
    try {
        const response = await fetch('coordenadas.json');
        const coordenadasDB = await response.json();
        
        const validPoints = [];
        const map = L.map('map').setView([39.47391, -0.37966], 9);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Añadir leyenda
        const legend = L.control({position: 'bottomright'});
        legend.onAdd = function (map) {
            const div = L.DomUtil.create('div', 'legend');
            let content = '<h4>Tipos de Incidentes</h4>';
            for (const [tipo, color] of Object.entries(tipoColores)) {
                content += `<i style="background: ${color}"></i>${tipo}<br>`;
            }
            div.innerHTML = content;
            return div;
        };
        legend.addTo(map);

        // Procesar incidentes
        incidents.forEach(incident => {
            const startCoords = coordenadasDB[incident.carretera]?.[incident.km_inicio.toString()];
            if (!startCoords || 
                !isValidValenciaCoordinate(startCoords.lat, startCoords.lon) ||
                !isWithinValenciaRadius(startCoords.lat, startCoords.lon)) {
                console.log(`Ignorando punto: ${incident.carretera} km ${incident.km_inicio}`);
                return;
            }

            const color = tipoColores[incident.tipo] || '#gray';
            validPoints.push([startCoords.lat, startCoords.lon]);

            L.circleMarker(
                [startCoords.lat, startCoords.lon], 
                {
                    color: color,
                    fillColor: color,
                    fillOpacity: 1,
                    radius: 10,
                    weight: 2
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

        // Ajustar el mapa a los puntos válidos
        if (validPoints.length > 0) {
            map.fitBounds(validPoints);
        }

    } catch (error) {
        console.error('Error cargando coordenadas:', error);
    }
}

document.addEventListener('DOMContentLoaded', init);
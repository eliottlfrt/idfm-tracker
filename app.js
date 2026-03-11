const map = L.map('map').setView([48.8566,48.8566],11);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  { maxZoom: 19 }
).addTo(map);

let network = null;

// lignes déjà affichées
let visitedLines = JSON.parse(localStorage.getItem("visitedLines") || "[]");

// charge la base
fetch("data/network.geojson")
  .then(r => r.json())
  .then(data => {
    network = data;
    drawVisited();
  });

// sauvegarde local
function save() {
  localStorage.setItem("visitedLines", JSON.stringify(visitedLines));
}

// dessine seulement les lignes déjà déclarées
function drawVisited() {
  if (!network) return;

  // on efface toutes les couches pour éviter les doublons
  map.eachLayer(layer => {
    if (layer instanceof L.Polyline) map.removeLayer(layer);
  });

  network.features.forEach(line => {
    if (visitedLines.includes(line.properties.id)) {
      const coords = line.geometry.coordinates.map(c => [c[1], c[0]]);
      L.polyline(coords, { color: "red", weight: 5 }).addTo(map);
    }
  });
}

// ajoute une ligne à visitedLines
function addTrip() {
  const line = document.getElementById("line").value.trim();
  if (!line) {
    alert("Entre une ligne valide");
    return;
  }

  if (!visitedLines.includes(line)) {
    visitedLines.push(line);
    save();
    drawVisited();
  }
}

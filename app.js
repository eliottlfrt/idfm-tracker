const map = L.map('map').setView([48.8566,2.3522],11)

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{maxZoom:19}
).addTo(map)

let network = null

let visitedLines = JSON.parse(
localStorage.getItem("visitedLines") || "[]"
)

fetch("data/network.geojson")
.then(r=>r.json())
.then(data=>{

network=data
drawVisited()

})

function save(){

localStorage.setItem(
"visitedLines",
JSON.stringify(visitedLines)
)

}

function drawVisited(){

if(!network) return

network.features.forEach(line=>{

if(visitedLines.includes(line.properties.id)){

let coords=line.geometry.coordinates.map(c=>[c[1],c[0]])

L.polyline(
coords,
{color:"red",weight:5}
).addTo(map)

}

})

}

function addTrip(){

let line=document.getElementById("line").value

if(!line){
alert("entre une ligne")
return
}

if(!visitedLines.includes(line)){

visitedLines.push(line)

save()

drawVisited()

}

}

const map = L.map('map').setView([48.8566,2.3522],11)

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{maxZoom:19}
).addTo(map)

let trips = JSON.parse(localStorage.getItem("trips") || "[]")

function saveTrips(){
localStorage.setItem("trips",JSON.stringify(trips))
}

function drawTrips(){

trips.forEach(t=>{

L.polyline(
[t.start,t.end],
{color:"red",weight:4}
).addTo(map)

})

}

function addTrip(){

let line = document.getElementById("line").value
let start = document.getElementById("start").value
let end = document.getElementById("end").value

if(!line||!start||!end){
alert("remplis les champs")
return
}

let trip={
line:line,
start:randomCoord(),
end:randomCoord()
}

trips.push(trip)

saveTrips()

drawTrips()

}

function randomCoord(){

let lat = 48.8 + Math.random()*0.15
let lon = 2.25 + Math.random()*0.25

return [lat,lon]

}

drawTrips()

import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
const dataarry = [
  {
    name: "Kara Spencer",
    long: 77.128206,
    lat: 29.029637,
    distance: 43.65186288099884,
    tags: "pulses,wheat,rice,shampoo,oil",
    facility: "ac,upi",
    event: "",
  },
  {
    name: "Melissa Moore",
    long: 77.073152,
    lat: 28.734745,
    distance: 17.208940978810173,
    tags: "pulses,wheat,rice,shampoo,oil",
    facility: "ac,upi",
    event: "",
  },
  {
    name: "Paul Hooper",
    long: 77.083766,
    lat: 28.695795,
    distance: 14.156583603756781,
    tags: "pulses,wheat,rice,shampoo,oil",
    facility: "ac,upi",
    event: "",
  },
  {
    name: "Jeremy Lopez",
    long: 77.279872,
    lat: 28.638868,
    distance: 6.198001213832898,
    tags: "pulses,wheat,rice,shampoo,oil",
    facility: "ac,upi",
    event: "",
  },
  {
    name: "Yolanda Hudson",
    long: 77.637751,
    lat: 28.588177,
    distance: 41.57702152167842,
    tags: "pulses,wheat,rice,shampoo,oil",
    facility: "ac,upi",
    event: "",
  },
  {
    name: "Paul Kelly",
    long: 77.080374,
    lat: 28.612783,
    distance: 13.775520122681188,
    tags: "pulses,wheat,rice,shampoo,oil",
    facility: "ac,upi",
    event: "",
  },
  {
    name: "Tammie Williams",
    long: 76.820059,
    lat: 28.735125,
    distance: 39.97412518357742,
    tags: "pulses,wheat,rice,shampoo,oil",
    facility: "ac,upi",
    event: "",
  },
  {
    name: "Amanda Washington",
    long: 76.989037,
    lat: 28.529931,
    distance: 25.638940558471056,
    tags: "pulses,wheat,rice,shampoo,oil",
    facility: "ac,upi",
    event: "",
  },
  {
    name: "Nancy Alvarez",
    long: 77.494718,
    lat: 28.351479,
    distance: 42.44759020040434,
    tags: "pulses,wheat,rice,shampoo,oil",
    facility: "ac,upi",
    event: "",
  },
  {
    name: "David Estrada",
    long: 77.558594,
    lat: 28.499442,
    distance: 37.091769746326875,
    tags: "pulses,wheat,rice,shampoo,oil",
    facility: "ac,upi",
    event: "",
  },
  {
    name: "Stephanie Gibson",
    long: 76.736732,
    lat: 28.749926,
    distance: 48.25377412601701,
    tags: "pulses,wheat,rice,shampoo,oil",
    facility: "ac,upi",
    event: "",
  },
  {
    name: "Rodney Duarte",
    long: 77.003844,
    lat: 28.542494,
    distance: 23.69344840601731,
    tags: "pulses,wheat,rice,shampoo,oil",
    facility: "ac,upi",
    event: "",
  },
  {
    name: "Patricia Mcneil",
    long: 77.099422,
    lat: 28.70495,
    distance: 13.254658010324977,
    tags: "pulses,wheat,rice,shampoo,oil",
    facility: "ac,upi",
    event: "",
  },
  {
    name: "Daniel Smith",
    long: 77.039286,
    lat: 28.62295,
    distance: 17.486512656783855,
    tags: "pulses,wheat,rice,shampoo,oil",
    facility: "ac,upi",
    event: "",
  },
  {
    name: "Corey Peterson",
    long: 76.90882,
    lat: 28.876023,
    distance: 39.52031685252809,
    tags: "pulses,wheat,rice,shampoo,oil",
    facility: "ac,upi",
    event: "",
  },
  {
    name: "Kathleen Harris",
    long: 77.48749,
    lat: 28.770737,
    distance: 29.890518033507156,
    tags: "pulses,wheat,rice,shampoo,oil",
    facility: "ac,upi",
    event: "",
  },
  {
    name: "Allen Scott",
    long: 77.26561,
    lat: 28.7118,
    distance: 8.845901621194908,
    tags: "pulses,wheat,rice,shampoo,oil",
    facility: "ac,upi",
    event: "",
  },
  {
    name: "Jessica Lopez",
    long: 76.729174,
    lat: 28.633521,
    distance: 47.59661922302813,
    tags: "pulses,wheat,rice,shampoo,oil",
    facility: "ac,upi",
    event: "",
  },
  {
    name: "Timothy Richardson",
    long: 77.477972,
    lat: 28.650966,
    distance: 25.50279999025857,
    tags: "pulses,wheat,rice,shampoo,oil",
    facility: "ac,upi",
    event: "",
  },
  {
    name: "Miss Tiffany Farley",
    long: 77.117731,
    lat: 28.823096,
    distance: 22.0502038876035,
    tags: "pulses,wheat,rice,shampoo,oil",
    facility: "ac,upi",
    event: "",
  },
  {
    name: "Yvonne Santos",
    long: 77.450019,
    lat: 28.410701,
    distance: 34.59857902247605,
    tags: "pulses,wheat,rice,shampoo,oil",
    facility: "ac,upi",
    event: "",
  },
  {
    name: "Richard Huang",
    long: 76.932881,
    lat: 28.701129,
    distance: 28.390784668146335,
    tags: "pulses,wheat,rice,shampoo,oil",
    facility: "ac,upi",
    event: "",
  },
  {
    name: "Tara Garcia",
    long: 76.902843,
    lat: 28.714251,
    distance: 31.578658081506276,
    tags: "pulses,wheat,rice,shampoo,oil",
    facility: "ac,upi",
    event: "",
  },
];
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function Map2() {
  // const giveDirections = () => {
  //   alert("here me out ");
  // };
  const [endRoute, setEndroute]: any = useState([]);
  // const [placeData, setplaceData] = useState("");
  useEffect(() => {
    console.log(endRoute);
    const map = L.map("map").setView([28.6139, 77.209], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    dataarry.map((obj) => {
      // const giveDirections = () => {
      //   console.log("asdfasdfasdf");
      // };
      let popupContent = `
      <div class="p-4 bg-white rounded shadow-md max-w-xs">
        <h3 class="text-lg font-bold mb-2">${obj.name}</h3>
        <p class="mb-2">Distance: ${Math.round(obj.distance)} km</p>
        <p class="mb-2">Tags: ${obj.tags}</p>
        <p class="mb-2">Facility: ${obj.facility}</p>
        <p class="mb-2">Event: ${obj.event}</p>
        <button class="border-[2px] border-black" 
        onClick={() => setEndRoute([obj.lat, obj.long])}
        </div>
    `;
      // setplaceData(popupContent);
      L.marker([obj.lat, obj.long])
        .addTo(map)
        .bindPopup(popupContent)
        .openPopup();
    });

    //////////////////////////////////////////////////  Starting Point
    const customIcon = L.icon({
      iconUrl: require("./placeholder.png"), // Change this to the path of your custom icon
      iconSize: [32, 32], // Adjust icon size if needed
      iconAnchor: [16, 32], // Adjust icon anchor if needed
    });

    L.marker([28.6139, 77.209], { icon: customIcon })
      .addTo(map)
      .bindPopup("hola ji");
    // });
    // Add a marker outside the map with a different color
    // const marker = L.marker([28.6139, 77.209], {
    //   icon: L.divIcon({
    //     className: "custom-marker",
    //     html: '<div class="custom-marker-dot"></div>',
    //     iconSize: [10, 10],
    //   }),
    // }).addTo(map);

    // const marker = L.marker([28.6139, 77.209]).addTo(map);
    // marker
    //   .bindPopup("A pretty CSS3 popppup. <br /> Easily customizable.")
    //   .openPopup();

    // Create the routing control
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(28.6139, 77.209), // Starting point
        L.latLng(endRoute[0], endRoute[1]), // Ending point
      ],
      // routeWhileDragging: true,
      router: new L.Routing.OSRMv1({
        serviceUrl: "http://router.project-osrm.org/route/v1",
      }),
    });

    // Add the routing control to the map
    // console.log(map);
    routingControl.addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ height: "400px", width: "100%" }} />;
}

export default Map2;

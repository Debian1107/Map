import { useMap } from "react-leaflet";
import L, { LatLng } from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import { useEffect } from "react";

const Routing: React.FC<{ obj: [number, number]; obj2: [number, number] }> = ({
  obj,
  obj2,
}) => {
  const map = useMap();

  useEffect(() => {
    if (!map || obj2.length < 2) return;
    const customIcon = new L.Icon({
      iconUrl: require("../placeholder.png"), // URL to your custom marker icon
      iconSize: [25, 41], // size of the icon
      iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
      popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"), // URL to the marker shadow
      shadowSize: [41, 41], // size of the shadow
    });
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(obj[0], obj[1]),
        L.latLng(obj2[0], obj2[1]),
        // L.latLng(28.792167, 77.113131),
      ],
      zoomControl: false,
      // router: new L.Routing.OSRMv1({
      // serviceUrl: "https://router.project-osrm.org/route/v1",

      // }),
      createMarker: () => {
        return null;
      },
      // createMarker: (i: any, waypoint: any, n: any) => {
      //   return L.marker(waypoint.latLng, {
      //     icon: customIcon,
      //     draggable: false,
      //   });
      // },
      // container: customPanel,
      routeWhileDragging: false,
      showAlternatives: true,
      useZoomParameter: false,
      // distanceTemplate: "asdf",
      altLineOptions: {
        styles: [{ color: "yellow", opacity: 0.15, weight: 9 }],
        extendToWaypoints: true,
        missingRouteTolerance: 1,
        addWaypoints: true,
      },
      lineOptions: {
        styles: [{ color: "blue", opacity: 0.6, weight: 4 }],
        extendToWaypoints: true,
        missingRouteTolerance: 1,
        addWaypoints: true,
      },
      containerClassName:
        "overflow-hidden overscroll-contain pointer-events-none",
      // collapsable: true,
    } as L.Routing.RoutingControlOptions);

    // routingControl.on("routesfound", (e) => {
    //   const routes = e.routes;
    //   const summary = routes[0].summary;

    //   // Clear existing panel content
    //   // customPanel.innerHTML = "";

    //   // Add custom content to the panel
    //   // const content = `
    //   //   <div>
    //   //     <h2 class="text-lg font-bold mb-2">Route Information</h2>
    //   //     <p class="mb-2">Total Distance: ${(
    //   //       summary.totalDistance / 1000
    //   //     ).toFixed(2)} km</p>
    //   //     <p class="mb-4">Total Time: ${Math.round(
    //   //       summary.totalTime / 60
    //   //     )} minutes</p>
    //   //     <h3 class="text-md font-semibold mb-2">Directions:</h3>
    //   //     <ul class="list-disc list-inside">
    //   //       ${routes[0].instructions
    //   //         .map(
    //   //           (instr: any, index: any) =>
    //   //             `<li key=${index}>${instr.text}</li>`
    //   //         )
    //   //         .join("")}
    //   //     </ul>
    //   //   </div>
    //   // `;
    //   // customPanel.innerHTML = content;
    // });

    routingControl.addTo(map);

    const panel = document.querySelector(".leaflet-routing-container");

    const disableMapScrollZoom = () => map.scrollWheelZoom.disable();
    const enableMapScrollZoom = () => map.scrollWheelZoom.enable();

    if (panel) {
      panel.addEventListener("mouseenter", disableMapScrollZoom);
      panel.addEventListener("mouseleave", enableMapScrollZoom);
    }

    return () => {
      if (panel) {
        panel.removeEventListener("mouseenter", disableMapScrollZoom);
        panel.removeEventListener("mouseleave", enableMapScrollZoom);
      }
      map.removeControl(routingControl);
    };
  }, [map, obj, obj2]);

  return null;
};

export default Routing;
// map.on("blur", function () {
//   console.log("blurrrrrrrrrrrrr");
//   map.scrollWheelZoom.disable();
// });
// map.on("focus", function () {
//   console.log("blurrrrrrrrrrrrr");
//   map.scrollWheelZoom.enable();
// });
// map.scrollWheelZoom.disable();
// const customPanel = L.DomUtil.create(
//   "div",
//   "custom-routing-panel p-4 bg-white rounded-lg shadow-md"
// );

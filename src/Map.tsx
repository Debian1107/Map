// import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function Map() {
  return (
    <MapContainer
      center={[28.6139, 77.209]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[28.6139, 77.209]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;

// function Map({ center, zoom, style }: MapProps) {
//   const mapRef = useRef<any>(null); // Change the ref type to 'any'

//   useEffect(() => {
//     if (mapRef.current) {
//       const map = mapRef.current.leafletElement;
//       map.setView(center, zoom);
//     }
//   }, [center, zoom]);

//   return (
//     <div style={style}>
//       <MapContainer ref={mapRef} style={{ height: "100%", width: "100%" }}>
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         <Marker position={center}>
//           <Popup>
//             A pretty CSS3 popup. <br /> Easily customizable.
//           </Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   );
// }

// import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import "leaflet-routing-machine";
// import { Routing } from "leaflet";
// import { RoutingMachine } from "react-leaflet-routing-machine";
// import { RoutingMachine } from "react-leaflet-routing-machine";

import L from "leaflet";
import Routing from "./RoutingMachine";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});
const customIcon = new L.Icon({
  iconUrl: require("../placeholder.png"), // URL to the icon image
  iconSize: [45, 41], // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"), // URL to the shadow image (optional)
  shadowSize: [41, 41], // size of the shadow (optional)
  shadowAnchor: [13, 41], // anchor point of the shadow (optional)
});
const customIcon2 = new L.Icon({
  iconUrl: require("../location-pin.png"), // URL to the icon image
  iconSize: [45, 41], // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"), // URL to the shadow image (optional)
  shadowSize: [41, 41], // size of the shadow (optional)
  shadowAnchor: [13, 41], // anchor point of the shadow (optional)
});

function Map3({ queryData }: { queryData: never[][] }) {
  const [merchantLocation, setmerchantLocation]: any = useState([]);

  return (
    <MapContainer
      center={[28.6139, 77.209]}
      zoom={13}
      style={{ height: "92vh", width: "100%" }}
      // scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {queryData.length > 1 &&
        queryData[1].map((obj: any) => {
          return (
            <>
              <Marker position={[obj.lat, obj.long]}>
                <Popup>
                  <PlacesMarker
                    obj={obj}
                    onClose={(e) => {
                      setmerchantLocation(e);
                      console.log(merchantLocation);
                    }}
                  />
                </Popup>
              </Marker>
            </>
          );
        })}
      {queryData.length > 2 &&
        queryData[2].map((obj: any) => {
          return (
            <>
              <Marker position={[obj.lat, obj.long]} icon={customIcon2}>
                <Popup>
                  <PlacesMarker
                    obj={obj}
                    onClose={(e) => {
                      setmerchantLocation(e);
                      console.log(merchantLocation);
                    }}
                  />
                </Popup>
              </Marker>
            </>
          );
        })}
      <Marker position={[28.6139, 77.209]} icon={customIcon}>
        <Popup>
          <MyMarkerPopup onClose={() => console.log("Popup closed")} />
        </Popup>
      </Marker>
      <Routing obj={[28.6139, 77.209]} obj2={merchantLocation} />
    </MapContainer>
  );
}

export default Map3;

export const MyMarkerPopup: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <div>
      <h2>Marker Popup</h2>
      <p>This is the content of the popup.</p>
      <button onClick={() => alert("asdf")}>Close</button>
    </div>
  );
};
export const PlacesMarker: React.FC<{
  onClose: (e: any) => void;
  obj: any;
}> = ({ onClose, obj }) => {
  return (
    <div className="p-4 text-base bg-white rounded shadow-md max-w-xs">
      <h3 className="text-lg font-bold mb-2">{obj.name}</h3>
      <p className="mb-2">Approx Distance: {Math.round(obj.distance)} km</p>
      <p className="mb-2">Tags: {obj.tags}</p>
      <p className="mb-2">Facility: {obj.facility}</p>
      <p className="mb-2">Event: {obj.event}</p>
      <button
        className="border-[2px] border-black w-[40%]"
        onClick={() => onClose([obj.lat, obj.long])}
      >
        Directions
      </button>
    </div>
  );
};

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

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

type NestedNumberOrNullArray = (number | null)[][];
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
  const [merchantLocation, setmerchantLocation]: any =
    useState<NestedNumberOrNullArray>([[]]);
  const [userlocation, setUserLocation] = useState([0, 0]);
  const iconsList = [customIcon, customIcon2];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          alert("Error fetching user location: " + error.message);
          console.error("Error fetching user location:", error);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);
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

      {queryData.map((sub: any, ind: any) => {
        return sub.map((obj: any) => {
          return (
            <>
              <Marker position={[obj.lat, obj.long]} icon={iconsList[ind]}>
                <Popup>
                  <PlacesMarker
                    obj={obj}
                    merchantInclusion={merchantLocation}
                    //directions button function
                    onClose={(e) => {
                      console.log(merchantLocation.length);
                      merchantLocation.length && merchantLocation[0].length
                        ? setmerchantLocation((prev: any) => {
                            const exists = prev.some(
                              (location: any) => location[0] === e[0]
                            );
                            if (!exists) {
                              return [...prev, e];
                            }
                            return prev;
                          })
                        : setmerchantLocation([e]);
                      console.log("this is it ", merchantLocation);
                      // console.log(merchantLocation);
                    }}
                    //removal button function
                    onRemove={(e) => {
                      console.log("in the removal function");
                      setmerchantLocation((prev: any) => {
                        const newLocations = prev.filter(
                          (location: any) =>
                            location[0] !== e[0] && location[1] !== e[1]
                        );
                        return newLocations;
                      });
                      console.log(" we are exiting the removal function");
                    }}
                  />
                </Popup>
              </Marker>
            </>
          );
          // );
        });
      })}
      {userlocation[0] && (
        <Marker
          position={[userlocation[0], userlocation[1]]}
          // icon={customIcon2}
        >
          <Popup>Your location</Popup>
        </Marker>
      )}

      <Routing
        obj={[userlocation[0], userlocation[1]]}
        obj2={merchantLocation[0]}
        xp={merchantLocation}
      />
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
  onRemove: (e: any) => void;
  obj: any;
  merchantInclusion: any;
}> = ({ onClose, obj, onRemove, merchantInclusion }) => {
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
      {merchantInclusion.some((location: any) => location[0] === obj.lat) ? (
        <button
          className="border-[2px] bg-red-200 mx-2 border-black w-[40%]"
          onClick={() => onRemove([obj.lat, obj.long])}
        >
          Remove
        </button>
      ) : null}
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

import React, { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, LayerGroup } from "react-leaflet";
// import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";
// import "react-leaflet-markercluster/dist/styles.min.css";

const points = [
  { position: [19.3052, -99.1506], label: ['Ciudad Universitaria (UNAM)'] }, 
  { position: [19.3139, -99.1106], label: ['Xochimilco centro'] }, 
  { position: [19.2874, -99.1152], label: ['Museo Dolores Olmedo'] }, 
  { position: [19.3312, -99.2282], label: ['Six Flags México'] }, 
  { position: [19.2928, -99.1615], label: ['Tlalpan centro'] }, 
  { position: [19.3393, -99.1275], label: ['Coyoacán centro'] }, 
  { position: [19.3045, -99.1688], label: ['Hospital Ángeles Pedregal'] }, 
  { position: [19.2703, -99.1335], label: ['Deportivo Xochimilco'] }, 
  { position: [19.2908, -99.1510], label: ['Instituto Nacional de Pediatría'] }, 
  { position: [19.3456, -99.1628], label: ['Estadio Azteca'] }, 
];

function MapWithCluster() {
  const markers = useMemo(
    () =>
      points.map((pt, index) => (
        <Marker key={index} position={pt.position}>
          <Tooltip>{pt.label}</Tooltip>
        </Marker>
      )),
    [points]
  );
  return (
    <MapContainer center={points[0].position} zoom={12} style={{ height: "70vh", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />
      <LayerGroup chunkedLoading>{markers}</LayerGroup>
    </MapContainer>
  );
}

export default MapWithCluster;

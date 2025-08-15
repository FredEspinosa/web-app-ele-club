import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, LayerGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PropTypes from "prop-types";
import ChangeMapView from "../atoms/ChangeMapView";

const DEFAULT_CENTER = [19.4326, -99.1332];
function MapWithCluster({ data }) {
  const [mapCenter, setMapCenter] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter([latitude, longitude]);
        },
        (error) => {
          console.error("Error al obtener la ubicación:", error.message);
          setMapCenter(DEFAULT_CENTER);
        }
      );
    } else {
      setMapCenter(DEFAULT_CENTER);
    }
  }, []);

  const points = useMemo(() => {
    if (!data) return [];
    const allOffers = [...(data.evento || []), ...(data.servicio || [])];
    return allOffers
      .filter(
        (offer) =>
          Array.isArray(offer.location) && offer.location.length === 2 && (offer.location[0] !== 0 || offer.location[1] !== 0)
      )
      .map((offer) => ({
        position: offer.location,
        label: offer.offerTitle,
        id: offer.id,
      }));
  }, [data]);

  const markers = useMemo(
    () =>
      points.map((pt, index) => (
        <Marker key={index} position={pt.position}>
          <Tooltip>{pt.label}</Tooltip>
        </Marker>
      )),
    [points]
  );

  if (!mapCenter) {
    return <div>Obteniendo ubicación...</div>;
  }

  return (
    <MapContainer center={mapCenter} zoom={14} style={{ height: "70vh", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />
      <LayerGroup chunkedLoading>{markers}</LayerGroup>
      <ChangeMapView coords={mapCenter} zoom={14} />
    </MapContainer>
  );
}

MapWithCluster.propTypes = {
  data: PropTypes.object.isRequired,
};

export default MapWithCluster;

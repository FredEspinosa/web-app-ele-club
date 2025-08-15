import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, LayerGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PropTypes from "prop-types";
import ChangeMapView from "../atoms/ChangeMapView";
import { FilterButton, FilterControlsContainer, MapWrapper } from "@/styles/discover/mapWithCluster";
import { EventosMarkerIcon, ServiciosMarkerIcon } from "../atoms/markersIcons";

const DEFAULT_CENTER = [19.4326, -99.1332];
function MapWithCluster({ data }) {
  const [mapCenter, setMapCenter] = useState(null);
  const [activeFilter, setActiveFilter] = useState("todos");

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

  const handleFilterClick = (filterType) => {
    if (activeFilter === filterType) {
      setActiveFilter("todos");
    } else {
      setActiveFilter(filterType);
    }
  };

  const points = useMemo(() => {
    if (!data) return [];
    let offersToShow = [];
    if (activeFilter === "evento") {
      offersToShow = (data.evento || []).map((offer) => ({ ...offer, type: "evento" }));
    } else if (activeFilter === "servicio") {
      offersToShow = (data.servicio || []).map((offer) => ({ ...offer, type: "servicio" }));
    } else {
      const eventos = (data.evento || []).map((offer) => ({ ...offer, type: "evento" }));
      const servicios = (data.servicio || []).map((offer) => ({ ...offer, type: "servicio" }));
      offersToShow = [...eventos, ...servicios];
    }

    return offersToShow
      .filter((offer) => Array.isArray(offer.location) && (offer.location[0] !== 0 || offer.location[1] !== 0))
      .map((offer) => ({
        position: offer.location,
        label: offer.offerTitle,
        id: offer.id,
        type: offer.type,
      }));
  }, [data, activeFilter]);

  const markers = useMemo(
    () =>
      points.map((pt, index) => (
        <Marker key={index} position={pt.position} icon={pt.type === "evento" ? EventosMarkerIcon : ServiciosMarkerIcon}>
          <Tooltip>{pt.label}</Tooltip>
        </Marker>
      )),
    [points]
  );

  if (!mapCenter) {
    return <div>Obteniendo ubicación...</div>;
  }

  return (
    <MapWrapper>
      <MapContainer center={mapCenter} zoom={12} style={{ height: "100%", width: "100%" }} zoomControl={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />
        <LayerGroup chunkedLoading>{markers}</LayerGroup>
        <ChangeMapView coords={mapCenter} zoom={14} />
      </MapContainer>

      <FilterControlsContainer>
        <FilterButton isActive={activeFilter === "evento"} onClick={() => handleFilterClick("evento")}>
          Eventos
        </FilterButton>
        <FilterButton isActive={activeFilter === "servicio"} onClick={() => handleFilterClick("servicio")}>
          Servicios
        </FilterButton>
      </FilterControlsContainer>
    </MapWrapper>
  );
}

MapWithCluster.propTypes = {
  data: PropTypes.object.isRequired,
};

export default MapWithCluster;

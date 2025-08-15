import PropTypes from "prop-types";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function ChangeMapView({ coords, zoom = 15 }) {
  const map = useMap();

  useEffect(() => {
    if (coords) {
      map.flyTo(coords, zoom);
    }
  }, [coords, zoom, map]);

  return null;
}

ChangeMapView.propTypes = {
  coords: PropTypes.array.isRequired,
  zoom: PropTypes.number,
};

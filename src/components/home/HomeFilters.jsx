import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import FilterSection from "./FilterSection.jsx";
import Chip from "./Chip.jsx";
import "./Filter.css";
import { hostApi } from "@/services/api.js";

function HomeFilters({ handleClose, latitude, longitude }) {
  const FILTERS_INITIAL_VALUES = {
    genero: [],
    lookingFors: [],
    horoscopo: [],
    sexualidad: [],
    perceptions: [],
    pronouns: [],
    relationshipStatus: [],
    pets: [],
    roles: [],
    interests: [],
    smokes: [],
  };
  const IS_OPEN_FILTERS_VALUES = {
    horoscopo: false,
    genero: false,
    ubicacion: false,
    sexualidad: false,
    edad: false,
  };
  const tokenStorage = sessionStorage.getItem("AccessToken");
  const [filterData, setFilterData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(FILTERS_INITIAL_VALUES);
  const [openSections, setOpenSections] = useState(IS_OPEN_FILTERS_VALUES);

  useEffect(() => {
    const fetchAllFilterData = async () => {
      try {
        console.log("Iniciando carga de datos para filtros...");
        const endpoints = [`${hostApi}LookingFor`, `${hostApi}Gender`, `${hostApi}Zodiac`, `${hostApi}SexualIdentity`];
        const responses = await Promise.all(endpoints.map((url) => fetch(url)));
        for (const res of responses) {
          if (!res.ok) {
            throw new Error(`Error en la petición: ${res.status} ${res.statusText}`);
          }
        }

        const [lookingFor, genders, zodiacs, sexualIdentities] = await Promise.all(responses.map((res) => res.json()));
        setFilterData({
          lookingFor,
          genders,
          zodiacs,
          sexualIdentities,
        });
        console.log("Datos cargados exitosamente:", { lookingFor, genders, zodiacs, sexualIdentities });
      } catch (err) {
        console.error("Fallo al cargar los datos de los filtros:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllFilterData();
  }, []);

  const GENDERS_OPTIONS = filterData?.genders?.map((elem) => elem.name);
  const ZODIAC_OPTIONS = filterData?.zodiacs?.map((elem) => elem.name);
  const SEXUALIDENTITIES_OPTIONS = filterData?.sexualIdentities?.map((elem) => elem.name);

  if (isLoading) {
    return <div>Cargando filtros...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Función para abrir/cerrar secciones
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFilterChange = (category, value) => {
    setSelectedFilters((prevFilters) => {
      const currentSelection = prevFilters[category];
      let newSelection;
      if (currentSelection.includes(value)) {
        newSelection = currentSelection.filter((item) => item !== value);
      } else {
        newSelection = [...currentSelection, value];
      }
      return {
        ...prevFilters,
        [category]: newSelection,
      };
    });
  };

  const handleClearAll = () => {
    setSelectedFilters(FILTERS_INITIAL_VALUES);
    setOpenSections(IS_OPEN_FILTERS_VALUES);
    console.log("Filtros borrados");
  };

  const handleApplyFilters = async () => {
    console.log("Aplicando filtros con:", selectedFilters);
    setIsSubmitting(true);
    const requestBody = {
      latitude: latitude,
      longitude: longitude,
      distanceInMeters: 90000,
      page: 0,
      ...selectedFilters,
    };

    try {
      const response = await fetch(`${hostApi}Feed/Filter`, {
        method: "POST",
        headers: {
          "Content-Type": "text/json",
          accept: "*/*",
          Authorization: `Bearer ${tokenStorage}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const feedResult = await response.json();
      console.log("Respuesta del feed:", feedResult);
      // Aquí podrías guardar el resultado en otro estado, por ejemplo: setFeed(feedResult);
    } catch (err) {
      console.error("Error al aplicar los filtros:", err);
      // Podrías mostrar un mensaje de error al usuario
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="filter-container club_contenedor container-lg">
      <header className="filter-main-header">
        <button className="club_color_fuente_violeta_04 header-btn" onClick={handleClose}>
          Cancelar
        </button>
        <h1 className="filter-title">Filtrar</h1>
        <button className="club_color_fuente_violeta_04 header-btn" id="clear-all-btn" onClick={handleClearAll}>
          Borrar todo
        </button>
      </header>

      <main className="filter-body">
        <FilterSection title="Identidad de Género" count={selectedFilters.genero.length} isOpen={openSections.genero} onToggle={() => toggleSection("genero")}>
          <div className="chip-container">
            {GENDERS_OPTIONS.map((option) => (
              <Chip key={option} label={option} isSelected={selectedFilters.genero.includes(option)} onSelect={() => handleFilterChange("genero", option)} />
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Ubicación" count={0} isOpen={openSections.ubicacion} onToggle={() => toggleSection("ubicacion")}>
          <p>Opciones de Ubicación aquí...</p>
        </FilterSection>

        <FilterSection title="Horóscopo" count={selectedFilters.horoscopo.length} isOpen={openSections.horoscopo} onToggle={() => toggleSection("horoscopo")}>
          <div className="chip-container">
            {ZODIAC_OPTIONS.map((option) => (
              <Chip
                key={option}
                label={option}
                isSelected={selectedFilters.horoscopo.includes(option)}
                onSelect={() => handleFilterChange("horoscopo", option)}
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection
          title="Identidad Sexual"
          count={selectedFilters.sexualidad.length}
          isOpen={openSections.sexualidad}
          onToggle={() => toggleSection("sexualidad")}
        >
          <div className="chip-container">
            {SEXUALIDENTITIES_OPTIONS.map((option) => (
              <Chip
                key={option}
                label={option}
                isSelected={selectedFilters.sexualidad.includes(option)}
                onSelect={() => handleFilterChange("sexualidad", option)}
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Edad" count={0} isOpen={openSections.edad} onToggle={() => toggleSection("edad")}>
          <p>Un slider de rango para la edad iría aquí...</p>
        </FilterSection>
      </main>

      <div className="filter-footer club_cont_btns_doble club_bienvenida_btns club_bienvenida_btns">
        <div className="col-12">
          <button className="btn club_btn club_btn_full club_btn_full_general club_bg_oro" onClick={handleApplyFilters}>
            {isSubmitting ? "Aplicando..." : "Aplicar Filtros"}
          </button>
        </div>
      </div>
    </div>
  );
}

HomeFilters.propTypes = {
  handleClose: PropTypes.func.isRequired,
  latitude: PropTypes.string,
  longitude: PropTypes.string
};

export default HomeFilters;

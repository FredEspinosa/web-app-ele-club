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
    lookingFors: false,
    genero: false,
    horoscopo: false,
    sexualidad: false,
    perceptions: false,
    pronouns: false,
    relationshipStatus: false,
    pets: false,
    roles: false,
    interests: false,
    smokes: false,
    ubicacion: false,
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
        const endpoints = [
          `
          ${hostApi}LookingFor`,
          `${hostApi}Gender`,
          `${hostApi}Zodiac`,
          `${hostApi}SexualIdentity`,
          `${hostApi}Perception`,
          `${hostApi}Pronoun`,
          `${hostApi}RelationshipStatus`,
          `${hostApi}Pet`,
          `${hostApi}Role`,
          `${hostApi}Interest`,
          `${hostApi}Smoke`,
        ];
        const responses = await Promise.all(endpoints.map((url) => fetch(url)));
        for (const res of responses) {
          if (!res.ok) {
            throw new Error(`Error en la petición: ${res.status} ${res.statusText}`);
          }
        }

        const [lookingFor, genders, zodiacs, sexualIdentities, perceptions, pronouns, relationshipStatus, pets, roles, interests, smokes] = await Promise.all(
          responses.map((res) => res.json())
        );
        setFilterData({
          lookingFor,
          genders,
          zodiacs,
          sexualIdentities,
          perceptions,
          pronouns,
          relationshipStatus,
          pets,
          roles,
          interests,
          smokes,
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
  const LOOKINGFOR_OPTIONS = filterData?.lookingFor?.map((elem) => elem.name);
  const PERCEPTIONS_OPTIONS = filterData?.perceptions?.map((elem) => elem.name);
  const PRONOUNS_OPTIONS = filterData?.pronouns?.map((elem) => elem.name);
  const RELATIONSHIPSTATUS_OPTIONS = filterData?.relationshipStatus?.map((elem) => elem.name);
  const PETS_OPTIONS = filterData?.pets?.map((elem) => elem.name);
  const ROLES_OPTIONS = filterData?.roles?.map((elem) => elem.name);
  const INTERESTS_OPTIONS = filterData?.interests?.map((elem) => elem.name);
  const SMOKES_OPTIONS = filterData?.smokes?.map((elem) => elem.name);

  if (isLoading) {
    return <div>Cargando filtros...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const FILTER_SECTION_CONFIG = [
    {
      id: "genero",
      title: "Genero",
      options: GENDERS_OPTIONS,
    },
    {
      id: "ubicacion",
      title: "Ubicación",
      options: [],
    },
    {
      id: "horoscopo",
      title: "Horóscopo",
      options: ZODIAC_OPTIONS,
    },
    {
      id: "sexualidad",
      title: "Identidad Sexual",
      options: SEXUALIDENTITIES_OPTIONS,
    },
    {
      id: "edad",
      title: "Edad",
      options: [],
    },
    {
      id: "lookingFors",
      title: "En busca de",
      options: LOOKINGFOR_OPTIONS,
    },
    {
      id: "perceptions",
      title: "Se percibe como",
      options: PERCEPTIONS_OPTIONS,
    },
    {
      id: "pronouns",
      title: "Pronombre",
      options: PRONOUNS_OPTIONS,
    },
    {
      id: "relationshipStatus",
      title: "Estatus",
      options: RELATIONSHIPSTATUS_OPTIONS,
    },
    {
      id: "pets",
      title: "Mascotas",
      options: PETS_OPTIONS,
    },
    {
      id: "roles",
      title: "Roles",
      options: ROLES_OPTIONS,
    },
    {
      id: "interests",
      title: "Intereses",
      options: INTERESTS_OPTIONS,
    },
    {
      id: "smokes",
      title: "Que fume",
      options: SMOKES_OPTIONS,
    },
  ];

  const toggleSection = (sectionId) => {
    setOpenSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const handleFilterChange = (sectionId, option) => {
    setSelectedFilters((prev) => {
      const currentSelection = prev[sectionId];
      const newSelection = currentSelection.includes(option) ? currentSelection.filter((item) => item !== option) : [...currentSelection, option];
      return { ...prev, [sectionId]: newSelection };
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
        {FILTER_SECTION_CONFIG.map(({ id, title, options }) => (
          <FilterSection key={id} title={title} count={selectedFilters[id]?.length || 0} isOpen={openSections[id]} onToggle={() => toggleSection(id)}>
            <div className="chip-container">
              {options.map((option) => (
                <Chip key={option} label={option} isSelected={selectedFilters[id]?.includes(option)} onSelect={() => handleFilterChange(id, option)} />
              ))}
            </div>
          </FilterSection>
        ))}
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
  latitude: PropTypes.number,
  longitude: PropTypes.number,
};

export default HomeFilters;

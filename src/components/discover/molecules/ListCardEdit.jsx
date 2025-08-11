import { BackgroundEditList, StyledDetailsDirectioncontainer, StyledDetailsEventContainer } from '@/styles/discover/containers';
import {
    StyledDetailsDistance,
    StyledDetailTitle,
} from '@/styles/discover/texts';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { DiscoverInfo } from '../atoms';
import { FaRegTrashAlt } from 'react-icons/fa';
import { EditIcon } from '@/assets/icons';
import { FaCheck } from 'react-icons/fa6';
import { deleteOfertId } from '@/services/api';
import { useState } from 'react';

// Diccionario para traducir estatus
const statusStyles = {
    ACCEPTED: {
        label: "Aceptado",
        background: "#ECFAF8",
        color: "#007D00",
    },
    REFUSED: {
        label: "Rechazado",
        background: "#FFF7E6", // rojo
        color: "#BC8D40",
    },
    FINALIZED: {
        label: "Finalizado",
        background: "#EBF3FE", // azul
        color: "#3782F3",
        icon: <div style={{width:'15px',paddingRight:'4px'}}><FaCheck /></div>
    }
};

const StyleStatusOffert = styled.p`
  text-transform: capitalize;
  width: 79px;
  height: 22px;
  font-size: 14px;
  opacity: 1;
  gap: 6px;
  border-radius: 16px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ bgColor }) => bgColor || "#ccc"};
  color: ${({ color }) => color || "#ccc"};
  font-weight: 400;
  svg {
    margin-left: 4px;
  }
`;

const StyleContentButtons = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 20%;
`;


// Función para formatear fecha
const formatDate = (dateString) => {
    if (!dateString) return "Sin fecha";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-MX", {
        // year: "numeric",
        month: "long",
        day: "numeric",
    });
};

// Función para formatear hora
const formatTime = (dateString) => {
    if (!dateString) return "Sin hora";
    const date = new Date(dateString);
    return date.toLocaleTimeString("es-MX", {
        hour: "2-digit",
        minute: "2-digit",
    });
};

export default function ListCardEdit({ data, activeId }) {
    console.log("data list", data);
    
    const navigate = useNavigate();
    const [offerList, setOfferList] = useState(data);

    if (!data || data.length === 0) {
        return <div>No hay elementos para mostrar</div>;
    }

    // Parseamos formDataJson (se toma solo del primer elemento por ahora)
    const formData = JSON.parse(data[0].formDataJson);

    const mappedFormData = {
        EventTitle: formData.ServiceTitle,
        EventCategory: formData.ServiceCategory,
        EventAbout: formData.ServiceAbout,
        EventIncludes: formData.ServiceIncludes,
        EventPrice: formData.ServicePrice,
        EventImage: formData.ServiceImage,
        EventDate: formData.ServiceDate || "",
        EventTimeStart: formData.ServiceSchedule || "",
        EventTimeEnd: "",
        EventLocationName: formData.ServiceLocationName,
        EventCompany: formData.ServiceCompany,
        EventPhoneNumber: formData.ServicePhoneNumber,
        EventWhatsappNumber: formData.ServiceWhatsappNumber,
        EventEmail: formData.ServiceEmail,
        EventWebSite: formData.ServiceWebSite,
        EventInstagram: formData.ServiceInstagram,
        EventFacebook: formData.ServiceFacebook,
        mapLocation: formData.mapLocation,
    };

    const handleEdit = () => {
        navigate(`/descubre/contribuir/${activeId}`, { state: { formData: mappedFormData } });
    };

    const deleteOffert = async (id) => {
        try {
            await deleteOfertId(id);
            // Filtrar la lista para quitar la oferta borrada
            setOfferList(prev => prev.filter(offer => offer.id !== id));
            console.log(`Oferta ${id} eliminada con éxito`);
        } catch (err) {
            console.error("Error borrando la oferta:", err);
        }
    };

    // const deleteOffert = async (id) => {
    //     console.log("Clic en borrar", id);
    //     const idOfert = id
    //     try {
    //         const res = await deleteOfertId(idOfert); // ahora sí usa el id del elemento clickeado
    //         console.log("Borrado con éxito", res);
    //         // Aquí podrías actualizar el estado para removerlo del listado
    //     } catch (err) {
    //         console.error("Error borrando", err);
    //     }
    // };

    return (
        <>
            {data.map((item, index) => {
                const formattedDate = formatDate(item.creationDate);
                const formattedTime = formatTime(item.creationDate);

                const statusInfo = statusStyles[item.status] || { label: "Sin estatus", background: "#999", icon: null };
                
                return (
                    <BackgroundEditList key={item.id || index}>
                        <StyledDetailsDirectioncontainer>
                            <StyledDetailTitle $size={16}>
                                {item.title || "Sin nombre"}
                            </StyledDetailTitle>
                            <StyleStatusOffert bgColor={statusInfo.background} color={statusInfo.color}>
                                {statusInfo.icon}
                                {statusInfo.label}
                            </StyleStatusOffert>
                        </StyledDetailsDirectioncontainer>

                        <StyledDetailsEventContainer $width="fit-content">
                            <DiscoverInfo icon="location" colorFill="var(--color-neutral-gris-01)" color="var(--color-neutral-gris-01)">
                                {item.LocationName || "Sin ubicación"}
                            </DiscoverInfo>
                            <DiscoverInfo icon="calendar" colorFill="var(--color-neutral-gris-01)" color="var(--color-neutral-gris-01)">
                                {formattedDate}
                            </DiscoverInfo>
                            <DiscoverInfo icon="clock" colorFill="var(--color-neutral-gris-01)" color="var(--color-neutral-gris-01)">
                                {formattedTime}
                            </DiscoverInfo>
                        </StyledDetailsEventContainer>

                        <StyledDetailsDirectioncontainer>
                            <StyledDetailsDistance>
                                <DiscoverInfo icon="user" colorFill="var(--color-neutral-gris-01)" color="var(--color-neutral-gris-01)">
                                    {item.reviews?.length || 0} reseñas
                                </DiscoverInfo>
                            </StyledDetailsDistance>
                            <StyleContentButtons>
                                <div onClick={handleEdit}>
                                    <EditIcon size={20} />
                                </div>
                                <FaRegTrashAlt 
                                    size={20} 
                                    className='club_color_fuente_violeta_08' 
                                    onClick={() => deleteOffert(item.id)}
                                />
                            </StyleContentButtons>
                        </StyledDetailsDirectioncontainer>
                    </BackgroundEditList>
                );
            })}
        </>
    );
}

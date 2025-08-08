import { BackgroundEditList, StyledDetailsDirectioncontainer, StyledDetailsEventContainer } from '@/styles/discover/containers';
import {
    StyledDetailsDistance,
    StyledDetailTitle,
} from '@/styles/discover/texts';
import React from 'react';
import { GlobalReview } from '../molecules';
import { DiscoverInfo, ReviewCard } from '../atoms';
import { FaRegTrashAlt } from 'react-icons/fa';
import { EditIcon } from '@/assets/icons';

export default function ListCardEdit({ data }) {
    console.log("data list", data);

    if (!data || data.length === 0) {
        return <div>No hay elementos para mostrar</div>;
    }

    // Si data.creationDate existe, parseamos y formateamos
    const creationDateObj = data.creationDate ? new Date(data.creationDate) : null;

    const formattedDate = creationDateObj
        ? creationDateObj.toLocaleDateString("es-MX", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "Sin fecha";

    const formattedTime = creationDateObj
        ? creationDateObj.toLocaleTimeString("es-MX", {
            hour: "2-digit",
            minute: "2-digit",
        })
        : "Sin hora";

    return (
        <>
            {data.map((item, index) => (
                <BackgroundEditList key={item.id || index}>
                    <StyledDetailsDirectioncontainer>
                        <StyledDetailTitle $size={16}>
                            {item.title || "Sin nombre"}
                        </StyledDetailTitle>
                        <div>
                            {item.status || "Sin estatus"}
                        </div>
                    </StyledDetailsDirectioncontainer>

                    <StyledDetailsEventContainer $width="fit-content">
                        <DiscoverInfo icon="location">
                            {item.LocationName || "Sin ubicación"}
                        </DiscoverInfo>
                        <DiscoverInfo icon="calendar">
                            {formattedDate || "Sin fecha"}
                        </DiscoverInfo>
                        {/* {item.EventTimeStart && ( */}
                        <DiscoverInfo icon="clock">
                            {formattedTime}
                        </DiscoverInfo>
                        {/* )} */}
                    </StyledDetailsEventContainer>

                    <StyledDetailsDirectioncontainer>
                        <StyledDetailsDistance>
                            <DiscoverInfo icon="user">
                                {item.reviews?.length || 0} reseñas
                            </DiscoverInfo>
                        </StyledDetailsDistance>
                        <div>
                            <EditIcon />
                            <FaRegTrashAlt />
                        </div>
                    </StyledDetailsDirectioncontainer>
                </BackgroundEditList>
            ))}
        </>
    );
}


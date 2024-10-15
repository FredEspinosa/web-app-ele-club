// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { TopBarClub } from "../components/top_bar/topBarClub";
import { ContenidoHome } from "../components/home/contenidoHome";
import NavBar from "../components/nav_bar/navBar";

const HomePage = () => {
    return (
        <div>
            <TopBarClub />
            <ContenidoHome>
            </ContenidoHome>
            <NavBar />
        </div>
    )
}

export default HomePage;
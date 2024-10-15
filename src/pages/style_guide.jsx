// eslint-disable-next-line no-unused-vars
import React from 'react'

// Importación de iconos
import { AiFillCamera } from "react-icons/ai";
import { BsImage } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import { FaCompass } from "react-icons/fa";
import { MdWindow } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { IoHeart, IoHeartOutline, IoSearch } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import { FaMinus } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { IoInformationCircle } from "react-icons/io5";
import { PiCheckCircleFill } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { HiEyeOff } from "react-icons/hi";
import { IoMdEye } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import { LuArrowUpDown } from "react-icons/lu";
import { IoCard } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { PiWarningCircleFill } from "react-icons/pi";
import { RiSendPlaneFill } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoChatbubble } from "react-icons/io5";
import { IoSearchCircle } from "react-icons/io5";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoBagSharp } from "react-icons/io5";
// Iconos de Navegacion
import { FaArrowDown } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowUp} from "react-icons/fa6";
import { TopBarClub } from '../components/top_bar/topBarClub';
import { IoMenu } from "react-icons/io5";
import { IoHeartCircleOutline } from "react-icons/io5"
import NavBar from '../components/nav_bar/navBar';



const StyleGuide = () => {
  return (
    <div>
        <div className='club_contenedor container-lg'>
            <h1>Guía de estilos Web, enfocada a FirstMobile</h1>
            <br /><span> <b>No hay diseño responsivo para que se vea en modo escritorio</b></span>

            <br />
            <br />
            <div>
                <h3>Colores</h3>
                <div className='d-flex flex-wrap'>
                    <div className='d-flex col-12'>
                        <div className='club_bg_violeta_01' style={{width:'100%', height:'50px'}}></div>
                        <div className='club_bg_violeta_02' style={{width:'100%', height:'50px'}}></div>
                        <div className='club_bg_violeta_03' style={{width:'100%', height:'50px'}}></div>
                        <div className='club_bg_violeta_04' style={{width:'100%', height:'50px'}}></div>
                        <div className='club_bg_violeta_05' style={{width:'100%', height:'50px'}}></div>
                        <div className='club_bg_violeta_06' style={{width:'100%', height:'50px'}}></div>
                        <div className='club_bg_violeta_07' style={{width:'100%', height:'50px'}}></div>
                        <div className='club_bg_violeta_08' style={{width:'100%', height:'50px'}}></div>
                        <div className='club_bg_violeta_09' style={{width:'100%', height:'50px'}}></div>
                        <div className='club_bg_violeta_10' style={{width:'100%', height:'50px'}}></div>
                        <div className='club_bg_violeta_11' style={{width:'100%', height:'50px'}}></div>
                        <div className='club_bg_violeta_12' style={{width:'100%', height:'50px'}}></div>
                        <div className='club_bg_violeta_13' style={{width:'100%', height:'50px'}}></div>
                    </div>
                </div>
                <br />
                <div className='d-flex flex-wrap'>
                    <div className='d-flex col-12'>
                        <div className='club_bg_menta_01' style={{width:'100%', height:'50px'}}></div>
                        <div className='club_bg_menta_02' style={{width:'100%', height:'50px'}}></div>
                        <div className='club_bg_menta_03' style={{width:'100%', height:'50px'}}></div>
                        <div className='club_bg_menta_04' style={{width:'100%', height:'50px'}}></div>
                        <div className='club_bg_menta_05' style={{width:'100%', height:'50px'}}></div>
                        <div className='club_bg_menta_06' style={{width:'100%', height:'50px'}}></div>
                        <div className='club_bg_menta_07' style={{width:'100%', height:'50px'}}></div>
                        <div className='club_bg_menta_08' style={{width:'100%', height:'50px'}}></div>
                        <div className='club_bg_menta_09' style={{width:'100%', height:'50px'}}></div>
                        <div className='club_bg_menta_10' style={{width:'100%', height:'50px'}}></div>
                        <div className='club_bg_menta_11' style={{width:'100%', height:'50px'}}></div>
                        <div className='club_bg_menta_12' style={{width:'100%', height:'50px'}}></div>
                        <div className='club_bg_menta_13' style={{width:'100%', height:'50px'}}></div>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <div>
                <h3>Botones</h3>
                <div>
                    <button className='btn club_btn club_bg_violeta_08'>
                        <IoClose size={24} />
                        <label htmlFor="">Label</label>
                        <IoClose size={24} />
                    </button>
                </div>
                <br />
                <div>
                    <button className='btn club_btn club_bg_menta_07'>
                        <IoClose size={24} />
                        <label htmlFor="">Label</label>
                        <IoClose size={24} />
                    </button>
                </div>
                <br />
                <div>
                    <button className='btn club_btn club_btn_borde_gris'>
                        <IoClose size={24} />
                        <label htmlFor="">Label</label>
                        <IoClose size={24} />
                    </button>
                </div>
                <br />
                <div>
                    <button className='btn club_btn club_btn_borde_violeta'>
                        <IoClose size={24} />
                        <label htmlFor="">Label</label>
                        <IoClose size={24} />
                    </button>
                </div>
                <br />
                <div>
                    <button className='btn club_btn club_btn_no_borde_violeta'>
                        <IoClose size={24} />
                        <label htmlFor="">Label</label>
                        <IoClose size={24} />
                    </button>
                </div>
                <br />
                <div>
                    <button className='btn club_btn club_btn_no_borde_menta'>
                        <IoClose size={24} />
                        <label htmlFor="">Label</label>
                        <IoClose size={24} />
                    </button>
                </div>
                <br />
                <div>
                    <button className='btn club_btn club_btn_no_borde_gris'>
                        <IoClose size={24} />
                        <label htmlFor="">Label</label>
                        <IoClose size={24} />
                    </button>
                </div>
                <br />
                <p>Botones de control</p>
                <div>
                    <button className='btn club_btn_control_back club_color_fuente_blanco'>
                        <IoIosArrowBack size={17} />
                        <label htmlFor="">Label</label>
                    </button>
                </div>
                <div>
                    <button className='btn club_btn_control_back club_color_fuente_gris_03'>
                        <IoIosArrowBack size={17} />
                        <label htmlFor="">Label</label>
                    </button>
                </div>
                <br />
                <p>Barra de progreso</p>
                <div className='club_barra_progreso'>
                    <div className='club_progreso active'></div>
                    <div className='club_progreso active'></div>
                    <div className='club_progreso'></div>
                    <div className='club_progreso'></div>
                </div>
            </div>
            <br />
            <br />
            <div>
                <h3>Tipografia</h3>
                <div>
                    <p>En espera ...</p>
                </div>
            </div>
            <br />
            <br />
            <div>
                <h3>Inputs</h3>
                <div>
                    <div className='club_input'>
                        <label className='club_input_label' htmlFor="">Label</label>
                        <div className='club_input_contenedor'>
                            <IoIosArrowForward className='club_input_icon_izq' size={24} />
                            <input className='club_input_campo' type="text" placeholder='Escribe aquí...' />
                            <IoIosArrowForward className='club_input_icon_der' size={24} />
                        </div>
                        <span className='club_input_span'>Ayuda</span>
                    </div>
                </div>
                <br />
                <div>
                    <div className='club_input'>
                        <label className='club_input_label' htmlFor="">Label</label>
                        <div className='club_input_contenedor club_borde_menta'>
                            <IoIosArrowForward className='club_input_icon_izq' size={24} />
                            <input className='club_input_campo' type="text" placeholder='Texto' />
                            <IoIosArrowForward className='club_input_icon_der' size={24} />
                        </div>
                        <span className='club_input_span'>Ayuda</span>
                    </div>
                </div>
                <br />
                <div>
                    <div className='club_input'>
                        <label className='club_input_label' htmlFor="">Label</label>
                        <div className='club_input_contenedor club_borde_rojo'>
                            <IoIosArrowForward className='club_input_icon_izq' size={24} />
                            <input className='club_input_campo' type="text" placeholder='Texto' />
                            <IoIosArrowForward className='club_input_icon_der' size={24} />
                        </div>
                        <span className='club_input_span'>Ayuda</span>
                    </div>
                </div>
                <br />
                <div>
                    <div className='club_input'>
                        <label className='club_input_label club_color_fuente_gris_03' htmlFor="">Label</label>
                        <div className='club_input_contenedor club_borde_gris'>
                            <IoIosArrowForward className='club_input_icon_izq' size={24} />
                            <input className='club_input_campo' type="text" placeholder='Texto' />
                            <IoIosArrowForward className='club_input_icon_der' size={24} />
                        </div>
                        <span className='club_input_span'>Ayuda</span>
                    </div>
                </div>
                <br />
                <span>Input con etiquta en rojo</span>
                <div>
                    <div className='club_input'>
                        <label className='club_input_label club_color_fuente_rojo' htmlFor="">Label</label>
                        <div className='club_input_contenedor club_borde_rojo'>
                            <IoIosArrowForward className='club_input_icon_izq' size={24} />
                            <input className='club_input_campo' type="text" placeholder='Texto' />
                            <IoIosArrowForward className='club_input_icon_der' size={24} />
                        </div>
                        <span className='club_input_span'>Ayuda</span>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <div>
                <h3>Top app bars</h3>
                <TopBarClub />
            </div>
            <br />
            <br />
            <div>
                <h3>Icons</h3>
                <div className='d-flex flex-wrap'>
                    <div className='col-12 d-flex justify-content-between'>
                        <AiFillCamera />
                        <BsImage />
                        <HiMail />
                        <FaCompass />
                        <MdWindow />
                        <IoMdPerson />
                        <IoIosSettings />
                        <IoSearch />
                    </div>
                    <br />
                    <div className='col-12 d-flex justify-content-between'>
                        <IoIosArrowBack />
                        <IoIosArrowForward />
                        <IoIosArrowDown />
                        <IoIosArrowUp />
                        <IoClose />
                        <IoAdd /> **
                        <FaMinus />
                        <FaCheck />
                    </div>
                    <br />
                    <div className='col-12 d-flex justify-content-between'>
                        <IoInformationCircle />
                        <PiCheckCircleFill />
                        <FaRegStar />
                        <FaStar />
                        <HiEyeOff className='club-icono-eye-invisible' />
                        <IoMdEye />
                        <IoFilter />
                        <LuArrowUpDown />
                        </div>
                    <br />
                    <div className='col-12 d-flex justify-content-between'>
                        <IoCard />
                        <FaMapMarkerAlt />
                        <TiDelete />
                        <PiWarningCircleFill />
                        <RiSendPlaneFill />
                        <MdModeEdit />
                        <FaEdit />
                        <IoChatbubble />
                    </div>
                    <br />
                    <div className='col-12 d-flex justify-content-between'>
                        {/* < /> falta el doble tarjeta */}
                        <IoSearchCircle />
                        <HiMenuAlt2 />
                        <IoBagSharp />
                        <IoMenu />
                        <IoHeartCircleOutline />
                        <IoHeart />
                        <IoHeartOutline />
                    </div>
                    <br />
                    <p className='w-100'>Navegación</p>
                    <div className='col-12 d-flex justify-content-between'>
                        <FaArrowDown />
                        <FaArrowLeft />
                        <FaArrowRight />
                        <FaArrowUp />
                    </div>
                </div>
            </div>
            <br />
            <br />
            <div>
                <h3>cards</h3>
            </div>
            <br />
            <br />
            <div>
                <h3>Navegación</h3>
            </div>
        </div>
        <NavBar />
    </div>
  )
}

export default StyleGuide
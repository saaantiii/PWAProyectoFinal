/* eslint-disable react/jsx-no-target-blank */
import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Axios from 'axios';
import sweet from 'sweetalert'




export const Sidebar = () => {
    const onSubmit = (event) => {
        event.preventDefault();
        console.log("submission prevented");
    };
    useEffect(() => {
        const getData = async () => {
            Axios.get('http://localhost:3001/loggedin')
                .then(response => {
                    console.log(response.data.loggedIn);
                    if (response.data.loggedIn === undefined) {
                        sweet({
                            alert: true,
                            title: "Información",
                            text: "¡Por favor debe iniciar sesión!",
                            icon: 'info',
                            button: true,
                            timer: false,
                        }).then(()  => {
                            window.location = '/login'
                        });
                    }
                });
        }
        getData();
    }, []);
    const [username, setName] = useState("");
    const [surname, setSurname] = useState("");
    useEffect(() => {
        Axios.get("http://localhost:3001/loggedinusername").then((response) => {
            setName(response.data.user);
            setSurname(response.data.surname);
            console.log(response.data)
        });
    }, []);
    const logout = () => {
        Axios.get("http://localhost:3001/logout").then((response) => {
            console.log(response);
            sweet({
                alert: true,
                title: "Información",
                text: "¡Se ha Cerrado Sesión!",
                icon: 'info',
                button: true,
                timer: false,
            }).then(()  => {
                window.location = '/login'
            });
        })
    }
    return (
        <div onSubmit={onSubmit}>
            <div id="sidebar" className="bg-dark d-flex flex-column text-white active">
                {/* BOTON */}
                {/* <div onClick={showSidebar} className="toggle-btn btn text-white">
                    <span className='fs-2'>&#9776;</span>
                </div> */}
                {/* CABECERA */}
                <div>
                    <Link className="d-flex mt-2 justify-content-center" to="/index">
                        <img width="260" height="300" alt="CIBERDEFA-Logo" src={require('./images/escudo.png')} />
                    </Link>
                    <div className="fs-4 text-center text-white">Dirección de Ciberdefensa</div>
                    <hr />
                </div>
                {/* CUERPO DEL SIDEBAR */}
                <div className="list-unstyled row m-2 p-2 mb-auto">
                    <li><Link className="btn col-12 btn-outline-light text-lg-start mb-2" to="/index">Inicio</Link></li>
                    <li><Link className="btn col-12 btn-outline-light text-lg-start mb-2" to="/about">Acerca de Nosotros</Link></li>
                    <li><Link className="btn col-12 btn-outline-light text-lg-start mb-2" to="/contact">Contacto</Link></li>
                </div>
                {/* USUARIO */}
                <hr />
                <div className='margin'>
                    <Dropdown className="text-white text-decoration-none">
                        <Dropdown.Toggle variant="" className="text-white text-decoration-none">
                            <img alt="" width="32" height="32" className="rounded-circle me-2" src={require('./images/escudo.png')} />
                            <strong>{username} {surname}</strong>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu dropdown-menu-dark text-small shadow">
                            <Dropdown.Item href="/addlink">
                                Nuevo Portal
                            </Dropdown.Item>
                            <hr className="dropdown-divider" />
                            <Dropdown.Item onClick={logout}>
                                Cerrar Sesión
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <hr />
                {/* FOOTER */}
                <div className="text-white mt-3">
                    <p className="text-center"><small></small>© 2021 Todos los derechos reservados.</p>
                    <ul className="list-unstyled d-flex justify-content-evenly">
                        <li><a href="https://www.facebook.com/santiagoyop" target="_blank"><i className="text-white bi-facebook"></i></a></li>
                        <li><a href="https://twitter.com/SSarchetti" target="_blank"><i className="text-white bi-twitter"></i></a></li>
                        <li><a href="https://www.instagram.com/santiagosarchetti/" target="_blank"><i className="text-white bi-instagram"></i></a></li>
                        <li><a href="https://www.linkedin.com/in/santiago-nahuel-sarchetti-bb782017b/" target="_blank"><i className="text-white bi-linkedin"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar

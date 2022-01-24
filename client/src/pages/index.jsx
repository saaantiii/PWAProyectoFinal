/* eslint-disable react/jsx-no-target-blank */
import { useState, useEffect } from "react";
import Axios from "axios";
import sweet from "sweetalert";

function Index() {

    const [panels, setPanels] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/getpanels").then((response) => {
            setPanels(response.data);
            console.log(response.data);
        });
    }, []);

    const deletePanel = (idlink) => {
        Axios.delete(`http://localhost:3001/delete/${idlink}`).then((response) => {
            console.log(response);
            sweet({
                alert: response.data.alert,
                title: response.data.title,
                text: response.data.text,
                icon: response.data.icon,
                button: response.data.showConfirmButton,
                timer: response.data.timer
            }).then(()  => {
                window.location = response.data.ruta
            });
        });
    };

    return (
        <div id="content" className="p-5 text-white">
            <h1 className="text-center">Portales a tus Sitios Web</h1>
            <div className="container">
                <div className="row row-cols-lg-4 wrapper">
                    {panels.map((panel, key) => {
                        return (
                            <div key={key} className="card-body text-center border border-white m-2 rounded">
                                <h2 className="card-title">{panel.sitename}</h2>
                                <p className="card-text">{panel.description}</p>
                                <a href={panel.URL} target="_blank" className="btn btn-primary">Ir al sitio</a>
                                <button className="btn btn-secondary bi-trash" width="16" height="16" onClick={() => { deletePanel(panel.idlink) }}></button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Index;
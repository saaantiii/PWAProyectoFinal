import React, {useState} from 'react'
import Axios from 'axios'
import sweet from 'sweetalert'

export const Addlink = () => {
    const onSubmit = (event) => {
        event.preventDefault();
        console.log("submission prevented");
    };

    const [sitename, setSite] = useState("");
    const [url, setURL] = useState("");
    const [description, setDescription] = useState("");


    const addPanel = () => {
        (Axios.post('http://localhost:3001/panel', {
            sitename: sitename,
            url: url,
            description: description
        })).then(response => {
            console.log(response.data);
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
        })
    };

    return (
        <div>
            <div className="p-5 text-white">
            <div>
                <h4 className="mb-3 text-center">Agregar Link de Acceso</h4>
            </div>
            <form onSubmit={onSubmit} className="row g-3">
                <div className="col-12">
                    <label className="form-label">Nombre del Sitio*</label>
                    <input type="text" 
                    onChange={(e) => {
                        setSite(e.target.value);
                    }}className="form-control" id="sitename" required />
                </div>
                <div className="col-12">
                    <label className="form-label">URL*</label>
                    <input type="url" 
                    onChange={(e) => {
                        setURL(e.target.value);
                    }}className="form-control" id="url" placeholder="Incluir Protocolo (http:// o https://)" required />
                </div>
                <div className="col-12">
                    <label className="form-label">Descripción</label>
                    <div className="form-group col-12">
                        <span className="col-md-1 col-md-offset-2 text-center"><i className="fa fa-pencil-square-o"></i></span>
                        <div className="col-12">
                            <input 
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }} className="form-control text-black textarea" id="description" name="description" placeholder="Escriba aquí la Descripción" rows="7" ></input>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <input onClick={addPanel} className="w-100 btn btn-outline-light btn-lg" type="submit" value={"Agregar"} />
                </div>
            </form>
        </div>
        </div>
    )
}

export default Addlink
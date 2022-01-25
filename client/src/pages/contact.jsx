import React, {useState} from 'react';
import Axios from 'axios';
import sweet from 'sweetalert';

export const Contact = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState ("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState ("");
    const [text, setText] = useState("");
    const send = () => {
        Axios.post('/send', {
            name: name,
            surname: surname,
            email: email,
            telefone: telefone,
            text: text
        }).then((response) => {
            console.log(response);
            sweet({
                alert: response.data.alert,
                title: response.data.title,
                text: response.data.text,
                icon: response.data.icon,
                button: response.data.button,
                timer: response.data.timer,
            }).then(()  => {
                window.location = response.data.ruta
            });
        })
    }
    const onSubmit = (event) => {
        event.preventDefault();
        console.log("submission prevented");
    };
    return (
        <div id="content" className="p-5 text-white">
            <div>
                <h4 className="mb-3 text-center">Formulario de Contacto</h4>
            </div>
            <form onSubmit={onSubmit} className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Nombre*</label>
                    <input type="text" onChange={(e) => {
                        setName(e.target.value);
                    }} className="form-control" id="firstName" required />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Apellido*</label>
                    <input type="text" onChange={(e) => {
                        setSurname(e.target.value);
                    }} className="form-control" id="surname" required />
                </div>
                <div className="col-12">
                    <label className="form-label">Email*</label>
                    <input type="email" onChange={(e) => {
                        setEmail(e.target.value);
                    }} className="form-control" id="email" placeholder="email@ejemplo.com" required />
                </div>
                <div className="col-12">
                    <label className="form-label">Telefono de Contacto</label>
                    <input type="text" onChange={(e) => {
                        setTelefone(e.target.value);
                    }} className="form-control" id="telefono" placeholder="+54 9 11 12345678" required="" />
                </div>
                <div className="col-12">
                    <label className="form-label">Texto</label>
                    <div className="form-group col-12">
                        <span className="col-md-1 col-md-offset-2 text-center"><i className="fa fa-pencil-square-o"></i></span>
                        <div className="col-12">
                            <textarea onChange={(e) => {
                                setText(e.target.value);
                            }} className="form-control text-black textarea" id="message" name="message" placeholder="Escriba aquí el texto adjuntado." rows="7" ></textarea>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <button className="w-100 btn btn-outline-light btn-lg" type="submit" onClick={send}>Enviar</button>
                </div>
            </form>
        </div>
            
        
    )
}
export default Contact
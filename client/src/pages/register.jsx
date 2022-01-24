import React, {useState} from 'react'
import Axios from 'axios'
import sweet from 'sweetalert'


const Register = () => {
    const onSubmit = (event) => {
        event.preventDefault();
        console.log("submission prevented");
    };
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    let addUser = () => {
        Axios.post('http://localhost:3001/register', {
            name: name,
            surname: surname,
            email: email,
            username: username,
            password: password
        },
        ).then(response => {
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
        <main className="login2">
        <div className="login-form text-white login">
            <form onSubmit={onSubmit}>
                <h3 className="fw-light">
                    Pagina de Registro
                    <i className="bi bi-person-check"></i>
                </h3>
                <div>
                    <label>Nombre</label>
                    <input type="text" 
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    className="form-control" name="name" id="name" placeholder="" required />
                </div>
                <div>
                    <label>Apellido</label>
                    <input type="text" 
                    onChange={(e) => {
                        setSurname(e.target.value);
                    }}
                    className="form-control" name="surname" id="surname" placeholder="" required />
                </div>
                <div>
                    <label>email</label>
                    <input type="text" 
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    className="form-control" name="email" id="email" placeholder="email@email.com" required />
                </div>
                <div>
                    <label>Usuario</label>
                    <input type="text" 
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                    className="form-control" name="user" id="user" placeholder="" required />
                </div>
                <div>
                    <label>Contraseña</label>
                    <input type="password" 
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    className="form-control" name="password" id="email" placeholder="**************" required />
                </div>
                <div id="error"></div>
                <div>
                    <input type="submit" onClick={addUser} className="btn btn-primary my-buttom mt-2" value={"Registrarse"} />
                </div>
                <div className="copyright text-white text-secondary">
                    © 2021 Copyright
                </div>
            </form>
        </div>
    </main>
    )
}

export default Register
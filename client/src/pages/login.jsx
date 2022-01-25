import React, {useState} from 'react'
import Axios from 'axios'
import sweet from 'sweetalert'
/* import ReactSession from 'react-client-session' */



export const Login = () => {
    const onSubmit = (event) => {
        event.preventDefault();
        console.log("submission prevented");
    };
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState ("");

    let loginUser = () => {
        Axios.post('/auth', {
            username: username,
            password: password
        })
        .then(response => {
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
    }

    

    return (
        <main className="login2">
        <div className="login-form text-white login">
            <form onSubmit={onSubmit}>
                <h3 className="fw-light">
                    Pagina de LOGIN
                    <i className="bi bi-person-check"></i>
                </h3>
                <div>
                    <label>Usuario</label>
                    <input type="text" 
                    onChange={(e) => {
                        setUsername(e.target.value);
                        console.log(e.target.value)
                    }}
                    className="form-control" name="username" id="username" placeholder="" />
                </div>
                <div>
                    <label>Contraseña</label>
                    <input type="password" 
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    className="form-control" name="password" id="password" placeholder="**************" />
                </div>
                <div id="recuerdame">
                    <input className="form-check-input" type="checkbox" name="recuerdame" id="recuerdame" />
                    <label className="form-check-label">Recuerdame</label>
                </div>
                <div>
                    <input type="submit" onClick={loginUser} className="btn btn-primary my-buttom" value={"Ingresar"} />
                    <a className="btn btn-primary my-buttom" href='/register'>Registrarse</a>
                </div>
                <div className="copyright text-white text-secondary">
                    © 2021 Copyright
                </div>
            </form>
        </div>
    </main>
    )
}

export default Login
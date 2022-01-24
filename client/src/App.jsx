import React, {useState} from 'react'
import Sidebar from './common/sidebar'
/* import '../node_modules/bootstrap/dist/css/bootstrap.min.css' */
import {Outlet} from 'react-router-dom'
import './common/style.css';



export const App = () => {
    const [sidebar, setSidebar] = useState (true)
    const showSidebar = () => setSidebar(!sidebar)
    return (
        <div>
            <div id='superboton' className={sidebar ? 'text-white btn boton2' : 'boton1 btn text-white'}>
                <span onClick={showSidebar} className='fs-2'>&#9776;</span>
            </div>
            <div id='sidebar' className={sidebar ? 'active' : ''}>
                <Sidebar />
            </div>
            <div id='content' className={sidebar ? 'active2' : ''}>
                <Outlet />
            </div>
        </div>
    )
}

export default App
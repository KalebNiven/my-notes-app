
import { Navbar as NavbarComponent } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

function Navbar() {

    const navigate = useNavigate()

    const handleLogout = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/signin');
    }

    return (
        <NavbarComponent fluid rounded>

            <NavbarComponent.Toggle />
            <NavbarComponent.Collapse>
                My Notes App
            </NavbarComponent.Collapse>

            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>

        </NavbarComponent>
    )
}

export default Navbar
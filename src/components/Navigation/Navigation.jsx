import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
    return (
        <nav>
            <div className="nav-brand">
                <p>FitPilot AI</p>
                <span>Wellness dashboard</span>
            </div>

            <ul className="nav-links">
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/profile">Profile</NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to="/calculator">Calculator</NavLink>
                </li>
                <li>
                    <NavLink to="/timer">Timer</NavLink>
                </li>
                <li>
                    <NavLink to="/meals">Meals</NavLink>
                </li>
                <li>
                    <NavLink to="/analyzer">Analyzer</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;

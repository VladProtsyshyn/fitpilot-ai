import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/calculator">Calculator</Link>
                </li>
                <li>
                    <Link to="/timer">Timer</Link>
                </li>
                <li>
                    <Link to="/meals">Meals</Link>
                </li>
                <li>
                    <Link to="/analyzer">Analyzer</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;

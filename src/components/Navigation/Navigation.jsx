import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav>
            <div className="nav-brand">
                <p>FitPilot AI</p>
                <span>Wellness dashboard</span>
            </div>

            <button
                    type="button"
                    className="nav-toggle"
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMenuOpen}
                    onClick={() => setIsMenuOpen((prevState) => !prevState)}
                >
                    <span />
                    <span />
                    <span />
            </button>

            <ul className={`nav-links ${isMenuOpen ? 'is-open' : ''}`}>
                <li>
                    <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to="/calculator" onClick={() => setIsMenuOpen(false)}>Calculator</NavLink>
                </li>
                <li>
                    <NavLink to="/timer" onClick={() => setIsMenuOpen(false)}>Timer</NavLink>
                </li>
                <li>
                    <NavLink to="/meals" onClick={() => setIsMenuOpen(false)}>Meals</NavLink>
                </li>
                <li>
                    <NavLink to="/analyzer" onClick={() => setIsMenuOpen(false)}>Analyzer</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;

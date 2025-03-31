import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <nav className="navigation">
            <div className="nav-container">
                <div className="nav-left">
                    <NavLink to="/">
                        <img src="/travelly-logo.jpg" className="nav-logo" />
                    </NavLink>
                </div>

                <div className="right-nav">
                    {isLoaded && sessionUser && (
                        <NavLink to="/spots/new" className="create-spot-button">
                            Create a New Spot
                        </NavLink>
                    )}
                    {isLoaded && <ProfileButton user={sessionUser} />}
                </div>
            </div>
        </nav>
    );
}

export default Navigation;

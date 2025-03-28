import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './ProfileButton.css';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const toggleMenu = e => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = e => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = e => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
    };

    const ulClassName = 'profile-dropdown' + (showMenu ? '' : ' hidden');

    return (
        <div className="profile-button-container">
            <button onClick={toggleMenu} className="profile-button">
                <FaBars />
                <FaUserCircle />
            </button>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        <div className="list-div-element">
                            <li>{user.username}</li>
                        </div>
                        <div className="list-div-element">
                            <li>{user.email}</li>
                        </div>
                        <div className="list-div-element">
                            <li>
                                <Link to="/spots/current">Manage Spots</Link>
                            </li>
                        </div>
                        <div className="logout-button-container">
                            <button className="logout-button" onClick={logout}>
                                Log Out
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <OpenModalMenuItem
                            itemText="Log In"
                            onItemClick={closeMenu}
                            modalComponent={<LoginFormModal />}
                        />
                        <OpenModalMenuItem
                            itemText="Sign Up"
                            onItemClick={closeMenu}
                            modalComponent={<SignupFormModal />}
                        />
                    </>
                )}
            </ul>
        </div>
    );
}

export default ProfileButton;

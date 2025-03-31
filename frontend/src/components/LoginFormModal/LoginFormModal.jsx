import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginFormModal.css';

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const isLoginValid = credential.length >= 4 & password.length >= 6;

    const handleSubmit = e => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(async res => {
                const data = await res.json();
                if (data && data.message) {
                    setErrors({ credential: data.message});
                }
            });
    };

     const handleDemoLogin = e => {
         e.preventDefault();
         return dispatch(
             sessionActions.login({
                 credential: 'demo@user.io',
                 password: 'password',
             }),
         )
             .then(closeModal)
             .catch(async res => {
                 const data = await res.json();
                 if (data && data.errors) {
                     setErrors(data.errors);
                 }
             });
     };


    return (
        <div className="login-form-container">
            <h1>Log In</h1>
                    {errors.credential && (
                        <p className="error">{errors.credential}</p>
                    )}
            <form onSubmit={handleSubmit}>
                <label>
                    Username or Email
                    <input
                        type="text"
                        value={credential}
                        onChange={e => setCredential(e.target.value)}
                        required
                    />
                <label>
                    Password
                </label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" className="log-in-button" disabled={!isLoginValid}>Log In</button>
                <button type="button" onClick={handleDemoLogin} className="demo-link">
                    Demo User
                </button>
            </form>
        </div>
    );
}

export default LoginFormModal;

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import SpotsList from './components/SpotsList';
import SpotDetails from './components/SpotDetails';
import SpotForm from './components/SpotForm';
import * as sessionActions from './store/session';
import UpdateSpotForm from './components/SpotForm/UpdateSpotForm';
import ManageSpots from './components/ManageSpots/ManageSpots';

function Layout() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => {
            setIsLoaded(true);
        });
    }, [dispatch]);

    return (
        <>
            <Navigation isLoaded={isLoaded} />
            {isLoaded && <Outlet />}
        </>
    );
}

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <SpotsList />,
            },
            {
                path: '/spots/new',
                element: <SpotForm />
            },
            {
                path: '/spots/:spotId/edit',
                element: <UpdateSpotForm />
            },
            {
                path: '/spots/:spotId',
                element: <SpotDetails />
            },
            {
                path: '/spots/current',
                element: <ManageSpots />
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;

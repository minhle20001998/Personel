import Homepage from "../pages/Homepage/Homepage";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Daily from "../pages/Daily/Daily";
import { Navigate } from 'react-router-dom';
import MainLayouts from "../components/Layouts/MainLayouts";
import DailyDetail from "../pages/Daily/DailyDetail";
const routes = ({ isLogin }) => {
    return [
        {
            path: '/login',
            element: !isLogin ? <Login /> : <Navigate to="/" />
        },
        {
            path: '/signup',
            element: !isLogin ? <Signup /> : <Navigate to="/" />
        },
        {
            path: '/',
            element: isLogin ? <MainLayouts /> : <Navigate to="/login" />,
            children: [
                { path: '/', element: <Homepage /> },
                { path: '/daily', element: <Daily /> },
                { path: '/daily/:id', element: <DailyDetail /> },
                // {path: '/marketplace', element: <Marketplace /> }
            ]
        }
    ]
}

export default routes;
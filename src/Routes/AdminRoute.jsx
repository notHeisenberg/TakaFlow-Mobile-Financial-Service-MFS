import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";

const AdminRoute = ({ children }) => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="text-center h-screen flex justify-center items-center">
                <span className="loading loading-dots w-8 text-primary"></span>
                <span className="loading loading-dots w-12 text-secondary"></span>
                <span className="loading loading-dots w-16 text-accent"></span>
                <span className="loading loading-dots w-20 text-info"></span>
            </div>
        );
    }

    if (user && user.role === "admin") {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace />;
};

AdminRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminRoute;

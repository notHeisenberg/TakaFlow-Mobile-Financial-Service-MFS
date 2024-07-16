
import { Outlet, useLocation } from "react-router-dom";

const Root = () => {
    const location = useLocation()
    if (location.pathname !== '/') {
        document.title = `EasyTaka - ${location.pathname.replace('/', '')}`
    } else {
        document.title = `EasyTaka - Home`
    }

    return (
        <>
            <Outlet></Outlet>
        </>
    );
};

export default Root;
import {FC, useEffect} from 'react';
import {useNavigate} from "react-router";

interface IRedirectorProps {
    to: string;
}

const Redirector: FC<IRedirectorProps> = ({to}) => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(to);
    }, [])

    return (
        <div>

        </div>
    );
};

export default Redirector;
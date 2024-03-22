import { useNavigate } from "react-router-dom";
import { Button } from '../components';

const Retour = ({href}) => {

    const navigateTo = useNavigate();

    return (
        <div className="absolute left-0 top-0">
            <Button
                bgColor="#FFC107"
                textColor="#383F51"
                content="Retour"
                icon={false}
                restClass={`mt-0 md:mt-0 lg:mt-0`}
                onClick={() => navigateTo(href)}
            />
        </div>
    )
}

export default Retour;
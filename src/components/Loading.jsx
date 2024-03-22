import { loader } from "../assets";

const Loading = ({status}) => {

    if (status == 'global') {
        return (
            <div className="flex min-h-screen w-full bg-[#989FCE] justify-center items-center">
            <img 
                src={loader} 
                alt="Loading..." 
                className="w-[33%] mx-auto"
            />
            </div>
    );
    } else {

    }
 
    
}

export default Loading;
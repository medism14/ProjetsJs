import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';



const DoubleLink = ({ auth }) => {

    const navigateTo = useNavigate();
    const location = useLocation();

    const handleRedirect = (route) => {
        navigateTo(route)
    }  

    const [pageActuel, setPageActuel] = useState(null);

    useEffect(() => {
        setPageActuel(location.pathname.substring(1));
    })


    if (auth) {
        return (
            <div className="
                w-[8rem] text-[0.7rem]
                md:w-[16rem] md:text-xl
                lg:w-[14rem] lg:text-base
                flex bg-[#383F51] rounded-full"
            >
                <button onClick={() => handleRedirect('/produits')} className={`flex-1 rounded-full py-2 ${/^produits.*/.test(pageActuel) ? 'bg-[#FFC107] text-[#383F51]' : 'text-[#989FCE] transition-all duration-300 hover:bg-[#5B5F7A]'}`}>
                    Produits
                </button>
                <button onClick={() => handleRedirect('/categories')} className={`flex-1 rounded-full py-2 ${/^categories.*/.test(pageActuel) ? 'bg-[#FFC107] text-[#383F51]' : 'text-[#989FCE] transition-all duration-300 hover:bg-[#5B5F7A]'}`}>
                    Categories
                </button>
            </div>
        );
    } else {
        return (
            <div className="
                w-[10rem] text-xs
                md:w-[24rem] md:text-2xl
                lg:w-[14rem] lg:text-base
                flex bg-[#383F51] rounded-full"
            >
                <button onClick={() => handleRedirect('/')} className={`flex-1 rounded-full py-2 ${pageActuel === '' ? 'bg-[#FFC107] text-[#383F51]' : 'text-[#989FCE] transition-all duration-300 hover:bg-[#5B5F7A]'}`}>
                    Connexion
                </button>
                <button onClick={() => handleRedirect('/inscription')} className={`flex-1  rounded-full py-2 ${pageActuel === 'inscription' ? 'bg-[#FFC107] text-[#383F51]' : 'text-[#989FCE] transition-all duration-300 hover:bg-[#5B5F7A]'}`}>
                    Inscription
                </button>
            </div>
        );
    }
}

export default DoubleLink;

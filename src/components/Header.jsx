import logo from '../assets/logo.png';
import { DoubleLink, Panier } from '../components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { loggedIn } from '../redux/features/userSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Header = ({auth}) => {

    const navigateTo = useNavigate();
    const user = useSelector((state) => state.user);

    const handleDeconnexion = () => {
        deleteCookie('access_token');
        deleteCookie('id');
        dispatch(loggedIn(false));

        navigateTo('/')
    }

    const deleteCookie = (name) => {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    var [ hidden, setHidden ] = useState(true);
    var [ xPanier, setXPanier ] = useState(0)
    var [ yPanier, setYPanier ] = useState(0)

    const dispatch = useDispatch();
    const panierRef = useRef(null);

    {/* Fonctions utiles */}
    function hasClassInHisParent (element, className) {
        let currentElement = element;

        while (currentElement) {
            if (currentElement.classList && currentElement.classList.contains(className)) {
                return true;
            }
            currentElement = currentElement.parentNode;
        }
        return false;
    }
    
    {/* Gestion de panier */}
    useLayoutEffect(() => {
        const panier = panierRef.current;
        if (panier) {
            let x = window.innerWidth - panier.getBoundingClientRect().x - panier.getBoundingClientRect().width;
            let y = panier.getBoundingClientRect().height + panier.getBoundingClientRect().y + 5;  
            setXPanier(x);
            setYPanier(y);

            document.addEventListener('click', (event) => {
                let item = event.target;
                
                if (hasClassInHisParent(item, 'panierBtn')) {

                } else if (hasClassInHisParent(item, 'panier')) {

                } else {
                    setHidden(true);
                }
            });
        }
    }, []);

    const panierDisplay = () => {
        if (hidden) {
            setHidden(false);
        } else {
            setHidden(true);
        }
    }

        if (auth) {
            return (
                <div className="py-5 mb-10">
                    <Panier hidden={hidden} x={xPanier} y={yPanier} />
                    <div className="
                        h-[3rem]
                        md:h-[4rem]
                        lg:h-[3rem]
                        flex flex-row w-full animate-slideup  object-contain items-center">
                        <div className="flex-1 flex justify-start">
                            <img src={logo} alt="Logo de l'app" className="
                             w-[2.5rem] h-[2.5rem]
                             md:w-[4rem] md:h-[4rem]
                             lg:w-[3rem] lg:h-[3rem]
                            rounded-full" 
                            />
                        </div>

                        <div className="flex-1 flex justify-center font-bold mt-4">
                            <div className="flex-col space-y-3">
                                <h1 className="text-xs md:text-2xl lg:text-base text-center">{user.user.firstName} {user.user.lastName}</h1>
                                <DoubleLink 
                                    auth={auth}
                                />
                            </div>
                            
                        </div>

                        <div className="flex-1 flex justify-end font-bold space-x-3">
                            <button 
                                ref={panierRef}
                                id="panierButton"
                                onClick={panierDisplay}
                                className="panierBtn
                                    p-1 text-base
                                    md:p-3 md:text-2xl
                                    lg:p-2 lg:text-xl
                                    rounded-full bg-[#383F51] text-[#989FCE] transition-all duration-300 hover:bg-opacity-75"
                                >
                                <FontAwesomeIcon icon={faShoppingCart} />
                            </button>

                            <button 
                                onClick={handleDeconnexion}
                                className="
                                    p-1 text-base
                                    md:p-3 md:text-2xl
                                    lg:p-2 lg:text-xl
                                    rounded-full bg-[#383F51] text-[#989FCE] transition-all duration-300 hover:bg-opacity-75"
                                >
                                <FontAwesomeIcon icon={faDoorOpen} />
                            </button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="py-5">
                    <div className="
                        h-[3rem]
                        md:h-[4rem]
                        lg:h-[3rem]
                        flex flex-row w-full animate-slideup  object-contain items-center">
                        <div className="flex-1 flex justify-start">
                            <img src={logo} alt="Logo de l'app" className="
                             w-[2.5rem] h-[2.5rem]
                             md:w-[4rem] md:h-[4rem]
                             lg:w-[3rem] lg:h-[3rem]
                            rounded-full" 
                            />
                        </div>
                        <div className="flex-1 flex justify-end font-bold">
                            <DoubleLink 
                                auth={auth}
                            />
                        </div>
                    </div>
                </div>
            );
        }

}

export default Header;

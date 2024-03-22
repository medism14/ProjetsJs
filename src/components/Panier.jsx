import { useLayoutEffect, useRef, useState } from "react";
import { Button } from '../components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setPanierChange } from '../redux/features/htmlElementsSlice';

const Panier = ({hidden, x, y}) => {

    const panierRef = useRef(null);
    const [panierContent, setPanierContent] = useState([]);
    const info = useSelector((state) => state.user);
    const panierChange = useSelector((state) => state.htmlElements.panierChange);

    const dispatch = useDispatch();

    {/* Fonctions utiles */}
    const getId = (item, tagName, level) => {
        let currentElement = item;
        let i = 1;
        
        while (currentElement) {
            if (currentElement.tagName == tagName) {
                if (i != level) {
                    i++
                } else {
                    return currentElement.getAttribute('id');
                }
            }
            currentElement = currentElement.parentNode;
        }
        return null;
    }

    {/* Gestion de panier */}
    const handleQuantiteChange = async (event) => {
        let item = event.target;
        let id = getId(item, 'DIV', 2);

        if (id) {
            let panier = panierContent[id];

            let body = {
                produitId: panier.produitId,
                panierId: panier.panierId,
                quantite: parseInt(item.value)
            }

            try {
                let response = await axios.put(`http://localhost:3000/panier-produits/${panier.id}`, body);
                if (response.status == 200) {
                    dispatch(setPanierChange());
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    const handleDeletePanier = async (event) => {
        let item = event.target;
        let id = getId(item, 'DIV', 2);

        let confirmation = confirm("Voulez vous retirer ce produit du panier ?");

        if (id && confirmation) {
            let panier = panierContent[id];

            try {
                let response = await axios.delete(`http://localhost:3000/panier-produits/${panier.id}`);

                if (response.status == 200) {
                    location.reload();
                }
            } catch (error) {
                console.error(error.message);
            }
        }
    }
    {/***********************************************************/}

    useLayoutEffect(() => {
        const panier = panierRef.current;
        
        if (panier) {
            panier.style.right = x + 'px';
            panier.style.top = y + 'px';
        }

        let mediaQuery = window.matchMedia("(min-width: 768px)");

        let nameProduct = panier.querySelectorAll('.nameProduct');

        let nameProductParent = null;

        if (mediaQuery.matches) {
            panier.style.minWidth = 25 + 'rem';
            panier.style.maxWidth = 25 + 'rem';
            panier.style.minHeight = 25 + 'rem';
            panier.style.maxHeight = 25 + 'rem';
        } else {
            panier.style.minWidth = 15 + 'rem';
            panier.style.maxWidth = 15 + 'rem';
            panier.style.minHeight = 15 + 'rem';
            panier.style.maxHeight = 15 + 'rem';

            nameProduct.forEach((element) => {
                nameProductParent = element.parentNode;
                let maxWidth = nameProductParent.getBoundingClientRect().width * 0.5;

                element.style.maxWidth = maxWidth + 'px';
            });
        }

        setPanierContent(info.user.panier.panierProduits);

    }, [handleQuantiteChange]);

    return (
        <div 
            ref={panierRef} 
            className={`
                panier absolute z-10 bg-[#D9D9D9] rounded-lg border-[2px] border-[#383F51] flex flex-col items-center overflow-auto
                ${hidden ? 'hidden' : ''}
            `}>
                <h1 className="text-base md:text-2xl font-bold mb-2 mt-5 border-b-2 w-full flex justify-center pb-3 border-[#383F51] border-rounded-lg"><pre><span className="underline">Panier</span> <FontAwesomeIcon icon={faCartPlus} /></pre></h1>    

                {panierContent.map((item, indexDiv) => (
                    <div id={indexDiv} key={indexDiv} className="text-sm md:text-base border-b-2 border-[#6D768E] w-[80%] mx-auto flex items-center mt-4 mb-2 md:px-3">
                        <p className="inline-block nameProduct font-bold whitespace-normal flex-1 break-words">{item.produit.designation}</p>
                        <div className="flex justify-end m-1">
                            <select defaultValue={item.quantite} onChange={handleQuantiteChange} name="fanta" id="fanta" className="bg-[#383F51] text-[#D9D9D9] rounded-lg px-2 py-1 m-1 font-bold">
                                {Array.from({ length: (item.quantite + item.produit.quantite)  }, (_, indexOption) => (
                                    <option key={indexOption} value={indexOption + 1}>{indexOption + 1}</option>
                                ))}
                            </select>
                            <Button
                                bgColor="#FFC107"
                                textColor="#383F51"
                                content="faXmark"
                                restClass={`lg:py-[0rem]`}
                                onClick={handleDeletePanier}
                                icon={true}
                            />
                        </div>
                    </div>
                ))}
                
        </div>
    )
}

export default Panier;
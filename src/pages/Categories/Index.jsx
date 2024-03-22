import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BodyAuth, Button, DivInput, InputModal, Modal } from "../../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useDispatch } from 'react-redux';
import { setLoading, setActualPageCategorie } from '../../redux/features/htmlElementsSlice';
import axios from "axios";

const Index = () => {

    const htmlElements = useSelector((state) => state.htmlElements);
    const actualPage = useSelector((state) => state.htmlElements.actualPageCategorie);

    const info = useSelector((state) => state.user);
    const navigateTo = useNavigate();
    const dispatch = useDispatch();

    const tableRef = useRef(null);
    const tablePhoneRef = useRef(null);

    const noneRowPcRef = useRef(null);
    const noneRowPhoneRef = useRef(null);

    const panierValueRef = useRef(null);
    const addBtnRef = useRef(null);

    const [voirProduit, setVoirProduit] = useState(false);
    
    const [voirProduitValue, setVoirProduitValue] = useState({
        id: '',
        designation: '',
        prix: '',
        quantite: '',
        dateIn: '',
        dateUp: '',
        categorie: '',
    });

    const [maxPage, setMaxPage] = useState(1);

    {/* Fontions utiles */}
    const reloadPage = () => {
        location.reload();
    }

    const getId = (element) => {
        let currentElement = element;

        while (currentElement) {
            if (currentElement.tagName === 'TD') {
                return currentElement.getAttribute('id');
            }
            currentElement = currentElement.parentNode;
        }
        return null;
    }

    const getProductInfo = async (id) => {
        try {
            let response = await axios.get(`http://localhost:3000/produits/${id}`);
            let data = await response.data;
            return data
        } catch (error) {
            return null
        }
    }
    {/*************************************************************************************/}



    {/* CRUD bouttons */}
    const handleAddProduit = () => {
        navigateTo('/categories/add');
    }

    const handleEditProduit = (event) => {
        let item = event.target;
        let id = getId(item);
        navigateTo(`/categories/edit/${id}`);
    }

    const handleDeleteCategorie = async (event) => {
        event.preventDefault();
    
        let confirmation = confirm("Voulez-vous vraiment supprimer la categorie ?");
        if (confirmation) {
            let item = event.target;
            let id = getId(item);

            if (id) {
                let response = await axios.delete(`http://localhost:3000/categories/${id}`);
                if (response.status == 200) {
                    reloadPage();
                }
            } else {
                alert('Impossible de supprimer le produit');
            }
            
        }
    }
    {/*************************************************************************************/}


    {/* Bouttons arrière et avant */}
    const handlePrecedent = () => {
        if (actualPage > 1) {
            dispatch(setActualPageCategorie(actualPage - 1));
        }
    }

    const handleSuivant = () => {
        if (maxPage > actualPage) {
            dispatch(setActualPageCategorie(actualPage + 1));
        }
    }
    {/*************************************************************************************/}


    {/* Mise en page */}
    useLayoutEffect(() => {
        let table = tableRef.current;
        let tablePhone = tablePhoneRef.current;
        let bodyWidth = htmlElements.bodyAuthWidth;
        let oneByOneWidth = bodyWidth / 4;

        let mediaQuery = window.matchMedia("(min-width: 768px)");
        let th = null;
        let td = null;

        const tableChange = () => {
            if (mediaQuery.matches) {
                table.classList.remove('hidden');
                tablePhone.classList.add('hidden');

                th = table.querySelectorAll('th');
                td = table.querySelectorAll('td');

                th.forEach((element) => {
                    element.style.minWidth = oneByOneWidth + 'px';
                    element.style.maxWidth = oneByOneWidth + 'px';
                });

                td.forEach((element) => {
                    element.style.minWidth = oneByOneWidth + 'px';
                    element.style.maxWidth = oneByOneWidth + 'px';
                });
            } else {
                table.classList.add('hidden');
                tablePhone.classList.remove('hidden');

                th = tablePhone.querySelectorAll('th');

                th.forEach((element, index) => {
                    element.style.minWidth = bodyWidth * 0.5 + 'px';
                    element.style.maxWidth = bodyWidth * 0.5 + 'px';
                });

                td = tablePhone.querySelectorAll('td');

                td.forEach((element, index) => {
                    element.style.minWidth = bodyWidth * 0.5 + 'px';
                    element.style.maxWidth = bodyWidth * 0.5 + 'px';
                });
            }
        };

        tableChange();

        const handleResize = () => {
            tableChange();
        };

        window.addEventListener('resize', handleResize);

        
    }, []);
    {/*************************************************************************************/}


    {/* Chargement des données */}
    const [ disableBtn, setDisableBtn ] = useState([]);

    useLayoutEffect(() => {
        setDisableBtn([]);
        let table = tableRef.current;
        let tablePhone = tablePhoneRef.current;
        let noneRowPc = noneRowPcRef.current;
        let noneRowPhone = noneRowPhoneRef.current;

        let addBtn = addBtnRef.current;

        dispatch(setLoading(true));
        
        const getProduits = async () => {
            
            try {
                let response = await axios.get(`http://localhost:3000/categories?page=${actualPage}`);
                let data = await response.data;

                setMaxPage(data.totalPages);

                let trPc = table.querySelectorAll('tbody tr');
                let trPhone = tablePhone.querySelectorAll('tbody tr');

                let taken = 0;

                data.categories.forEach((element, index) => {

                    let user = info.user;

                    {/* Pour le pc */}
                    let trPcElement = trPc[index];
                    trPcElement.classList.remove('hidden');
                    let Designation = trPcElement.querySelector('td:nth-child(1)');
                    let actionPc = trPcElement.querySelector('td:nth-child(2)');

                    Designation.innerHTML = element.designation;
                    actionPc.setAttribute('id', element.id);

                    if (user.role == 1) {
                        let nombre = actionPc.querySelectorAll('button').length;

                        if (nombre == 2) {
                            let modifBtn = actionPc.querySelector('button:nth-child(1)');
                            let suppBtn = actionPc.querySelector('button:nth-child(2)');

                            modifBtn.remove();
                            suppBtn.remove();
                        }   
                    }

                    {/* Pour le telephone */}
                    let trPhoneElement = trPhone[index];
                    trPhoneElement.classList.remove('hidden');
                    let designation = trPhoneElement.querySelector('td:nth-child(1) span:nth-child(1)');
                    let actionPhone = trPhoneElement.querySelector('td:nth-child(2)');

                    designation.innerHTML = '<b>Designation:</b>' + '<pre> </pre>' +  element.designation;
                    actionPhone.setAttribute('id', element.id)

                    taken++
                });
                
                for (let i = 0 ; i < 5 ; i++) {
                    trPc[i].classList.remove('hidden');
                    trPhone[i].classList.remove('hidden');
                }

                for (let i = taken ; i < 5 ; i++) {
                    if (trPc[i]) {
                        if (trPc[i] != noneRowPc) {
                            trPc[i].classList.add('hidden');
                        }
                    }

                    if (trPhone[i]) {
                        if (trPhone[i] != noneRowPhone) {
                            trPhone[i].classList.add('hidden');
                        }
                    }
                }

                if (taken == 0) {
                    noneRowPc.classList.remove('hidden');
                    noneRowPhone.classList.remove('hidden');
                } else {
                    noneRowPc.classList.add('hidden');
                    noneRowPhone.classList.add('hidden');
                }
            } catch (error) {
                console.log(error.message);
            }
        }

        getProduits();
        dispatch(setLoading(false));
    }, [actualPage])
    {/*************************************************************************************/}

    return (
        <>  

        <BodyAuth>
            <div className="w-full flex justify-end mb-1">
                {info.user.role == 0 && (
                    <Button
                    bgColor="#FFC107"
                    textColor="#383F51"
                    content="faPlus"
                    icon={true}
                    refElement={addBtnRef}
                    restClass={`lg:px-4 lg:py-0 md:px-6`}
                    onClick={handleAddProduit}
                />
                )}
            </div>

            <table className="w-full rounded-lg" ref={tableRef}>
                <thead>
                    <tr>
                        <th className="
                            h-[3rem]
                            md:h-16
                            lg:h-10
                            px-2 text-center bg-[#383F51] text-[#989FCE] border-r-[1px] border-[#989FCE] rounded-lg rounded-b-none"
                        >Nom</th>
                        <th className="
                            h-[3rem]
                            md:h-16
                            lg:h-10
                            px-2 text-center bg-[#383F51] text-[#989FCE] border-r-[1px] border-[#989FCE] rounded-lg rounded-b-none"
                        >Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Premier */}
                    <tr className="hidden border-b-[1px] border-[#989FCE]">
                        <td className="
                            h-[3rem]
                            md:h-[5rem]
                            lg:h-[3rem]
                            px-2 py-1 text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] whitespace-normal break-words"
                        ></td>
                        <td 
                            id="null"
                            className="
                                h-[3rem]
                                md:h-[5rem]
                                lg:h-[3rem]
                                actionTd px-2 py-1 text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] whitespace-normal break-words"
                            >
                            <div className="flex w-full justify-center space-x-3">
                            {info.user.role == 0 && (
                            <>
                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faEdit"
                                    icon={true}
                                    onClick={handleEditProduit}
                                />

                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faTrashAlt"
                                    icon={true}
                                    onClick={handleDeleteCategorie}
                                />
                            </>
                            )}
                            </div>
                        </td>
                    </tr>
                    
                    {/* Deuxieme */}
                    <tr className="hidden border-b-[1px] border-[#989FCE]">
                        <td className="
                            h-[3rem]
                            md:h-[5rem]
                            lg:h-[3rem]
                            px-2 py-1 text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] whitespace-normal break-words"
                        ></td>
                        <td 
                            id="null"
                            className="
                                h-[3rem]
                                md:h-[5rem]
                                lg:h-[3rem]
                                actionTd px-2 py-1 text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] whitespace-normal break-words"
                            >
                            <div className="flex w-full justify-center space-x-3">
                            {info.user.role == 0 && (
                            <>
                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faEdit"
                                    icon={true}
                                    onClick={handleEditProduit}
                                />

                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faTrashAlt"
                                    icon={true}
                                    onClick={handleDeleteCategorie}
                                />
                            </>
                            )}    
                            </div>
                        </td>
                    </tr>

                    {/* Troisieme */}
                    <tr className="hidden border-b-[1px] border-[#989FCE]">
                        <td className="
                            h-[3rem]
                            md:h-[5rem]
                            lg:h-[3rem]
                            px-2 py-1 text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] whitespace-normal break-words"
                        ></td>
                        <td 
                            id="null"
                            className="
                                h-[3rem]
                                md:h-[5rem]
                                lg:h-[3rem]
                                actionTd px-2 py-1 text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] whitespace-normal break-words"
                            >
                            <div className="flex w-full justify-center space-x-3">
                            {info.user.role == 0 && (
                            <>
                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faEdit"
                                    icon={true}
                                    onClick={handleEditProduit}
                                />

                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faTrashAlt"
                                    icon={true}
                                    onClick={handleDeleteCategorie}
                                />
                            </>
                            )}    
                            </div>
                        </td>
                    </tr>

                    {/* Quatrieme */}
                    <tr className="hidden border-b-[1px] border-[#989FCE]">
                        <td className="
                            h-[3rem]
                            md:h-[5rem]
                            lg:h-[3rem]
                            px-2 py-1 text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] whitespace-normal break-words"
                        ></td>
                        <td 
                            id="null"
                            className="
                                h-[3rem]
                                md:h-[5rem]
                                lg:h-[3rem]
                                actionTd px-2 py-1 text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] whitespace-normal break-words"
                            >
                            <div className="flex w-full justify-center space-x-3">
                            {info.user.role == 0 && (
                            <>
                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faEdit"
                                    icon={true}
                                    onClick={handleEditProduit}
                                />

                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faTrashAlt"
                                    icon={true}
                                    onClick={handleDeleteCategorie}
                                />
                            </>
                            )}
                            </div>
                        </td>
                    </tr>

                    {/* Cinquieme */}
                    <tr className="hidden border-b-[1px] border-[#989FCE]">
                        <td className="
                            h-[3rem]
                            md:h-[5rem]
                            lg:h-[3rem]
                            px-2 py-1 text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] whitespace-normal break-words"
                        ></td>
                        <td 
                            id="null"
                            className="
                                h-[3rem]
                                md:h-[5rem]
                                lg:h-[3rem]
                                actionTd px-2 py-1 text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] whitespace-normal break-words"
                            >
                            <div className="flex w-full justify-center space-x-3">
                            {info.user.role == 0 && (
                            <>
                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faEdit"
                                    icon={true}
                                    onClick={handleEditProduit}
                                />

                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faTrashAlt"
                                    icon={true}
                                    onClick={handleDeleteCategorie}
                                />
                            </>
                            )}
                            </div>
                        </td>
                    </tr>

                    {/* Aucune colonne */}
                    <tr ref={noneRowPcRef} className="noneRow hidden border-b-[1px] border-[#989FCE]">
                        <td colSpan="4" className="
                            h-[3rem]
                            md:h-[5rem]
                            lg:h-[3rem]
                            px-2 py-1 text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] whitespace-normal break-words"
                        >Aucun enregistrement</td>
                    </tr>
                </tbody>
            </table>

            <table className="w-full rounded-lg hidden" ref={tablePhoneRef}>
                <thead>
                    <tr>
                        <th className="text-[0.7rem] px-2 text-center bg-[#383F51] text-[#989FCE] border-r-[1px] border-[#989FCE] rounded-lg rounded-b-none"
                        >Informations</th>
                        <th className="text-[0.7rem] px-2 text-center bg-[#383F51] text-[#989FCE] border-r-[1px] border-[#989FCE] rounded-lg rounded-b-none"
                        >Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Premier */}
                    <tr className="hidden border-b-[1px] border-[#989FCE]">
                        <td className="px-2 py-1 text-[0.7rem] text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] whitespace-normal break-words"
                        >
                            <span className="flex w-full justify-center"></span>
                        </td>
                        <td id="null" className="px-2 py-1 text-[0.7rem] text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] h-10 whitespace-normal break-words">
                            <div className="flex w-full justify-center space-x-1 md:space-x-3">
                            {info.user.role == 0 && (
                            <>
                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faEdit"
                                    icon={true}
                                    onClick={handleEditProduit}
                                />

                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faTrashAlt"
                                    icon={true}
                                    onClick={handleDeleteCategorie}
                                />
                            </>
                            )}
                            </div>
                        </td>
                    </tr>

                    {/* Deuxieme */}
                    <tr className="hidden border-b-[1px] border-[#989FCE]">
                        <td className="px-2 py-1 text-[0.7rem] text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] whitespace-normal break-words"
                        >
                            <span className="flex w-full justify-center"></span>
                        </td>
                        <td id="null" className="px-2 py-1 text-[0.7rem] text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] h-10 whitespace-normal break-words">
                            <div className="flex w-full justify-center space-x-1 md:space-x-3">
                            {info.user.role == 0 && (
                            <>
                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faEdit"
                                    icon={true}
                                    onClick={handleEditProduit}
                                />

                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faTrashAlt"
                                    icon={true}
                                    onClick={handleDeleteCategorie}
                                />
                            </>
                            )}
                            </div>
                        </td>
                    </tr>

                    {/* Troisieme */}
                    <tr className="hidden border-b-[1px] border-[#989FCE]">
                        <td className="px-2 py-1 text-[0.7rem] text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] whitespace-normal break-words"
                        >
                            <span className="flex w-full justify-center"></span>
                        </td>
                        <td id="null" className="px-2 py-1 text-[0.7rem] text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] h-10 whitespace-normal break-words">
                            <div className="flex w-full justify-center space-x-1 md:space-x-3">
                            {info.user.role == 0 && (
                            <>
                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faEdit"
                                    icon={true}
                                    onClick={handleEditProduit}
                                />

                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faTrashAlt"
                                    icon={true}
                                    onClick={handleDeleteCategorie}
                                />
                            </>
                            )}
                            </div>
                        </td>
                    </tr>

                    {/* Quatrieme */}
                    <tr className="hidden border-b-[1px] border-[#989FCE]">
                        <td className="px-2 py-1 text-[0.7rem] text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] whitespace-normal break-words"
                        >
                            <span className="flex w-full justify-center"></span>
                        </td>
                        <td id="null" className="px-2 py-1 text-[0.7rem] text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] h-10 whitespace-normal break-words">
                            <div className="flex w-full justify-center space-x-1 md:space-x-3">
                            {info.user.role == 0 && (
                            <>
                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faEdit"
                                    icon={true}
                                    onClick={handleEditProduit}
                                />

                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faTrashAlt"
                                    icon={true}
                                    onClick={handleDeleteCategorie}
                                />
                            </>
                            )}
                            </div>
                        </td>
                    </tr>

                    {/* Cinquieme */}
                    <tr className="hidden border-b-[1px] border-[#989FCE]">
                        <td className="px-2 py-1 text-[0.7rem] text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] whitespace-normal break-words"
                        >
                            <span className="flex w-full justify-center"></span>
                        </td>
                        <td id="null" className="px-2 py-1 text-[0.7rem] text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] h-10 whitespace-normal break-words">
                            <div className="flex w-full justify-center space-x-1 md:space-x-3">
                            {info.user.role == 0 && (
                            <>
                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faEdit"
                                    icon={true}
                                    onClick={handleEditProduit}
                                />

                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faTrashAlt"
                                    icon={true}
                                    onClick={handleDeleteCategorie}
                                />
                            </>
                            )}
                            </div>
                        </td>
                    </tr>

                    {/* Aucun donnée */}
                    <tr ref={noneRowPhoneRef} className="noneRow hidden border-b-[1px] border-[#989FCE]">
                        <td colSpan="2" className="px-2 py-1 text-[0.7rem] text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] whitespace-normal break-words"
                        >
                            Aucun enregistrement
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="flex justify-center text-[#FFC107] rounded-lg mt-5">
                <div className="flex-1 border-r-2 border-[#989FCE] mt-5">
                    <button onClick={handlePrecedent} className={`px-6 md:px-14 lg:px-14 text-xs md:text-lg lg:text-base py-2 bg-[#6D768E] rounded-lg rounded-r-none ${actualPage > 1 ? `transition-all duration-300 hover:bg-opacity-75` : `cursor-not-allowed `}`}>Précedent</button>
                </div>

                <div className="flex-1 mt-5">
                    <button onClick={handleSuivant} className={`px-6 md:px-14 lg:px-14 text-xs md:text-lg lg:text-base py-2 bg-[#6D768E] rounded-lg rounded-l-none ${actualPage < maxPage ? `transition-all duration-300 hover:bg-opacity-75` : `cursor-not-allowed `}`}>Suivant</button>
                </div>
            </div>
        </BodyAuth>
        </>
    );
};

export default Index;

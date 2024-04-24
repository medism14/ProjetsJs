import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BodyAuth, Button, DivInput, InputModal, Modal } from "../../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useDispatch } from 'react-redux';
import { setLoading, setPanierChange, setActualPageProduit } from '../../redux/features/htmlElementsSlice';
import axios from "axios";

const Index = () => {

    // document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    const htmlElements = useSelector((state) => state.htmlElements);
    const panierChange = useSelector((state) => state.htmlElements.panierChange);
    const actualPage = useSelector((state) => state.htmlElements.actualPageProduit);

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
    const handleVoirProduit = async (event) => {
        if (voirProduit) {
            setVoirProduit(false)
        } else {            
            setVoirProduit(true)
        }

        if (event) {
            let item = event.target;
            let id = getId(item);
            let data = await getProductInfo(id);

            setVoirProduitValue({
                id: data.id,
                designation: data.designation,
                prix: data.prix,
                quantite: `${data.quantite}`,
                dateIn: data.dateIn,
                dateUp: data.dateUp,
                categorie: data.categorie,
            });
        }
    }

    const handleAddProduit = () => {
        navigateTo('/produits/add');
    }

    const handleEditProduit = (event) => {
        let item = event.target;
        let id = getId(item);
        navigateTo(`/produits/edit/${id}`);
    }

    const handleDeleteProduit = async (event) => {
        event.preventDefault();
    
        let confirmation = confirm("Voulez-vous vraiment supprimer le produit ?");
        if (confirmation) {
            let item = event.target;
            let id = getId(item);
            if (id) {
                let response = await axios.delete(`http://localhost:3000/produits/${id}`);
                if (response.status == 200) {
                    reloadPage();
                }
            } else {
                alert('Impossible de supprimer le produit');
            }
            
        }
    }
    {/*************************************************************************************/}


    {/* Gestion des paniers */}
    const [ajoutPanier, setAjoutPanier] = useState(false); //afficher le panier
    const [quantiteAdded, setQuantiteAdded] = useState(1); //La quantité qui sera ajouté au panier
    const [produitId, setProduitId] = useState(null); //Produit actuel
    const [produitValue, setProduitValue] = useState(null); //Afficher le nom du produit dans panier

    const handleAjoutPanier = async (event) => {
        if (ajoutPanier) {
            setAjoutPanier(false)
        } else {
            setAjoutPanier(true)
        }

        if (event) {
            let item = event.target;
            let id = getId(item);

            let panierValue = panierValueRef.current;
            let data = await getProductInfo(id);
            setProduitValue(data.designation);
            setProduitId(data.id);
            panierValue.innerHTML = '';
            for (let i = 1 ; i <= data.quantite ; i++) {
                panierValue.innerHTML += `
                    <option value="${i}">${i}</option>
                `;
            }
        }
    }

    const handlePanierChange = (event) => {
        setQuantiteAdded(parseInt(event.target.value));
    }

    const handleSubmitPanierProduit = async (event) => {
        let body = {
            produitId: produitId,
            panierId: info.user.panier.id,
            quantite: quantiteAdded,
        }

        try {
            let response = await axios.post(`http://localhost:3000/panier-produits`, body);
            let data = response.data;
            reloadPage();
        } catch (error) {
            console.log(error.message);
        }
        
    };

    {/*************************************************************************************/}


    {/* Bouttons arrière et avant */}
    const handlePrecedent = () => {
        if (actualPage > 1) {
            dispatch(setActualPageProduit(actualPage - 1));
        }
    }


    const handleSuivant = () => {
        if (maxPage > actualPage) {
            dispatch(setActualPageProduit(actualPage + 1));
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
        // document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        let table = tableRef.current;
        let tablePhone = tablePhoneRef.current;
        let noneRowPc = noneRowPcRef.current;
        let noneRowPhone = noneRowPhoneRef.current;

        let addBtn = addBtnRef.current;

        dispatch(setLoading(true));
        
        const getProduits = async () => {
            
            try {
                let response = await axios.get(`http://localhost:3000/produits?page=${actualPage}`);
                let data = await response.data;
                setMaxPage(data.totalPages);

                let trPc = table.querySelectorAll('tbody tr');
                let trPhone = tablePhone.querySelectorAll('tbody tr');

                let taken = 0;

                data.produits.forEach((element, index) => {

                    let user = info.user;
                    let notAccessToPanier = false;

                    let panierProduits = user.panier.panierProduits;
                    panierProduits.forEach((elementActual) => {
                        if (elementActual.produitId == element.id) {
                            notAccessToPanier = true;
                        }
                    });

                    if (element.quantite <= 0) {
                        notAccessToPanier = true;
                    }
                    
                    {/* Pour le pc */}
                    let trPcElement = trPc[index];
                    trPcElement.classList.remove('hidden');
                    let nomPc = trPcElement.querySelector('td:nth-child(1)');
                    let prixPc = trPcElement.querySelector('td:nth-child(2)');
                    let quantitePc = trPcElement.querySelector('td:nth-child(3)');
                    let actionPc = trPcElement.querySelector('td:nth-child(4)');

                    nomPc.innerHTML = element.designation;
                    prixPc.innerHTML = element.prix;
                    quantitePc.innerHTML = element.quantite;
                    actionPc.setAttribute('id', element.id);

                    {/* Pour le telephone */}
                    let trPhoneElement = trPhone[index];
                    trPhoneElement.classList.remove('hidden');
                    let nomPhone = trPhoneElement.querySelector('td:nth-child(1) span:nth-child(1)');
                    let prixPhone = trPhoneElement.querySelector('td:nth-child(1) span:nth-child(2)');
                    let quantitehone = trPhoneElement.querySelector('td:nth-child(1) span:nth-child(3)');
                    let actionPhone = trPhoneElement.querySelector('td:nth-child(2)');

                    nomPhone.innerHTML = '<b>Designation:</b>' + '<pre> </pre>' +  element.designation;
                    prixPhone.innerHTML = '<b>Prix:</b>' + '<pre> </pre>' +  element.prix;
                    quantitehone.innerHTML = '<b>Quantité:</b>' + '<pre> </pre>' +  element.quantite;
                    actionPhone.setAttribute('id', element.id)

                    if (notAccessToPanier) {
                        setDisableBtn(prevDisableBtn => [...prevDisableBtn, index]);
                    }

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
    }, [actualPage, panierChange])
    {/*************************************************************************************/}

    return (
        <>  
            {/* Modal ajout panier */}
            <Modal
                bottom={true}
                onClick={handleSubmitPanierProduit}
                title='Ajout panier'
                display={ajoutPanier}
                onClose={handleAjoutPanier}
            >
                <DivInput modal={true}>
                    <InputModal 
                        label='Produit'
                        type='text'
                        inputName="produit"
                        id="produit"
                        display={true}
                        up={false}
                        value={produitValue}
                    />
                </DivInput>
                <div id="elementsInput" className={`flex justify-center space-x-2`}>
                <label className={`font-bold mb-1`} htmlFor='panier'>Panier: </label>
                <select 
                    name='panier'
                    id='panier'
                    autoComplete="off"
                    onChange={handlePanierChange}
                    ref={panierValueRef}
                    className={`
                        px-3 py-1
                        md:px-3 md:py-2
                        lg:px-3 lg:py-1 
                        bg-[#D9D9D9] focus:ring-2 focus:bg-[#D9D9D9] outline-none rounded-lg`}
                >
                </select>
            </div>
            </Modal>

            {/* Modal voir produit */}
            <Modal
                bottom={false}
                title='Voir le produit'
                display={voirProduit}
                onClose={handleVoirProduit}
            >
                <DivInput modal={true}>
                    <InputModal 
                        label='Designation'
                        type='text'
                        inputName="designation"
                        id="designation"
                        display={true}
                        up={true}
                        value={voirProduitValue.designation}
                    />

                    <InputModal 
                        label='Prix'
                        type='text'
                        inputName="prix"
                        id="prix"
                        display={true}
                        up={true}
                        value={voirProduitValue.prix}
                    />
                </DivInput>

                <DivInput modal={true}>
                    <InputModal 
                        label='Quantité'
                        type='text'
                        inputName="quantite"
                        id="quantite"
                        display={true}
                        up={true}
                        value={voirProduitValue.quantite}
                    />

                    <InputModal 
                        label='Categorie'
                        type='text'
                        inputName="categorie"
                        id="categorie"
                        display={true}
                        up={true}
                        value={voirProduitValue.categorie.designation}
                    />
                </DivInput>

                <DivInput modal={true}>
                    <InputModal 
                        label='Date arrivée'
                        type='text'
                        inputName="date_in"
                        id="date_in"
                        display={true}
                        up={true}
                        value={new Date(voirProduitValue.dateIn)}
                    />

                    <InputModal 
                        label='Date depart'
                        type='text'
                        inputName="date_up"
                        id="date_up"
                        display={true}
                        up={true}
                        value={new Date(voirProduitValue.dateUp)}
                    />
                </DivInput>
            </Modal>

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
                        >Prix</th>
                        <th className="
                            h-[3rem]
                            md:h-16
                            lg:h-10
                            px-2 text-center bg-[#383F51] text-[#989FCE] border-r-[1px] border-[#989FCE] rounded-lg rounded-b-none"
                        >Quantité</th>
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
                        <td className="
                            h-[3rem]
                            md:h-[5rem]
                            lg:h-[3rem]
                            px-2 py-1 text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] whitespace-normal break-words"
                        ></td>
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
                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faCartShopping"
                                    icon={true}
                                    disable={disableBtn.includes(0)}
                                    onClick={handleAjoutPanier}
                                />
                            {info.user.role == 0 && (
                            <>
                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faEye"
                                    icon={true}
                                    onClick={handleVoirProduit}
                                />
                            
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
                                    onClick={handleDeleteProduit}
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
                        <td className="
                            h-[3rem]
                            md:h-[5rem]
                            lg:h-[3rem]
                            px-2 py-1 text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] whitespace-normal break-words"
                        ></td>
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
                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faCartShopping"
                                    icon={true}
                                    disable={disableBtn.includes(1)}
                                    onClick={handleAjoutPanier}
                                />

                            {info.user.role == 0 && (
                            <> 
                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faEye"
                                    icon={true}
                                    onClick={handleVoirProduit}
                                />

                            
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
                                    onClick={handleDeleteProduit}
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
                        <td className="
                            h-[3rem]
                            md:h-[5rem]
                            lg:h-[3rem]
                            px-2 py-1 text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] whitespace-normal break-words"
                        ></td>
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
                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faCartShopping"
                                    icon={true}
                                    disable={disableBtn.includes(2)}
                                    onClick={handleAjoutPanier}
                                />
                                
                            {info.user.role == 0 && (
                            <>
                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faEye"
                                    icon={true}
                                    onClick={handleVoirProduit}
                                />
                            
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
                                    onClick={handleDeleteProduit}
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
                        <td className="
                            h-[3rem]
                            md:h-[5rem]
                            lg:h-[3rem]
                            px-2 py-1 text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] whitespace-normal break-words"
                        ></td>
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
                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faCartShopping"
                                    icon={true}
                                    disable={disableBtn.includes(3)}
                                    onClick={handleAjoutPanier}
                                />
                                
                            {info.user.role == 0 && (
                            <>    
                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faEye"
                                    icon={true}
                                    onClick={handleVoirProduit}
                                />

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
                                    onClick={handleDeleteProduit}
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
                        <td className="
                            h-[3rem]
                            md:h-[5rem]
                            lg:h-[3rem]
                            px-2 py-1 text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] whitespace-normal break-words"
                        ></td>
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
                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faCartShopping"
                                    icon={true}
                                    disable={disableBtn.includes(4)}
                                    onClick={handleAjoutPanier}
                                />

                            {info.user.role == 0 && (
                            <>
                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faEye"
                                    icon={true}
                                    onClick={handleVoirProduit}
                                />

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
                                    onClick={handleDeleteProduit}
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
                            <span className="flex w-full justify-center"></span>
                            <span className="flex w-full justify-center"></span>
                        </td>
                        <td id="null" className="px-2 py-1 text-[0.7rem] text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] h-10 whitespace-normal break-words">
                            <div className="flex w-full justify-center space-x-1 md:space-x-3">
                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faCartShopping"
                                    disable={disableBtn.includes(0)}
                                    icon={true}
                                    onClick={handleAjoutPanier}
                                />
                            {info.user.role == 0 && (
                            <>
                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faEye"
                                    icon={true}
                                    onClick={handleVoirProduit}
                                />

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
                                    onClick={handleDeleteProduit}
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
                            <span className="flex w-full justify-center"></span>
                            <span className="flex w-full justify-center"></span>
                        </td>
                        <td id="null" className="px-2 py-1 text-[0.7rem] text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] h-10 whitespace-normal break-words">
                            <div className="flex w-full justify-center space-x-1 md:space-x-3">
                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faCartShopping"
                                    disable={disableBtn.includes(1)}
                                    icon={true}
                                    onClick={handleAjoutPanier}
                                />
                            {info.user.role == 0 && (
                            <>    
                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faEye"
                                    icon={true}
                                    onClick={handleVoirProduit}
                                />

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
                                    onClick={handleDeleteProduit}
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
                            <span className="flex w-full justify-center"></span>
                            <span className="flex w-full justify-center"></span>
                        </td>
                        <td id="null" className="px-2 py-1 text-[0.7rem] text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] h-10 whitespace-normal break-words">
                            <div className="flex w-full justify-center space-x-1 md:space-x-3">
                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faCartShopping"
                                    disable={disableBtn.includes(2)}
                                    icon={true}
                                    onClick={handleAjoutPanier}
                                />
                            {info.user.role == 0 && (
                            <>    
                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faEye"
                                    icon={true}
                                    onClick={handleVoirProduit}
                                />

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
                                    onClick={handleDeleteProduit}
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
                            <span className="flex w-full justify-center"></span>
                            <span className="flex w-full justify-center"></span>
                        </td>
                        <td id="null" className="px-2 py-1 text-[0.7rem] text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] h-10 whitespace-normal break-words">
                            <div className="flex w-full justify-center space-x-1 md:space-x-3">
                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faCartShopping"
                                    disable={disableBtn.includes(3)}
                                    icon={true}
                                    onClick={handleAjoutPanier}
                                />
                            {info.user.role == 0 && (
                            <>    
                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faEye"
                                    icon={true}
                                    onClick={handleVoirProduit}
                                />

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
                                    onClick={handleDeleteProduit}
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
                            <span className="flex w-full justify-center"></span>
                            <span className="flex w-full justify-center"></span>
                        </td>
                        <td id="null" className="px-2 py-1 text-[0.7rem] text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] h-10 whitespace-normal break-words">
                            <div className="flex w-full justify-center space-x-1 md:space-x-3">
                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faCartShopping"
                                    disable={disableBtn.includes(4)}
                                    icon={true}
                                    onClick={handleAjoutPanier}
                                />
                            {info.user.role == 0 && (
                            <>    
                                <Button 
                                    bgColor="#FFC107"
                                    textColor="#383F51"
                                    content="faEye"
                                    icon={true}
                                    onClick={handleVoirProduit}
                                />

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
                                    onClick={handleDeleteProduit}
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

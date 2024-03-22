import { BodyAuth, HeaderForm, ContentForm, DivInput, Input, Button, Retour } from '../../components';
import {  useLayoutEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/features/htmlElementsSlice';

const Add = () => {

    const navigateTo = useNavigate();
    const dispatch = useDispatch();

    const [designation, setDesignation] = useState('');
    const [prix, setPrix] = useState('');
    const [quantite, setQuantite] = useState('');
    const [dateIn, setDateIn] = useState('');
    const [categorie, setCategorie] = useState('');


    const categorieList = useRef(null);

    const onChangeDesignation = (event) => {
        setDesignation(event.target.value);
    }

    const onChangePrix = (event) => {
        setPrix(event.target.value);
    }

    const onChangeQuantite = (event) => {
        setQuantite(event.target.value);
    }

    const onChangeDateIn = (event) => {
        setDateIn(event.target.value);
    }

    const onChangeCategorie = (event) => {
        setCategorie(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!designation || !prix || !dateIn || !quantite || !categorie) {
            alert('Veuillez bien remplir les champs');
            return;
        }

        const form = {
            designation: designation,
            prix: parseFloat(prix), 
            dateIn: dateIn,
            quantite: parseInt(quantite),
            categorieId: parseInt(categorie),
        }; 

        const createProduct = async () => {
            try {
                let response = await axios.post(`http://localhost:3000/produits`, form)
                if (response.status === 200) {
                    navigateTo('/produits');
                } else {
                    alert('Erreur');
                }
            } catch (error) {
                alert('Veuillez bien remplir les champs');
            }
        }
        createProduct();
    }

    useLayoutEffect(() => {
        dispatch(setLoading(true));
        const getCategorie = async () => {
            try {
                let response = await axios.get(`http://localhost:3000/categories/All`);
                let data = await response.data;
                let categerieDom = categorieList.current;

                let options = data.map(element => `<option value="${element.id}">${element.designation}</option>`).join('');
                setCategorie(data[0].id);
                categerieDom.innerHTML = options;
            } catch (error) {
                console.log(error);
            }
        }

        getCategorie();
        dispatch(setLoading(false));
    }, [])


    return (
        <BodyAuth>
            <Retour href='/produits'/>

            <HeaderForm content="Ajout produit"/>
            <ContentForm onSubmit={handleSubmit}>
                    <DivInput>
                        <Input id="designation" type="text" label="Designation" inputName="designation" onChange={onChangeDesignation} double={true}/>
                        <Input id="prix" type="number" label="Prix" inputName="prix" onChange={onChangePrix} double={true}/>
                    </DivInput>

                    <DivInput>
                        <Input id="quantite" type="number" label="Quantité" inputName="quantite" onChange={onChangeQuantite} double={true}/>
                        <Input id="date_in" type="date" label="Date d'arrivée" inputName="date_in" onChange={onChangeDateIn} double={true}/>
                    </DivInput>

                    <DivInput>
                        <Input id="categorie" type="select" label="Categorie" onChange={onChangeCategorie} inputName="categorie" refComponent={categorieList}>
                        </Input>
                    </DivInput>

                    <DivInput>
                        <Button
                            bgColor="#FFC107"
                            textColor="#383F51"
                            content="Enregistrer"
                            icon={false}
                        />
                    </DivInput>
            </ContentForm>
        </BodyAuth>
    )
}

export default Add;
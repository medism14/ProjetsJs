import { BodyAuth, HeaderForm, ContentForm, DivInput, Input, Button, Retour } from '../../components';
import {  useLayoutEffect, useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/features/htmlElementsSlice';

const Edit = () => {

    var { id } = useParams();
    id = parseInt(id);

    const navigateTo = useNavigate();
    const dispatch = useDispatch();

    const [designation, setDesignation] = useState('');
    const [prix, setPrix] = useState('');
    const [quantite, setQuantite] = useState('');
    const [dateIn, setDateIn] = useState('');
    const [categorie, setCategorie] = useState('');

    const [allCategorie, setAllCategorie] = useState([]);


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

        const editProduct = async () => {
            try {
                let response = await axios.put(`http://localhost:3000/produits/${id}`, form)
                if (response.status === 200) {
                    navigateTo('/produits');
                } else {
                    alert('Erreur');
                }
            } catch (error) {
                console.error(error.message);
            }
        }
        editProduct();
    }

    useEffect(() => {
        dispatch(setLoading(true));
        const defineProduit = async () => {
            try {
                let response = await axios.get(`http://localhost:3000/produits/${id}`);
                let data = await response.data;
                setDesignation(data.designation);
                setPrix(data.prix);
                setQuantite(data.quantite);
                setDateIn(data.dateIn);
                setCategorie(data.categorieId);
            } catch (error) {

            }
        }
        defineProduit();

        const getCategorie = async () => {
            try {
                let response = await axios.get(`http://localhost:3000/categories/All`);
                let data = await response.data;

                setAllCategorie(data);
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
            <HeaderForm content="Modifier produit"/>

            <ContentForm onSubmit={handleSubmit}>
                    <DivInput>
                        <Input id="designation" type="text" label="Designation" inputName="designation" value={designation} onChange={onChangeDesignation} double={true} required={true}/>
                        <Input id="prix" type="number" label="Prix" inputName="prix" value={prix} onChange={onChangePrix} double={true} required={true}/>
                    </DivInput>

                    <DivInput>
                        <Input id="quantite" type="number" label="Quantité" inputName="quantite" value={quantite} onChange={onChangeQuantite} double={true} required={true}/>
                        <Input id="date_in" type="date" label="Date d'arrivée" inputName="date_in" value={dateIn} onChange={onChangeDateIn} double={true} required={true}/>
                    </DivInput>

                    <DivInput>
                    <Input id="categorie" type="select" label="Categorie" onChange={onChangeCategorie} inputName="categorie" value={categorie}>
                        {allCategorie.map((value, index) => (
                            <option key={index} value={value.id}>{value.designation}</option>
                        ))}
                    </Input>
                    </DivInput>

                    <DivInput>
                        <Button
                            bgColor="#FFC107"
                            textColor="#383F51"
                            content="Modifier"
                            icon={false}
                        />
                    </DivInput>
            </ContentForm>
        </BodyAuth>
    )
}

export default Edit;
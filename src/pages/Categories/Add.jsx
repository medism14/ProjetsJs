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

    const categorieList = useRef(null);

    const onChangeDesignation = (event) => {
        setDesignation(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!designation) {
            alert('Veuillez bien remplir les champs');
            return;
        }

        const form = {
            designation: designation,
        }; 

        const createProduct = async () => {
            try {
                let response = await axios.post(`http://localhost:3000/categories`, form)
                if (response.status === 200) {
                    navigateTo('/categories');
                } else {
                    alert('Erreur');
                }
            } catch (error) {
                alert('Veuillez bien remplir les champs');
            }
        }
        createProduct();
    }

    return (
        <BodyAuth>
            <Retour href='/categories'/>

            <HeaderForm content="Ajout Categorie"/>
            <ContentForm onSubmit={handleSubmit}>
                    <DivInput>
                        <Input id="designation" type="text" label="Designation" inputName="designation" onChange={onChangeDesignation} double={false}/>
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
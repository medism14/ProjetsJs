import { BodyAuth, HeaderForm, ContentForm, DivInput, Input, Button, Retour } from '../../components';
import {  useLayoutEffect, useState, useRef } from 'react';
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

        const editCategorie = async () => {
            try {
                let response = await axios.put(`http://localhost:3000/categories/${id}`, form)
                if (response.status === 200) {
                    navigateTo('/categories');
                } else {
                    alert('Erreur');
                }
            } catch (error) {
                console.error(error.message);
            }
        }
        editCategorie();
    }

    useLayoutEffect(() => {
        dispatch(setLoading(true));

        const defineProduit = async () => {
            try {
                let response = await axios.get(`http://localhost:3000/categories/${id}`);
                let data = await response.data;
                setDesignation(data.designation);
            } catch (error) {

            }
        }

        defineProduit();
        dispatch(setLoading(false));
    }, [])


    return (
        <BodyAuth>
            <Retour href='/categories'/>
            <HeaderForm content="Modifier produit"/>

            <ContentForm onSubmit={handleSubmit}>
                    <DivInput>
                        <Input id="designation" type="text" label="Designation" inputName="designation" value={designation} onChange={onChangeDesignation} double={false} required={true}/>
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
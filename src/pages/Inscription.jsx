import Body from "../components/Body";
import ContentForm from "../components/ContentForm";
import Input from "../components/Input";
import DivInput from "../components/DivInput";
import HeaderForm from "../components/HeaderForm";
import Button from "../components/Button";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { useDispatch } from "react-redux";
import { loggedIn, actualUserSet } from "../redux/features/userSlice";

import axios from 'axios';
import Cookies from 'js-cookie';

const Inscription = () => {
    
    const navigateTo = useNavigate();
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFirstName = (event) => {
        setFirstName(event.target.value)
    }

    const handleLastName = (event) => {
        setLastName(event.target.value)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleRegister = async (event) => {
        event.preventDefault();
        try {

            const body = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            }

            const response = await axios.post('http://localhost:3000/auth/register', body);
            
            if (response.status === 200) {
                const accessToken = await response.data.accessToken;
                const user = await response.data.user;

                Cookies.set('access_token', accessToken, { expires: 7, secure: true });
                Cookies.set('id', user.id, { expires: 7, secure: true });

                dispatch(loggedIn(true));
                dispatch(actualUserSet(user));
                // navigateTo('/produits');
            } else {
                alert('Erreur lors de l\'enregistrement');
            }
        } catch (error) {
            alert(error.response.data.message);
        }    
    }
    
    return (
        <>
        <Body>
            <HeaderForm content="Inscription"/>

            <ContentForm onSubmit={handleRegister}>
                <DivInput>
                    <Input id="firstName" type="text" label="Prenom" inputName="firstName" double={true} onChange={handleFirstName}/>
                    <Input id="lastName" type="text" label="Nom" inputName="lastName" double={true} onChange={handleLastName}/>
                </DivInput>

                <DivInput>
                    <Input id="email" type="email" label="Email" inputName="email" onChange={handleEmail}/>
                </DivInput>

                <DivInput>
                    <Input id="password" type="password" label="Mot de passe" inputName="password" onChange={handlePassword}/>
                </DivInput>

                <DivInput>
                    <Button
                        bgColor="#FFC107"
                        textColor="#383F51"
                        content="S'inscrire"
                        icon={false}
                    />
                </DivInput>
            </ContentForm>
        </Body>
        </>
    );
}

export default Inscription;

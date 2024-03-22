import Body from "../components/Body";
import ContentForm from "../components/ContentForm";
import Input from "../components/Input";
import DivInput from "../components/DivInput";
import HeaderForm from "../components/HeaderForm";
import Button from "../components/Button";

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useDispatch } from "react-redux";
import { loggedIn, actualUserSet } from "../redux/features/userSlice";

import Cookies from 'js-cookie';



const Connexion = () => {
    
    const navigateTo = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const body = {
                email: email,
                password: password
            }

            const response = await axios.post('http://localhost:3000/auth/login', body);

            if (response.status === 200) {
                const accessToken = await response.data.accessToken;
                const user = await response.data.user;

                Cookies.set('access_token', accessToken, { expires: 7, secure: true });
                Cookies.set('id', user.id, { expires: 7, secure: true });
                dispatch(loggedIn(true));
                dispatch(actualUserSet(user));
                navigateTo('/produits');
            } else {
                alert('Veuillez entrer les bonnes informations');
            }

        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <>
        <Body>
            <HeaderForm content="Authentification"/>

            <ContentForm onSubmit={handleLogin}>
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
                            content="Se connecter"
                            icon={false}
                        />
                    </DivInput>
            </ContentForm>
        </Body>
        </>
    );
}

export default Connexion;
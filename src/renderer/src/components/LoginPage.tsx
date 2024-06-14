import { StaticConfig } from '@renderer/app/config/config';
import React, { useContext, useState } from 'react';
import { FormButton, FormInput, FormLabel } from './layout/form/FormComponents';
import { Modal, ModalContent } from './layout/modal/ModalComponents';
import { Button } from 'antd';
import { LanguageContext } from '@renderer/app/contexts/LanguageContext';

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const { language } = useContext(LanguageContext)

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        try {
            const response = await fetch(`${StaticConfig.host}/User/authenticate?Email=${email}&Password=${password}`, {
                method: 'POST',
            });

            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error('Usuário ou senha incorretos.');
                }
                if (response.status === 500) {
                    throw new Error('Erro interno do servidor.');
                }
                throw new Error('Algo deu errado.');
            }

            const data = await response.json();
            localStorage.setItem(StaticConfig.authTokenKeyString, data.token);
            localStorage.setItem(StaticConfig.userDataKeyString, data.idUser);
            setShowModal(true);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Algo deu errado.');
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <FormLabel>{language.words.email}</FormLabel>
                    <FormInput
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <FormLabel>{language.words.password}</FormLabel>
                    <FormInput
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <FormButton type="submit">{language.words.login}</FormButton>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {showModal && (
                    <Modal>
                        <ModalContent>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <p>{language.words.loginSuccessfulMessage}</p>
                                <Button onClick={() => window.location.reload()}>{language.words.continue}</Button>
                            </div>
                        </ModalContent>
                    </Modal>
                )}
            </form>
        </div>
    );
};
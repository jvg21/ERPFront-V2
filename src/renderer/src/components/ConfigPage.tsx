import { LanguageContext } from "@renderer/app/contexts/LanguageContext";
import { useContext, useState } from "react";
import { ModuleTitleStyle } from "./Styles";
import { FormButton, FormLabel } from "./layout/form/FormComponents";
import LanguageSelect from "./utils/LanguageSelect";
import ThemeSelect from "./utils/ThemeSelect";
import { Button } from "antd";
import { Modal, ModalContent } from "./layout/modal/ModalComponents";
import { Logout } from "./utils/Logout";
import DataFormatSelect from "./utils/DataFormatSelect";

export function ConfigPage() {
    const [showModal, setShowModal] = useState(false);
    const { language } = useContext(LanguageContext)
    const Words = language.words
    return (
        <>
            <ModuleTitleStyle>{Words.config}</ModuleTitleStyle>
            <div style={{ gap: "15px", padding: "20px" }}>
                <FormLabel>Selecione a Linguagem</FormLabel>
                <LanguageSelect />
                <FormLabel>Selecione o Tema</FormLabel>
                <ThemeSelect />
                <FormLabel>Selecione o Formato de Data</FormLabel>
                <DataFormatSelect />
            </div>

            <FormButton onClick={() => setShowModal(true)} >Logout</FormButton>

            {showModal && (
                <Modal>
                    <ModalContent>
                        <div style={{ display: "flex", flexDirection: "column", gap: '15px' }}>
                            <p>{Words.confirmationLogoutMessage}</p>
                            <Button onClick={() => Logout()}>{Words.confirm}</Button>
                            <Button onClick={() => setShowModal(false)}>{Words.cancel}</Button>
                        </div>
                    </ModalContent>
                </Modal>
            )}
        </>
    )
}
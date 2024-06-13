import React, { useContext, useEffect, useState } from "react";
import { Button, Space, Table, notification } from 'antd';
import { CloseButton, Modal, ModalContent, ModuleContainer } from "@renderer/components/layout/modal/ModalComponents";
import { FormButton, FormInput, FormLabel, FormSelect, FormStyle } from "@renderer/components/layout/form/FormComponents";
import { StaticConfig } from "@renderer/app/config/config";
import { LanguageContext } from "@renderer/app/contexts/LanguageContext";
import { FormatCPF } from "@renderer/components/utils/FormatCpf";
import { formatDateToISO } from "@renderer/components/utils/FormatDate";
import { UserModel } from "./model/Model";
import { UserService } from "./service/Service";
import { getSex } from "@renderer/app/enum/Sexs";

export function UserMainPage() {
    type ModelType = UserModel;
    const ApiService = new UserService();
    const defaultValue: ModelType = {
        idUser: 0,
        nameUser: '',
        birth: '',
        sex: 0,
        cpf: '',
        password: '',
        phone: '',
        userType: 1
    };

    const [entries, setEntries] = useState<ModelType[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState<ModelType>(defaultValue);
    const [formSubmit, setFormSubmit] = useState<string>(StaticConfig.createFormId);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const { language } = useContext(LanguageContext);
    const Words = language.words;

    useEffect(() => {
        setList();
    }, [formData]);

    async function setList() {
        const response = await ApiService.getAll();
        if (response) setEntries(response);
    }

    function handleCloseModal() {
        setShowModal(false);
        setFormData(defaultValue);
    }

    function handleCreate() {
        setFormSubmit(StaticConfig.createFormId);
        setShowModal(true);
        setFormData(defaultValue);
        setList();
    }

    function handleEdit(entry: ModelType) {
        setFormSubmit(StaticConfig.updateFormId);
        setShowModal(true);
        setFormData(entry);
        setList();
    }

    const handleConfirmDelete = async (idUser: number) => {
        if (idUser) {
            const response = await ApiService.delete(idUser);
            if (response) {
                notification.success({
                    message: Words.success,
                    description: 'Successfully deleted.',
                });
                setList();
            }
        }
        setConfirmDelete(false);
    };

    const handleDelete = (entry: ModelType) => {
        setFormData(entry);
        setConfirmDelete(true);
    };

    const handleCreateSubmit = async (event: React.FormEvent<HTMLFormElement>, data: ModelType) => {
        event.preventDefault();
        const response = await ApiService.create(data);
        notification.success({
            message: Words.success,
            description: 'Successfully created.',
        });
        handleCloseModal();
    };

    const handleUpdateSubmit = async (event: React.FormEvent<HTMLFormElement>, data: ModelType) => {
        event.preventDefault();
        if (data.idUser) {
            const response = await ApiService.update(data.idUser, data);
            notification.success({
                message: Words.success,
                description: 'Successfully updated.',
            });
        }
        handleCloseModal();
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (formData.birth) formData.birth = formatDateToISO(new Date(formData.birth));
        if (formSubmit === StaticConfig.createFormId) {
            handleCreateSubmit(event, formData);
        } else if (formSubmit === StaticConfig.updateFormId) {
            handleUpdateSubmit(event, formData);
        }
    }

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === 'cpf' ? FormatCPF(value) : value
        }));
    }

    const columns: any[] = [
        {
            title: 'ID',
            dataIndex: 'idUser',
            key: 'idUser',
            render: (text: number) => <a>{text}</a>,
        },
        {
            title: 'Name',
            dataIndex: 'nameUser',
            key: 'nameUser',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Birth',
            dataIndex: 'birth',
            key: 'birth',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'CPF',
            dataIndex: 'cpf',
            key: 'cpf',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Gender',
            dataIndex: 'sex',
            key: 'sex',
            render: (text: string) => <a>{getSex(Number(text))}</a>,
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: Words.actions,
            key: 'actions',
            render: (text: any, record: ModelType) => (
                <Space size="middle">
                    <Button onClick={() => handleEdit(record)}>{Words.edit}</Button>
                    <Button onClick={() => handleDelete(record)}>{Words.cancel}</Button>
                </Space>
            ),
        }
    ];

    return (
        <ModuleContainer>
            <h1>{language.modules.userModule.label}</h1>
            <FormButton onClick={() => handleCreate()}>{Words.create}</FormButton>
            <Table columns={columns} dataSource={entries} style={{ width: "90%" }} />

            {showModal && (
                <Modal>
                    <ModalContent>
                        <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
                        <FormStyle onSubmit={handleSubmit}>
                            <FormInput type="hidden" name="idUser" disabled value={formData.idUser} />
                            <FormLabel htmlFor="nameUser">Name</FormLabel>
                            <FormInput type="text" name="nameUser" onChange={handleOnChange} placeholder="Enter Name" value={formData.nameUser} />
                            <FormLabel htmlFor="birth">Birth</FormLabel>
                            <FormInput type="date" name="birth" value={formData.birth} onChange={handleOnChange} />
                            <FormLabel htmlFor="sex">Gender</FormLabel>
                            <FormSelect name="sex" value={formData.sex} onChange={handleOnChange}>
                                <option value={0}>Male</option>
                                <option value={1}>Female</option>
                            </FormSelect>
                            <FormLabel htmlFor="phone">Phone</FormLabel>
                            <FormInput type="text" name="phone" onChange={handleOnChange} placeholder="Enter Phone" value={formData.phone} />
                            <FormLabel htmlFor="cpf">CPF</FormLabel>
                            <FormInput type="text" maxLength={14} name="cpf" onChange={handleOnChange} disabled={formSubmit === StaticConfig.updateFormId} placeholder="Enter CPF" value={formData.cpf} />
                            <FormButton type="submit">{Words.send}</FormButton>
                        </FormStyle>
                    </ModalContent>
                </Modal>
            )}
            {confirmDelete && (
                <Modal>
                    <div style={{ display: "flex", alignItems: "center", textAlign: "center", justifyContent: "center" }}>
                        <ModalContent>
                            <p>{Words.confirmationDeleteMessage}</p>
                            <Button onClick={() => handleConfirmDelete(formData.idUser)}>{Words.confirm}</Button>
                            <Button onClick={() => setConfirmDelete(false)}>{Words.cancel}</Button>
                        </ModalContent>
                    </div>
                </Modal>
            )}
        </ModuleContainer>
    );
}

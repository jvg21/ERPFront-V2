import { useContext, useEffect, useState } from "react";
import { Button, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { notification } from 'antd';
import { PersonModel } from "./model/Model";
import { PersonService } from "./service/Service";
import { CloseButton, Modal, ModalContent, ModuleContainer } from "@renderer/components/layout/modal/ModalComponents";
import { FormButton, FormInput, FormLabel, FormStyle } from "@renderer/components/layout/form/FormComponents";
import { StaticConfig } from "@renderer/app/config/config";
import { LanguageContext } from "@renderer/app/contexts/LanguageContext";
import { FormatCPF } from "@renderer/components/utils/FormatCpf";
import { formatDateToISO } from "@renderer/components/utils/FormatDate";

export function PersonMainPage() {
    type ModelType = PersonModel;
    const ApiService = new PersonService();
    const defaltValue: ModelType = {
        id: 0,
        name: '',
        birth: '',
        sex: 0,
        cpf: ''
    }

    const [entries, setEntries] = useState<ModelType[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState<ModelType>(defaltValue);
    const [formSubmit, setFormSubmit] = useState<string>(StaticConfig.createFormId)
    const [confirmDelete, setConfirmDelete] = useState(false);
    const { language } = useContext(LanguageContext)
    const Words = language.words
    const PersonWords = language.modules.personModule.words

    useEffect(() => {
        setList();
    }, [])

    async function setList() {
        const response = await ApiService.getAll();
        if (response) setEntries(response)
    }

    function handleCloseModal() {
        setShowModal(false);
        setFormData(defaltValue);
    };

    function handleCreate() {
        setFormSubmit(StaticConfig.createFormId)
        setShowModal(true)
        setFormData(defaltValue)
        setList()
    }

    function handleEdit(entry: ModelType) {
        setFormSubmit(StaticConfig.updateFormId)
        setShowModal(true)
        setFormData(entry)
        setList()
    }

    const handleConfirmDelete = async (id: number) => {
        if (id) {
            const response = await ApiService.delete(id);
            if (response) {
                notification.success({
                    message: Words.success,
                    description: PersonWords.deleteNotificationDescription,
                });
                setList();
            }
        }
        setConfirmDelete(false);
    };

    const handleDelete = (entry: ModelType) => {
        setFormData(entry)
        setConfirmDelete(true);
    };

    const handleCreateSubmit = async (event: React.FormEvent<HTMLFormElement>, data: ModelType) => {
        event.preventDefault()
        const response = await ApiService.create(data)
        if (response) {
            notification.success({
                message: Words.success,
                description: PersonWords.createNotificationDescription,
            });
            setList()
        }
        handleCloseModal()
    }

    const handleUpdateSubmit = async (event: React.FormEvent<HTMLFormElement>, data: ModelType) => {
        event.preventDefault()
        if (data.id) {
            const response = await ApiService.update(data.id, data)
            if (response) {
                notification.success({
                    message: Words.success,
                    description: PersonWords.updateNotificationDescription,
                });
                setList()
            }
        }
        handleCloseModal()
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (formData.birth) formData.birth = formatDateToISO(new Date(formData.birth));
        if (formSubmit === StaticConfig.createFormId) {
            handleCreateSubmit(event, formData);
        } else if (formSubmit === StaticConfig.updateFormId) {
            handleUpdateSubmit(event, formData);
        }
    }

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === 'cpf' ? FormatCPF(value) : value
        }));

    }

    const columns: TableProps<ModelType>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: PersonWords.name,
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: PersonWords.birth,
            dataIndex: 'birth',
            key: 'birth',
            render: (text) => <a>{text}</a>,
        },
        {
            title: PersonWords.cpf,
            dataIndex: 'cpf',
            key: 'cpf',
            render: (text) => <a>{text}</a>,
        },
        // {
        //     title: PersonWords.sex,
        //     dataIndex: 'sex',
        //     key: 'sex',
        //     render: (text) => <a>{text}</a>,
        // },
        {
            title: Words.actions,
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => handleEdit(record)}>{Words.edit}</Button>
                    <Button onClick={() => handleDelete(record)}>{Words.cancel}</Button>
                </Space>
            ),
        }
    ]

    return (
        <ModuleContainer>
            <h1>{language.modules.personModule.label}</h1>
            <FormButton onClick={() => handleCreate()} >{Words.create}</FormButton>
            <Table columns={columns} dataSource={entries} style={{ width: "90%" }} />

            {showModal &&
                <Modal>
                    <ModalContent>
                        <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
                        <FormStyle onSubmit={handleSubmit}>
                            <FormInput type="hidden" name="id" disabled value={formData.id} />
                            <FormLabel htmlFor="name"> {PersonWords.name}</FormLabel>
                            <FormInput type="text" name="name" onChange={handleOnChange} placeholder="Enter Name" value={formData.name} />
                            <FormLabel htmlFor="birth">{PersonWords.birth}</FormLabel>
                            <FormInput type="date" name="birth" value={formData.birth} onChange={handleOnChange} />
                            {/* <select name="sex" value={formData.sex} onChange={handleOnChange}>
                                <option value={0}>Male</option>
                                <option value={1}>Female</option>
                            </select> */}
                            {/* <FormInput type="number" name="sex" onChange={handleOnChange} placeholder="Enter Sex" value={formData.sex.toString()} /> */}
                            <FormLabel htmlFor="cpf">{PersonWords.cpf}</FormLabel>
                            <FormInput type="text" maxLength={14} name="cpf" onChange={handleOnChange} disabled={formSubmit==="updade"?true:false} placeholder="Enter cpf" value={formData.cpf} />
                            <FormButton type="submit" >{Words.send}</FormButton>
                        </FormStyle>
                    </ModalContent>
                </Modal>
            }
            {confirmDelete && (
                <Modal>
                    <div style={{ display: "flex", alignItems: "center", textAlign: "center", justifyContent: "center" }}>
                        <ModalContent>
                            <p>{Words.confirmationDelete}</p>
                            <Button onClick={() => handleConfirmDelete(formData.id)}>{Words.confirm}</Button>
                            <Button onClick={() => setConfirmDelete(false)}>{Words.cancel}</Button>
                        </ModalContent>
                    </div>
                </Modal>
            )}
        </ModuleContainer>
    )
}

import React, { useContext, useEffect, useState } from "react";
import { Button, Space, Table, notification } from 'antd';
import { CloseButton, Modal, ModalContent, ModuleContainer } from "@renderer/components/layout/modal/ModalComponents";
import FormError, { FormButton, FormInput, FormLabel, FormSelect, FormStyle } from "@renderer/components/layout/form/FormComponents";
import { StaticConfig } from "@renderer/app/config/config";
import { LanguageContext } from "@renderer/app/contexts/LanguageContext";
import { FormatCPF } from "@renderer/components/utils/FormatCpf";
import { formatDate, formatDateToISO } from "@renderer/components/utils/FormatDate";
import { UserModel } from "./model/Model";
import { UserService } from "./service/Service";
import { ModuleTitleStyle } from "@renderer/components/Styles";
import { getGender } from "@renderer/app/enum/Sexs";
import { cpfRegex, emailRegex, phoneRegex } from "@renderer/app/regex/Regex";
import { FormatPhone } from "@renderer/components/utils/FormatPhone";
import { Roles, getRoles } from "@renderer/app/enum/Admin";
import { UserContext } from "@renderer/app/contexts/UserContext";

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
        email: '',
        userType: 1
    };

    const [entries, setEntries] = useState<ModelType[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState<ModelType>(defaultValue);
    const [formSubmit, setFormSubmit] = useState<string>(StaticConfig.createFormId);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const { language, dataFormat } = useContext(LanguageContext);
    const { UserData } = useContext(UserContext);
    const Words = language.words;
    const UserWords = language.modules.userModule.words;
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

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
        setFormErrors({});
    }

    function handleCreate() {
        setFormSubmit(StaticConfig.createFormId);
        setShowModal(true);
        setFormData(defaultValue);
        setFormErrors({});
        setList();
    }

    function handleEdit(entry: ModelType) {
        setFormSubmit(StaticConfig.updateFormId);
        setShowModal(true);
        setFormData(entry);
        setFormErrors({});
        setList();
    }

    const handleConfirmDelete = async (idUser: number) => {
        if (idUser) {
            const response = await ApiService.delete(idUser);
            if (response) {
                notification.success({
                    message: Words.success,
                    description: Words.confirmationDeleteMessage,
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
        data.password = data.email
        try {
            const response = await ApiService.create(data);
            notification.success({
                message: Words.success,
                description: UserWords.createNotificationDescription,
            });
        } catch (error) {
            notification.error({
                message: Words.error,
                description: UserWords.createNotificationError,
            });
        }
        handleCloseModal();
    };

    const handleUpdateSubmit = async (event: React.FormEvent<HTMLFormElement>, data: ModelType) => {
        event.preventDefault();
        try {
            if (data.idUser) {
                const response = await ApiService.update(data.idUser, data);
                notification.success({
                    message: Words.success,
                    description: UserWords.updateNotificationDescription,
                });
            }
        } catch (error) {
            notification.error({
                message: Words.error,
                description: UserWords.updateNotificationError,
            });
        }
        handleCloseModal();
    };

    function validateForm(data: ModelType) {
        const errors: Record<string, string> = {};

        if (!data.nameUser) errors.nameUser = UserWords.nameValidation;
        if (!data.birth) errors.birth = UserWords.birthValidation;
        else {
            const birthDate = new Date(data.birth);
            const age = new Date().getFullYear() - birthDate.getFullYear();
            if (age < 16) errors.birth = UserWords.ageValidation;
        }
        if (!data.sex && data.sex !== 0) errors.sex = UserWords.sexValidation;
        if (!data.cpf) errors.cpf = UserWords.cpfValidation;
        else if (!cpfRegex.test(data.cpf)) errors.cpf = UserWords.cpfFormatValidation;
        if (!data.email) errors.email = UserWords.emailValidation;
        else if (!emailRegex.test(data.email)) errors.email = UserWords.emailFormatValidation;
        if (!data.phone) errors.phone = UserWords.phoneValidation;
        else if (!phoneRegex.test(data.phone)) errors.phone = UserWords.phoneFormatValidation;

        return errors;
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (formData.birth) formData.birth = formatDateToISO(new Date(formData.birth));
        const errors = validateForm(formData);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
        } else {
            if (formSubmit === StaticConfig.createFormId) {
                handleCreateSubmit(event, formData);
            } else if (formSubmit === StaticConfig.updateFormId) {
                handleUpdateSubmit(event, formData);
            }
        }
    }

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === 'cpf' ? FormatCPF(value) : name === 'phone' ? FormatPhone(value) : name === 'data' ? new Date(value).toISOString() : value
        }));
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    }

    function handleOnSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === "sex" || name==="userType"? Number(value) : value,
        }));
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
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
            title: UserWords.name,
            dataIndex: 'nameUser',
            key: 'nameUser',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: UserWords.birth + " (" + dataFormat + ")",
            dataIndex: 'birth',
            key: 'birth',
            render: (text: string) => <a>{formatDate(new Date(text), dataFormat)}</a>,
        },
        {
            title: UserWords.cpf,
            dataIndex: 'cpf',
            key: 'cpf',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: UserWords.sex,
            dataIndex: 'sex',
            key: 'sex',
            render: (text: string) => <a>{getGender(Number(text))}</a>,
        },
        {
            title: Words.email,
            dataIndex: 'email',
            key: 'email',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: UserWords.phone,
            dataIndex: 'phone',
            key: 'phone',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: Words.user,
            dataIndex: 'userType',
            key: 'userType',
            render: (text: string) => <a>{getRoles(Number(text))}</a>,
        },

        {
            title: Words.actions,
            key: 'actions',
            render: (_: any, record: ModelType) => (
                <Space size="middle">
                    <Button disabled={UserData.userType !== Roles.Adm} onClick={() => handleEdit(record)}>{Words.edit}</Button>
                    <Button disabled={UserData.userType !== Roles.Adm} onClick={() => handleDelete(record)}>{Words.delete}</Button>
                </Space>
            ),
        }
    ];

    return (
        <ModuleContainer>
            <ModuleTitleStyle>{language.modules.userModule.label}</ModuleTitleStyle>
            <FormButton disabled={UserData.userType === Roles.Cliente} onClick={() => handleCreate()}>{Words.create}</FormButton>
            <Table columns={columns} dataSource={entries} rowKey="UserKey" style={{ width: "100%", overflow: 'auto' }} />

            {showModal && (
                <Modal>
                    <ModalContent>
                        <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
                        <FormStyle onSubmit={handleSubmit}>
                            <FormInput type="hidden" name="idUser" disabled value={formData.idUser} />
                            <FormLabel htmlFor="nameUser">{UserWords.name}</FormLabel>
                            <FormInput type="text" name="nameUser" onChange={handleOnChange} placeholder={UserWords.placeholderName} value={formData.nameUser} />
                            {formErrors.nameUser && <FormError>{formErrors.nameUser}</FormError>}
                            <FormLabel htmlFor="birth">{UserWords.birth}</FormLabel>
                            <FormInput type="date" name="birth" value={formData.birth} onChange={handleOnChange} />
                            {formErrors.birth && <FormError>{formErrors.birth}</FormError>}
                            <FormLabel htmlFor="email">{Words.email}</FormLabel>
                            <FormInput type="email" name="email" value={formData.email} onChange={handleOnChange} />
                            {formErrors.email && <FormError>{formErrors.email}</FormError>}
                            <FormLabel htmlFor="sex">{UserWords.sex}</FormLabel>
                            <FormSelect name="sex" value={formData.sex} onChange={handleOnSelect}>
                                <option value="">----------------</option>
                                <option value={0}>{Words.male}</option>
                                <option value={1}>{Words.female}</option>
                            </FormSelect>
                            {formErrors.sex && <FormError>{formErrors.sex}</FormError>}
                            <FormLabel htmlFor="phone">{UserWords.phone}</FormLabel>
                            <FormInput type="text" name="phone" onChange={handleOnChange} placeholder={UserWords.placeholderPhone} value={formData.phone} maxLength={14} />
                            {formErrors.phone && <FormError>{formErrors.phone}</FormError>}
                            <FormLabel htmlFor="cpf">{UserWords.cpf}</FormLabel>
                            <FormInput type="text" maxLength={14} minLength={14} name="cpf" onChange={handleOnChange} placeholder={UserWords.placeholderCpf} value={formData.cpf} />
                            {formErrors.cpf && <FormError>{formErrors.cpf}</FormError>}
                            <FormLabel htmlFor="userType">{Words.user}</FormLabel>
                            <FormSelect
                                name="userType"
                                onChange={handleOnSelect}
                                value={formData.userType}
                                disabled={UserData.userType !== Roles.Adm}
                            >
                                {Object.keys(Roles).filter(key => isNaN(Number(key))).map((key ,index)=> (
                                    <option key={Roles[key]} value={index+1}>
                                        {key}
                                    </option>
                                ))}
                            </FormSelect>
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
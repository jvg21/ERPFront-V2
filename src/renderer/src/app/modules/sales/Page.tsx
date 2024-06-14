import { Modal, ModalContent, ModuleContainer } from "@renderer/components/layout/modal/ModalComponents";
import { SalesModel } from "./model/Model";
import { SalesService } from "./service/Service";
import { LanguageContext } from "@renderer/app/contexts/LanguageContext";
import { useContext, useEffect, useState } from "react";
import { StaticConfig } from "@renderer/app/config/config";
import { Button, Space, Table, TableProps, notification } from "antd";
import { UserContext } from "@renderer/app/contexts/UserContext";
import { Roles } from "@renderer/app/enum/Admin";
import { CarModel } from "../car/model/Model";
import { UserModel } from "../user/model/Model";
import { CarService } from "../car/service/Service";
import { UserService } from "../user/service/Service";
import { ModuleTitleStyle } from "@renderer/components/Styles";
import { FormButton } from "@renderer/components/layout/form/FormComponents";
import { formatDate } from "@renderer/components/utils/FormatDate";

export function SalesMainPage() {
    type ModelType = SalesModel;
    const ApiService = new SalesService();
    const defaultValue: ModelType = {
        idSale: undefined,
        fk_IdClient: null,
        fk_IdSeller: null,
        fk_IdCar: null,
        dthRegister: '',
        price: 0
    };

    const [entries, setEntries] = useState<ModelType[]>([]);
    const [cars, setCars] = useState<CarModel[]>([]);
    const [users, setUsers] = useState<UserModel[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState<ModelType>(defaultValue);
    const [formSubmit, setFormSubmit] = useState<string>(StaticConfig.createFormId);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const { language,dataFormat } = useContext(LanguageContext);
    const { UserData } = useContext(UserContext);
    const Words = language.words;
    const SalesWords = language.modules.salesModule.words
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        setList();
    }, [showModal]);

    async function setList() {
        try {
            const response = await ApiService.getAll();
            if (response) setEntries(response);
            const cars = await new CarService().getAll()
            if (cars) setCars(cars)
            const users = await new UserService().getAll()
            if (cars) setUsers(users)

        } catch (error) {
            notification.error({
                message: Words.error,
                description: SalesWords.fetchNotificationError,
            });
        }
    }

    const handleConfirmDelete = async (id: number | undefined) => {
        if (id) {
            try {
                const response = await ApiService.delete(id);
                if (response) {
                    notification.success({
                        message: Words.success,
                        description: SalesWords.deleteNotificationDescription,
                    });
                    setList()
                }
            } catch (error) {
                notification.error({
                    message: Words.error,
                    description: SalesWords.deleteNotificationError,
                });
            }
        }
        setConfirmDelete(false);
    };

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
    }

    function handleEdit(entry: ModelType) {
        setFormSubmit(StaticConfig.updateFormId);
        setShowModal(true);
        setFormData(entry);
        setFormErrors({});
    }
    const handleDelete = (entry: ModelType) => {
        setFormData(entry);
        setConfirmDelete(true);
    };

    const handleCreateSubmit = async (data: ModelType) => {
        try {
            const response = await ApiService.create(data);
            notification.success({
                message: Words.success,
                description: SalesWords.createNotificationDescription,
            });
        } catch (error) {
            notification.error({
                message: Words.error,
                description: SalesWords.createNotificationError,
            });
        }
        handleCloseModal();
    }

    const handleUpdateSubmit = async (data: ModelType) => {
        if (data.idSale) {
            try {
                const response = await ApiService.update(data.idSale, data);
                notification.success({
                    message: Words.success,
                    description: SalesWords.updateNotificationDescription,
                });
            } catch (error) {
                notification.error({
                    message: Words.error,
                    description: SalesWords.updateNotificationError,
                });
            }
        }
        handleCloseModal();
    }
    function validateForm(data: ModelType) { }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const errors = validateForm(formData);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
        } else {
            if (formSubmit === StaticConfig.createFormId) {
                handleCreateSubmit(formData);
            } else if (formSubmit === StaticConfig.updateFormId) {
                handleUpdateSubmit(formData);
            }
        }
    }

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === 'price' ? Number(value) : value,
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
            [name]: value,
        }));
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    }

    const columns: TableProps<ModelType>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'idSale',
            key: 'idSale',
            render: (text) => <a>{text}</a>,
        },
        {
            title: SalesWords.fk_IdClient,
            dataIndex: 'fk_IdClient',
            key: 'fk_IdClient',
            render: (fk_IdClient) => {
                const client = users.find(user => user.idUser === fk_IdClient);
                return <a>{client ? client.nameUser : 'Unknown'}</a>;
            },
        },
        {
            title: SalesWords.fk_IdSeller,
            dataIndex: 'fk_IdSeller',
            key: 'fk_IdSeller',
            render: (fk_IdSeller) => {
                const seller = users.find(user => user.idUser === fk_IdSeller);
                return <a>{seller ? seller.nameUser : 'Unknown'}</a>;
            },
        },
        {
            title: SalesWords.fk_IdCar,
            dataIndex: 'fk_IdCar',
            key: 'fk_IdCar',
            render: (fk_IdCar) => {
                const car = cars.find(car => car.idCar === fk_IdCar);
                return <a>{car ? `${car.brand} ${car.model}` : 'Unknown'}</a>;
            },
        },
        {
            title: SalesWords.price,
            dataIndex: 'price',
            key: 'price',
            render: (text) => <a>R$ {text.toFixed(2)}</a>,
        },
        {
            title: SalesWords.dthRegister,
            dataIndex: 'dthRegister',
            key: 'dthRegister',
            render: (text) => <a>{formatDate(new Date(text),dataFormat)}</a>,
        },
        {
            title: Words.actions,
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button disabled={UserData.userType === Roles.Cliente} onClick={() => handleEdit(record)}>{Words.edit}</Button>
                    <Button disabled={UserData.userType !== Roles.Adm} onClick={() => handleDelete(record)}>{Words.delete}</Button>
                </Space>
            ),
        }
    ];

    return (
        <ModuleContainer>
            <ModuleContainer>
                <ModuleTitleStyle>{language.modules.salesModule.label}</ModuleTitleStyle>
                <FormButton disabled={UserData.userType === Roles.Cliente} onClick={handleCreate}>{Words.create}</FormButton>
                <Table columns={columns} dataSource={entries} rowKey="idCar" style={{ width: "100%", overflow: 'auto' }} />
            </ModuleContainer>
            {confirmDelete && (
                <Modal>
                    <ModalContent>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <p>{Words.confirmationDeleteMessage}</p>
                            <Button onClick={() => handleConfirmDelete(formData.idSale)}>{Words.confirm}</Button>
                            <Button onClick={() => setConfirmDelete(false)}>{Words.cancel}</Button>
                        </div>
                    </ModalContent>
                </Modal>
            )}
        </ModuleContainer>
    )
}
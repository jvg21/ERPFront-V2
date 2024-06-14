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
import FormError, { FormButton, FormSelect, FormStyle, FormLabel, FormInput } from "@renderer/components/layout/form/FormComponents";
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
    const [carsWithouSales, setCarsWithouSales] = useState<CarModel[]>([]);
    const [users, setUsers] = useState<UserModel[]>([]);
    const [brands, setBrands] = useState<string[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState<ModelType>(defaultValue);
    const [formSubmit, setFormSubmit] = useState<string>(StaticConfig.createFormId);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const { language, dataFormat } = useContext(LanguageContext);
    const { UserData } = useContext(UserContext);
    const Words = language.words;
    const SalesWords = language.modules.salesModule.words;
    const CarWords = language.modules.carModule.words
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [filters, setFilters] = useState({
        dthRegistroINI: '',
        dthRegistroFIM: '',
        marcaCarro: '',
        idVendedor: '',
        precoINI: '',
        precoFIM: ''
    });

    useEffect(() => {
        setList();
    }, [showModal]);

    async function setList() {
        try {
            const sales = await ApiService.getAll();
            if (sales) setEntries(sales);

            const carService = new CarService();
            const userService = new UserService();

            const allCars = await carService.getAll();
            if (allCars) {
                const soldCarIds = new Set(sales.map(sale => sale.fk_IdCar));
                const carsWithoutSales = allCars.filter(car => {
                    if(car.idCar)!soldCarIds.has(car.idCar)
                    
                });
                setCarsWithouSales(carsWithoutSales);

                const uniqueBrands = Array.from(new Set(allCars.map(car => car.brand)));
                setBrands(uniqueBrands);
            }
            const allUsers = await userService.getAll();
            if (allUsers) setUsers(allUsers);

        } catch (error) {
            notification.error({
                message: Words.error,
                description: SalesWords.fetchNotificationError,
            });
        }
    }

    const handleFilter = async () => {
        try {
            const response = await ApiService.filter(filters);
            if (response) setEntries(response);

            notification.success({
                message: Words.success,
                description: SalesWords.filterNotificationDescription,
            });
        } catch (error) {
            notification.error({
                message: Words.error,
                description: SalesWords.filterNotificationError,
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
                    setList();
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
        data.dthRegister = new Date().toISOString();
        try {
            const response = await ApiService.create(data);
            notification.success({
                message: Words.success,
                description: SalesWords.createNotificationDescription,
            });
            setList();
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
                setList();
            } catch (error) {
                notification.error({
                    message: Words.error,
                    description: SalesWords.updateNotificationError,
                });
            }
        }
        handleCloseModal();
    }

    function validateForm(data: ModelType) {
        const errors: Record<string, string> = {};

        if (!data.fk_IdClient) errors.fk_IdClient = SalesWords.clientValidation;
        if (!data.fk_IdSeller) errors.fk_IdSeller = SalesWords.sellerValidation;
        if (!data.fk_IdCar) errors.fk_IdCar = SalesWords.carValidation;
        if (data.price <= 0) errors.price = SalesWords.priceValidation;
        
        return errors;
    }

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
            [name]: Number(value),
        }));
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    }

    function handleFilterChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
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
            render: (text) => <a>{formatDate(new Date(text), dataFormat)}</a>,
        },
        {
            title: Words.actions,
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button disabled={UserData.userType !== Roles.Adm} onClick={() => handleEdit(record)}>{Words.edit}</Button>
                    <Button disabled={UserData.userType !== Roles.Adm} onClick={() => handleDelete(record)}>{Words.delete}</Button>
                </Space>
            ),
        }
    ];

    return (
        <ModuleContainer>
            <ModuleTitleStyle>{language.modules.salesModule.label}</ModuleTitleStyle>
            <FormButton disabled={UserData.userType === Roles.Cliente} onClick={handleCreate}>{Words.create}</FormButton>

            <div>
                <FormLabel htmlFor="dthRegistroINI">{SalesWords.dthRegistroINI}</FormLabel>
                <FormInput type="date" name="dthRegistroINI" onChange={handleFilterChange} value={filters.dthRegistroINI} />
                
                <FormLabel htmlFor="dthRegistroFIM">{SalesWords.dthRegistroFIM}</FormLabel>
                <FormInput type="date" name="dthRegistroFIM" onChange={handleFilterChange} value={filters.dthRegistroFIM} />

                <FormLabel htmlFor="marcaCarro">{CarWords.brand}</FormLabel>
                <FormSelect name="marcaCarro" onChange={handleFilterChange} value={filters.marcaCarro}>
                    <option value="">--------</option>
                    {brands.map((marca) => (
                        <option key={marca} value={marca}>{marca}</option>
                    ))}
                </FormSelect>

                <FormLabel htmlFor="idVendedor">{SalesWords.idVendedor}</FormLabel>
                <FormSelect name="idVendedor" value={filters.idVendedor} onChange={handleFilterChange}>
                    <option value="">----------------</option>
                    {users.filter(user => user.userType === 2).map(user => (
                        <option key={user.idUser} value={user.idUser}>
                            {user.nameUser}
                        </option>
                    ))}
                </FormSelect>

                <FormLabel htmlFor="precoINI">{SalesWords.precoINI}</FormLabel>
                <FormInput type="number" name="precoINI" onChange={handleFilterChange} value={filters.precoINI} />

                <FormLabel htmlFor="precoFIM">{SalesWords.precoFIM}</FormLabel>
                <FormInput type="number" name="precoFIM" onChange={handleFilterChange} value={filters.precoFIM} />

                <Button onClick={handleFilter}>{Words.filter}</Button>
            </div>

            <Table columns={columns} dataSource={entries} rowKey="idSale" style={{ width: "100%", overflow: 'auto' }} />

            {showModal && (
                <Modal>
                    <ModalContent>
                        <Button onClick={handleCloseModal}>&times;</Button>
                        <FormStyle onSubmit={handleSubmit}>
                            <FormLabel htmlFor="fk_IdClient">{SalesWords.fk_IdClient}</FormLabel>
                            <FormSelect name="fk_IdClient" value={formData.fk_IdClient ?? ''} onChange={handleOnSelect}>
                                <option value="">----------------</option>
                                {users.filter(user => user.userType === 3).map(user => (
                                    <option key={user.idUser} value={user.idUser}>
                                        {user.nameUser}
                                    </option>
                                ))}
                            </FormSelect>
                            {formErrors.fk_IdClient && <FormError>{formErrors.fk_IdClient}</FormError>}

                            <FormLabel htmlFor="fk_IdSeller">{SalesWords.fk_IdSeller}</FormLabel>
                            <FormSelect name="fk_IdSeller" value={formData.fk_IdSeller ?? ''} onChange={handleOnSelect}>
                                <option value="">----------------</option>
                                {users.filter(user => user.userType === 2).map(user => (
                                    <option key={user.idUser} value={user.idUser}>
                                        {user.nameUser}
                                    </option>
                                ))}
                            </FormSelect>
                            {formErrors.fk_IdSeller && <FormError>{formErrors.fk_IdSeller}</FormError>}

                            <FormLabel htmlFor="fk_IdCar">{SalesWords.fk_IdCar}</FormLabel>
                            <FormSelect name="fk_IdCar" value={formData.fk_IdCar ?? ''} onChange={handleOnSelect}>
                                <option value="">----------------</option>
                                {carsWithouSales.map(car => (
                                    <option key={car.idCar} value={car.idCar}>
                                        {car.brand} {car.model}
                                    </option>
                                ))}
                            </FormSelect>
                            {formErrors.fk_IdCar && <FormError>{formErrors.fk_IdCar}</FormError>}
                            
                            <FormLabel htmlFor="price">{SalesWords.price}</FormLabel>
                            <FormInput type="number" name="price" onChange={handleOnChange} value={formData.price || ''} />
                            {formErrors.price && <FormError>{formErrors.price}</FormError>}

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
                            <Button onClick={() => handleConfirmDelete(formData.idSale)}>{Words.confirm}</Button>
                            <Button onClick={() => setConfirmDelete(false)}>{Words.cancel}</Button>
                        </ModalContent>
                    </div>
                </Modal>
            )}
        </ModuleContainer>
    )
}
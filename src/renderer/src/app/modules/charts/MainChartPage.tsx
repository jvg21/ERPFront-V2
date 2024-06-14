import { useContext, useState } from "react";
import { CarModel } from "../car/model/Model";
import { SalesModel } from "../sales/model/Model";
import { SalesService } from "../sales/service/Service";
import { CarService } from "../car/service/Service";
import { UserService } from "../user/service/Service";
import { UserModel } from "../user/model/Model";
import { Button, notification } from "antd";
import { UserContext } from "@renderer/app/contexts/UserContext";
import { LanguageContext } from "@renderer/app/contexts/LanguageContext";
import { FormButton, FormInput, FormLabel, FormSelect } from "@renderer/components/layout/form/FormComponents";
import { ModuleTitleStyle } from "@renderer/components/Styles";
import { ModuleContainer } from "@renderer/components/layout/modal/ModalComponents";

export function MainChartPage() {
    const [entries, setEntries] = useState<SalesModel[]>([]);
    const [cars, setCars] = useState<CarModel[]>([]);
    const [carsWithoutSales, setCarsWithoutSales] = useState<CarModel[]>([]);
    const [users, setUsers] = useState<UserModel[]>([]);
    const [brands, setBrands] = useState<string[]>([]);
    const { language, dataFormat } = useContext(LanguageContext);
    const { UserData } = useContext(UserContext);
    const Words = language.words;
    const SalesWords = language.modules.salesModule.words;
    const [filters, setFilters] = useState({
        dthRegistroINI: '',
        dthRegistroFIM: '',
        marcaCarro: '',
        idVendedor: '',
        precoINI: '',
        precoFIM: ''
    });

    async function setList() {
        try {
            const ApiService = new SalesService();
            const sales = await ApiService.getAll();
            if (sales) setEntries(sales);

            const carService = new CarService();
            const userService = new UserService();

            const allCars = await carService.getAll();
            if (allCars) {
                const soldCarIds = new Set(sales.map(sale => sale.fk_IdCar));
                const carsWithoutSales = allCars.filter(car => {
                    if (car.idCar) {
                        !soldCarIds.has(car.idCar)
                    }
                });
                setCarsWithoutSales(carsWithoutSales);
                setCars(allCars);

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
    function handleFilterChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    }

    const handleFilter = async () => {
        try {
            const ApiService = new SalesService();
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

    return (
        <ModuleContainer>
            <ModuleTitleStyle>{language.modules.salesModule.label}</ModuleTitleStyle>
            <FormButton disabled={UserData.userType === Roles.Cliente} onClick={handleCreate}>{Words.create}</FormButton>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                <div style={{ flex: "1" }}>
                    <FormLabel htmlFor="dthRegistroINI">{SalesWords.dthRegistroINI}</FormLabel>
                    <FormInput type="date" name="dthRegistroINI" onChange={handleFilterChange} value={filters.dthRegistroINI} />
                </div>
                <div style={{ flex: "1" }}>
                    <FormLabel htmlFor="dthRegistroFIM">{SalesWords.dthRegistroFIM}</FormLabel>
                    <FormInput type="date" name="dthRegistroFIM" onChange={handleFilterChange} value={filters.dthRegistroFIM} />
                </div>
                <div style={{ flex: "1" }}>
                    <FormLabel htmlFor="marcaCarro">{CarWords.brand}</FormLabel>
                    <FormSelect name="marcaCarro" onChange={handleFilterChange} value={filters.marcaCarro}>
                        <option value="">--------</option>
                        {brands.map((marca) => (
                            <option key={marca} value={marca}>{marca}</option>
                        ))}
                    </FormSelect>
                </div>
                <div style={{ flex: "1" }}>
                    <FormLabel htmlFor="idVendedor">{SalesWords.idVendedor}</FormLabel>
                    <FormSelect name="idVendedor" value={filters.idVendedor} onChange={handleFilterChange}>
                        <option value="">----------------</option>
                        {users.filter(user => user.userType === 2).map(user => (
                            <option key={user.idUser} value={user.idUser}>
                                {user.nameUser}
                            </option>
                        ))}
                    </FormSelect>
                </div>
                <div style={{ flex: "1" }}>
                    <FormLabel htmlFor="precoINI">{SalesWords.precoINI}</FormLabel>
                    <FormInput type="number" name="precoINI" onChange={handleFilterChange} value={filters.precoINI} />
                </div>
                <div style={{ flex: "1" }}>
                    <FormLabel htmlFor="precoFIM">{SalesWords.precoFIM}</FormLabel>
                    <FormInput type="number" name="precoFIM" onChange={handleFilterChange} value={filters.precoFIM} />
                </div>
                <div style={{ flexBasis: "100%", textAlign: "center" }}>
                    <Button onClick={handleFilter}>{Words.filter}</Button>
                </div>
            </div>
        </ModuleContainer>
    )
}
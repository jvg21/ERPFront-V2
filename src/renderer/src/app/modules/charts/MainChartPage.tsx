import { useContext, useEffect, useState } from "react";
import { CarModel } from "../car/model/Model";
import { SalesModel } from "../sales/model/Model";
import { SalesService } from "../sales/service/Service";
import { CarService } from "../car/service/Service";
import { UserService } from "../user/service/Service";
import { UserModel } from "../user/model/Model";
import { Button, Card, notification, Typography } from "antd";
import { UserContext } from "@renderer/app/contexts/UserContext";
import { LanguageContext } from "@renderer/app/contexts/LanguageContext";
import { FormInput, FormLabel } from "@renderer/components/layout/form/FormComponents";
import { ModuleTitleStyle } from "@renderer/components/Styles";
import { ModuleContainer } from "@renderer/components/layout/modal/ModalComponents";

const { Title, Text } = Typography;

export function MainChartPage() {
    const [entries, setEntries] = useState<SalesModel[]>([]);
    const [cars, setCars] = useState<CarModel[]>([]);
    const [carsWithoutSales, setCarsWithoutSales] = useState<CarModel[]>([]);
    const [users, setUsers] = useState<UserModel[]>([]);
    const [brands, setBrands] = useState<string[]>([]);
    const [totalRevenue, setTotalRevenue] = useState<number>(0);
    const [topFiveSales, setTopFiveSales] = useState<SalesModel[]>([]);
    const [topSellers, setTopSellers] = useState<{ sellerId: string, sellerName: string, totalSales: number }[]>([]);
    const { language, dataFormat } = useContext(LanguageContext);
    const { UserData } = useContext(UserContext);
    const Words = language.words;
    const SalesWords = language.modules.salesModule.words;
    const CarWords = language.modules.carModule.words;
    const [filters, setFilters] = useState({
        dthRegistroINI: '',
        dthRegistroFIM: '',
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
                        !soldCarIds.has(car.idCar);
                    }
                });
                setCarsWithoutSales(carsWithoutSales);
                setCars(allCars);

                const uniqueBrands = Array.from(new Set(allCars.map(car => car.brand)));
                setBrands(uniqueBrands);
            }
            const allUsers = await userService.getAll();
            if (allUsers) setUsers(allUsers);

            calculateSummaries(sales);

        } catch (error) {
            notification.error({
                message: Words.error,
                description: SalesWords.fetchNotificationError,
            });
        }
    }

    useEffect(() => {
        setList();
    }, []);

    function calculateSummaries(sales: SalesModel[]) {
        const total = sales.reduce((sum, sale) => sum + (sale.price || 0), 0);
        setTotalRevenue(total);

        const topFive = [...sales].sort((a, b) => (b.price || 0) - (a.price || 0)).slice(0, 5);
        setTopFiveSales(topFive);

        const salesByUser = sales.reduce((acc, sale) => {
            if (sale.fk_IdSeller) {
                acc[sale.fk_IdSeller] = (acc[sale.fk_IdSeller] || 0) + (sale.price || 0);
            }
            return acc;
        }, {} as { [key: string]: number });

        const topSellingUsers = Object.keys(salesByUser)
            .map(userId => {
                const user = users.find(u => u.idUser === Number(userId));
                return {
                    sellerId: userId,
                    sellerName: user?.nameUser || "Unknown",
                    totalSales: salesByUser[userId]
                };
            })
            .sort((a, b) => b.totalSales - a.totalSales)
            .slice(0, 5);

        setTopSellers(topSellingUsers);
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
            if (response) {
                setEntries(response);
                calculateSummaries(response);
            }

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

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                <div style={{ flex: "1" }}>
                    <FormLabel htmlFor="dthRegistroINI">{SalesWords.dthRegistroINI}</FormLabel>
                    <FormInput type="date" name="dthRegistroINI" onChange={handleFilterChange} value={filters.dthRegistroINI} />
                </div>
                <div style={{ flex: "1" }}>
                    <FormLabel htmlFor="dthRegistroFIM">{SalesWords.dthRegistroFIM}</FormLabel>
                    <FormInput type="date" name="dthRegistroFIM" onChange={handleFilterChange} value={filters.dthRegistroFIM} />
                </div>
    
                <div style={{ flexBasis: "100%", textAlign: "center" }}>
                    <Button onClick={handleFilter}>{SalesWords.filter}</Button>
                </div>
            </div>

            {/* Display Summaries */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <Card title={<Title level={3}>{SalesWords.totalRevenue}</Title>} style={{ width: 300 }}>
                    <Title level={2}>${totalRevenue}</Title>
                </Card>

                <Card title={<Title level={3}>{SalesWords.topFiveSales}</Title>} style={{ width: 300 }}>
                    <ul>
                        {topFiveSales.map((sale) => (
                            <li key={sale.idSale}><Text>${sale.price}</Text></li>
                        ))}
                    </ul>
                </Card>

                <Card title={<Title level={3}>{SalesWords.topSellers}</Title>} style={{ width: 300 }}>
                    <ul>
                        {topSellers.map((seller) => (
                            <li key={seller.sellerId}>
                                <Text>{seller.sellerName}: ${seller.totalSales}</Text>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
        </ModuleContainer>
    );
}
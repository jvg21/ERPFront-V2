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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
    const { language } = useContext(LanguageContext);
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
    }, [entries]);

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

    const handleFilter = () => {
        // Filtrando as vendas com base nas datas selecionadas
        const filteredEntries = entries.filter(entry => {
            const saleDate = new Date(entry.dthRegister);
            const startDate = filters.dthRegistroINI ? new Date(filters.dthRegistroINI) : null;
            const endDate = filters.dthRegistroFIM ? new Date(filters.dthRegistroFIM) : null;

            if (startDate && endDate) {
                return saleDate >= startDate && saleDate <= endDate;
            } else if (startDate) {
                return saleDate >= startDate;
            } else if (endDate) {
                return saleDate <= endDate;
            } else {
                return true;
            }
        });

        setEntries(filteredEntries);
        calculateSummaries(filteredEntries);
    };

    const salesData = entries.map(sale => {
        const saleDate = new Date(sale.dthRegister).toLocaleDateString(); // Formatar a data conforme necessário
        return {
            date: saleDate,
            price: sale.price || 0
        };
    });

    return (
        <ModuleContainer>
            <ModuleTitleStyle>{language.words.charts}</ModuleTitleStyle>

            {/* <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
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
            </div> */}

            {/* Display Summaries */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <Card title={<Title level={3}>{SalesWords.totalRevenue}</Title>} style={{ width: 300 }}>
                    <Title level={2}>${totalRevenue}</Title>
                </Card>

                <Card title={<Title level={3}>{SalesWords.topFiveSales}</Title>} style={{ width: 300 }}>
                    <ul>
                        {topFiveSales.map((sale) => {
                            const car = cars.find(car => car.idCar === sale.fk_IdCar);
                            const seller = users.find(user => user.idUser === sale.fk_IdSeller);
                            return (
                                <li key={sale.idSale}>
                                    <Text>
                                        {language.modules.carModule.label}: {car?.model} -  {seller?.nameUser}<br/> • {CarWords.price}: ${sale.price}
                                    </Text>
                                </li>
                            )
                        })}
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

            <div style={{ width: '100%', height: 400, marginTop: '2rem' }}>
                <ResponsiveContainer>
                    <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date"/>
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </ModuleContainer>
    );
}
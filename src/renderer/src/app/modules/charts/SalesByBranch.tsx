import React, { useEffect, useState } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';
import { SalesService } from '../sales/service/Service';
import { CarService } from '../car/service/Service';

const SalesByBrandChart = () => {
  const [salesByBrand, setSalesByBrand] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const salesService = new SalesService();
      const sales = await salesService.getAll();

      const salesByBrandMap = sales.reduce((accumulator, sale) => {
        const { fk_IdCar } = sale;

        const cars = await new CarService().getAll();
        const car = cars.find(car => car.idCar === fk_IdCar);
        const brand = car?.brand

        accumulator[brand] = (accumulator[brand] || 0) + 1;

        return accumulator;
      }, {});

      const salesByBrandArray = Object.keys(salesByBrandMap).map(brand => ({
        name: brand,
        value: salesByBrandMap[brand]
      }));

      setSalesByBrand(salesByBrandArray);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Cores para cada fatia do gráfico

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={salesByBrand}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {salesByBrand.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default SalesByBrandChart;

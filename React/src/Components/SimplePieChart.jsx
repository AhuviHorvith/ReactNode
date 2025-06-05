import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const SimplePieChart = ({ arr, sum }) => {
  const COLORS = arr.map(expense => expense.color); // קבלת צבעים מהקטגוריות

  const data = arr.map(expense => ({
    name: expense.name,
    value: (expense.price / sum) * 100
  }));
  return (
    <PieChart width={300} height={300} id="pieChart" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={130}
        innerRadius={70}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default SimplePieChart;


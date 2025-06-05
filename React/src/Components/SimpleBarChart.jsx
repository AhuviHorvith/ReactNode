import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const SimpleBarChart = ({ arr, sum }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={arr}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip formatter={(value) => `${value} ש"ח`} />
      <Bar dataKey="price">
        {arr.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color || '#1976d2'} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export default SimpleBarChart;
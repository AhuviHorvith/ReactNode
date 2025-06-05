import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const SimpleLineChart = ({ arr, sum }) => (
  <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
    <ResponsiveContainer width="90%" height={300}>
      <LineChart data={arr}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => `${value} ש"ח`} />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#1976d2"
          strokeWidth={3}
          dot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default SimpleLineChart;
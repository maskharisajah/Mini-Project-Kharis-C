import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import "./bigChartBox.scss";

const data = [
  {
    name: "Sun",
    AlatTulis: 4000,
    Sembako: 2400,
    Elektronik: 2400,
  },
  {
    name: "Mon",
    AlatTulis: 3000,
    Sembako: 1398,
    Elektronik: 2210,
  },
  {
    name: "Tue",
    AlatTulis: 2000,
    Sembako: 9800,
    Elektronik: 2290,
  },
  {
    name: "Wed",
    AlatTulis: 2780,
    Sembako: 3908,
    Elektronik: 2000,
  },
  {
    name: "Thu",
    AlatTulis: 1890,
    Sembako: 4800,
    Elektronik: 2181,
  },
  {
    name: "Fri",
    AlatTulis: 2390,
    Sembako: 3800,
    Elektronik: 2500,
  },
  {
    name: "Sat",
    AlatTulis: 3490,
    Sembako: 4300,
    Elektronik: 2100,
  },
];

const BigChartBox = () => {
  return (
    <div className="bigChartBox">
      <h1>Analitrik Pendapatan</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="Elektronik" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="Sembako" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            <Area type="monotone" dataKey="Perkakas" stackId="1" stroke="#ffc658" fill="#ffc658" />
            <Area type="monotone" dataKey="AlatTulis" stackId="1" stroke="#ffc658" fill="#ffc658" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BigChartBox;

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import "./pieChartBox.scss";

const data = [
  { name: "Sembako", value: 400, color: "#0088FE" },
  { name: "Perkakas", value: 300, color: "#00C49F" },
  { name: "Elektronik", value: 300, color: "#FFBB28" },
  { name: "Alat Tulis", value: 200, color: "#FF8042" },
];

const pieChartBox = () => {
  return (
    <div className="pieChartBox">
      <h1>Jumlah Produk berdasarkan Kategori</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip contentStyle={{ background: "white", borderRadius: "5px" }} />
            <Pie data={data} innerRadius={"70%"} outerRadius={"90%"} fill="#8884d8" paddingAngle={5} dataKey="value">
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="options pt-3">
        {data.map((item) => (
          <div className="option" key={item.name}>
            <div className="title">
              <div className="dot" style={{ backgroundColor: item.color }} />
              <span>{item.name}</span>
            </div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default pieChartBox;

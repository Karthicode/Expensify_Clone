import React from "react";
//import {RadialBarChart, RadialBar} from 'recharts';
import { BarChart, Bar, YAxis, XAxis } from "recharts";
//import { Chart } from "react-google-charts";
import { PieChart, Pie } from "recharts";

export const Dashboard = () => {
  const data = [
    { name: "Food", price: 300, fill: "#C5FCEF" },
    { name: "Entertainment", price: 500, fill: "#FFCD67" },
    { name: "Clothing", price: 1300, fill: "#9BDE7E" },
    { name: "Travel", price: 430, fill: "#DE6DA9" },
    { name: "Grocery", price: 700, fill: "#007FC1" },
    { name: "Credit Card", price: 1000, fill: "#BDA79E" },
  ];

  return (
    <div class="split">
      <div class="split left">
        <div class="centered">
          <h2>Pie Chart representing Expenses</h2>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              dataKey="price"
              outerRadius={150}
              fill="#8884d8"
              label
            />
          </PieChart>
          {/* <div id = "chartDetails">
            <li>
                 <p>Food</p>  
                  <p>Entertainment</p>    
                  <p>Clothing</p>

                </li>
            </div> */}
        </div>
      </div>
      <div class="split right">
        <div class="centered">
          <h2>Bar Chart representing Expenses vs Category</h2>
          <BarChart width={600} height={330} data={data}>
            <Bar dataKey="price" fill="yellow" />
            <XAxis dataKey="name" />
            <YAxis />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

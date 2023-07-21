import React, { useState } from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import { TextField, Typography, AppBar, Toolbar, Container, Card, CardContent } from '@material-ui/core';

const Demo2Screen = () => {
  const [taxi, setTaxi] = useState(30);
  const [food, setFood] = useState(20);

  const data = [
    { name: 'Такси', value: taxi || 0 },
    { name: 'Еда', value: food || 0 },
    { name: 'Другое', value: 100 - (taxi || 0) - (food || 0) },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const handleTaxiChange = (event) => {
    let value = event.target.value;
    if (value !== '') {
      value = Number(value);
    }
    setTaxi(value);
  }

  const handleFoodChange = (event) => {
    let value = event.target.value;
    if (value !== '') {
      value = Number(value);
    }
    setFood(value);
  }

  return (
    <div>
      <AppBar style={{ background: '#148F2B' }} position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Мои расходы
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Card style={{ marginTop: '20px' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Расходы в прошлом месяце
            </Typography>
            <TextField 
              label="Такси (%)" 
              type="number" 
              value={taxi} 
              onChange={handleTaxiChange} 
              style={{ marginBottom: '10px', width: '100%', color: '#148F2B' }}
            />
            <TextField 
              label="Еда (%)" 
              type="number" 
              value={food} 
              onChange={handleFoodChange} 
              style={{ marginBottom: '20px', width: '100%', borderBottomColor: '#148F2B' }}
            />
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
              >
                {
                  data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                }
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Demo2Screen;

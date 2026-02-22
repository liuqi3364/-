const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.js');

const app = express();
const PORT = 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 实例路由
app.get('/api/hotels', (req, res) => {
  const sql = 'SELECT * FROM hotels';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('查询失败:', err);
      res.status(500).json({ error: '查询失败' });
      return;
    }
    res.json(results);
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器正在运行在 http://localhost:${PORT}`);
});

// 用户相关路由
app.use('/api', userRoutes);
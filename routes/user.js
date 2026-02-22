// 用户登录注册接口

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

// 注册接口
router.post('/register', async (req, res) => {

  const { username, password , role} = req.body;
  if (!username || !password || !role) {
    return res.status(400).json({ message: '用户名、密码和角色不能为空' });
  }

  // 检查用户名是否已存在
  try {
    const [existingUser] = await db.promise().query('SELECT * FROM users WHERE username = ?', [username]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: '用户名已存在' });
    }
    
  // 密码加密
    const hashedPassword = await bcrypt.hash(password, 10);

  // 插入新用户
    await db.promise().query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role]);
    res.json({ message: '注册成功' });
  } catch (err) {
    res.status(500).json({ message: '服务器错误' , error: err.message});
  }
});

// 登录接口
router.post('/login', async (req, res) => {

  const { username, password } = req.body;
    if (!username || !password) {
    return res.status(400).json({ message: '用户名和密码不能为空' });
  }
    try {
    const [users] = await db.promise().query('SELECT * FROM users WHERE username = ?', [username]);
    if (users.length === 0) {
      return res.status(400).json({ message: '用户不存在' });
    }
    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: '密码错误' });
    }

    // 生成 JWT token
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role },'my_secret_key_123456', { expiresIn: '1h' });
    res.json({ message: '登录成功', token, user: { id: user.id, username: user.username, role: user.role, created_at: user.created_at } });
  } catch (err) {
    res.status(500).json({ message: '服务器错误', error: err.message });
  }
});

module.exports = router;
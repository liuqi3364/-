# 用户表
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE COMMENT '用户名',
    password VARCHAR(255) NOT NULL COMMENT '密码',
    role ENUM('merchant','admin','user') NOT NULL COMMENT '用户角色: 商户或管理员或普通用户',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
);

#酒店表
CREATE TABLE hotels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    merchant_id INT NOT NULL COMMENT '所属商户ID',
    name_en VARCHAR(255) COMMENT '酒店英文名称',
    name_cn VARCHAR(255) NOT NULL COMMENT '酒店中文名称',
    address VARCHAR(255) NOT NULL COMMENT '酒店地址',
    star_rating ENUM('1', '2', '3', '4', '5') NOT NULL COMMENT '酒店星级',
    open_date DATE NOT NULL COMMENT '开业日期',
    status ENUM('draft', 'pending', 'published','offline') NOT NULL DEFAULT 'draft' COMMENT '酒店状态: 草稿、待审核、已发布、已下架',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    FOREIGN KEY (merchant_id) REFERENCES users(id) ON DELETE CASCADE
);

# 房型表
CREATE TABLE room_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hotel_id INT NOT NULL COMMENT '所属酒店ID',
    name VARCHAR(255) NOT NULL COMMENT '房型名称',
    description TEXT COMMENT '房型描述',
    price DECIMAL(10, 2) NOT NULL COMMENT '房价',
    total_rooms INT NOT NULL COMMENT '总房间数',
    available_rooms INT NOT NULL COMMENT '可用房间数',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
);

# 酒店图片表
CREATE TABLE hotel_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hotel_id INT NOT NULL COMMENT '所属酒店ID',
    image_url VARCHAR(255) NOT NULL COMMENT '图片URL',
    sort_order INT NOT NULL DEFAULT 0 COMMENT '排序',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
);

# 订单表(用户端预定)
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL COMMENT '用户ID',
    hotel_id INT NOT NULL COMMENT '酒店ID',
    room_type_id INT NOT NULL COMMENT '房型ID',
    check_in_date DATE NOT NULL COMMENT '入住日期',
    check_out_date DATE NOT NULL COMMENT '退房日期',
    total_price DECIMAL(10, 2) NOT NULL COMMENT '总价',
    status ENUM('pending', 'confirmed', 'cancelled') NOT NULL DEFAULT 'pending' COMMENT '订单状态: 待确认、已确认、已取消',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
    FOREIGN KEY (room_type_id) REFERENCES room_types(id) ON DELETE CASCADE
);

# 酒店周边信息表
CREATE TABLE hotel_surroundings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hotel_id INT NOT NULL COMMENT '所属酒店ID',
    description TEXT COMMENT '周边信息描述',
    type ENUM('transportation', 'attractions', 'dining') NOT NULL COMMENT '周边信息类型: 交通、景点、美食',
    name VARCHAR(255) COMMENT '周边信息名称',
    distance VARCHAR(50) COMMENT '距离酒店的距离',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
);

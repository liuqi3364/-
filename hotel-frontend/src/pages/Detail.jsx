import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavBar, Swiper, Space, List, Tag } from "antd-mobile";
import { StarFill, LocationOutline } from "antd-mobile-icons";
const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // 获取路由中的酒店ID
  const [hotel, setHotel] = useState(null);

  // 模拟获取酒店详情数据
  useEffect(() => {
    // 这里模拟请求详情，后面会替换为真实接口
    const fetchHotelDetail = async () => {
      // 模拟网络请求
      const mockData = {
        id: id,
        name: "阳光大酒店",
        nameEn: "Sunshine Hotel",
        address: "北京市朝阳区建国门外大街1号",
        star: 5,
        rating: 4.8,
        facilities: ["免费WiFi", "游泳池", "健身房", "餐厅", "免费停车"],
        description: "这是一家位于市中心的豪华酒店，交通便利，设施齐全。",
        images: [
          "https://picsum.photos/400/300?random=101",
          "https://picsum.photos/400/300?random=102",
          "https://picsum.photos/400/300?random=103",
          "https://picsum.photos/400/300?random=104",
        ],
        roomTypes: [
          {
            id: 1,
            name: "标准大床房",
            price: 398,
            area: "25m²",
            bed: "1.8米大床",
            capacity: 2,
            breakfast: "不含早",
          },
          {
            id: 2,
            name: "豪华双床房",
            price: 528,
            area: "35m²",
            bed: "1.2米双床",
            capacity: 2,
            breakfast: "双早",
          },
          {
            id: 3,
            name: "行政套房",
            price: 888,
            area: "60m²",
            bed: "2米大床",
            capacity: 2,
            breakfast: "双早",
          },
        ],
      };
      setHotel(mockData);
    };

    fetchHotelDetail();
  }, [id]);

  if (!hotel) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      {/* 顶部导航 */}
      <NavBar back="返回" onBack={() => navigate(-1)}>
        {hotel.name}
      </NavBar>

      {/* 图片轮播 */}
      <Swiper autoplay loop>
        {hotel.images.map((img, index) => (
          <Swiper.Item key={index}>
            <img
              src={img}
              alt={`酒店图${index + 1}`}
              style={{ width: "100%", height: "250px", objectFit: "cover" }}
            />
          </Swiper.Item>
        ))}
      </Swiper>

      {/* 酒店基础信息 */}
      <div style={{ padding: "16px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0 }}>{hotel.name}</h2>
          <Space>
            {Array.from({ length: hotel.star }).map((_, i) => (
              <StarFill key={i} fontSize={16} color="#ff4d4f" />
            ))}
          </Space>
        </div>
        <div style={{ color: "#666", fontSize: "14px", marginTop: "4px" }}>
          <LocationOutline fontSize={14} /> {hotel.address}
        </div>
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          {hotel.facilities.map((facility, index) => (
            <Tag key={index} round color="primary" fill="outline">
              {facility}
            </Tag>
          ))}
        </div>
      </div>

      {/* 日历+人间夜Banner（简化版） */}
      <div
        style={{
          padding: "12px 16px",
          backgroundColor: "#f5f5f5",
          margin: "8px 0",
        }}
      >
        <Space block justify="between">
          <span>📅 入住 2025-05-20</span>
          <span>离店 2025-05-22</span>
          <span>👥 2人</span>
        </Space>
      </div>

      {/* 房型价格列表 */}
      <div style={{ padding: "16px" }}>
        <h3>房型价格</h3>
        <List>
          {hotel.roomTypes
            .sort((a, b) => a.price - b.price)
            .map((room) => (
              <List.Item
                key={room.id}
                description={
                  <div>
                    <div>
                      面积: {room.area} | 床型: {room.bed} | 早餐:{" "}
                      {room.breakfast}
                    </div>
                    <div
                      style={{
                        color: "#ff4d4f",
                        fontWeight: "bold",
                        fontSize: "18px",
                        marginTop: "4px",
                      }}
                    >
                      ¥{room.price}/晚
                    </div>
                  </div>
                }
              >
                {room.name}
              </List.Item>
            ))}
        </List>
      </div>
    </div>
  );
};

export default Detail;

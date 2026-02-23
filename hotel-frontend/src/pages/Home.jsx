import { useState } from "react";
import { Swiper, SearchBar, Calendar, Button, Tag } from "antd-mobile";
import { useNavigate } from "react-router-dom";
// 后面逐步添加更多组件

const Home = () => {
  // 状态管理
  const navigate = useNavigate();
  const [location, setLocation] = useState("当前定位中...");
  const [dateVisible, setDateVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState();

  return (
    <div style={{ padding: "12px" }}>
      {/* 顶部 Banner */}
      <Swiper autoplay loop>
        <Swiper.Item>
          <img
            src="https://picsum.photos/400/200?random=1"
            alt="banner"
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
        </Swiper.Item>
        <Swiper.Item>
          <img
            src="https://picsum.photos/400/200?random=2"
            alt="banner"
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
        </Swiper.Item>
      </Swiper>

      {/* 核心查询区域 */}
      <div style={{ marginTop: "16px" }}>
        {/* 当前地点 */}
        <div style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}>
          📍 {location}
        </div>

        {/* 关键词搜索 */}
        <SearchBar placeholder="搜索酒店、目的地" />

        {/* 入住日期 */}
        <div style={{ marginTop: "12px" }}>
          <Button onClick={() => setDateVisible(true)}>
            {selectedDates
              ? `入住: ${selectedDates[0].toLocaleDateString()} 离店: ${selectedDates[1].toLocaleDateString()}`
              : "选择入住日期"}
          </Button>
          <Calendar
            visible={dateVisible}
            onClose={() => setDateVisible(false)}
            selectionMode="range"
            onChange={(val) => {
              setSelectedDates(val);
              setDateVisible(false);
            }}
          />
        </div>

        {/* 快捷标签 */}
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          <Tag round color="primary">
            亲子
          </Tag>
          <Tag round color="primary">
            豪华
          </Tag>
          <Tag round color="primary">
            免费停车
          </Tag>
          <Tag round color="primary">
            近地铁
          </Tag>
        </div>

        {/* 查询按钮 */}
        <Button
          block
          color="primary"
          size="large"
          style={{ marginTop: "20px" }}
          onClick={() =>
            navigate("/list", {
              state: {
                keyword: "搜索关键词", // 暂时固定，后面可以从搜索框获取
                checkIn: selectedDates?.[0],
                checkOut: selectedDates?.[1],
              },
            })
          }
        >
          查询
        </Button>
      </div>
    </div>
  );
};

export default Home;

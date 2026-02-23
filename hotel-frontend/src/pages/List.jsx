import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  NavBar,
  SearchBar,
  Dropdown,
  Space,
  InfiniteScroll,
  List,
} from "antd-mobile";
import { SearchOutline, DownOutline } from "antd-mobile-icons";

const ListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // 从首页传递过来的参数（目前还没有传，先留着）
  const queryParams = location.state || {};

  // 酒店数据状态
  const [hotels, setHotels] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // 加载更多数据
  const loadMore = async () => {
    // 模拟请求下一页数据
    const newHotels = await fetchHotels(page);
    if (newHotels.length === 0) {
      setHasMore(false);
    } else {
      setHotels((prev) => [...prev, ...newHotels]);
      setPage((prev) => prev + 1);
    }
  };

  // 模拟获取酒店数据（后面会换成真实接口）
  const fetchHotels = (pageNum) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData = [];
        // 计算当前页第一条数据的编号
        const startId = (pageNum - 1) * 10 + 1;
        for (let i = 0; i < 10; i++) {
          const id = startId + i;
          mockData.push({
            id: id,
            name: `酒店名称${id}`,
            address: "北京市朝阳区xxx路",
            price: 300 + i * 20,
            rating: 4.5,
            image: "https://picsum.photos/200/150?random=" + id,
          });
        }
        resolve(mockData);
      }, 1000);
    });
  };

  return (
    <div>
      {/* 顶部导航 */}
      <NavBar back="返回" onBack={() => window.history.back()}>
        酒店列表
      </NavBar>

      {/* 顶部筛选头 - 简化版，先显示城市和日期 */}
      <div style={{ padding: "12px", borderBottom: "1px solid #eee" }}>
        <Space block direction="vertical">
          <Space>
            <span>北京</span>
            <DownOutline />
          </Space>
          <SearchBar
            placeholder="搜索酒店"
            value={queryParams.keyword || ""}
            readOnly
          />
          <Space>
            <span>05/20-05/22</span>
            <span>2人</span>
          </Space>
        </Space>
      </div>

      {/* 👇 新增：详细筛选区域（Dropdown） */}
      <div style={{ backgroundColor: "#fff", padding: "0 12px" }}>
        <Dropdown>
          <Dropdown.Item key="star" title="星级">
            <div style={{ padding: 12 }}>
              <div
                style={{ padding: "8px 0", cursor: "pointer" }}
                onClick={() => setStarFilter("5")}
              >
                5星
              </div>
              <div
                style={{ padding: "8px 0", cursor: "pointer" }}
                onClick={() => setStarFilter("4")}
              >
                4星
              </div>
              <div
                style={{ padding: "8px 0", cursor: "pointer" }}
                onClick={() => setStarFilter("3")}
              >
                3星及以下
              </div>
            </div>
          </Dropdown.Item>
          <Dropdown.Item key="price" title="价格">
            <div style={{ padding: 12 }}>
              <div
                style={{ padding: "8px 0", cursor: "pointer" }}
                onClick={() => setPriceFilter("0-300")}
              >
                0-300元
              </div>
              <div
                style={{ padding: "8px 0", cursor: "pointer" }}
                onClick={() => setPriceFilter("300-500")}
              >
                300-500元
              </div>
              <div
                style={{ padding: "8px 0", cursor: "pointer" }}
                onClick={() => setPriceFilter("500+")}
              >
                500元以上
              </div>
            </div>
          </Dropdown.Item>
        </Dropdown>
      </div>
      {/* 👆 新增结束 */}

      {/* 酒店列表 */}
      <List style={{ padding: "12px" }}>
        {hotels.map((hotel) => (
          <List.Item
            key={hotel.id}
            prefix={
              <img
                src={hotel.image}
                alt={hotel.name}
                style={{
                  width: 80,
                  height: 60,
                  objectFit: "cover",
                  borderRadius: 4,
                }}
              />
            }
            description={hotel.address}
            extra={
              <div style={{ color: "#ff4d4f", fontWeight: "bold" }}>
                ¥{hotel.price}
              </div>
            }
            onClick={() => navigate(`/detail/${hotel.id}`)}
          >
            {hotel.name}
          </List.Item>
        ))}
      </List>

      {/* 上滑加载更多 */}
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </div>
  );
};

export default ListPage;

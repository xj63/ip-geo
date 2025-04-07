# IP-Geo

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/xj63/ip-geo)

一个轻量级的 IP 地理位置 API，基于 Cloudflare Workers 构建。它可以提供访问者的 IP 地址和详细的地理位置信息，包括国家、城市、经纬度等。

## 功能特点

- 🌍 实时返回访问者的地理位置数据
- 🚀 基于 Cloudflare Workers 构建，超低延迟
- 🔄 支持 CORS，可在任何网站中调用
- 🏳️‍🌈 国家代码自动转换为国旗 Emoji
- 🎨 内置优雅的 Web 界面，支持深色模式
- 📱 响应式设计，适配各种设备

## 演示

访问 [ip-geo.xj63.fun](https://ip-geo.xj63.fun) 查看在线演示。

## API 使用说明

### 获取地理位置数据

```bash
curl ip-geo.xj63.fun
```

#### 响应示例

```json
{
  "country": "US",
  "countryFlag": "🇺🇸",
  "city": "San Francisco",
  "region": "California",
  "continent": "NA",
  "regionCode": "CA",
  "postalCode": "94105",
  "metroCode": "807",
  "latitude": 37.7749,
  "longitude": -122.4194,
  "timezone": "America/Los_Angeles",
  "colo": "SFO",
  "clientTcpRtt": 15,
  "asOrganization": "Cloudflare, Inc.",
  "ip": "192.0.2.1"
}
```

### 返回字段说明

| 字段 | 说明 |
|------|------|
| `country` | ISO 3166-1 两字符国家/地区代码 |
| `countryFlag` | 国家对应的旗帜 Emoji |
| `city` | 城市名称 |
| `region` | 地区/省/州名称 |
| `continent` | 大陆代码 (NA=北美, EU=欧洲, AS=亚洲, AF=非洲, OC=大洋洲, SA=南美) |
| `regionCode` | ISO 3166-2 地区代码 |
| `postalCode` | 邮政编码 |
| `metroCode` | 都会区代码（主要用于美国） |
| `latitude` | 纬度坐标 |
| `longitude` | 经度坐标 |
| `timezone` | IANA 时区 |
| `colo` | Cloudflare 数据中心代码 |
| `clientTcpRtt` | 客户端 TCP 往返延迟（毫秒） |
| `asOrganization` | 自治系统组织（通常是互联网服务提供商） |
| `ip` | 访问者的 IP 地址 |

## 本地开发

1. 克隆此仓库
   ```bash
   git clone https://github.com/yourusername/ip-geo.git
   cd ip-geo
   ```

2. 安装依赖
   ```bash
   npm install
   ```

3. 使用 Wrangler 进行开发
   ```bash
   npm run dev
   ```

4. 部署到 Cloudflare Workers
   ```bash
   npm run deploy
   ```

## 技术栈

- [Cloudflare Workers](https://workers.cloudflare.com/) - 边缘计算平台

## 将 IP-Geo 嵌入到您的网站

您可以通过简单的 AJAX 请求来获取并展示访问者的地理位置信息：

```javascript
fetch('https://ip-geo.xj63.fun/', {
  headers: {
    'Accept': 'application/json'
  }
})
.then(response => response.json())
.then(data => {
  console.log(`访问者来自: ${data.country} ${data.countryFlag}`);
});
```

## 部署

推荐直接点击最上面的按钮一键部署，如果您想自定义和部署这个项目：

1. Fork 这个仓库
2. 根据需要修改代码
3. 使用 Wrangler 部署到您的 Cloudflare Workers 账户

```bash
npm run deploy
```

# Decision Compass (决策指南针)

一款专为一人公司和自由创作者设计的AI驱动决策支持工具，通过"自由记录 + AI选择题"的方式，帮助用户从直觉决策升级为结构化决策。

## 功能特点

- **自由记录**：左侧面板提供自由文本输入，支持自然语言描述决策背景
- **AI选择生成**：右侧面板基于输入内容生成3-4个结构化的决策选择
- **决策追踪**：记录决策过程和结果，形成学习闭环
- **历史回顾**：查看历史决策记录，分析决策模式

## 技术栈

- **前端**: Next.js 15 + TypeScript + TailwindCSS
- **数据库**: Supabase (PostgreSQL)
- **AI服务**: Silicon Flow API
- **部署**: Vercel
- **认证**: Supabase Auth

## 快速开始

### 1. 克隆项目

```bash
git clone <repository-url>
cd decision-compass
```

### 2. 安装依赖

```bash
npm install
```

### 3. 环境配置

创建 `.env.local` 文件并添加以下配置：

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Silicon Flow API Configuration
SILICON_FLOW_API_KEY=your-silicon-flow-api-key
SILICON_FLOW_API_URL=https://api.siliconflow.cn/v1/chat/completions

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. 数据库设置

1. 在 Supabase 项目中创建新的数据库
2. 在 SQL 编辑器中执行 `supabase-schema.sql` 文件中的内容
3. 确保 RLS (Row Level Security) 已启用

### 5. 运行项目

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 项目结构

```
src/
├── app/
│   ├── api/
│   │   └── generate-options/     # AI选择生成API
│   ├── globals.css               # 全局样式
│   ├── layout.tsx               # 根布局
│   └── page.tsx                 # 主页面
├── components/
│   ├── AIChoicePanel.tsx        # AI选择面板
│   ├── DecisionHistory.tsx      # 历史记录
│   ├── DecisionInput.tsx        # 输入面板
│   └── Header.tsx               # 头部导航
└── lib/
    ├── decisions.ts             # 决策数据服务
    └── supabase.ts              # Supabase客户端配置
```

## 核心功能

### 1. 决策输入
- 自由文本输入，支持自然语言描述
- 实时保存，无需手动保存
- 智能提示可能遗漏的考虑因素

### 2. AI选择生成
- 基于Silicon Flow API生成结构化选择
- 每个选择包含：标题、概述、步骤、时间框架、风险等级、资源需求、预期结果
- 支持3-4个不同风险等级的选择

### 3. 决策管理
- 选择决策方案并保存到数据库
- 历史记录查看和管理
- 决策结果追踪（待实现）

## 开发说明

### API密钥获取

1. **Supabase**: 在 [Supabase Dashboard](https://app.supabase.com) 创建项目
2. **Silicon Flow**: 在 [Silicon Flow](https://siliconflow.cn) 注册并获取API密钥

### 开发模式

```bash
# 开发模式（使用Turbopack）
npm run dev

# 构建
npm run build

# 生产模式
npm run start

# 代码检查
npm run lint
```

## 部署

### Vercel部署

1. 连接GitHub仓库到Vercel
2. 在Vercel Dashboard中添加环境变量
3. 自动部署完成

### 环境变量配置

确保在生产环境中设置所有必需的环境变量：

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SILICON_FLOW_API_KEY`

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

MIT License

## 联系方式

如有问题或建议，请创建 Issue 或联系开发团队。
# Decision Compass MVP - Setup Guide

## 🎉 已完成的功能

### ✅ 核心架构
- **Next.js 15 + TypeScript + TailwindCSS** 项目搭建
- **Supabase** 数据库集成和配置
- **Silicon Flow API** 集成用于AI选择生成
- **响应式布局** 左右分栏设计

### ✅ 主要组件
- **Header**: 包含Logo、历史记录按钮和登录按钮
- **DecisionInput**: 左侧自由文本输入面板，支持实时保存和智能提示
- **AIChoicePanel**: 右侧AI选择卡片展示，包含结构化决策选择
- **DecisionHistory**: 历史记录弹窗，显示用户的决策历史

### ✅ 核心功能
- **自由记录**: 用户可以自然语言输入决策背景
- **AI选择生成**: 基于输入内容生成3-4个结构化选择
- **决策保存**: 将决策内容和AI选择保存到数据库
- **选择记录**: 用户选择方案后更新数据库
- **历史查看**: 查看历史决策记录和结果

## 🔧 需要你完成的配置

### 1. API密钥配置
请在 `.env.local` 文件中填入以下API密钥：

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Silicon Flow API Configuration
SILICON_FLOW_API_KEY=your-silicon-flow-api-key
```

### 2. 数据库设置
1. 在 [Supabase Dashboard](https://app.supabase.com) 创建新项目
2. 在SQL编辑器中执行 `supabase-schema.sql` 文件内容
3. 确保RLS (Row Level Security) 已启用

### 3. 依赖安装
```bash
npm install
```

### 4. 运行项目
```bash
npm run dev
```

## 🚀 如何获取API密钥

### Supabase
1. 访问 [Supabase Dashboard](https://app.supabase.com)
2. 创建新项目
3. 在Settings > API中找到：
   - `NEXT_PUBLIC_SUPABASE_URL`: Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: anon public key
   - `SUPABASE_SERVICE_ROLE_KEY`: service_role secret key

### Silicon Flow
1. 访问 [Silicon Flow](https://siliconflow.cn)
2. 注册账号并登录
3. 在控制台获取API密钥
4. 免费额度：每日1000次调用

## 📋 待实现功能

### 🔄 用户认证系统
- Supabase Auth登录/注册
- 用户会话管理
- 用户权限控制

### 📊 结果追踪系统
- 定时提醒用户回填决策结果
- 决策成功/失败统计
- 决策效果分析

### 🎨 UI/UX优化
- 加载动画优化
- 错误处理改进
- 移动端适配完善

## 🏗️ 项目结构

```
decision-compass/
├── src/
│   ├── app/
│   │   ├── api/generate-options/  # AI选择生成API
│   │   ├── layout.tsx            # 根布局
│   │   └── page.tsx              # 主页面
│   ├── components/
│   │   ├── AIChoicePanel.tsx     # AI选择面板
│   │   ├── DecisionHistory.tsx   # 历史记录
│   │   ├── DecisionInput.tsx     # 输入面板
│   │   └── Header.tsx            # 头部导航
│   └── lib/
│       ├── decisions.ts          # 决策数据服务
│       └── supabase.ts           # Supabase配置
├── supabase-schema.sql           # 数据库结构
├── .env.local                    # 环境变量
└── README.md                     # 项目说明
```

## 🎯 使用流程

1. **输入决策背景**: 在左侧面板自由输入你的想法和考虑因素
2. **生成AI选择**: 点击"生成选择"按钮，AI会分析并生成3-4个结构化选择
3. **选择方案**: 在右侧面板查看选择详情，点击选择你认为最合适的方案
4. **查看历史**: 点击"历史记录"查看过往的决策记录

## 🔍 测试建议

### 测试场景
1. **商业决策**: "要不要接受这个新项目？预算5万，时间2个月..."
2. **职业发展**: "考虑换工作还是继续现在的，现在工作稳定但成长空间有限..."
3. **投资决策**: "看到一个投资机会，收益看起来不错但风险不明确..."

### 预期结果
- AI应该生成3-4个不同风险等级的选择
- 每个选择包含明确的步骤和时间框架
- 选择后数据库应该正确保存选择结果

## 🚨 注意事项

1. **API配额**: Silicon Flow免费版每日1000次调用，注意使用频率
2. **数据安全**: 确保敏感信息不被记录在决策内容中
3. **错误处理**: 如果AI API调用失败，会使用mock数据作为备用

## 🎉 MVP完成状态

✅ **已完成**: 8/11 个核心任务
- 项目搭建和配置
- 核心UI组件
- AI集成和数据存储
- 基础功能实现

⏳ **待完成**: 3/11 个任务
- 用户认证系统
- 结果追踪系统
- 部署配置

这个MVP版本已经实现了PRD中定义的核心功能，可以开始用户测试和反馈收集了！
# Vercel环境变量配置指南

## 必需的环境变量

请在Vercel项目设置中添加以下环境变量：

### Supabase配置
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

### AI API配置
```
SILICON_FLOW_API_KEY=your_silicon_flow_api_key_here
SILICON_FLOW_API_URL=https://api.siliconflow.cn/v1/chat/completions
KIMI_API_KEY=your_kimi_api_key_here
KIMI_API_URL=https://api.moonshot.cn/v1/chat/completions
```

### 应用配置
```
NEXT_PUBLIC_APP_URL=https://your-vercel-domain.vercel.app
```

## 配置步骤

### 方法1: 通过Vercel CLI配置
```bash
# 部署项目（首次部署）
vercel

# 添加环境变量
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add SILICON_FLOW_API_KEY
vercel env add SILICON_FLOW_API_URL
vercel env add KIMI_API_KEY
vercel env add KIMI_API_URL
vercel env add NEXT_PUBLIC_APP_URL
```

### 方法2: 通过Vercel Web界面配置
1. 访问 https://vercel.com/dashboard
2. 选择您的项目
3. 进入 Settings > Environment Variables
4. 逐个添加上述环境变量

## 注意事项
- `NEXT_PUBLIC_` 前缀的变量会在客户端可用
- 其他变量只在服务器端可用
- 部署后需要重新部署才能应用新的环境变量
- 请从您的 .env.local 文件中复制实际的API密钥值 
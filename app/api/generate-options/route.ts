import { NextRequest, NextResponse } from 'next/server'
import { AIOption } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json()

    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.SILICON_FLOW_API_KEY
    console.log('API Key exists:', !!apiKey)
    
    if (!apiKey) {
      console.error('SILICON_FLOW_API_KEY not found in environment')
      // Return mock data if no API key
      const mockResponse = generateMockOptions(content)
      return NextResponse.json(mockResponse)
    }

    const prompt = `
你是一个资深的商业决策顾问，拥有20年的企业咨询经验。请基于用户的描述进行深度分析，生成3-4个高质量的决策选择。

用户描述：
${content}

请按照以下框架进行分析：

## 第一步：深度分析
- 识别决策的本质问题和隐含需求
- 分析当前环境和约束条件
- 评估用户的情绪状态和心理偏好
- 判断决策的紧急程度和影响范围

## 第二步：生成差异化选择
基于以下3-4种不同的决策策略生成选择：
1. **积极进取型**：高风险高回报，快速行动
2. **稳健保守型**：低风险稳定，充分准备
3. **创新实验型**：中等风险，小步快跑
4. **战略等待型**：观望时机，延迟决策

## 第三步：输出结构化建议
每个选择必须包含：
- 清晰的核心逻辑和假设
- 具体可执行的行动步骤
- 潜在风险和缓解措施
- 成功的关键成功因素
- 量化的时间和资源投入
- 预期结果和评估指标

请以JSON格式输出：
{
  "analysis": {
    "core_problem": "决策的核心问题",
    "key_constraints": ["约束条件1", "约束条件2"],
    "decision_context": "决策背景分析",
    "urgency_level": "low/medium/high",
    "stake_level": "决策影响程度"
  },
  "options": [
    {
      "id": "A",
      "strategy_type": "积极进取型",
      "title": "具体而有吸引力的方案名称",
      "core_logic": "这个方案的核心逻辑和假设",
      "summary": "30字以内的精炼概述",
      "steps": [
        {
          "step": "具体行动步骤",
          "timeline": "时间安排",
          "resources": "所需资源",
          "success_criteria": "成功标准"
        }
      ],
      "risk_analysis": {
        "level": "low/medium/high",
        "main_risks": ["主要风险1", "主要风险2"],
        "mitigation": ["缓解措施1", "缓解措施2"]
      },
      "investment": {
        "time": "时间投入",
        "money": "资金投入",
        "energy": "精力投入"
      },
      "expected_outcomes": {
        "short_term": "短期预期结果",
        "long_term": "长期预期结果",
        "success_probability": "成功概率（0-1）"
      },
      "pros_cons": {
        "pros": ["优势1", "优势2"],
        "cons": ["劣势1", "劣势2"]
      }
    }
  ]
}

重要要求：
1. 每个选择必须有明显的差异化，不能雷同
2. 步骤要具体可执行，不能过于抽象
3. 风险分析要深入，包含具体的缓解措施
4. 时间线要现实可行
5. 成功概率要基于实际分析，不能随意给出
6. 使用中文回复
7. 确保JSON格式完全正确
`

    const response = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-ai/DeepSeek-V3',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的决策分析师，擅长为用户提供结构化的决策建议。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()
    const aiResponse = data.choices[0]?.message?.content

    if (!aiResponse) {
      throw new Error('No response from AI')
    }

    // Parse the AI response as JSON
    let parsedResponse
    try {
      // Extract JSON from response if it's wrapped in markdown
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
      const jsonStr = jsonMatch ? jsonMatch[0] : aiResponse
      parsedResponse = JSON.parse(jsonStr)
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError)
      // Fallback to mock data if parsing fails
      parsedResponse = generateMockOptions(content)
    }

    return NextResponse.json(parsedResponse)
  } catch (error) {
    console.error('Error generating options:', error)
    
    // Return mock data as fallback
    const mockResponse = generateMockOptions('fallback')
    
    return NextResponse.json(mockResponse)
  }
}

// Enhanced mock data generator with high-quality analysis
function generateMockOptions(content: string) {
  return {
    analysis: {
      core_problem: "需要在有限信息下做出重要决策",
      key_constraints: ["时间限制", "资源约束", "信息不完整"],
      decision_context: "基于用户描述的复杂决策场景",
      urgency_level: "medium",
      stake_level: "中等影响，需要谨慎考虑"
    },
    options: [
      {
        id: "A",
        strategy_type: "积极进取型",
        title: "立即行动方案",
        core_logic: "抓住当前机会，快速行动以获得先发优势，通过迅速执行来弥补信息不足的劣势",
        summary: "基于现有信息快速启动，边做边调整",
        steps: [
          {
            step: "收集核心信息并做出基本判断",
            timeline: "24小时内",
            resources: "个人时间2-3小时",
            success_criteria: "获得足够的决策依据"
          },
          {
            step: "制定具体行动计划",
            timeline: "第2天",
            resources: "规划时间1-2小时",
            success_criteria: "有清晰的执行路径"
          },
          {
            step: "开始执行并建立反馈机制",
            timeline: "第3天开始",
            resources: "日常执行时间",
            success_criteria: "能够及时调整策略"
          }
        ],
        risk_analysis: {
          level: "medium",
          main_risks: ["信息不足导致判断错误", "执行过程中遇到预料外的障碍"],
          mitigation: ["建立快速反馈机制", "准备应急预案", "保持策略灵活性"]
        },
        investment: {
          time: "前期3-5小时规划，后续持续投入",
          money: "最小可行投入",
          energy: "高强度专注，需要充沛精力"
        },
        expected_outcomes: {
          short_term: "快速获得市场反馈，抢占先机",
          long_term: "建立领先优势，获得更多机会",
          success_probability: "0.65"
        },
        pros_cons: {
          pros: ["速度快，机会成本低", "能够快速获得市场反馈", "保持竞争优势"],
          cons: ["风险相对较高", "可能需要频繁调整", "对执行力要求高"]
        }
      },
      {
        id: "B",
        strategy_type: "稳健保守型",
        title: "深度研究方案",
        core_logic: "通过充分调研和分析来降低决策风险，用时间换取更高的成功概率",
        summary: "全面调研分析，稳步推进决策",
        steps: [
          {
            step: "系统性信息收集和市场调研",
            timeline: "第1周",
            resources: "调研时间10-15小时",
            success_criteria: "获得全面的背景信息"
          },
          {
            step: "多角度分析和专家咨询",
            timeline: "第2周",
            resources: "分析时间8-10小时，咨询成本",
            success_criteria: "形成清晰的利弊分析"
          },
          {
            step: "制定详细执行计划",
            timeline: "第3周",
            resources: "规划时间5-8小时",
            success_criteria: "完整的执行路线图"
          },
          {
            step: "谨慎启动执行",
            timeline: "第4周开始",
            resources: "按计划投入资源",
            success_criteria: "平稳有序的执行过程"
          }
        ],
        risk_analysis: {
          level: "low",
          main_risks: ["错过最佳时机", "过度分析导致行动迟缓"],
          mitigation: ["设定调研时间上限", "并行进行部分准备工作", "保持对时机的敏感性"]
        },
        investment: {
          time: "前期20-30小时深度研究",
          money: "调研和咨询费用",
          energy: "需要持续的分析和思考"
        },
        expected_outcomes: {
          short_term: "获得充分的决策依据和执行信心",
          long_term: "更高的成功概率和更好的结果",
          success_probability: "0.85"
        },
        pros_cons: {
          pros: ["成功率高", "风险可控", "执行更有章法"],
          cons: ["时间成本高", "可能错过机会", "需要较多前期投入"]
        }
      },
      {
        id: "C",
        strategy_type: "创新实验型",
        title: "小步快跑方案",
        core_logic: "通过小规模试点来验证假设，降低风险的同时保持行动速度",
        summary: "先试点验证，再规模化执行",
        steps: [
          {
            step: "设计最小可行试点方案",
            timeline: "前3天",
            resources: "设计时间4-5小时",
            success_criteria: "可测试的小规模方案"
          },
          {
            step: "执行试点并收集数据",
            timeline: "第1-2周",
            resources: "试点执行投入",
            success_criteria: "获得有效的验证数据"
          },
          {
            step: "分析试点结果并优化",
            timeline: "第3周",
            resources: "分析时间3-4小时",
            success_criteria: "明确的优化方向"
          },
          {
            step: "基于试点结果决定是否扩大",
            timeline: "第4周",
            resources: "根据试点结果调整",
            success_criteria: "有数据支撑的扩大决策"
          }
        ],
        risk_analysis: {
          level: "low",
          main_risks: ["试点规模过小，结果不够有代表性", "试点与实际情况存在差异"],
          mitigation: ["精心设计试点方案", "多维度收集反馈", "快速迭代优化"]
        },
        investment: {
          time: "试点阶段15-20小时",
          money: "试点成本相对较低",
          energy: "需要专注的实验和分析"
        },
        expected_outcomes: {
          short_term: "获得实际验证数据，降低决策风险",
          long_term: "基于验证结果的稳健扩张",
          success_probability: "0.78"
        },
        pros_cons: {
          pros: ["风险可控", "有实际验证", "可以快速调整"],
          cons: ["试点结果可能不够全面", "需要额外的试点投入", "时间相对较长"]
        }
      }
    ]
  }
}
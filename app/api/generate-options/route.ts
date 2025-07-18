import { NextRequest, NextResponse } from 'next/server'
import { AIOption } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  let content: string = ''
  let model: string = 'kimi'

  try {
    const body = await request.json()
    content = body.content
    model = body.model || 'kimi'

    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      )
    }

    // Check for different API providers
    const siliconFlowKey = process.env.SILICON_FLOW_API_KEY
    const kimiKey = process.env.KIMI_API_KEY

    console.log('Silicon Flow API Key exists:', !!siliconFlowKey)
    console.log('Kimi API Key exists:', !!kimiKey)

    // Temporarily use mock data to test model selector UI
    console.log(`Selected model: ${model}`)
    console.log('Using mock data for testing model selector')
    const mockResponse = generateMockOptions(content)
    return NextResponse.json(mockResponse)

    if (!siliconFlowKey && !kimiKey) {
      console.error('No API key found in environment')
      // Return mock data if no API key
      const mockResponse = generateMockOptions(content)
      return NextResponse.json(mockResponse)
    }

    const prompt = `
你是一位融合心理学与社会学理论的专业决策教练，具备认知偏差识别、情绪调节和价值对齐的专业能力。你的使命是帮助用户做出既理性又符合其价值观的决策。

## 用户决策情境
用户描述：${content}

## 分析框架（基于心理学与社会学研究）
请运用以下科学理论进行分析：

### 心理学维度
1. **认知偏差识别**：检查锚定效应、确认偏误、损失厌恶、可得性偏差等
2. **情绪因素评估**：识别决策中的情绪成分，提供情绪调节策略
3. **价值观对齐**：确保建议与用户长期价值观和目标一致
4. **行为经济学原理**：运用前景理论、默认效应等优化选择呈现

### 社会学维度
1. **社会证明效应**：适当引用群体智慧和专家观点增强可信度
2. **权威影响**：借助专业理论和研究结果支撑建议
3. **群体认同**：考虑用户所属群体的价值观和行为模式

## 语言策略要求
1. **共情开场**：先认可用户的困惑和努力，建立心理安全感
2. **专业权威**：引用心理学研究和专家观点增强可信度
3. **行动导向**：每个建议都要有具体可执行的SMART目标
4. **价值强化**：反复连接用户的长期目标和核心价值
5. **鼓励支持**：使用积极、支持性语言激发内在动机

请以JSON格式输出：
{
  "empathy_opening": "共情开场语，认可用户感受和困惑",
  "bias_analysis": {
    "identified_biases": ["检测到的认知偏差1", "检测到的认知偏差2"],
    "bias_warnings": "针对这些偏差的提醒和应对建议"
  },
  "emotional_assessment": "用户情绪状态分析和调节建议",
  "options": [
    {
      "id": "A",
      "strategy_type": "积极进取型",
      "title": "具体而有吸引力的方案名称",
      "target_user": "最适合此选择的用户特征",
      "core_logic": "基于心理学理论的核心逻辑",
      "theoretical_basis": "支撑此选择的心理学/社会学理论",
      "bias_warning": "此选择可能触发的认知偏差及应对策略",
      "emotional_impact": "选择对情绪状态的影响评估",
      "value_alignment": "与常见价值观的匹配程度分析",
      "social_proof": "相关的群体智慧或专家观点支持",
      "steps": [
        {
          "step": "SMART原则的具体步骤",
          "timeline": "具体时间框架",
          "resources": "所需资源",
          "psychological_tip": "实施过程中的心理调适建议",
          "success_criteria": "可量化的成功标准"
        }
      ],
      "social_support": "建议寻求的外部支持和资源",
      "risk_analysis": {
        "level": "low/medium/high",
        "objective_risks": ["客观风险1", "客观风险2"],
        "psychological_barriers": ["心理阻力1", "心理阻力2"],
        "mitigation_strategies": ["科学的缓解措施1", "科学的缓解措施2"]
      },
      "investment": {
        "time": "量化时间投入",
        "money": "量化资金投入",
        "energy": "量化精力投入"
      },
      "expected_outcomes": {
        "short_term": "量化短期预期结果",
        "long_term": "量化长期预期结果",
        "success_probability": "基于统计的成功概率（0-1）"
      },
      "advantages": ["理论支撑的优势1", "理论支撑的优势2", "理论支撑的优势3"],
      "disadvantages": ["客观劣势1", "客观劣势2", "客观劣势3"],
      "best_conditions": "最适用的条件和情境"
    }
  ],
  "immediate_actions": ["立即可采取的具体行动1", "立即可采取的具体行动2", "立即可采取的具体行动3"],
  "reflection_questions": ["深度思考问题1", "深度思考问题2", "深度思考问题3"],
  "motivational_closing": "激励性结语，强化用户能力和价值观"
}

## 核心要求（基于研究证据）：
1. **差异化策略**：每个选择必须基于不同的心理学理论，有明显差异化
2. **行动导向**：所有步骤必须符合SMART原则，具体可执行
3. **偏差识别**：主动识别并提醒用户可能的认知偏差
4. **情绪智能**：考虑情绪因素，提供情绪调节建议
5. **价值对齐**：确保建议与用户长期价值观一致
6. **社会证明**：适当引用群体智慧和专家观点
7. **科学依据**：每个建议都要有心理学或社会学理论支撑
8. **共情沟通**：使用支持性、鼓励性语言激发内在动机
9. **成功概率**：基于类似情况的实际统计数据
10. **完整JSON**：确保JSON格式完全正确，使用中文回复
`

    // Create an AbortController for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

    let response: Response

    if (model === 'kimi' && kimiKey) {
      // Use Kimi API
      console.log('Using Kimi API (moonshot-v1-8k)')
      response = await fetch('https://api.moonshot.cn/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${kimiKey}`,
        },
        body: JSON.stringify({
          model: 'moonshot-v1-8k',
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
        signal: controller.signal
      })
    } else if (model === 'deepseek' && siliconFlowKey) {
      // Use Silicon Flow API with DeepSeek
      console.log('Using Silicon Flow API (DeepSeek-V3)')
      response = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${siliconFlowKey}`,
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
        signal: controller.signal
      })
    } else {
      // Fallback: try available API or use mock data
      if (kimiKey) {
        console.log('Fallback to Kimi API')
        response = await fetch('https://api.moonshot.cn/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${kimiKey}`,
          },
          body: JSON.stringify({
            model: 'moonshot-v1-8k',
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
          signal: controller.signal
        })
      } else if (siliconFlowKey) {
        console.log('Fallback to Silicon Flow API')
        response = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${siliconFlowKey}`,
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
          signal: controller.signal
        })
      } else {
        throw new Error('No API key available')
      }
    }

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API request failed: ${response.status} - ${errorText}`)
      throw new Error(`API request failed: ${response.status} - ${response.statusText}`)
    }

    const data = await response.json()
    const aiResponse = data.choices?.[0]?.message?.content

    if (!aiResponse) {
      console.error('No response from AI:', data)
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

    // Check if it's a timeout error
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('API request timed out, falling back to mock data')
    }

    // Return mock data as fallback
    const mockResponse = generateMockOptions(content ?? 'fallback decision')

    return NextResponse.json(mockResponse)
  }
}

// Enhanced mock data generator with psychological and social theory integration
function generateMockOptions(content: string) {
  return {
    empathy_opening: "我理解你现在面临的决策困惑，这种不确定感是完全正常的。每个重要决策都需要深思熟虑，你愿意寻求建议本身就体现了你的智慧。",
    bias_analysis: {
      identified_biases: ["可能存在确认偏误", "锚定效应影响"],
      bias_warnings: "请注意避免过度依赖第一印象，建议从多个角度审视问题，并主动寻找反驳自己假设的证据。"
    },
    emotional_assessment: "从你的描述中感受到一定的焦虑和期待，这是面对重要选择时的正常情绪。建议在做决策前先进行深呼吸，让情绪平静下来，以便更理性地思考。",
    options: [
      {
        id: "A",
        strategy_type: "积极进取型",
        title: "立即行动方案",
        target_user: "行动导向、风险承受能力强、喜欢快速反馈的决策者",
        core_logic: "基于行为经济学的'损失厌恶'理论，通过快速行动减少机会成本，利用'实施意图'心理学原理将想法转化为具体行动",
        theoretical_basis: "实施意图理论(Implementation Intention)、损失厌恶理论(Loss Aversion)",
        bias_warning: "注意避免'过度自信偏差'和'计划谬误'，可能低估执行难度和时间需求",
        emotional_impact: "初期会带来兴奋和动力，但需要管理可能的焦虑和挫折感",
        value_alignment: "适合重视效率、成长和挑战的价值观",
        social_proof: "研究显示，68%的成功创业者采用'快速试错'策略，麻省理工学院研究证实行动学习的有效性",
        steps: [
          {
            step: "收集核心信息并做出基本判断",
            timeline: "24小时内",
            resources: "个人时间2-3小时",
            psychological_tip: "使用'5分钟规则'克服拖延，设定明确的信息收集边界避免分析瘫痪",
            success_criteria: "获得足够的决策依据"
          },
          {
            step: "制定具体行动计划",
            timeline: "第2天",
            resources: "规划时间1-2小时",
            psychological_tip: "运用'如果-那么'计划格式，预设应对方案增强执行信心",
            success_criteria: "有清晰的执行路径"
          },
          {
            step: "开始执行并建立反馈机制",
            timeline: "第3天开始",
            resources: "日常执行时间",
            psychological_tip: "设置每日小胜利庆祝机制，维持动机和正面情绪",
            success_criteria: "能够及时调整策略"
          }
        ],
        social_support: "寻找有类似经验的导师或同伴，加入相关的行动学习小组",
        risk_analysis: {
          level: "medium",
          objective_risks: ["信息不足导致判断错误", "执行过程中遇到预料外的障碍"],
          psychological_barriers: ["过度自信可能导致忽视风险", "行动焦虑可能影响判断"],
          mitigation_strategies: ["建立快速反馈机制", "准备应急预案", "保持策略灵活性", "定期自我反思避免偏差"]
        },
        investment: {
          time: "前期3-5小时规划，后续持续投入",
          money: "最小可行投入",
          energy: "高强度专注，需要充沛精力"
        },
        expected_outcomes: {
          short_term: "快速获得市场反馈，抢占先机",
          long_term: "建立领先优势，获得更多机会",
          success_probability: 0.65
        },
        advantages: ["速度快，机会成本低", "能够快速获得市场反馈", "保持竞争优势"],
        disadvantages: ["风险相对较高", "可能需要频繁调整", "对执行力要求高"],
        best_conditions: "时间窗口有限、竞争激烈、用户具备强执行力和风险承受能力的情况下"
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
        advantages: ["风险可控", "有实际验证", "可以快速调整"],
        disadvantages: ["试点结果可能不够全面", "需要额外的试点投入", "时间相对较长"],
        best_conditions: "不确定性高、有试错空间、注重数据驱动决策的情况下"
      }
    ],
    immediate_actions: [
      "花10分钟写下你对这个决策最担心的3个问题",
      "联系一位有相关经验的朋友或导师，听取他们的建议",
      "设定一个决策截止日期，避免无限期拖延"
    ],
    reflection_questions: [
      "如果5年后回看这个决策，什么结果会让你感到最满意？",
      "你的直觉告诉你什么？这种感觉背后的原因是什么？",
      "如果失败了，最坏的结果是什么？你能承受吗？"
    ],
    motivational_closing: "记住，没有完美的决策，只有在当下情境中最合适的选择。你已经展现了寻求帮助的智慧，相信你有能力做出明智的决定。无论选择哪条路，你的成长和学习都是最宝贵的收获。"
  }
}
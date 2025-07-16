'use client'

import { AIOption } from '@/lib/supabase'

interface AIChoicePanelProps {
  options: AIOption[]
  selectedOption: number | null
  onSelectOption: (index: number) => void
  isGenerating: boolean
}

export function AIChoicePanel({ 
  options, 
  selectedOption, 
  onSelectOption, 
  isGenerating 
}: AIChoicePanelProps) {
  if (isGenerating) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">AI正在分析你的想法...</p>
        </div>
      </div>
    )
  }

  if (options.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-gray-500">
          <div className="text-6xl mb-4">🤔</div>
          <p className="text-lg mb-2">在左侧输入你的想法</p>
          <p className="text-sm">AI会为你生成结构化的选择建议</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 h-full overflow-y-auto">
      {options.map((option, index) => (
        <ChoiceCard
          key={option.id}
          option={option}
          index={index}
          isSelected={selectedOption === index}
          onSelect={() => onSelectOption(index)}
        />
      ))}
    </div>
  )
}

interface ChoiceCardProps {
  option: AIOption
  index: number
  isSelected: boolean
  onSelect: () => void
}

function ChoiceCard({ option, index, isSelected, onSelect }: ChoiceCardProps) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getRiskText = (risk: string) => {
    switch (risk) {
      case 'low':
        return '低风险'
      case 'medium':
        return '中风险'
      case 'high':
        return '高风险'
      default:
        return '未知'
    }
  }

  const getStrategyIcon = (strategyType: string) => {
    if (strategyType?.includes('积极进取')) return '🚀'
    if (strategyType?.includes('稳健保守')) return '🛡️'
    if (strategyType?.includes('创新实验')) return '🔬'
    if (strategyType?.includes('战略等待')) return '⏰'
    return '📋'
  }

  // 兼容性处理：支持新旧数据结构
  const riskLevel = option.risk_analysis?.level || (option as any).risk_level || 'medium'
  const successProb = option.expected_outcomes?.success_probability || '未知'
  const strategyType = option.strategy_type || '决策方案'
  const coreLogic = option.core_logic || option.summary || '暂无详细说明'

  return (
    <div
      className={`border rounded-lg p-6 cursor-pointer transition-all ${
        isSelected 
          ? 'border-blue-500 bg-blue-50 shadow-lg' 
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md'
      }`}
      onClick={onSelect}
    >
      {/* 头部：策略类型和风险等级 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{getStrategyIcon(strategyType)}</span>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">
              {option.title}
            </h3>
            <p className="text-sm text-gray-500">{strategyType}</p>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <span className={`px-3 py-1 rounded-full text-xs border ${getRiskColor(riskLevel)}`}>
            {getRiskText(riskLevel)}
          </span>
          <span className="text-xs text-gray-500">
            成功率: {successProb}
          </span>
        </div>
      </div>

      {/* 核心逻辑 */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">💡 核心逻辑：</h4>
        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
          {coreLogic}
        </p>
      </div>

      {/* 行动步骤 */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">🎯 行动步骤：</h4>
        <div className="space-y-2">
          {option.steps && Array.isArray(option.steps) ? (
            option.steps.map((step, stepIndex) => (
              <div key={stepIndex} className="border-l-2 border-blue-200 pl-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      {stepIndex + 1}. {typeof step === 'string' ? step : step.step}
                    </p>
                    {typeof step === 'object' && step.timeline && (
                      <p className="text-xs text-gray-500 mt-1">
                        📅 {step.timeline} | 📦 {step.resources}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">暂无步骤信息</p>
          )}
        </div>
      </div>

      {/* 投资需求 */}
      {option.investment && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">💰 投资需求：</h4>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 bg-gray-50 rounded">
              <div className="text-lg">⏱️</div>
              <div className="text-xs text-gray-600">{option.investment.time}</div>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded">
              <div className="text-lg">💵</div>
              <div className="text-xs text-gray-600">{option.investment.money}</div>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded">
              <div className="text-lg">🔋</div>
              <div className="text-xs text-gray-600">{option.investment.energy}</div>
            </div>
          </div>
        </div>
      )}

      {/* 风险分析 */}
      {option.risk_analysis && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">⚠️ 风险分析：</h4>
          <div className="space-y-2">
            {option.risk_analysis.main_risks && (
              <div>
                <p className="text-xs text-gray-600 mb-1">主要风险：</p>
                <ul className="text-xs text-red-600 space-y-1">
                  {option.risk_analysis.main_risks.map((risk, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-1">•</span>
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {option.risk_analysis.mitigation && (
              <div>
                <p className="text-xs text-gray-600 mb-1">缓解措施：</p>
                <ul className="text-xs text-green-600 space-y-1">
                  {option.risk_analysis.mitigation.map((mitigation, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-1">✓</span>
                      <span>{mitigation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 预期结果 */}
      {option.expected_outcomes && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">🎯 预期结果：</h4>
          <div className="space-y-2">
            {option.expected_outcomes.short_term && (
              <div className="flex items-start space-x-2">
                <span className="text-blue-600 text-xs">短期:</span>
                <span className="text-xs text-gray-600 flex-1">{option.expected_outcomes.short_term}</span>
              </div>
            )}
            {option.expected_outcomes.long_term && (
              <div className="flex items-start space-x-2">
                <span className="text-green-600 text-xs">长期:</span>
                <span className="text-xs text-gray-600 flex-1">{option.expected_outcomes.long_term}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 优缺点 */}
      {option.pros_cons && (
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-green-700 mb-2">✅ 优势：</h4>
              <ul className="text-xs text-green-600 space-y-1">
                {option.pros_cons.pros?.map((pro, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-1">+</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-red-700 mb-2">❌ 劣势：</h4>
              <ul className="text-xs text-red-600 space-y-1">
                {option.pros_cons.cons?.map((con, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-1">-</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 选择按钮 */}
      <div className="pt-4 border-t border-gray-200">
        <button
          className={`w-full py-3 px-4 rounded-md text-sm font-medium transition-colors ${
            isSelected
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {isSelected ? '✓ 已选择此方案' : '选择此方案'}
        </button>
      </div>
    </div>
  )
}
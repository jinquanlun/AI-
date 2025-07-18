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
      <div className="flex items-center justify-center h-full p-8 animate-fade-in">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-8 relative animate-scale-in">
            <div className="absolute inset-0 rounded-full border-2 border-gray-200"></div>
            <div className="absolute inset-0 rounded-full border-2 border-gray-900 border-t-transparent animate-spin"></div>
          </div>
          <p className="text-base opacity-80 animate-pulse-gentle">AI正在分析你的想法...</p>
        </div>
      </div>
    )
  }

  if (options.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-8 animate-fade-in">
        <div className="text-center opacity-60">
          <div className="text-7xl mb-8 opacity-30 animate-pulse-gentle">🤔</div>
          <p className="text-base mb-4">在左侧输入你的想法</p>
          <p className="text-sm opacity-70">AI会为你生成结构化的选择建议</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="space-y-6 lg:space-y-8 pb-8">
        {options.map((option, index) => (
          <ChoiceCard
            key={index}
            option={option}
            index={index}
            isSelected={selectedOption === index}
            onSelect={() => onSelectOption(index)}
          />
        ))}
      </div>
      {/* 滚动提示 - 仅在有多个选择时显示 */}
      {options.length > 1 && (
        <div className="text-center py-4 lg:py-6 text-zen-small opacity-40 border-t border-gray-100/50 mt-6 lg:mt-8 sticky bottom-0 bg-white/90 backdrop-blur-sm">
          <div className="animate-zen-breathe">
            ↕ 滾動查看所有選擇
          </div>
        </div>
      )}
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
        return 'text-green-700 bg-green-50 border-green-200'
      case 'medium':
        return 'text-amber-700 bg-amber-50 border-amber-200'
      case 'high':
        return 'text-red-700 bg-red-50 border-red-200'
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
  const riskLevel = option.risk_analysis?.level || 'medium'
  const successProb = option.expected_outcomes?.success_probability || '未知'
  const strategyType = option.strategy_type || '决策方案'
  const coreLogic = option.core_logic || option.summary || '暂无详细说明'

  return (
    <div
      className={`p-6 border border-gray-200 rounded-lg cursor-pointer transition-smooth group hover-lift animate-fade-in ${
        isSelected
          ? 'border-gray-900 bg-gray-50 shadow-lg transform scale-[1.02] animate-scale-in'
          : 'hover:border-gray-300 hover:shadow-md focus-within:border-gray-400 focus-within:shadow-md'
      }`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect()
        }
      }}
      aria-label={`选择方案 ${String.fromCharCode(65 + index)}: ${option.title}`}
      aria-pressed={isSelected}
    >
      {/* 头部：策略类型和风险等级 */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 lg:mb-8 space-y-4 sm:space-y-0">
        <div className="flex items-start space-x-3 lg:space-x-4">
          <span className="text-2xl lg:text-3xl opacity-80 group-hover:scale-110 transition-transform duration-200">{getStrategyIcon(strategyType)}</span>
          <div className="flex-1">
            <h3 className="text-lg lg:text-xl font-medium mb-2 text-gray-900 group-hover:text-gray-700 transition-smooth">
              {option.title}
            </h3>
            <p className="text-sm lg:text-base text-gray-600">{strategyType}</p>
          </div>
        </div>
        <div className="flex flex-row sm:flex-col items-start sm:items-end space-x-3 sm:space-x-0 sm:space-y-3">
          <span className={`px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-xs border ${getRiskColor(riskLevel)} font-medium transition-smooth hover-scale`}>
            {getRiskText(riskLevel)}
          </span>
          <span className="text-sm opacity-60">
            成功率: {successProb}
          </span>
        </div>
      </div>

      {/* 核心逻辑 */}
      <div className="mb-8">
        <h4 className="text-zen-small font-medium opacity-70 mb-4 flex items-center">
          <span className="mr-2">💡</span> 核心逻辑
        </h4>
        <p className="text-zen-body leading-relaxed bg-gray-50/50 p-6 rounded-md border border-gray-100">
          {coreLogic}
        </p>
      </div>

      {/* 行动步骤 */}
      <div className="mb-8">
        <h4 className="text-zen-small font-medium opacity-70 mb-4 flex items-center">
          <span className="mr-2">🎯</span> 行動步驟
        </h4>
        <div className="space-y-4">
          {option.steps && Array.isArray(option.steps) ? (
            option.steps.map((step, stepIndex) => (
              <div key={stepIndex} className="border-l-2 border-gray-200 pl-6 relative">
                <div className="absolute -left-2 top-3 w-3 h-3 bg-white border-2 border-gray-300 rounded-full"></div>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-zen-body font-medium mb-2">
                      {stepIndex + 1}. {typeof step === 'string' ? step : step.step}
                    </p>
                    {typeof step === 'object' && step.timeline && (
                      <p className="text-zen-small opacity-60 flex items-center space-x-4">
                        <span className="flex items-center">📅 {step.timeline}</span>
                        <span className="flex items-center">📦 {step.resources}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-zen-small opacity-60">暫無步驟信息</p>
          )}
        </div>
      </div>

      {/* 投资需求 */}
      {option.investment && (
        <div className="mb-8">
          <h4 className="text-zen-small font-medium opacity-70 mb-4 flex items-center">
            <span className="mr-2">💰</span> 投資需求
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50/50 rounded-md border border-gray-100">
              <div className="text-2xl mb-2 opacity-70">⏱️</div>
              <div className="text-zen-small opacity-80">{option.investment.time}</div>
            </div>
            <div className="text-center p-4 bg-gray-50/50 rounded-md border border-gray-100">
              <div className="text-2xl mb-2 opacity-70">💵</div>
              <div className="text-zen-small opacity-80">{option.investment.money}</div>
            </div>
            <div className="text-center p-4 bg-gray-50/50 rounded-md border border-gray-100">
              <div className="text-2xl mb-2 opacity-70">🔋</div>
              <div className="text-zen-small opacity-80">{option.investment.energy}</div>
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
      <div className="pt-8 border-t border-gray-100/50">
        <button
          className={`w-full py-4 px-6 rounded-md text-sm font-medium transition-zen tracking-wide ${
            isSelected
              ? 'bg-gray-900 text-white shadow-zen-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-zen'
          }`}
        >
          {isSelected ? '✓ 已選擇此方案' : '選擇此方案'}
        </button>
      </div>
    </div>
  )
}
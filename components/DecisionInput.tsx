'use client'

import { useState, useCallback } from 'react'

interface DecisionInputProps {
  content: string
  onChange: (content: string) => void
  onGenerate: () => void
  isGenerating: boolean
}

export function DecisionInput({ content, onChange, onGenerate, isGenerating }: DecisionInputProps) {
  const [showHint, setShowHint] = useState(false)

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    onChange(value)
    
    // Show hint when user stops typing and has enough content
    if (value.length > 50) {
      setShowHint(true)
    } else {
      setShowHint(false)
    }
  }, [onChange])

  const handleGenerate = useCallback(() => {
    if (content.trim() && !isGenerating) {
      onGenerate()
    }
  }, [content, isGenerating, onGenerate])

  // Auto-trigger generation when user stops typing
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      handleGenerate()
    }
  }, [handleGenerate])

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 mb-6">
        <label htmlFor="decision-input" className="sr-only">
          决策内容输入
        </label>
        <textarea
          id="decision-input"
          value={content}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="想到什么就写什么..."
          className="w-full h-full resize-none text-gray-900 bg-transparent border-none focus:outline-none leading-relaxed transition-smooth focus:bg-gray-50/30"
          style={{ minHeight: '400px' }}
          aria-describedby={showHint ? "input-hint" : undefined}
        />
      </div>

      {showHint && (
        <div id="input-hint" className="mb-6 p-4 bg-gray-50 border border-gray-200 animate-fade-in hover-lift transition-smooth" role="status" aria-live="polite">
          <span className="text-sm text-gray-600">
            提示：你可能还想考虑时间因素、资源限制或风险评估
          </span>
        </div>
      )}

      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <span className="text-sm text-gray-500 transition-smooth">
          {content.length > 0 ? (
            <span className="animate-fade-in">已保存</span>
          ) : (
            <span className="animate-pulse-gentle">开始输入...</span>
          )}
        </span>

        <button
          onClick={handleGenerate}
          disabled={!content.trim() || isGenerating}
          className={`px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-smooth hover-lift group ${
            !content.trim() || isGenerating
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
          aria-label={isGenerating ? '正在生成AI选择建议' : '生成AI选择建议'}
        >
          {isGenerating && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
          )}
          <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
            {isGenerating ? '正在思考...' : '生成选择'}
          </span>
        </button>
      </div>

      <div className="mt-4 text-sm text-gray-500 text-center animate-fade-in">
        Cmd/Ctrl + Enter 快速生成选择
      </div>
    </div>
  )
}
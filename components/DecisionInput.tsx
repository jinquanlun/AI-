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
          決策內容輸入
        </label>
        <textarea
          id="decision-input"
          value={content}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="想到什麼就寫什麼...

你可以描述你面臨的決策、考慮的因素、擔心的問題等。AI會根據你的內容生成結構化的選擇建議。

例如：
- 要不要接受這個新項目？
- 考慮換工作還是繼續現在的
- 糾結要不要投資這個機會..."
          className="input-zen w-full h-full resize-none text-gray-900 leading-relaxed scrollbar-zen"
          style={{ minHeight: '400px' }}
          aria-describedby={showHint ? "input-hint" : undefined}
        />
      </div>

      {showHint && (
        <div id="input-hint" className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md animate-zen-fadeIn" role="status" aria-live="polite">
          <div className="flex items-start space-x-3">
            <span className="text-amber-600 text-lg mt-0.5" aria-hidden="true">💡</span>
            <span className="text-amber-800 text-sm leading-relaxed font-medium">
              提示：你可能還想考慮時間因素、資源限制或風險評估
            </span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            className="btn-zen text-xs py-2 px-3 opacity-50 hover:opacity-100 transition-zen"
            disabled={isGenerating}
          >
            🎤 語音輸入
          </button>
          <span className="text-zen-small opacity-60">
            {content.length > 0 ? '已保存' : '開始輸入...'}
          </span>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!content.trim() || isGenerating}
          className={`px-8 py-3 text-sm font-medium rounded-md transition-zen tracking-wide flex items-center space-x-2 ${
            content.trim() && !isGenerating
              ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-zen-md hover:shadow-zen-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          aria-label={isGenerating ? '正在生成AI選擇建議' : '生成AI選擇建議'}
        >
          {isGenerating && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
          )}
          <span>{isGenerating ? '正在思考...' : '生成選擇'}</span>
        </button>
      </div>

      <div className="mt-4 text-zen-small opacity-50 text-center">
        💡 提示：Cmd/Ctrl + Enter 快速生成選擇
      </div>
    </div>
  )
}
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
      <div className="flex-1 mb-4">
        <textarea
          value={content}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="想到什么就写什么...

你可以描述你面临的决策、考虑的因素、担心的问题等。AI会根据你的内容生成结构化的选择建议。

例如：
- 要不要接受这个新项目？
- 考虑换工作还是继续现在的
- 纠结要不要投资这个机会..."
          className="w-full h-full p-4 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          style={{ minHeight: '400px' }}
        />
      </div>

      {showHint && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-center">
            <span className="text-blue-600 mr-2">💡</span>
            <span className="text-sm text-blue-800">
              提示：你可能还想考虑时间因素、资源限制或风险评估
            </span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50"
            disabled={isGenerating}
          >
            🎤 语音输入
          </button>
          <span className="text-sm text-gray-500">
            {content.length > 0 ? '已保存' : '开始输入...'}
          </span>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!content.trim() || isGenerating}
          className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${
            content.trim() && !isGenerating
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isGenerating ? '生成中...' : '生成选择'}
        </button>
      </div>

      <div className="mt-2 text-xs text-gray-500">
        💡 提示：Cmd/Ctrl + Enter 快速生成选择
      </div>
    </div>
  )
}
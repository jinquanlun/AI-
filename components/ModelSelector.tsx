'use client'

import { useState } from 'react'

export type AIModel = 'kimi' | 'deepseek'

interface ModelSelectorProps {
  selectedModel: AIModel
  onModelChange: (model: AIModel) => void
  disabled?: boolean
}

export function ModelSelector({ selectedModel, onModelChange, disabled = false }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const models = [
    {
      id: 'kimi' as AIModel,
      name: 'Kimi',
      description: 'Moonshot AI - 智能对话模型',
      icon: '🌙',
      provider: 'Moonshot AI'
    },
    {
      id: 'deepseek' as AIModel,
      name: 'DeepSeek V3',
      description: 'Silicon Flow - 深度推理模型',
      icon: '🧠',
      provider: 'Silicon Flow'
    }
  ]

  const selectedModelInfo = models.find(m => m.id === selectedModel)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full flex items-center justify-between px-4 py-3 
          border border-gray-200 rounded-lg bg-white
          hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-200
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <div className="flex items-center space-x-3">
          <span className="text-lg">{selectedModelInfo?.icon}</span>
          <div className="text-left">
            <div className="font-medium text-gray-900">{selectedModelInfo?.name}</div>
            <div className="text-sm text-gray-500">{selectedModelInfo?.provider}</div>
          </div>
        </div>
        <svg 
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-zen-fadeIn">
          <div className="py-1">
            {models.map((model) => (
              <button
                key={model.id}
                type="button"
                onClick={() => {
                  onModelChange(model.id)
                  setIsOpen(false)
                }}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 text-left
                  hover:bg-gray-50 transition-colors duration-150
                  ${selectedModel === model.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''}
                `}
              >
                <span className="text-lg">{model.icon}</span>
                <div className="flex-1">
                  <div className={`font-medium ${selectedModel === model.id ? 'text-blue-900' : 'text-gray-900'}`}>
                    {model.name}
                  </div>
                  <div className={`text-sm ${selectedModel === model.id ? 'text-blue-600' : 'text-gray-500'}`}>
                    {model.description}
                  </div>
                </div>
                {selectedModel === model.id && (
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Hook for managing model selection
export function useModelSelection(defaultModel: AIModel = 'kimi') {
  const [selectedModel, setSelectedModel] = useState<AIModel>(defaultModel)

  return {
    selectedModel,
    setSelectedModel,
  }
}

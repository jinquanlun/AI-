'use client'

import { useState } from 'react'
import { DecisionInput } from '@/components/DecisionInput'
import { AIChoicePanel } from '@/components/AIChoicePanel'
import { AppHeader } from '@/components/AppHeader'
import { ModelSelector, useModelSelection, AIModel } from '@/components/ModelSelector'
import { AIOption } from '@/lib/supabase'
import { DecisionService } from '@/lib/decisions'

export default function App() {
  const [inputContent, setInputContent] = useState('')
  const [aiOptions, setAiOptions] = useState<AIOption[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [currentDecisionId, setCurrentDecisionId] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const { selectedModel, setSelectedModel } = useModelSelection('kimi')

  const handleInputChange = (content: string) => {
    setInputContent(content)
  }

  const handleGenerateOptions = async () => {
    if (!inputContent.trim()) return
    
    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate-options', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: inputContent, model: selectedModel }),
      })
      
      if (response.ok) {
        const data = await response.json()
        setAiOptions(data.options)
        
        // Create a new decision record
        const decision = await DecisionService.createDecision({
          content: inputContent,
          ai_options: data.options,
        })
        
        if (decision) {
          setCurrentDecisionId(decision.id)
        }
      }
    } catch (error) {
      console.error('Error generating options:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSelectOption = async (optionIndex: number) => {
    setSelectedOption(optionIndex)
    setIsUpdating(true)
    
    // Update the decision in the database
    if (currentDecisionId) {
      try {
        const result = await DecisionService.updateDecision(currentDecisionId, {
          selected_option: optionIndex,
        })
        
        if (result) {
          console.log('Decision updated successfully')
        } else {
          console.log('Decision update skipped (no authentication or mock mode)')
        }
      } catch (error) {
        console.error('Error updating decision:', error)
      }
    } else {
      console.log('No decision ID available for update')
    }
    
    setIsUpdating(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/30 to-gray-100/20">
      <AppHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 min-h-[calc(100vh-8rem)] lg:h-[calc(100vh-10rem)]">
          {/* Left Panel - Decision Input with enhanced zen design */}
          <div className="lg:col-span-5 card-zen flex flex-col shadow-zen-md order-1 lg:order-1">
            <div className="border-b border-gray-100/50 pb-6 mb-6">
              <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
                記錄你的想法
              </h2>
              <p className="text-sm lg:text-base text-gray-600">
                自由表達，無需結構
              </p>
            </div>

            {/* AI Model Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                選擇AI模型
              </label>
              <ModelSelector
                selectedModel={selectedModel}
                onModelChange={setSelectedModel}
                disabled={isGenerating}
              />
            </div>
            <div className="flex-1">
              <DecisionInput
                content={inputContent}
                onChange={handleInputChange}
                onGenerate={handleGenerateOptions}
                isGenerating={isGenerating}
              />
            </div>
          </div>

          {/* Right Panel - AI Choice Cards with zen spacing */}
          <div className="lg:col-span-7 card-zen flex flex-col relative shadow-zen-md order-2 lg:order-2">
            <div className="border-b border-gray-100/50 pb-6 mb-6 relative">
              <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
                AI 為你生成選擇
              </h2>
              <p className="text-sm lg:text-base text-gray-600">
                結構化的決策建議
              </p>
              {selectedOption !== null && !isUpdating && (
                <div className="absolute top-0 right-0 bg-green-50 text-green-800 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-xs font-medium shadow-zen animate-zen-fadeIn border border-green-200">
                  ✓ 已選擇方案 {String.fromCharCode(65 + selectedOption)}
                </div>
              )}
            </div>
            <div className="flex-1 overflow-hidden">
              <AIChoicePanel
                options={aiOptions}
                selectedOption={selectedOption}
                onSelectOption={handleSelectOption}
                isGenerating={isGenerating}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
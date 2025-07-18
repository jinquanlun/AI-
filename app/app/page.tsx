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
    <div className="min-h-screen bg-white">
      <AppHeader />

      {/* Clean Layout with Smooth Animations */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-h-[calc(100vh-8rem)]">
          {/* Left Panel - Decision Input with Animation */}
          <div className="lg:col-span-5 bg-white border border-gray-200 p-6 lg:p-8 flex flex-col hover-lift transition-smooth animate-slide-in-left">
            <div className="mb-8">
              <h2 className="text-xl lg:text-2xl font-medium text-gray-900 mb-2 animate-fade-in">
                记录你的想法
              </h2>
              <p className="text-gray-600 animate-fade-in">
                自由表达，无需结构
              </p>
            </div>

            {/* AI Model Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                选择AI模型
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

          {/* Right Panel - AI Choice Display with Animation */}
          <div className="lg:col-span-7 bg-white border border-gray-200 p-6 lg:p-8 flex flex-col hover-lift transition-smooth animate-slide-in-right">
            <div className="mb-8 relative">
              <h2 className="text-xl lg:text-2xl font-medium text-gray-900 mb-2 animate-fade-in">
                AI 为你生成选择
              </h2>
              <p className="text-gray-600 animate-fade-in">
                结构化的决策建议
              </p>
              {selectedOption !== null && !isUpdating && (
                <div className="absolute top-0 right-0 text-green-600 text-sm animate-scale-in">
                  ✓ 已选择方案 {String.fromCharCode(65 + selectedOption)}
                </div>
              )}
            </div>
            <div className="flex-1">
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
'use client'

import { useState } from 'react'
import { DecisionInput } from '@/components/DecisionInput'
import { AIChoicePanel } from '@/components/AIChoicePanel'
import { Header } from '@/components/Header'
import { AIOption } from '@/lib/supabase'
import { DecisionService } from '@/lib/decisions'

export default function Home() {
  const [inputContent, setInputContent] = useState('')
  const [aiOptions, setAiOptions] = useState<AIOption[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [currentDecisionId, setCurrentDecisionId] = useState<string | null>(null)

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
        body: JSON.stringify({ content: inputContent }),
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
    
    // Update the decision in the database
    if (currentDecisionId) {
      try {
        await DecisionService.updateDecision(currentDecisionId, {
          selected_option: optionIndex,
        })
      } catch (error) {
        console.error('Error updating decision:', error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-8rem)]">
          {/* Left Panel - Decision Input */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              记录你的想法
            </h2>
            <DecisionInput
              content={inputContent}
              onChange={handleInputChange}
              onGenerate={handleGenerateOptions}
              isGenerating={isGenerating}
            />
          </div>

          {/* Right Panel - AI Choice Cards */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              AI 为你生成选择
            </h2>
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
  )
}
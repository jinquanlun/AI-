'use client'

import { useState, useEffect } from 'react'
import { Decision } from '@/lib/supabase'
import { DecisionService } from '@/lib/decisions'

export function DecisionHistory() {
  const [decisions, setDecisions] = useState<Decision[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    loadDecisions()
  }, [])

  const loadDecisions = async () => {
    try {
      const data = await DecisionService.getUserDecisions(10)
      setDecisions(data)
    } catch (error) {
      console.error('Error loading decisions:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
      >
        历史记录
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">决策历史</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">加载中...</p>
            </div>
          ) : decisions.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-4">📝</div>
              <p className="text-gray-600">还没有决策记录</p>
              <p className="text-sm text-gray-500 mt-2">开始记录你的第一个决策吧</p>
            </div>
          ) : (
            <div className="space-y-4">
              {decisions.map((decision) => (
                <DecisionCard key={decision.id} decision={decision} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface DecisionCardProps {
  decision: Decision
}

function DecisionCard({ decision }: DecisionCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getSelectedOptionTitle = () => {
    if (decision.selected_option !== null && decision.ai_options) {
      const option = decision.ai_options[decision.selected_option]
      return option?.title || '未知选择'
    }
    return '未选择'
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="text-sm text-gray-600 line-clamp-2">
            {decision.content}
          </p>
        </div>
        <span className="text-xs text-gray-500 ml-4 flex-shrink-0">
          {formatDate(decision.created_at)}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-700">
            选择: <span className="font-medium">{getSelectedOptionTitle()}</span>
          </span>
          {decision.result && (
            <span className="text-sm text-green-600">
              ✓ 已完成
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">
            {decision.ai_options?.length || 0} 个选择
          </span>
        </div>
      </div>
    </div>
  )
}
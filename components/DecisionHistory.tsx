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

  // Refresh decisions when the modal opens
  useEffect(() => {
    if (isOpen) {
      loadDecisions()
    }
  }, [isOpen])

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const loadDecisions = async () => {
    try {
      setLoading(true)
      const data = await DecisionService.getUserDecisions(10)
      setDecisions(data)
      console.log('Loaded decisions:', data.length)
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
        className="text-zen-body hover:text-zen-ink transition-zen text-sm tracking-wide"
      >
        歷史記錄
      </button>
    )
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-zen-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsOpen(false)
        }
      }}
    >
      <div className="bg-white rounded-lg max-w-3xl w-full mx-8 max-h-[85vh] overflow-hidden shadow-zen-lg">
        <div className="flex items-center justify-between p-8 border-b border-gray-100/50">
          <h2 className="text-zen-heading">決策歷史</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={loadDecisions}
              disabled={loading}
              className="text-zen-body hover:text-zen-ink transition-zen p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
              title="刷新歷史記錄"
            >
              <svg className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zen-body hover:text-zen-ink transition-zen p-2 rounded-full hover:bg-gray-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-8 overflow-y-auto max-h-[70vh] scrollbar-zen">
          {loading ? (
            <div className="text-center py-16">
              <div className="w-12 h-12 mx-auto mb-8 relative">
                <div className="absolute inset-0 rounded-full border-2 border-gray-200"></div>
                <div className="absolute inset-0 rounded-full border-2 border-gray-900 border-t-transparent animate-spin"></div>
              </div>
              <p className="text-zen-body opacity-80">加載中...</p>
            </div>
          ) : decisions.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-8 opacity-30">📝</div>
              <p className="text-zen-body mb-4">還沒有決策記錄</p>
              <p className="text-zen-small opacity-70">開始記錄你的第一個決策吧</p>
            </div>
          ) : (
            <div className="space-y-6">
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
      return option?.title || '未知選擇'
    }
    return '未選擇'
  }

  return (
    <div className="card-zen transition-zen hover:shadow-zen-md group">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <p className="text-zen-body leading-relaxed line-clamp-3">
            {decision.content}
          </p>
        </div>
        <span className="text-zen-small opacity-60 ml-6 flex-shrink-0">
          {formatDate(decision.created_at)}
        </span>
      </div>

      <div className="divider-zen opacity-20 my-4"></div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <span className="text-zen-small">
            選擇: <span className="font-medium text-zen-body">{getSelectedOptionTitle()}</span>
          </span>
          {decision.result && (
            <span className="text-zen-small text-green-600 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              已完成
            </span>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-zen-small opacity-60">
            {decision.ai_options?.length || 0} 個選擇
          </span>
        </div>
      </div>
    </div>
  )
}
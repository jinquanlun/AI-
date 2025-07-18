'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { DecisionService } from '@/lib/decisions'
import { Decision } from '@/lib/supabase'

export default function HistoryPage() {
  const [decisions, setDecisions] = useState<Decision[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'selected' | 'unselected' | 'completed'>('all')

  useEffect(() => {
    loadDecisions()
  }, [])

  const loadDecisions = async () => {
    try {
      setLoading(true)
      const data = await DecisionService.getUserDecisions(50) // Load more for the dedicated page
      setDecisions(data)
      console.log('Loaded decisions:', data.length)
    } catch (error) {
      console.error('Error loading decisions:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredDecisions = decisions.filter(decision => {
    const matchesSearch = decision.content.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (!matchesSearch) return false
    
    switch (filterStatus) {
      case 'selected':
        return decision.selected_option !== null
      case 'unselected':
        return decision.selected_option === null
      case 'completed':
        return decision.result !== null
      default:
        return true
    }
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getSelectedOptionTitle = (decision: Decision) => {
    if (decision.selected_option === null) return '未選擇'
    const option = decision.ai_options[decision.selected_option]
    return option?.title || `方案 ${String.fromCharCode(65 + decision.selected_option)}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <header className="border-b border-gray-100/50 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/app" className="flex items-center space-x-3 group">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-900 rounded-full flex items-center justify-center shadow-zen transition-zen group-hover:shadow-zen-md group-hover:scale-105">
                  <span className="text-white text-sm lg:text-base font-light">決</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base lg:text-lg font-semibold text-gray-900 tracking-widest">Decision Compass</span>
                  <span className="text-xs lg:text-sm text-gray-600 -mt-1 hidden sm:block">決策指南針</span>
                </div>
              </Link>
              <div className="hidden sm:block w-px h-6 bg-gray-200"></div>
              <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">決策歷史</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={loadDecisions}
                disabled={loading}
                className="text-gray-600 hover:text-gray-900 transition-zen p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                title="刷新歷史記錄"
              >
                <svg className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              
              <Link
                href="/app"
                className="btn-zen text-sm tracking-wide px-4 lg:px-6 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              >
                返回主頁
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between">
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="搜索決策內容..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'selected' | 'unselected' | 'completed')}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white/80 backdrop-blur-sm"
            >
              <option value="all">全部決策</option>
              <option value="selected">已選擇</option>
              <option value="unselected">未選擇</option>
              <option value="completed">已完成</option>
            </select>
            
            <div className="text-sm text-gray-600">
              共 {filteredDecisions.length} 條記錄
            </div>
          </div>
        </div>

        {/* Decision List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <span className="ml-3 text-gray-600">載入中...</span>
          </div>
        ) : filteredDecisions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 opacity-20">📝</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || filterStatus !== 'all' ? '沒有找到符合條件的記錄' : '還沒有決策記錄'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterStatus !== 'all' ? '試試調整搜索條件或篩選器' : '開始記錄你的第一個決策吧'}
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <Link
                href="/app"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-zen"
              >
                開始決策
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredDecisions.map((decision) => (
              <DecisionCard key={decision.id} decision={decision} formatDate={formatDate} getSelectedOptionTitle={getSelectedOptionTitle} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

// Decision Card Component
function DecisionCard({ 
  decision, 
  formatDate, 
  getSelectedOptionTitle 
}: { 
  decision: Decision
  formatDate: (date: string) => string
  getSelectedOptionTitle: (decision: Decision) => string
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <div className="card-zen hover-lift transition-zen">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-gray-900 leading-relaxed mb-3 line-clamp-3">
              {decision.content}
            </p>
            <div className="text-sm text-gray-500">
              {formatDate(decision.created_at)}
            </div>
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-4 p-2 text-gray-400 hover:text-gray-600 transition-zen rounded-full hover:bg-gray-100"
            aria-label={isExpanded ? '收起詳情' : '展開詳情'}
          >
            <svg 
              className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Status and Options */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">選擇:</span>
              <span className={`text-sm font-medium ${
                decision.selected_option !== null ? 'text-green-700' : 'text-gray-500'
              }`}>
                {getSelectedOptionTitle(decision)}
              </span>
              {decision.result && (
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  已完成
                </span>
              )}
            </div>
          </div>
          
          <div className="text-sm text-gray-500">
            {decision.ai_options.length} 個選擇
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-gray-100 animate-zen-fadeIn">
            {decision.result && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">執行結果</h4>
                <p className="text-green-800 text-sm">{decision.result}</p>
              </div>
            )}
            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">AI 生成的選擇方案</h4>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {decision.ai_options.map((option, index) => (
                  <div 
                    key={option.id} 
                    className={`p-4 border rounded-lg ${
                      decision.selected_option === index 
                        ? 'border-green-300 bg-green-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-gray-900">
                        方案 {String.fromCharCode(65 + index)}
                      </span>
                      {decision.selected_option === index && (
                        <span className="text-green-600 text-sm">✓ 已選擇</span>
                      )}
                    </div>
                    <h5 className="font-medium text-gray-800 mb-1">{option.title}</h5>
                    <p className="text-sm text-gray-600 mb-2">{option.strategy_type}</p>
                    <p className="text-xs text-gray-500 line-clamp-2">{option.core_logic}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

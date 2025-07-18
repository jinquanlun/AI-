'use client'

import Link from 'next/link'

export function AppHeader() {
  return (
    <header className="border-b border-gray-200 bg-white/90 backdrop-blur-sm sticky top-0 z-50 transition-smooth">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Back to Landing Page with Smooth Animation */}
          <Link href="/" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-smooth px-3 py-2 rounded-md hover:bg-gray-50 group">
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm font-medium">返回首页</span>
          </Link>

          {/* App Title with Subtle Animation */}
          <div className="text-center animate-fade-in">
            <h1 className="text-lg font-light text-gray-900 hover:text-gray-700 transition-smooth">Decision Compass</h1>
            <p className="text-xs text-gray-500">决策指南针</p>
          </div>

          {/* Right Side Actions with Hover Effects */}
          <div className="flex items-center space-x-4">
            <Link
              href="/docs"
              className="text-sm text-gray-500 hover:text-gray-700 transition-smooth px-3 py-2 rounded-md hover:bg-gray-50"
            >
              文档
            </Link>
            <Link
              href="/app/history"
              className="text-sm text-gray-600 hover:text-gray-900 transition-smooth px-3 py-2 rounded-md hover:bg-gray-50 group"
            >
              <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                历史记录
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
'use client'

import Link from 'next/link'

export function AppHeader() {
  return (
    <header className="border-b border-gray-100/50 bg-white/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 lg:space-x-4 group">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-900 rounded-full flex items-center justify-center shadow-zen transition-zen group-hover:shadow-zen-md group-hover:scale-105">
              <span className="text-white text-sm lg:text-base font-light">決</span>
            </div>
            <div className="flex flex-col">
              <span className="text-zen-heading text-base lg:text-lg tracking-widest">Decision Compass</span>
              <span className="text-zen-small opacity-60 -mt-1 hidden sm:block">決策指南針</span>
            </div>
          </Link>
          
          <div className="flex items-center space-x-4 lg:space-x-8">
            <Link
              href="/app/history"
              className="text-zen-body hover:text-zen-ink transition-zen text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded px-2 py-1"
            >
              歷史記錄
            </Link>
            <div className="w-px h-4 bg-gray-200 hidden sm:block"></div>
            <button className="text-zen-body hover:text-zen-ink transition-zen text-sm tracking-wide hidden sm:block">
              設定
            </button>
            <button className="btn-zen text-sm tracking-wide px-4 lg:px-6">
              登入
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
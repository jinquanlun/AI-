'use client'

import { DecisionHistory } from './DecisionHistory'

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Decision Compass
            </h1>
            <span className="ml-2 text-sm text-gray-500">
              决策指南针
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <DecisionHistory />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              登录
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
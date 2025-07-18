'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { CompassIcon } from '@/components/CompassIcon'

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Zen mouse-following element */}
      <div 
        className="fixed w-2 h-2 pointer-events-none transition-all duration-1000 ease-out opacity-10 animate-zen-breathe"
        style={{
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
          background: `radial-gradient(circle, var(--zen-charcoal) 0%, transparent 70%)`,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Navigation - Enhanced zen design */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 lg:py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 lg:space-x-4">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-900 rounded-full flex items-center justify-center shadow-zen transition-zen hover:shadow-zen-md">
                <span className="text-white text-sm lg:text-base font-light">決</span>
              </div>
              <span className="font-light text-lg lg:text-xl tracking-widest text-zen-body">Decision Compass</span>
            </div>
            
            <Link 
              href="/app"
              className="btn-zen tracking-widest text-sm hover:tracking-wider transition-all duration-500"
            >
              開始使用
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Extreme zen minimalism */}
      <section className="min-h-screen flex items-center justify-center relative px-4 sm:px-8 pt-28 sm:pt-32 lg:pt-24">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main heading with enhanced zen styling */}
          <div className={`transition-zen-slow ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight mb-16 lg:mb-20 leading-none tracking-wider">
              <span className="block mb-6 lg:mb-8 text-gray-700 font-light">決策</span>
              <span className="block text-gray-900 font-light">指南針</span>
            </h1>
          </div>

          {/* Compass visual */}
          <div className={`transition-zen-slow delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="flex justify-center mb-8 lg:mb-12">
              <CompassIcon size={72} className="animate-zen-breathe lg:scale-110" />
            </div>
          </div>

          {/* Zen divider */}
          <div className={`transition-zen-slow delay-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="w-20 lg:w-24 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-12 lg:mb-16"></div>
          </div>

          {/* Subtitle with zen typography */}
          <div className={`transition-zen-slow delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-gray-700 text-lg lg:text-xl mb-4 lg:mb-6 max-w-2xl mx-auto leading-relaxed font-medium">
              從直觀決策到結構化思考
            </p>
            <p className="text-gray-600 text-sm lg:text-base mb-16 lg:mb-24 max-w-xl mx-auto leading-relaxed">
              AI驅動的決策支持工具，為一人公司與自由創作者而設計
            </p>
          </div>

          {/* CTA with zen button styling */}
          <div className={`transition-zen-slow delay-1500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link 
              href="/app"
              className="inline-block px-16 py-5 bg-gray-900 text-white hover:bg-gray-800 transition-zen text-sm tracking-widest font-light border-0 shadow-zen-md hover:shadow-zen-lg hover:transform hover:scale-105"
            >
              開始您的決策之旅
            </Link>
          </div>
        </div>

        {/* Enhanced zen geometric element */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 opacity-30">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-px h-20 bg-gradient-to-b from-gray-300 to-transparent"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full animate-zen-breathe"></div>
          </div>
        </div>
      </section>

      {/* Philosophy Section - Enhanced zen design with visual elements */}
      <section className="py-32 lg:py-40 bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-1/4 w-32 h-32 border border-gray-300 rounded-full"></div>
          <div className="absolute bottom-20 right-1/4 w-24 h-24 border border-gray-300 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-40 bg-gray-300"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-12 relative">
          <div className="text-center">
            {/* Decorative compass element */}
            <div className="flex justify-center mb-12 animate-zen-fadeIn">
              <div className="relative">
                <CompassIcon size={60} className="opacity-60 animate-zen-breathe" />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full opacity-70 animate-pulse"></div>
              </div>
            </div>

            {/* Enhanced heading with better typography */}
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-light text-gray-900 mb-16 lg:mb-20 leading-tight animate-zen-fadeIn">
              <span className="block mb-4 text-gray-800">在複雜的世界中</span>
              <span className="block text-gray-900 font-medium">尋找簡單的答案</span>
            </h2>

            {/* Content with better visual hierarchy */}
            <div className="max-w-4xl mx-auto space-y-12 lg:space-y-16 animate-zen-slideIn">
              <div className="relative">
                <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium mb-8">
                  每個決策都是一次對話。與自己，與可能性，與未來。
                </p>

                {/* Decorative divider */}
                <div className="flex items-center justify-center my-12">
                  <div className="w-8 h-px bg-gray-300"></div>
                  <div className="mx-4 w-2 h-2 bg-gray-400 rounded-full"></div>
                  <div className="w-8 h-px bg-gray-300"></div>
                </div>

                <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                  Decision Compass 不是要替你做決定，而是要幫你看清楚自己的想法，
                  <br className="hidden lg:block" />
                  將模糊的直覺轉化為清晰的選擇。
                </p>
              </div>

              {/* Call to action hint */}
              <div className="pt-8">
                <div className="inline-flex items-center space-x-2 text-gray-500 text-sm">
                  <span>向下滾動探索更多</span>
                  <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced visual design */}
      <section className="py-32 lg:py-40 bg-gradient-to-b from-white to-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24">
            {/* Feature 1 - Enhanced design */}
            <div className="text-center group relative">
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:transform group-hover:scale-105 group-hover:rotate-3">
                  <span className="text-4xl text-blue-600">✍️</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">自由記錄</h3>
              <div className="space-y-2 text-gray-600">
                <p className="leading-relaxed">想到什麼就寫什麼</p>
                <p className="leading-relaxed">不需要格式，不需要結構</p>
                <p className="leading-relaxed font-medium text-gray-700">只需要誠實的表達</p>
              </div>
            </div>

            {/* Feature 2 - Enhanced design */}
            <div className="text-center group relative">
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-50 to-green-100 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:transform group-hover:scale-105 group-hover:-rotate-3">
                  <span className="text-4xl text-green-600">🧠</span>
                </div>
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-green-500 rounded-full opacity-20 animate-pulse"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI 分析</h3>
              <div className="space-y-2 text-gray-600">
                <p className="leading-relaxed">深度理解你的想法</p>
                <p className="leading-relaxed">生成結構化的選擇</p>
                <p className="leading-relaxed font-medium text-gray-700">每個方案都有其邏輯</p>
              </div>
            </div>

            {/* Feature 3 - Enhanced design */}
            <div className="text-center md:col-span-2 lg:col-span-1 group relative">
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:transform group-hover:scale-105 group-hover:rotate-3">
                  <span className="text-4xl text-purple-600">📊</span>
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-purple-500 rounded-full opacity-20 animate-pulse"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">決策追蹤</h3>
              <div className="space-y-2 text-gray-600">
                <p className="leading-relaxed">記錄每個選擇</p>
                <p className="leading-relaxed">追蹤每個結果</p>
                <p className="leading-relaxed font-medium text-gray-700">學習每個教訓</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced zen-like simplicity */}
      <section className="py-40 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-12 text-center">
          <h2 className="text-5xl md:text-6xl font-extralight mb-20 leading-relaxed">
            開始您的<br/>
            決策修練
          </h2>
          
          <div className="space-y-12">
            <Link 
              href="/app"
              className="inline-block px-16 py-5 border border-white/30 text-white hover:bg-white hover:text-gray-900 transition-zen text-sm tracking-widest font-light shadow-zen-md hover:shadow-zen-lg backdrop-blur-sm"
            >
              立即體驗
            </Link>
            
            <p className="text-gray-400 text-sm font-light tracking-wide">
              無需註冊，立即開始
            </p>
          </div>
        </div>
      </section>

      {/* Footer - Enhanced zen minimal */}
      <footer className="py-24 bg-gradient-to-t from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-12">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center shadow-zen transition-zen hover:shadow-zen-md">
                <span className="text-white text-sm font-light">決</span>
              </div>
              <span className="font-light text-zen-body tracking-wider">Decision Compass</span>
            </div>
            
            <p className="text-zen-small tracking-wide">
              © 2025 — 為思考而設計
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
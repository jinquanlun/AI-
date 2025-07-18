'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation - Ultra Simple with Smooth Animations */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 transition-smooth">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-light transition-smooth hover:text-gray-600">Decision Compass</span>
            <div className="flex items-center space-x-4">
              <Link
                href="/docs"
                className="text-gray-500 hover:text-gray-700 transition-smooth px-3 py-2 rounded-md hover:bg-gray-50 text-sm"
              >
                文档
              </Link>
              <Link
                href="/app"
                className="text-gray-600 hover:text-gray-900 transition-smooth px-4 py-2 rounded-md hover:bg-gray-50 group"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                  开始使用
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Ultra Simple with Smooth Animations */}
      <section className="min-h-screen flex items-center justify-center relative px-8 pt-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main title - Clean and simple with staggered animation */}
          <h1 className={`text-6xl lg:text-8xl font-light leading-tight mb-12 lg:mb-16 transition-smooth-slow ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className={`block mb-4 text-gray-700 transition-smooth-slow delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>决策</span>
            <span className={`block text-gray-900 transition-smooth-slow delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>指南针</span>
          </h1>

          {/* Subtitle with Philosophy */}
          <div className={`mb-12 lg:mb-16 max-w-3xl mx-auto transition-smooth-slow delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
              从直观决策到结构化思考
            </p>
            <p className="text-base text-gray-500 leading-relaxed italic">
              "              &ldquo;每个选择都是一次与未来的对话，每个决定都是一次对自我的探索&rdquo;"
            </p>
          </div>

          {/* CTA Button with Hover Effects */}
          <div className={`transition-smooth-slow delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link
              href="/app"
              className="inline-block px-8 py-4 bg-gray-900 text-white hover:bg-gray-800 transition-smooth hover-lift text-base font-normal group"
            >
              <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                开始您的决策之旅
              </span>
            </Link>
          </div>
        </div>
      </section>



      {/* Philosophy Section - Thoughtful Content */}
      <section className="py-20 lg:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-8 leading-relaxed">
              在复杂的世界中寻找简单的答案
            </h2>

            <p className="text-base lg:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              AI驱动的决策支持工具，为一人公司与自由创作者而设计
            </p>
          </div>

          {/* Philosophy Quotes with Staggered Animation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-6 animate-slide-in-left">
              <blockquote className="text-gray-700 leading-relaxed p-6 border-l-2 border-gray-200 hover:border-gray-400 transition-smooth hover-lift">
                <p className="mb-4">&ldquo;决策不是关于找到完美的答案，而是关于理解自己真正想要什么。&rdquo;</p>
                <footer className="text-sm text-gray-500">— 决策心理学</footer>
              </blockquote>

              <div className="text-sm text-gray-600 leading-relaxed p-4 rounded-lg hover:bg-gray-50 transition-smooth">
                <p>每个人都有直觉，但很少人知道如何倾听它。Decision Compass 帮助你将模糊的感受转化为清晰的选择。</p>
              </div>
            </div>

            <div className="space-y-6 animate-slide-in-right">
              <blockquote className="text-gray-700 leading-relaxed p-6 border-l-2 border-gray-200 hover:border-gray-400 transition-smooth hover-lift">
                <p className="mb-4">&ldquo;最好的决策来自于对自己诚实，而不是对他人的期待。&rdquo;</p>
                <footer className="text-sm text-gray-500">— 自我认知理论</footer>
              </blockquote>

              <div className="text-sm text-gray-600 leading-relaxed p-4 rounded-lg hover:bg-gray-50 transition-smooth">
                <p>在信息爆炸的时代，我们需要的不是更多选择，而是更好的判断。让AI成为你思考的伙伴，而非替代。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles - Simple */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h3 className="text-xl lg:text-2xl font-light text-gray-900 mb-12">核心理念</h3>

          <div className="space-y-8">
            <div className="p-6 rounded-lg hover:bg-gray-50 transition-smooth hover-lift cursor-default group">
              <h4 className="text-base font-medium text-gray-900 mb-3 group-hover:text-gray-700 transition-smooth">自由表达</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                不需要完美的逻辑，只需要真实的想法。让思绪自然流淌，AI会帮你整理。
              </p>
            </div>

            <div className="p-6 rounded-lg hover:bg-gray-50 transition-smooth hover-lift cursor-default group">
              <h4 className="text-base font-medium text-gray-900 mb-3 group-hover:text-gray-700 transition-smooth">结构化思考</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                将复杂的情感和直觉转化为可分析的选项，让决策过程更加透明。
              </p>
            </div>

            <div className="p-6 rounded-lg hover:bg-gray-50 transition-smooth hover-lift cursor-default group">
              <h4 className="text-base font-medium text-gray-900 mb-3 group-hover:text-gray-700 transition-smooth">持续学习</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                每个决策都是一次学习机会。记录、反思、成长，建立属于你的决策智慧。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Simple */}
      <footer className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>Decision Compass</span>
            <span>© 2025 — 为思考而设计</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
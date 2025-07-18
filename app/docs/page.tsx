'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('introduction')

  const sections = [
    { id: 'introduction', title: '产品介绍', icon: '📖' },
    { id: 'philosophy', title: '设计理念', icon: '🎯' },
    { id: 'features', title: '功能特色', icon: '✨' },
    { id: 'usage', title: '使用说明', icon: '📝' },
    { id: 'ai-models', title: 'AI 模型', icon: '🤖' },
    { id: 'tips', title: '使用技巧', icon: '💡' },
    { id: 'faq', title: '常见问题', icon: '❓' }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/90 backdrop-blur-sm sticky top-0 z-50 transition-smooth">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-smooth px-3 py-2 rounded-md hover:bg-gray-50 group">
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-sm font-medium">返回首页</span>
            </Link>
            
            <div className="text-center animate-fade-in">
              <h1 className="text-lg font-light text-gray-900">Decision Compass 文档</h1>
              <p className="text-xs text-gray-500">使用指南与设计理念</p>
            </div>
            
            <Link
              href="/app"
              className="px-6 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-smooth hover-lift text-sm"
            >
              开始使用
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="sticky top-32 space-y-2 animate-slide-in-left">
              <h2 className="text-sm font-medium text-gray-900 mb-4">目录</h2>
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-smooth hover-lift group ${
                    activeSection === section.id
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="group-hover:scale-110 transition-transform duration-200">{section.icon}</span>
                    <span className="text-sm font-medium">{section.title}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 animate-slide-in-right">
            <div className="prose prose-gray max-w-none">
              {activeSection === 'introduction' && <IntroductionSection />}
              {activeSection === 'philosophy' && <PhilosophySection />}
              {activeSection === 'features' && <FeaturesSection />}
              {activeSection === 'usage' && <UsageSection />}
              {activeSection === 'ai-models' && <AIModelsSection />}
              {activeSection === 'tips' && <TipsSection />}
              {activeSection === 'faq' && <FAQSection />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function IntroductionSection() {
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-light text-gray-900 mb-8">Decision Compass 产品介绍</h1>
      
      <div className="bg-gray-50 p-8 rounded-lg mb-8 hover-lift transition-smooth">
        <h2 className="text-xl font-medium text-gray-900 mb-4">什麼是 Decision Compass？</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Decision Compass（決策指南針）是一個基於AI的決策支持工具，專為一人公司、自由創作者和需要獨立決策的個人而設計。
        </p>
        <p className="text-gray-700 leading-relaxed">
          我們相信每個人都有做出正確決策的能力，只是有時需要一個工具來幫助整理思緒、分析選項，並看清楚自己真正想要的是什麼。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 border border-gray-200 rounded-lg hover-lift transition-smooth group">
          <h3 className="text-lg font-medium text-gray-900 mb-3 group-hover:text-gray-700 transition-smooth">🎯 核心價值</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            不是替你做決定，而是幫你看清楚自己的想法，將模糊的直覺轉化為清晰的選擇。
          </p>
        </div>
        
        <div className="p-6 border border-gray-200 rounded-lg hover-lift transition-smooth group">
          <h3 className="text-lg font-medium text-gray-900 mb-3 group-hover:text-gray-700 transition-smooth">🌱 設計初衷</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            在資訊爆炸的時代，我們需要的不是更多選擇，而是更好的判斷。讓AI成為你思考的夥伴。
          </p>
        </div>
      </div>

      <blockquote className="border-l-4 border-gray-300 pl-6 py-4 bg-gray-50 rounded-r-lg hover-lift transition-smooth">
        <p className="text-gray-700 italic leading-relaxed mb-2">
          "          &ldquo;每個選擇都是一次與未來的對話，每個決定都是一次對自我的探索&rdquo;"
        </p>
        <footer className="text-sm text-gray-500">— Decision Compass 設計理念</footer>
      </blockquote>
    </div>
  )
}

function PhilosophySection() {
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-light text-gray-900 mb-8">設計理念</h1>

      <div className="space-y-8">
        <div className="p-8 bg-gray-50 rounded-lg hover-lift transition-smooth">
          <h2 className="text-xl font-medium text-gray-900 mb-6">日式極簡主義</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl mb-3">間</div>
              <h3 className="font-medium text-gray-900 mb-2">Ma (間)</h3>
              <p className="text-sm text-gray-600">留白的力量，讓思考有呼吸的空間</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-3">簡</div>
              <h3 className="font-medium text-gray-900 mb-2">Kanso (簡素)</h3>
              <p className="text-sm text-gray-600">移除一切非必要，專注本質</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-3">自</div>
              <h3 className="font-medium text-gray-900 mb-2">Shizen (自然)</h3>
              <p className="text-sm text-gray-600">自然而然的使用體驗</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 border border-gray-200 rounded-lg hover-lift transition-smooth">
            <h3 className="text-lg font-medium text-gray-900 mb-4">決策心理學</h3>
            <blockquote className="text-gray-700 leading-relaxed mb-4">
              "              &ldquo;決策不是關於找到完美的答案，而是關於理解自己真正想要什麼。&rdquo;"
            </blockquote>
            <p className="text-sm text-gray-600">
              每個人都有直覺，但很少人知道如何傾聽它。我們幫助你將模糊的感受轉化為清晰的選擇。
            </p>
          </div>

          <div className="p-6 border border-gray-200 rounded-lg hover-lift transition-smooth">
            <h3 className="text-lg font-medium text-gray-900 mb-4">自我認知理論</h3>
            <blockquote className="text-gray-700 leading-relaxed mb-4">
              "              &ldquo;最好的決策來自於對自己誠實，而不是對他人的期待。&rdquo;"
            </blockquote>
            <p className="text-sm text-gray-600">
              在資訊爆炸的時代，我們需要的不是更多選擇，而是更好的判斷。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function FeaturesSection() {
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-light text-gray-900 mb-8">功能特色</h1>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-gray-200 rounded-lg hover-lift transition-smooth group">
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-200">📝</div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">自由表達</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              不需要完美的邏輯，只需要真實的想法。讓思緒自然流淌，AI會幫你整理。
            </p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• 無格式限制的自由輸入</li>
              <li>• 支援中英文混合輸入</li>
              <li>• 即時保存，不怕丟失</li>
            </ul>
          </div>

          <div className="p-6 bg-white border border-gray-200 rounded-lg hover-lift transition-smooth group">
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-200">🤖</div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">AI 智能分析</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              將複雜的情感和直覺轉化為可分析的選項，讓決策過程更加透明。
            </p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• 多種AI模型可選</li>
              <li>• 結構化選項生成</li>
              <li>• 風險評估分析</li>
            </ul>
          </div>

          <div className="p-6 bg-white border border-gray-200 rounded-lg hover-lift transition-smooth group">
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-200">📊</div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">決策追蹤</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              每個決策都是一次學習機會。記錄、反思、成長，建立屬於你的決策智慧。
            </p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• 歷史決策記錄</li>
              <li>• 結果追蹤分析</li>
              <li>• 個人決策模式洞察</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 p-8 rounded-lg hover-lift transition-smooth">
          <h2 className="text-xl font-medium text-gray-900 mb-6">核心功能流程</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-medium">1</div>
              <h4 className="font-medium text-gray-900 mb-2">輸入想法</h4>
              <p className="text-xs text-gray-600">自由描述你的決策情況</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-medium">2</div>
              <h4 className="font-medium text-gray-900 mb-2">AI 分析</h4>
              <p className="text-xs text-gray-600">生成結構化的選擇方案</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-medium">3</div>
              <h4 className="font-medium text-gray-900 mb-2">比較選擇</h4>
              <p className="text-xs text-gray-600">評估各方案的優缺點</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-medium">4</div>
              <h4 className="font-medium text-gray-900 mb-2">記錄決策</h4>
              <p className="text-xs text-gray-600">保存決策過程和結果</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function UsageSection() {
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-light text-gray-900 mb-8">使用說明</h1>

      <div className="space-y-8">
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg hover-lift transition-smooth">
          <h2 className="text-lg font-medium text-blue-900 mb-3">🚀 快速開始</h2>
          <p className="text-blue-800 text-sm leading-relaxed">
            無需註冊，直接開始使用。只需要在左側輸入框中描述你的決策情況，AI就會為你生成結構化的選擇建議。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-gray-900">📝 如何輸入</h2>

            <div className="p-6 border border-gray-200 rounded-lg hover-lift transition-smooth">
              <h3 className="font-medium text-gray-900 mb-3">✅ 好的輸入範例</h3>
              <div className="bg-gray-50 p-4 rounded text-sm text-gray-700 leading-relaxed mb-3">
                "                &ldquo;我正在考慮是否要接受一個新的自由接案項目。這個項目報酬不錯，但時間緊迫，可能會影響我現有的工作安排。我擔心品質無法保證，但又不想錯過這個機會...&rdquo;"
              </div>
              <p className="text-xs text-gray-600">
                包含了情況描述、考慮因素、擔憂和期望，給AI足夠的分析材料。
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg hover-lift transition-smooth">
              <h3 className="font-medium text-gray-900 mb-3">❌ 避免的輸入</h3>
              <div className="bg-gray-50 p-4 rounded text-sm text-gray-700 leading-relaxed mb-3">
                "                &ldquo;要不要接案？&rdquo;"
              </div>
              <p className="text-xs text-gray-600">
                過於簡單，缺乏背景資訊，AI無法提供有意義的建議。
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-medium text-gray-900">🎯 輸入技巧</h2>

            <div className="space-y-4">
              <div className="p-4 border-l-4 border-green-300 bg-green-50 hover-lift transition-smooth">
                <h4 className="font-medium text-green-900 mb-2">描述背景</h4>
                <p className="text-sm text-green-800">說明決策的具體情況和背景</p>
              </div>

              <div className="p-4 border-l-4 border-blue-300 bg-blue-50 hover-lift transition-smooth">
                <h4 className="font-medium text-blue-900 mb-2">列出考慮因素</h4>
                <p className="text-sm text-blue-800">包括時間、金錢、風險等重要因素</p>
              </div>

              <div className="p-4 border-l-4 border-purple-300 bg-purple-50 hover-lift transition-smooth">
                <h4 className="font-medium text-purple-900 mb-2">表達感受</h4>
                <p className="text-sm text-purple-800">不要隱藏你的擔憂、期望或直覺</p>
              </div>

              <div className="p-4 border-l-4 border-orange-300 bg-orange-50 hover-lift transition-smooth">
                <h4 className="font-medium text-orange-900 mb-2">提及限制</h4>
                <p className="text-sm text-orange-800">說明你面臨的限制和約束條件</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-8 rounded-lg hover-lift transition-smooth">
          <h2 className="text-xl font-medium text-gray-900 mb-6">⌨️ 快捷鍵</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4">
              <kbd className="px-3 py-1 bg-gray-200 rounded text-sm font-mono">Cmd/Ctrl + Enter</kbd>
              <span className="text-sm text-gray-600">快速生成AI選擇</span>
            </div>
            <div className="flex items-center space-x-4">
              <kbd className="px-3 py-1 bg-gray-200 rounded text-sm font-mono">Tab</kbd>
              <span className="text-sm text-gray-600">在選項間切換</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AIModelsSection() {
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-light text-gray-900 mb-8">AI 模型介紹</h1>

      <div className="space-y-8">
        <div className="bg-gray-50 p-6 rounded-lg hover-lift transition-smooth">
          <h2 className="text-lg font-medium text-gray-900 mb-4">🤖 支援的AI模型</h2>
          <p className="text-gray-600 leading-relaxed">
            我們提供多種AI模型供你選擇，每個模型都有其獨特的分析風格和優勢。你可以根據決策的性質選擇最適合的模型。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-gray-200 rounded-lg hover-lift transition-smooth group">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <span className="text-blue-600 font-bold text-sm">K</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Kimi (月之暗面)</h3>
                <p className="text-xs text-gray-500">推薦 • 預設模型</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              擅長邏輯分析和結構化思考，特別適合商業決策和職業規劃。
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">邏輯性強</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">結構清晰</span>
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">商業導向</span>
            </div>
          </div>

          <div className="p-6 border border-gray-200 rounded-lg hover-lift transition-smooth group">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <span className="text-green-600 font-bold text-sm">D</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">DeepSeek (深度求索)</h3>
                <p className="text-xs text-gray-500">平衡 • 全能型</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              强大的推理能力和数学逻辑，特别适合复杂决策和技术分析。
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">推理能力强</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">数学逻辑</span>
              <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">技术导向</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg hover-lift transition-smooth">
          <h3 className="font-medium text-yellow-900 mb-3">💡 如何選擇模型？</h3>
          <ul className="space-y-2 text-sm text-yellow-800">
            <li>• <strong>商業決策</strong>：推薦使用 Kimi，邏輯性強，分析全面</li>
            <li>• <strong>技术决策</strong>：推荐使用 DeepSeek，推理能力强，逻辑严密</li>
            <li>• <strong>創意項目</strong>：兩個模型都適合，可以嘗試不同角度</li>
            <li>• <strong>不確定時</strong>：使用預設的 Kimi 模型即可</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function TipsSection() {
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-light text-gray-900 mb-8">使用技巧</h1>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-gray-900">💡 提升決策品質</h2>

            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg hover-lift transition-smooth">
                <h3 className="font-medium text-green-900 mb-2">設定時間框架</h3>
                <p className="text-sm text-green-800">
                  明確說明決策的時間限制，這會影響AI推薦的策略類型。
                </p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover-lift transition-smooth">
                <h3 className="font-medium text-blue-900 mb-2">量化重要因素</h3>
                <p className="text-sm text-blue-800">
                  盡可能提供具體數字，如預算、時間、成功率等。
                </p>
              </div>

              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover-lift transition-smooth">
                <h3 className="font-medium text-purple-900 mb-2">考慮多個角度</h3>
                <p className="text-sm text-purple-800">
                  從短期/長期、個人/團隊、理性/感性等多個維度描述。
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-medium text-gray-900">🎯 常見決策類型</h2>

            <div className="space-y-3">
              <div className="p-3 border border-gray-200 rounded hover-lift transition-smooth">
                <h4 className="font-medium text-gray-900 text-sm mb-1">職業發展</h4>
                <p className="text-xs text-gray-600">換工作、接案、技能學習</p>
              </div>

              <div className="p-3 border border-gray-200 rounded hover-lift transition-smooth">
                <h4 className="font-medium text-gray-900 text-sm mb-1">商業決策</h4>
                <p className="text-xs text-gray-600">產品方向、市場策略、投資</p>
              </div>

              <div className="p-3 border border-gray-200 rounded hover-lift transition-smooth">
                <h4 className="font-medium text-gray-900 text-sm mb-1">生活選擇</h4>
                <p className="text-xs text-gray-600">居住地、生活方式、人際關係</p>
              </div>

              <div className="p-3 border border-gray-200 rounded hover-lift transition-smooth">
                <h4 className="font-medium text-gray-900 text-sm mb-1">創意項目</h4>
                <p className="text-xs text-gray-600">作品方向、合作機會、創作策略</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-8 rounded-lg hover-lift transition-smooth">
          <h2 className="text-xl font-medium text-gray-900 mb-6">🔄 迭代優化流程</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-3">1</div>
              <h4 className="font-medium text-gray-900 mb-2">初次輸入</h4>
              <p className="text-xs text-gray-600">描述基本情況</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-3">2</div>
              <h4 className="font-medium text-gray-900 mb-2">查看結果</h4>
              <p className="text-xs text-gray-600">分析AI建議</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-3">3</div>
              <h4 className="font-medium text-gray-900 mb-2">補充資訊</h4>
              <p className="text-xs text-gray-600">添加遺漏的考慮因素</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-3">4</div>
              <h4 className="font-medium text-gray-900 mb-2">重新生成</h4>
              <p className="text-xs text-gray-600">獲得更精準的建議</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FAQSection() {
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-light text-gray-900 mb-8">常見問題</h1>

      <div className="space-y-6">
        <div className="p-6 border border-gray-200 rounded-lg hover-lift transition-smooth">
          <h3 className="font-medium text-gray-900 mb-3">❓ AI會替我做決定嗎？</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            不會。Decision Compass 的目標是幫助你<strong>看清楚自己的想法</strong>，而不是替你做決定。AI會提供結構化的分析和選項，但最終的決策權始終在你手中。
          </p>
        </div>

        <div className="p-6 border border-gray-200 rounded-lg hover-lift transition-smooth">
          <h3 className="font-medium text-gray-900 mb-3">🔒 我的資料安全嗎？</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            我們非常重視用戶隱私。你的輸入內容僅用於生成決策建議，不會被儲存或用於其他目的。所有資料傳輸都經過加密處理。
          </p>
        </div>

        <div className="p-6 border border-gray-200 rounded-lg hover-lift transition-smooth">
          <h3 className="font-medium text-gray-900 mb-3">💰 使用需要付費嗎？</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            目前 Decision Compass 完全免費使用，無需註冊。我們希望讓每個人都能獲得優質的決策支持。
          </p>
        </div>

        <div className="p-6 border border-gray-200 rounded-lg hover-lift transition-smooth">
          <h3 className="font-medium text-gray-900 mb-3">🌐 支援哪些語言？</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            目前主要支援繁體中文，也可以處理中英文混合輸入。我們正在考慮增加更多語言支援。
          </p>
        </div>

        <div className="p-6 border border-gray-200 rounded-lg hover-lift transition-smooth">
          <h3 className="font-medium text-gray-900 mb-3">📱 有手機版本嗎？</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Decision Compass 是響應式網頁應用，在手機、平板和電腦上都能良好運行。暫時沒有獨立的手機App計劃。
          </p>
        </div>

        <div className="p-6 border border-gray-200 rounded-lg hover-lift transition-smooth">
          <h3 className="font-medium text-gray-900 mb-3">🔄 可以修改或刪除歷史記錄嗎？</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            可以。在歷史記錄頁面，你可以查看、編輯或刪除之前的決策記錄。我們相信你應該完全控制自己的資料。
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg hover-lift transition-smooth">
          <h3 className="font-medium text-blue-900 mb-3">💬 還有其他問題？</h3>
          <p className="text-blue-800 text-sm leading-relaxed">
            如果你有任何問題或建議，歡迎透過
            <Link href="/app" className="underline hover:no-underline mx-1">應用頁面</Link>
            的反饋功能聯繫我們，或者直接開始使用來體驗 Decision Compass 的功能。
          </p>
        </div>
      </div>
    </div>
  )
}

import { supabase, Decision, AIOption } from './supabase'

export interface CreateDecisionData {
  content: string
  ai_options: AIOption[]
  selected_option?: number
}

export interface UpdateDecisionData {
  selected_option?: number
  result?: string
}

// Local storage key for mock decisions
const MOCK_DECISIONS_KEY = 'decision-compass-mock-decisions'

// Helper functions for local storage
const getMockDecisions = (): Decision[] => {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(MOCK_DECISIONS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error reading mock decisions from localStorage:', error)
    return []
  }
}

const saveMockDecisions = (decisions: Decision[]): void => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(MOCK_DECISIONS_KEY, JSON.stringify(decisions))
  } catch (error) {
    console.error('Error saving mock decisions to localStorage:', error)
  }
}

const addMockDecision = (decision: Decision): void => {
  const decisions = getMockDecisions()
  decisions.unshift(decision) // Add to beginning for chronological order
  saveMockDecisions(decisions)
}

const updateMockDecision = (id: string, updates: Partial<Decision>): Decision | null => {
  const decisions = getMockDecisions()
  const index = decisions.findIndex(d => d.id === id)
  if (index === -1) return null

  decisions[index] = { ...decisions[index], ...updates, updated_at: new Date().toISOString() }
  saveMockDecisions(decisions)
  return decisions[index]
}

// Initialize with demo data if no decisions exist
const initializeDemoData = (): void => {
  const existing = getMockDecisions()
  if (existing.length > 0) return // Don't overwrite existing data

  const demoDecisions: Decision[] = [
    {
      id: 'demo-1',
      user_id: 'demo-user',
      content: '我正在考慮是否要接受一個新的自由職業項目。這個項目報酬不錯，但時間緊迫，可能會影響我現有的工作安排。',
      ai_options: [
        {
          id: 'A',
          strategy_type: '積極進取型',
          title: '立即接受項目',
          core_logic: '抓住高報酬機會，通過優化時間管理來平衡工作',
          summary: '接受項目並調整現有工作安排',
          steps: [
            { step: '評估現有工作優先級', timeline: '1天內', resources: '2小時分析時間', success_criteria: '明確工作重要性排序' }
          ],
          risk_analysis: { level: 'medium' as const, main_risks: ['時間壓力'], mitigation: ['制定詳細時間表'] },
          investment: { time: '額外20小時/週', money: '無', energy: '高強度工作' },
          expected_outcomes: { short_term: '獲得額外收入', long_term: '擴展客戶網絡', success_probability: '0.7' },
          pros_cons: { pros: ['高報酬', '新機會'], cons: ['時間緊張', '壓力增加'] }
        }
      ],
      selected_option: 0,
      result: '已完成項目，獲得良好反饋',
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()  // 1 day ago
    }
  ]

  saveMockDecisions(demoDecisions)
}

export class DecisionService {
  // Create a new decision
  static async createDecision(data: CreateDecisionData): Promise<Decision | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        // For MVP, create a mock decision and store in localStorage
        console.log('No user authenticated, creating mock decision with localStorage')
        const mockDecision: Decision = {
          id: `mock-${Date.now()}`,
          user_id: 'mock-user',
          content: data.content,
          ai_options: data.ai_options,
          selected_option: data.selected_option || null,
          result: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        addMockDecision(mockDecision)
        return mockDecision
      }

      const { data: decision, error } = await supabase
        .from('decisions')
        .insert([
          {
            user_id: user.id,
            content: data.content,
            ai_options: data.ai_options,
            selected_option: data.selected_option || null,
          }
        ])
        .select()
        .single()

      if (error) {
        throw error
      }

      return decision
    } catch (error) {
      console.error('Error creating decision:', error)
      // Return mock decision as fallback and store in localStorage
      const mockDecision: Decision = {
        id: `mock-${Date.now()}`,
        user_id: 'mock-user',
        content: data.content,
        ai_options: data.ai_options,
        selected_option: data.selected_option || null,
        result: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      addMockDecision(mockDecision)
      return mockDecision
    }
  }

  // Update an existing decision
  static async updateDecision(id: string, data: UpdateDecisionData): Promise<Decision | null> {
    try {
      // Check if this is a mock decision (starts with 'mock-')
      if (id.startsWith('mock-')) {
        console.log('Mock decision update, updating localStorage')
        return updateMockDecision(id, data)
      }

      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        console.log('No user authenticated, skipping database update')
        return null
      }

      const { data: decision, error } = await supabase
        .from('decisions')
        .update(data)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        throw error
      }

      return decision
    } catch (error) {
      console.error('Error updating decision:', error)
      return null
    }
  }

  // Get user's decisions
  static async getUserDecisions(limit: number = 20): Promise<Decision[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        console.log('No user authenticated, returning mock decisions from localStorage')
        initializeDemoData() // Initialize demo data if needed
        const mockDecisions = getMockDecisions()
        return mockDecisions.slice(0, limit)
      }

      const { data: decisions, error } = await supabase
        .from('decisions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) {
        throw error
      }

      return decisions || []
    } catch (error) {
      console.error('Error fetching decisions:', error)
      // Fallback to mock decisions if database fails
      console.log('Database error, falling back to mock decisions')
      const mockDecisions = getMockDecisions()
      return mockDecisions.slice(0, limit)
    }
  }

  // Get a single decision by ID
  static async getDecision(id: string): Promise<Decision | null> {
    try {
      const { data: decision, error } = await supabase
        .from('decisions')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        throw error
      }

      return decision
    } catch (error) {
      console.error('Error fetching decision:', error)
      return null
    }
  }

  // Delete a decision
  static async deleteDecision(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('decisions')
        .delete()
        .eq('id', id)

      if (error) {
        throw error
      }

      return true
    } catch (error) {
      console.error('Error deleting decision:', error)
      return false
    }
  }

  // Get decisions summary/stats
  static async getDecisionStats(): Promise<{
    total: number
    completed: number
    pending: number
  }> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { total: 0, completed: 0, pending: 0 }
      }

      const { data: decisions, error } = await supabase
        .from('decisions')
        .select('selected_option, result')
        .eq('user_id', user.id)

      if (error) {
        throw error
      }

      const total = decisions?.length || 0
      const completed = decisions?.filter(d => d.result !== null).length || 0
      const pending = total - completed

      return { total, completed, pending }
    } catch (error) {
      console.error('Error fetching decision stats:', error)
      return { total: 0, completed: 0, pending: 0 }
    }
  }

  // Utility function to clear mock data (for testing)
  static clearMockData(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(MOCK_DECISIONS_KEY)
      console.log('Mock decisions cleared')
    }
  }

  // Utility function to get mock data count
  static getMockDataCount(): number {
    return getMockDecisions().length
  }
}

// Mock authentication for development
export class MockAuthService {
  static async getCurrentUser() {
    // For development, return a mock user
    return {
      id: 'mock-user-id',
      email: 'test@example.com',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  }

  static async signIn(email: string, password: string) {
    // Mock sign in
    return this.getCurrentUser()
  }

  static async signOut() {
    // Mock sign out
    return true
  }
}
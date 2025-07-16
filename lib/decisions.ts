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

export class DecisionService {
  // Create a new decision
  static async createDecision(data: CreateDecisionData): Promise<Decision | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        throw new Error('User not authenticated')
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
      return null
    }
  }

  // Update an existing decision
  static async updateDecision(id: string, data: UpdateDecisionData): Promise<Decision | null> {
    try {
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
        return []
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
      return []
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
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Decision {
  id: string
  user_id: string
  content: string
  ai_options: AIOption[]
  selected_option: number | null
  result: string | null
  created_at: string
  updated_at: string
}

export interface AIOption {
  id: string
  strategy_type: string
  title: string
  core_logic: string
  summary: string
  steps: {
    step: string
    timeline: string
    resources: string
    success_criteria: string
  }[]
  risk_analysis: {
    level: 'low' | 'medium' | 'high'
    main_risks: string[]
    mitigation: string[]
  }
  investment: {
    time: string
    money: string
    energy: string
  }
  expected_outcomes: {
    short_term: string
    long_term: string
    success_probability: string
  }
  pros_cons: {
    pros: string[]
    cons: string[]
  }
}

export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
}
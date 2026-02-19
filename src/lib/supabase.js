import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://riwghvilemvabxfljajt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpd2dodmlsZW12YWJ4ZmxqYWp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExNjEyMDcsImV4cCI6MjA4NjczNzIwN30.WiSQtJnQ1NEkHk02MWlykU_zW1NPLsbmY2ZLveLPSdw'

export const supabase = createClient(supabaseUrl, supabaseKey)
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dfgbyvhomdqchnqikwkp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmZ2J5dmhvbWRxY2hucWlrd2twIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0MDc4MDIsImV4cCI6MjAzMTk4MzgwMn0.SUFTUzGDC3IRhTcE92ZS2zY-EoXCD5vkbSbD7vpGACA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
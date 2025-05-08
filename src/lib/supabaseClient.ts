import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zzunapuexayikwppocuo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6dW5hcHVleGF5aWt3cHBvY3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0MzM3ODYsImV4cCI6MjA2MjAwOTc4Nn0.O159n1DC-lpgX6TqgPmPmFs1LG5_cRKNcVy8Z4hEw9c';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY); 
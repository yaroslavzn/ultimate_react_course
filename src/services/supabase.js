import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ptajajziesnfdrpakzaj.supabase.co';
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0YWphanppZXNuZmRycGFremFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg4MjY3NjksImV4cCI6MjAxNDQwMjc2OX0.1R1GR4tBkGPgQzi95zXdu7hAswx9yChzvS1kNoCnfaM`;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = 'https://hypssvjzqqqotzbfvhph.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHNzdmp6cXFxb3R6YmZ2aHBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwMDYxMDMsImV4cCI6MjAzMjU4MjEwM30.oZUGQgjRPw8wMqsWhka2-E9giTg-JVUmsScLr1Ld32Q'
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;

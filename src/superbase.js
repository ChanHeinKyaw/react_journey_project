import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mjtlyszwopqvejzonrgf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qdGx5c3p3b3BxdmVqem9ucmdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4MTgxMTIsImV4cCI6MjAxMjM5NDExMn0.keYYl5pJe10rw8F1_p5YC3xd7qq6y84eEaTeS6a_vF8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

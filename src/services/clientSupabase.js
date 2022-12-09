const {createClient} = require("@supabase/supabase-js");
const supabase = createClient('https://pnydbqwqjeursmwpuwvt.supabase.co', 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBueWRicXdxamV1cnNtd3B1d3Z0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA0NjY2MjUsImV4cCI6MTk4NjA0MjYyNX0.cJuuUCkM0EjvwQacTGyXVXo84npXvkKRJUWz1E8oam0');

exports.supabase = supabase;
import { createClient } from "@supabase/supabase-js"


export const supabase = createClient(
    process.env.PUBLIC_PROJECT_URL,
    process.env.PUBLIC_ANON_API_KEY
)








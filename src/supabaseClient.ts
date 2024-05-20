import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types/supabase";

const SUPABASE_PROJECT_URL = process.env
    .REACT_APP_SUPABASE_PROJECT_URL as string;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY as string;

if (!SUPABASE_PROJECT_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Missing Supabase environment variables.");
}

const supabase = createClient<Database>(
    SUPABASE_PROJECT_URL,
    SUPABASE_ANON_KEY
);

export default supabase;

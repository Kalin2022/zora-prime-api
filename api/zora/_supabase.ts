import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

export function ok(data: any) {
  return { ok: true, data };
}

export function error(message: string) {
  return { ok: false, error: message };
}



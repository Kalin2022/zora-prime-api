import type { Request, Response } from "express";
import { supabase, ok, error } from "./_supabase";

export async function handler(req: Request, res: Response) {
  const email = req.body.email;
  const device_key = req.body.device_key ?? req.body.deviceKey;
  const display_name = req.body.display_name ?? req.body.displayName ?? null;

  if (!email || !device_key) {
    return res.status(400).json(error("Missing fields"));
  }

  const { data, error: err } = await supabase
    .from("hosts")
    .insert({ email, device_key, display_name })
    .select()
    .single();

  if (err) {
    return res.status(400).json(error(err.message));
  }

  return res.json(ok(data));
}



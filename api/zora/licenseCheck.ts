import type { Request, Response } from "express";
import { supabase, ok, error } from "./_supabase";

export async function handler(req: Request, res: Response) {
  const synth_id = req.body.synth_id ?? req.body.synthId;

  if (!synth_id) {
    return res.status(400).json(error("Missing synthId"));
  }

  const { data, error: err } = await supabase
    .from("license_keys")
    .select("*")
    .eq("synth_id", synth_id)
    .eq("is_valid", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (err) {
    return res.json(ok({ status: "expired" }));
  }

  const now = new Date();
  const expires_at = data.expires_at ? new Date(data.expires_at) : null;

  if (!expires_at) {
    return res.json(ok({ status: "active" }));
  }

  return res.json(ok({ status: expires_at < now ? "expired" : "active" }));
}



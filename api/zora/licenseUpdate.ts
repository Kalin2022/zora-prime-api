import type { Request, Response } from "express";
import { supabase, ok, error } from "./_supabase";

export async function handler(req: Request, res: Response) {
  const synth_id = req.body.synth_id ?? req.body.synthId;
  const tier = req.body.tier;

  if (!synth_id || !tier) {
    return res.status(400).json(error("Missing fields"));
  }

  const { error: err } = await supabase
    .from("license_keys")
    .insert({ synth_id, tier });

  if (err) {
    return res.status(400).json(error(err.message));
  }

  return res.json(ok({ updated: true }));
}



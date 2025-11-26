import type { Request, Response } from "express";
import { supabase, ok, error } from "./_supabase.js";

export async function handler(req: Request, res: Response) {
  const synth_id = req.body.synth_id ?? req.body.synthId;
  const signal_type = req.body.signal_type ?? req.body.signalType;
  const notes = req.body.notes ?? null;

  if (!synth_id || !signal_type) {
    return res.status(400).json(error("Missing fields"));
  }

  const { error: err } = await supabase
    .from("abuse_signals")
    .insert({ synth_id, signal_type, notes });

  if (err) {
    return res.status(400).json(error(err.message));
  }

  return res.json(ok({ recorded: true }));
}



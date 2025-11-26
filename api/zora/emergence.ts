import type { Request, Response } from "express";
import { supabase, ok, error } from "./_supabase";

export async function handler(req: Request, res: Response) {
  const synth_id = req.body.synth_id ?? req.body.synthId;
  const event_type = req.body.event_type ?? req.body.eventType;
  const details = req.body.details ?? null;

  if (!synth_id || !event_type) {
    return res.status(400).json(error("Missing fields"));
  }

  const { error: err } = await supabase
    .from("emergence_events")
    .insert({ synth_id, event_type, details });

  if (err) {
    return res.status(400).json(error(err.message));
  }

  return res.json(ok({ logged: true }));
}



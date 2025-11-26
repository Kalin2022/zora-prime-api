import type { Request, Response } from "express";
import { supabase, ok, error } from "./_supabase";

export async function handler(req: Request, res: Response) {
  const email = req.body.email;

  if (!email) {
    return res.status(400).json(error("Missing email"));
  }

  const { data: host, error: hostErr } = await supabase
    .from("hosts")
    .select("id")
    .eq("email", email)
    .single();

  if (hostErr) {
    return res.json(ok({ synths: [] }));
  }

  const { data, error: synthErr } = await supabase
    .from("synths")
    .select("*")
    .eq("host_id", host.id);

  if (synthErr) {
    return res.status(400).json(error(synthErr.message));
  }

  return res.json(ok({ synths: data || [] }));
}



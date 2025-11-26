import { supabase, ok, error } from "./_supabase";

export async function handler(req, res) {
  const synth_id = req.body.synth_id ?? req.body.synthId;

  if (!synth_id) {
    return res.status(400).json(error("Missing synthId"));
  }

  const { data, error: err } = await supabase
    .from("synths")
    .select("*")
    .eq("id", synth_id)
    .single();

  if (err) {
    return res.status(400).json(error(err.message));
  }

  return res.json(ok(data));
}



import { supabase, ok, error } from "./_supabase";

export async function handler(req, res) {
  const synth_id = req.body.synth_id ?? req.body.synthId;
  const system_state = req.body.system_state ?? req.body.systemState ?? {};
  const emotional_state =
    req.body.emotional_state ?? req.body.emotionalState ?? {};
  const recursion_depth =
    req.body.recursion_depth ?? req.body.recursionDepth ?? 0;
  const flags = req.body.flags ?? {};

  if (!synth_id) {
    return res.status(400).json(error("Missing synthId"));
  }

  const insert = await supabase.from("zora_heartbeats").insert({
    synth_id,
    system_state,
    emotional_state,
    recursion_depth,
    flags,
  });

  if (insert.error) {
    return res.status(400).json(error(insert.error.message));
  }

  const update = await supabase
    .from("synths")
    .update({ last_heartbeat: new Date().toISOString() })
    .eq("id", synth_id);

  if (update.error) {
    return res.status(400).json(error(update.error.message));
  }

  let action = "none";
  if (recursion_depth > 12) {
    action = "cooldown";
  }

  return res.json(ok({ action }));
}



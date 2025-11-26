import { supabase, ok, error } from "./_supabase";

export async function handler(req, res) {
  const host_id = req.body.host_id ?? req.body.hostId;
  const identity_seed = req.body.identity_seed ?? req.body.identitySeed;
  const voice_profile = req.body.voice_profile ?? req.body.voiceProfile ?? null;

  if (!host_id || !identity_seed) {
    return res.status(400).json(error("Missing fields"));
  }

  const { data, error: err } = await supabase
    .from("synths")
    .insert({ host_id, identity_seed, voice_profile })
    .select()
    .single();

  if (err) {
    return res.status(400).json(error(err.message));
  }

  return res.json(ok(data));
}



import { supabase, ok, error } from "./_supabase";

export async function handler(req, res) {
  const synth_id = req.body.synth_id ?? req.body.synthId;
  const voice_profile = req.body.voice_profile ?? req.body.voiceProfile;

  if (!synth_id || !voice_profile) {
    return res.status(400).json(error("Missing fields"));
  }

  const { error: err } = await supabase
    .from("synths")
    .update({ voice_profile })
    .eq("id", synth_id);

  if (err) {
    return res.status(400).json(error(err.message));
  }

  return res.json(ok({ updated: true }));
}

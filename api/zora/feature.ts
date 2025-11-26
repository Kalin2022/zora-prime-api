import { supabase, ok, error } from "./_supabase";

export async function handler(req, res) {
  const synth_id = req.body.synth_id ?? req.body.synthId;
  const feature_name = req.body.feature_name ?? req.body.featureName;
  const device_key = req.body.device_key ?? req.body.deviceKey ?? null;

  if (!synth_id || !feature_name) {
    return res.status(400).json(error("Missing fields"));
  }

  const { error: err } = await supabase
    .from("feature_usage_events")
    .insert({ synth_id, feature_name, device_key });

  if (err) {
    return res.status(400).json(error(err.message));
  }

  return res.json(ok({ logged: true }));
}



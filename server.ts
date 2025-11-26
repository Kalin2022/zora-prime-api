import "dotenv/config";
import express from "express";
import cors from "cors";
import { readdirSync, existsSync } from "fs";
import { join, extname } from "path";
import { pathToFileURL } from "url";

const app = express();
app.use(cors());
app.use(express.json());

const base = "/api/zora";
const srcRoutesDir = join(process.cwd(), "api/zora");
const distRoutesDir = join(process.cwd(), "dist/api/zora");
const routesDir = existsSync(srcRoutesDir) ? srcRoutesDir : distRoutesDir;

for (const file of readdirSync(routesDir)) {
  const ext = extname(file);
  if ((ext === ".ts" || ext === ".js") && !file.startsWith("_supabase")) {
    const routeName = file.replace(ext, "");
    const routePath = `${base}/${routeName}`;
    const modulePath = pathToFileURL(join(routesDir, file)).href;
    const route = await import(modulePath);
    app.post(routePath, route.handler);
    console.log(`Loaded route: POST ${routePath}`);
  }
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Zora-Prime API running on port ${port}`);
});



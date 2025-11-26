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
const routesDir = existsSync(distRoutesDir)
  ? distRoutesDir
  : srcRoutesDir;

async function loadRoutes() {
  for (const file of readdirSync(routesDir)) {
    const ext = extname(file);
    const isSupported =
      (ext === ".js" && routesDir === distRoutesDir) ||
      (ext === ".ts" && routesDir === srcRoutesDir);
    if (isSupported && !file.startsWith("_supabase")) {
      const routeName = file.replace(ext, "");
      const routePath = `${base}/${routeName}`;
      const modulePath = pathToFileURL(join(routesDir, file)).href;
      const route = await import(modulePath);
      app.post(routePath, route.handler);
      console.log(`Loaded route: POST ${routePath}`);
    }
  }
}

loadRoutes()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Zora-Prime API running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to load routes", err);
    process.exit(1);
  });



import * as esbuild from "esbuild";

import { solidityEsBuildConfig } from "./src/plugin";

await esbuild.build({
  outExtension: { ".js": ".mjs" },
  entryPoints: ["test/MyFirstContractServer.ts"],
  bundle: true,
  format: "esm",
  platform: "node",
  outdir: "dist/node",
  plugins: [solidityEsBuildConfig()],
  external: ["ganache"],
  // supported: {
  //   "dynamic-import": true,
  // },
  banner: {
    js: `import { createRequire } from 'module';const require = createRequire(import.meta.url);`,
  },
});

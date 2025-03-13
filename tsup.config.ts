import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: false,
  minify: false,
  treeshake: false,
  keepNames: true,
  esbuildOptions(options) {
    options.legalComments = "none";
  }
});
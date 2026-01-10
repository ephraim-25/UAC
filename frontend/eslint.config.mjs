import { defineConfig } from "eslint/config";
import nextConfig from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextConfig,
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
]);

export default eslintConfig;

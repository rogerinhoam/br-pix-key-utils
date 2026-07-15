#!/usr/bin/env node
import { validatePixKey } from "./index.js";

const key = process.argv.slice(2).join(" ");
if (!key || key === "--help" || key === "-h") {
  console.log('Uso: pix-key "chave"');
  process.exit(0);
}

const result = validatePixKey(key);
console.log(JSON.stringify(result, null, 2));
if (!result.valid) process.exitCode = 1;

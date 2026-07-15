import test from "node:test";
import assert from "node:assert/strict";
import { isCpf, isCnpj, validatePixKey } from "../src/index.js";

test("valida e normaliza CPF", () => {
  assert.equal(isCpf("529.982.247-25"), true);
  assert.deepEqual(validatePixKey("529.982.247-25"), { valid: true, type: "cpf", normalized: "52998224725" });
});

test("valida CNPJ e rejeita sequências", () => {
  assert.equal(isCnpj("04.252.011/0001-10"), true);
  assert.equal(isCnpj("11.111.111/1111-11"), false);
});

test("reconhece telefone, email e EVP", () => {
  assert.equal(validatePixKey("+55 (11) 99999-8888").type, "phone");
  assert.equal(validatePixKey("Pessoa@Example.com").normalized, "pessoa@example.com");
  assert.equal(validatePixKey("123e4567-e89b-12d3-a456-426614174000").type, "evp");
});

test("rejeita formato inválido", () => {
  assert.deepEqual(validatePixKey("não é uma chave"), { valid: false, type: null, normalized: null });
});

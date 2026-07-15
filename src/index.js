const digits = (value) => String(value).replace(/\D/g, "");

function repeated(value) {
  return /^(\d)\1+$/.test(value);
}

function cpfDigit(base, factor) {
  const total = [...base].reduce((sum, digit) => sum + Number(digit) * factor--, 0);
  const remainder = (total * 10) % 11;
  return remainder === 10 ? 0 : remainder;
}

export function isCpf(value) {
  const cpf = digits(value);
  if (cpf.length !== 11 || repeated(cpf)) return false;
  const first = cpfDigit(cpf.slice(0, 9), 10);
  const second = cpfDigit(cpf.slice(0, 9) + first, 11);
  return cpf.endsWith(`${first}${second}`);
}

function cnpjDigit(base) {
  const weights = base.length === 12 ? [5,4,3,2,9,8,7,6,5,4,3,2] : [6,5,4,3,2,9,8,7,6,5,4,3,2];
  const total = [...base].reduce((sum, digit, index) => sum + Number(digit) * weights[index], 0);
  const remainder = total % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

export function isCnpj(value) {
  const cnpj = digits(value);
  if (cnpj.length !== 14 || repeated(cnpj)) return false;
  const first = cnpjDigit(cnpj.slice(0, 12));
  const second = cnpjDigit(cnpj.slice(0, 12) + first);
  return cnpj.endsWith(`${first}${second}`);
}

export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
export const isPhone = (value) => /^\+55\d{10,11}$/.test(String(value).replace(/[\s().-]/g, ""));
export const isEvp = (value) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(value).trim());

export function classifyPixKey(value) {
  const raw = String(value).trim();
  if (isCpf(raw)) return "cpf";
  if (isCnpj(raw)) return "cnpj";
  if (isPhone(raw)) return "phone";
  if (isEmail(raw)) return "email";
  if (isEvp(raw)) return "evp";
  return null;
}

export function normalizePixKey(value) {
  const type = classifyPixKey(value);
  if (type === "cpf" || type === "cnpj") return digits(value);
  if (type === "phone") return String(value).replace(/[\s().-]/g, "");
  if (type === "email") return String(value).trim().toLowerCase();
  if (type === "evp") return String(value).trim().toLowerCase();
  return null;
}

export function validatePixKey(value) {
  const type = classifyPixKey(value);
  return { valid: type !== null, type, normalized: type ? normalizePixKey(value) : null };
}

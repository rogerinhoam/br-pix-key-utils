# br-pix-key-utils

Biblioteca e CLI JavaScript, sem dependências, para classificar, normalizar e validar **o formato** de chaves Pix dos tipos CPF, CNPJ, telefone, e-mail e EVP.

> A validação é somente sintática. Ela não consulta o DICT/Banco Central e não confirma que uma chave está registrada ou pertence a alguém.

## Uso

```bash
npx br-pix-key-utils "529.982.247-25"
```

Saída:

```json
{ "valid": true, "type": "cpf", "normalized": "52998224725" }
```

## Biblioteca

```js
import { validatePixKey, normalizePixKey } from "br-pix-key-utils";

validatePixKey("pessoa@example.com");
normalizePixKey("+55 (11) 99999-8888");
```

Telefones devem incluir o código do país `+55`. Números sem `+55` não são classificados como telefone para evitar ambiguidade com CPF.

## Desenvolvimento

```bash
npm test
```

## Licença

MIT

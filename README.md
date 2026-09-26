# hinario-ibbf

Serviço que expõe o catálogo do Cantor Cristão (581 hinos) para o front da
Plataforma IBBF. Fastify + TypeScript + Zod, seguindo a arquitetura descrita em
[ARCHITECTURE.md](./ARCHITECTURE.md) (mesmo padrão do `back-plataforma-ibbf`,
mas sem Prisma/Postgres — o catálogo é estático e vive em memória).

## Rodando localmente

```bash
cp .env.example .env

npm install
npm run dev    # http://localhost:3011
```

`GET /health` deve responder 200. Docs em `/docs` (Swagger UI, com todos os
endpoints, schemas, parâmetros de busca/paginação e formato de erro
documentados).

## Endpoints

- `GET /health` — health check.
- `GET /hymns` — lista paginada. Aceita `page`, `limit` e `search` (busca por
  título ou letra, case/acento-insensível).
- `GET /hymns/:id` — retorna um hino pelo número impresso no hinário (1–581).

## Scripts

- `npm run dev` — servidor em modo watch
- `npm run build` / `npm start` — build de produção
- `npm run typecheck` — checagem de tipos
- `npm test` — testes (vitest)

## Atualizando o catálogo

Os hinos vivem em `src/data/hinos.json` (`id`, `title`, `lyrics`). Para trocar
a fonte, edite esse arquivo mantendo o mesmo formato — não há migração nem
banco de dados envolvidos.

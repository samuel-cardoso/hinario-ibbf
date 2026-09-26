# Arquitetura da API

Mesmo fluxo em camadas do `back-plataforma-ibbf`, sem Prisma/DI:

```
route → controller → use case → repository port → InMemoryHymnRepository
```

- `models/`: entidade `Hymn`.
- `repositories/`: contrato `HymnRepositoryPort`, consumido pelos casos de uso.
- `infrastructure/in-memory/`: implementação do contrato — carrega `src/data/hinos.json`
  uma vez no boot e mantém um índice normalizado (sem acento/caixa) para busca.
- `usecases/<recurso>/<ação>/`: DTO, schema Zod (com descrições ricas para o Swagger),
  caso de uso e controller.
- `routes/`: verbos, URLs e schemas HTTP, resolvendo controllers via `container.ts`.
- `container.ts`: composição manual das dependências (sem Awilix — só há um repositório).
- `shared/errors/`: erros traduzidos uma vez no handler global de `server.ts`.

Sem autenticação: o catálogo de hinos é conteúdo público. Se no futuro for preciso
favoritos por usuário, essa é a linha que muda — o resto do desenho seria o mesmo do
`back-plataforma-ibbf` (JWT + preHandler `authenticate`).

import { z } from 'zod';

export const hymnResponseItemSchema = z
  .object({
    id: z.number().int().positive().describe('Número do hino no hinário impresso do Cantor Cristão. Também serve como identificador único.'),
    title: z.string().describe('Título do hino, como impresso no hinário (geralmente em caixa alta).'),
    lyrics: z.string().describe('Letra completa do hino, incluindo estrofes/refrão separados por linhas em branco e, ao final, a autoria quando disponível.'),
  })
  .describe('Um hino do Cantor Cristão.');

export const hymnErrorSchema = z.object({
  success: z.literal(false),
  code: z.string().describe('Código estável do erro, para tratamento programático pelo cliente.'),
  message: z.string().describe('Mensagem legível por humanos, não deve ser usada para lógica no cliente.'),
});

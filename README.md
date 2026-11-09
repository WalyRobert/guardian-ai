# GuardianAI

Laboratório experimental de visão computacional com COCO-SSD/TensorFlow.js. Autor: Waly Robert. Derivado do projeto do Google AI Studio, com início de câmera explícito, limpeza de recursos e remoção da regra “pessoa = ameaça alta”.

## Executar

Requer Node.js 22.16 ou superior. `npm ci`, depois `npm run dev`. Clique em “Iniciar câmera e detector” e conceda acesso somente se desejar. O modelo COCO-SSD lite_mobilenet_v2 é baixado ao iniciar e a detecção roda no navegador; exige internet no primeiro carregamento, HTTPS/localhost e navegador compatível. Tenta WebGL e usa CPU se a inicialização falhar. CPU pode ser lenta.

Para descrição Gemini opcional, copie `.env.example` para `.env`, configure `GEMINI_API_KEY` no servidor e execute `npm run server` em outro terminal. Produção local: `npm run build` e `npm start` (loopback 3001). O proxy não é implantação multiusuário: antes de exposição pública, implemente autenticação, quotas e controle de custos.

## Comportamento real

- Câmera desligada até ação explícita; sem captura de áudio. Tentativas atrasadas de carregar modelo ou conceder câmera após desmontagem liberam seus recursos.
- Caixas e classes de objetos no frame atual, confiança configurável, aproximadamente até 3 ciclos/s além do tempo de inferência. Não há rastreamento de indivíduos únicos ou medição de throughput industrial.
- Nenhum objeto ou pessoa é rotulado como ameaça, invasor ou criminoso. Confiança do detector não é probabilidade de perigo.
- Sem gravação ou envio automático de frames. Uma descrição por Gemini é solicitada apenas pelo botão correspondente, que envia um JPEG reduzido a até 1280 px de largura pelo servidor. Evite frames com dados pessoais; o provedor pode errar. Não houve chamada paga nos testes.
- Sem reconhecimento facial, integração de câmeras externas, alarmes de segurança validados ou certificação profissional. A versão do Studio permanece separada.

COCO-SSD tem classes e limitações próprias; ausência de detecção não prova ausência de objetos. Avalie iluminação, oclusão, dispositivo e falsos positivos com imagens autorizadas. Pesos/modelos são baixados de terceiros; não foram incluídos neste repositório.

## Verificação

`npm test`, `npm run test:server`, `npm run build`. Testes usam modelo/câmera simulados para validar filtragem, início explícito e descarte tardio de modelo/stream; API testada com respostas simuladas. Não substituem avaliação do modelo com imagens reais nem testes de câmera/GPU em hardware representativo.

[Implementação oficial COCO-SSD](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd). Dependências/modelos mantêm suas licenças. Licença de redistribuição do código desta edição ainda não definida pelo autor.

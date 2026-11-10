# GuardianAI

## Escolha de provedor e chave por aba

Imagens/OCR: Google Gemini, DeepSeek e OpenAI. Use modelos com visão. DeepSeek Flash aceita imagens; DeepSeek Pro é recusado localmente para esta função. A disponibilidade dos demais modelos depende da sua conta. A escolha afeta apenas a descrição opcional de um frame. O detector local de objetos continua usando COCO-SSD, sem chave de API e sem envio automático de imagens.

Abra **Configurar IA para imagens**, escolha provedor/modelo, informe sua chave e aplique a configuração. O destino ativo aparece também fora do painel.

A chave pessoal permanece apenas na memória desta página, sem localStorage, sessionStorage, arquivos ou logs do aplicativo. Recarregar/fechar exige configurar novamente. O campo é limpo ao aplicar; apagar o perfil remove a chave e interrompe a espera local. A remoção não desfaz solicitações já enviadas. Alterar provedor invalida a configuração anterior; não há fallback, reaproveitamento automático da chave de outro serviço ou repetição após erro.

**Verificar configuração sem gerar** verifica somente formato, destino e presença da chave localmente. Não contata o provedor, não comprova validade, acesso ao modelo nem cota gratuita. A geração só ocorre por ação explícita e pode consumir créditos. Os modelos iniciais são exemplos editáveis; disponibilidade e limites dependem da conta.

Opcionalmente escolha a chave do servidor de forma explícita e configure a variável do provedor no `.env`: `GEMINI_API_KEY`, `DEEPSEEK_API_KEY` ou `OPENAI_API_KEY`. Modelos são selecionados pela interface. As variáveis Gemini de modelo continuam atendendo clientes antigos da API sem seleção de provedor. Não publique `.env` reais.

O backend usa destinos HTTPS fixos, valida origem e função, limita corpo/resposta e prazo, e encaminha a chave somente em header para o serviço escolhido. A chave não entra no prompt, URL ou resposta. Não são aceitas URLs arbitrárias. Hospedagem compartilhada exige HTTPS e autenticação de usuários; o servidor padrão é local.

Testes de integração usam transporte controlado, sem geração externa ou consumo de créditos. `store: false` na OpenAI não é uma garantia de retenção zero pelo provedor; consulte as políticas de cada serviço.

Referências: [visão DeepSeek](https://api-docs.deepseek.com/guides/vision/), [OpenAI áudio](https://developers.openai.com/api/docs/guides/audio), [OpenAI TTS/PCM](https://developers.openai.com/api/docs/guides/text-to-speech), [Gemini](https://ai.google.dev/gemini-api/docs).


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


## Início e diagnóstico simplificados

Após `npm ci`, execute `npm run diagnostico` para verificar Node, dependências, build e presença de configuração sem revelar chaves ou consumir cota. Execute `npm run iniciar` para compilar a versão atual e abrir o servidor local em um único terminal. A faixa de estado da interface distingue configuração ausente e integração ainda não comprovada. Encontrar uma chave não confirma que ela é válida nem que existe cota gratuita. Nenhum teste de geração é iniciado automaticamente.

O botão Testar detector local carrega o COCO-SSD real e executa inferência em uma imagem sintética, sem câmera ou Gemini. O limiar selecionado é passado à inferência; o teste não mede precisão ou falsos positivos em imagens reais.


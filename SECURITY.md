# Segurança e privacidade

Este laboratório não deve fundamentar decisões de segurança sobre pessoas. Não há identificação ou classificação de intenção. Use câmera e imagens autorizadas. Frames ficam locais até clicar em envio opcional; nesse caso são transmitidos ao Gemini pelo servidor.

Não publique chaves ou snapshots reais no repositório. O servidor escuta em loopback; implantações públicas exigem autenticação, quotas e controle de custos. Relate falhas com dados sintéticos sem credenciais.


Chaves pessoais da interface são temporárias e não são gravadas pelo aplicativo. Não registre headers de autenticação no proxy. Cada perfil usa seu provedor e não tem fallback para outra chave. Apagar a configuração não desfaz consultas já enviadas. Em hospedagem pública, proteja o gateway com autenticação e limites de uso.

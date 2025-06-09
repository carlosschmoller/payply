# payply

Projeto de sistema de pagamentos em criptomoedas.

## Arquitetura

### Frontend (React + Web3)
- Conexao com carteira: wagmi + RainbowKit (MetaMask, WalletConnect, etc.)
- Tela de checkout cripto: selecao de moeda, valor e botao "Pagar com Cripto".
- Swap/Conversao: integracao com 1inch/Uniswap para trocar tokens automaticamente.
- Historico e recibo: mostrar hash, status da transacao e recibo.
- Compra de cripto (on-ramp): integracao com MoonPay, Transak, Banxa ou opcao manual (Pix, cartao...)

### Backend (Node.js + PostgreSQL + Web3)
- Webhooks: captura automatica de transacoes na blockchain (Moralis, Alchemy, etc.).
- Controle de pagamentos: salvar logs, status, valores, token e wallet do usuario.
- Onboarding de lojistas: cadastro, KYC, configuracao da wallet de recebimento.
- Emissao de cobrancas: criacao de requests de pagamento em cripto (Pix-like).
- Conversao cripto-fiat: integracao com APIs de cambio (CoinMarketCap, Coingecko, etc.).

### Infraestrutura
- Frontend: React + Vite + Tailwind.
- Backend: Node.js (Express ou Fastify) + PostgreSQL.
- Blockchain Layer: Ethers.js, web3.js, Moralis ou Alchemy.
- Servicos externos:
  - On-ramp: MoonPay / Transak / Banxa.
  - Swaps: 1inch / Uniswap SDK.
- Armazenamento: Firebase ou S3 para documentos/KYC.
- Processamento assincrono: RabbitMQ / Redis (opcional).

## Estrutura do Projeto

```
frontend/
backend/
```



## Executando

Para rodar a demonstracao local, e necessario ter o Node.js instalado. Navegue ate a pasta `backend` e execute:

```bash
npm start
```

Depois acesse `http://localhost:3000` para visualizar o formulario de pagamento simples.


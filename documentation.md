# Documentação do WhatsApp Web Clone

## Visão Geral

Este projeto é uma aplicação web progressiva (PWA) que replica as funcionalidades do WhatsApp Web, permitindo sincronização com uma conta existente do WhatsApp através de QR code. A aplicação também está preparada para uma futura integração com agentes automatizados para diferentes departamentos.

## Tecnologias Utilizadas

- **Next.js**: Framework React para desenvolvimento de aplicações web
- **Tailwind CSS**: Framework CSS para estilização
- **WaAPI**: API para integração com WhatsApp
- **Service Worker**: Para funcionalidades offline e PWA

## Estrutura do Projeto

```
whatsapp-web-clone/
├── public/
│   ├── icons/              # Ícones para PWA
│   ├── manifest.json       # Configuração do PWA
│   └── service-worker.js   # Service worker para funcionalidades offline
├── src/
│   ├── app/
│   │   ├── api/            # Endpoints da API
│   │   │   └── whatsapp/   # Endpoints para integração com WhatsApp
│   │   ├── chat/           # Página de chat
│   │   ├── qrcode/         # Página de sincronização via QR code
│   │   ├── globals.css     # Estilos globais
│   │   ├── layout.tsx      # Layout principal
│   │   └── page.tsx        # Página inicial
│   ├── components/         # Componentes reutilizáveis
│   ├── hooks/              # Hooks personalizados
│   └── lib/                # Funções utilitárias
└── research/               # Documentação de pesquisa
```

## Funcionalidades Implementadas

### 1. Sincronização via QR Code

A aplicação permite sincronização com uma conta existente do WhatsApp através de QR code, similar ao WhatsApp Web oficial. O processo funciona da seguinte forma:

1. O usuário acessa a página de sincronização
2. A aplicação gera um QR code através da API WaAPI
3. O usuário escaneia o QR code com seu smartphone
4. Após a sincronização, o usuário é redirecionado para a interface de chat

### 2. Interface de Chat

A interface de chat replica a aparência e funcionalidades do WhatsApp Web, incluindo:

- Lista de contatos/conversas
- Visualização de mensagens
- Envio e recebimento de mensagens
- Indicadores de leitura (duplo check)
- Pesquisa de conversas

### 3. Progressive Web App (PWA)

A aplicação é configurada como uma PWA, permitindo:

- Instalação no dispositivo
- Funcionamento offline
- Notificações push
- Sincronização em segundo plano

## Endpoints da API

### 1. `/api/whatsapp/qrcode`

Gera um QR code para sincronização com o WhatsApp.

- **Método**: GET
- **Resposta**: 
  ```json
  {
    "success": true,
    "qrCodeUrl": "URL_DO_QR_CODE",
    "status": "ready",
    "message": "QR Code gerado com sucesso"
  }
  ```

### 2. `/api/whatsapp/status`

Verifica o status da conexão com o WhatsApp.

- **Método**: GET
- **Resposta**: 
  ```json
  {
    "success": true,
    "status": "ready",
    "message": "Instância conectada e pronta"
  }
  ```

### 3. `/api/whatsapp/messages`

Obtém mensagens de um chat específico ou envia uma nova mensagem.

- **Método**: GET
- **Parâmetros**: `chatId` (ID do chat)
- **Resposta**: 
  ```json
  {
    "success": true,
    "messages": [
      {
        "id": "123",
        "text": "Olá, como posso ajudar?",
        "sender": "other",
        "timestamp": "2025-04-21T15:30:00.000Z"
      }
    ]
  }
  ```

- **Método**: POST
- **Corpo**:
  ```json
  {
    "chatId": "123",
    "message": "Olá, tudo bem?"
  }
  ```
- **Resposta**: 
  ```json
  {
    "success": true,
    "messageId": "456",
    "message": "Mensagem enviada com sucesso"
  }
  ```

## Preparação para Fase 2 (Agentes Automatizados)

A aplicação foi projetada para permitir a futura integração com agentes automatizados para diferentes departamentos. A estrutura já está preparada para:

1. Identificar mensagens por departamento
2. Rotear mensagens para agentes específicos
3. Permitir respostas automatizadas baseadas em regras ou IA
4. Transferir conversas entre agentes humanos e automatizados

## Instruções de Uso

### Instalação e Execução Local

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Configure as variáveis de ambiente (veja `.env.example`)
4. Execute o servidor de desenvolvimento: `npm run dev`
5. Acesse `http://localhost:3000`

### Sincronização com WhatsApp

1. Acesse a página de sincronização
2. Abra o WhatsApp no seu smartphone
3. Toque em Menu > Aparelhos conectados > Conectar um aparelho
4. Escaneie o QR code exibido na tela
5. Aguarde a sincronização ser concluída

## Considerações de Segurança

- A aplicação não armazena mensagens ou dados sensíveis em servidores externos
- A conexão com o WhatsApp é feita diretamente através da API WaAPI
- Recomenda-se usar HTTPS em produção para garantir a segurança das comunicações
- O token de API da WaAPI deve ser mantido em segurança e não compartilhado

## Limitações e Considerações

- A API WaAPI tem limitações de uso conforme seus termos de serviço
- O uso excessivo pode levar ao banimento da conta do WhatsApp
- Recomenda-se implementar atrasos entre mensagens (mínimo de 15 segundos)
- A aplicação depende da disponibilidade dos servidores do WhatsApp e da WaAPI

## Próximos Passos (Fase 2)

1. Implementar sistema de agentes automatizados
2. Adicionar suporte para análise de sentimento em mensagens
3. Desenvolver interface de administração para configuração de agentes
4. Implementar integração com sistemas CRM
5. Adicionar suporte para mensagens em massa (respeitando limites do WhatsApp)

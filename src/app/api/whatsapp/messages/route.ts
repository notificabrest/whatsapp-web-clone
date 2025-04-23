import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const chatId = searchParams.get('chatId');
    
    if (!chatId) {
      return NextResponse.json(
        {
          success: false,
          message: "chatId é obrigatório"
        },
        { status: 400 }
      );
    }
    
    // Em uma implementação real, isso buscaria mensagens da API WaAPI
    // Simulando mensagens
    const messages = [
      {
        id: "1",
        text: "Olá, como posso ajudar?",
        sender: "other",
        timestamp: new Date(Date.now() - 300000).toISOString()
      },
      {
        id: "2",
        text: "Estou interessado nos seus produtos",
        sender: "me",
        timestamp: new Date(Date.now() - 180000).toISOString()
      },
      {
        id: "3",
        text: "Quais opções vocês têm disponíveis?",
        sender: "me",
        timestamp: new Date(Date.now() - 120000).toISOString()
      },
      {
        id: "4",
        text: "Temos várias opções! Posso te mostrar nosso catálogo",
        sender: "other",
        timestamp: new Date().toISOString()
      }
    ];
    
    return NextResponse.json({
      success: true,
      messages
    });
  } catch (error) {
    console.error("Erro ao buscar mensagens:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao buscar mensagens",
        error: error instanceof Error ? error.message : "Erro desconhecido"
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { chatId, message } = body;
    
    if (!chatId || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "chatId e message são obrigatórios"
        },
        { status: 400 }
      );
    }
    
    // Em uma implementação real, isso enviaria a mensagem através da API WaAPI
    // Simulando envio de mensagem
    const messageId = Date.now().toString();
    
    return NextResponse.json({
      success: true,
      messageId,
      message: "Mensagem enviada com sucesso"
    });
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao enviar mensagem",
        error: error instanceof Error ? error.message : "Erro desconhecido"
      },
      { status: 500 }
    );
  }
}

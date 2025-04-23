import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Em uma implementação real, isso verificaria o status da conexão com a API WaAPI
    // Simulando uma resposta da API
    const status = "ready"; // Possíveis valores: "disconnected", "connecting", "ready", "error"
    
    return NextResponse.json({
      success: true,
      status,
      message: "Instância conectada e pronta"
    });
  } catch (error) {
    console.error("Erro ao verificar status:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao verificar status",
        error: error instanceof Error ? error.message : "Erro desconhecido"
      },
      { status: 500 }
    );
  }
}

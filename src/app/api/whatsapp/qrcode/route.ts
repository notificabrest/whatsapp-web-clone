import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Em uma implementação real, isso seria uma chamada para a API WaAPI
    // Simulando uma resposta da API
    const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=WhatsAppWebClone";
    
    return NextResponse.json({
      success: true,
      qrCodeUrl,
      status: "ready",
      message: "QR Code gerado com sucesso"
    }) ;
  } catch (error) {
    console.error("Erro ao gerar QR code:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao gerar QR code",
        error: error instanceof Error ? error.message : "Erro desconhecido"
      },
      { status: 500 }
    );
  }
}

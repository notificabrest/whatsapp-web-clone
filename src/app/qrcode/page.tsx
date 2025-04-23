"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function QRCodePage() {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Função para gerar o QR code
    const generateQRCode = async () => {
      try {
        setStatus("loading");
        // Em uma implementação real, isso seria uma chamada para a API WaAPI
        // Simulando uma resposta da API
        setTimeout(() => {
          // URL de exemplo de um QR code
          setQrCodeUrl("https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=WhatsAppWebClone") ;
          setStatus("ready");
        }, 2000);
      } catch (err) {
        setStatus("error");
        setError("Erro ao gerar QR code. Tente novamente.");
        console.error("Erro ao gerar QR code:", err);
      }
    };

    generateQRCode();

    // Verificar status da conexão periodicamente
    const checkStatus = setInterval(() => {
      // Em uma implementação real, isso verificaria o status da conexão com a API WaAPI
      // Simulando uma verificação de status
      const randomStatus = Math.random();
      if (randomStatus > 0.9 && status === "ready") {
        clearInterval(checkStatus);
        setStatus("connected");
        // Redirecionar para a página de chat após conectado
        setTimeout(() => {
          router.push("/chat");
        }, 1500);
      }
    }, 3000);

    return () => {
      clearInterval(checkStatus);
    };
  }, [router, status]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 whatsapp-primary">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-2xl font-bold text-center mb-2">
            Sincronize com WhatsApp
          </h1>
          <p className="text-gray-600 text-center">
            Escaneie o QR code com seu telefone para conectar
          </p>
        </div>

        <div className="flex flex-col items-center mb-8">
          {status === "loading" && (
            <div className="bg-gray-200 w-64 h-64 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          )}

          {status === "ready" && qrCodeUrl && (
            <div className="border-8 border-gray-200 p-2 mb-4">
              <img
                src={qrCodeUrl}
                alt="QR Code para sincronização"
                className="w-64 h-64"
              />
            </div>
          )}

          {status === "connected" && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Conectado! Redirecionando...</span>
            </div>
          )}

          {status === "error" && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p>{error}</p>
            </div>
          )}

          <p className="text-sm text-gray-500 text-center">
            {status === "loading"
              ? "Gerando QR code..."
              : status === "ready"
              ? "Abra o WhatsApp no seu telefone, toque em Menu ou Configurações e selecione WhatsApp Web"
              : status === "connected"
              ? "Conectado com sucesso!"
              : "Ocorreu um erro. Tente novamente."}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {status === "error" && (
            <button
              onClick={() => window.location.reload()}
              className="w-full py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors"
            >
              Tentar novamente
            </button>
          )}

          <Link
            href="/"
            className="w-full py-2 bg-gray-200 text-gray-800 rounded-md text-center font-medium hover:bg-gray-300 transition-colors"
          >
            Voltar
          </Link>
        </div>
      </div>
    </main>
  );
}

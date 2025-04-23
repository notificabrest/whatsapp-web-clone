"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Verificar se o navegador suporta instalação de PWA
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevenir o comportamento padrão
      e.preventDefault();
      // Armazenar o evento para uso posterior
      setDeferredPrompt(e);
      // Atualizar estado para mostrar o botão de instalação
      setIsInstallable(true);
    });

    // Verificar se o service worker é suportado
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("Service Worker registrado com sucesso:", registration);
        })
        .catch((error) => {
          console.error("Falha ao registrar Service Worker:", error);
        });
    }
  }, []);

  const handleInstallClick = () => {
    if (!deferredPrompt) return;

    // Mostrar o prompt de instalação
    deferredPrompt.prompt();

    // Esperar pela resposta do usuário
    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === "accepted") {
        console.log("Usuário aceitou a instalação");
      } else {
        console.log("Usuário recusou a instalação");
      }
      // Limpar o prompt salvo, só pode ser usado uma vez
      setDeferredPrompt(null);
      setIsInstallable(false);
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 whatsapp-primary">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">WhatsApp Web Clone</h1>
          <p className="text-gray-600 text-center">
            Sincronize com seu WhatsApp escaneando o QR code
          </p>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="bg-gray-200 w-64 h-64 flex items-center justify-center mb-4">
            <p className="text-gray-500">QR Code será exibido aqui</p>
          </div>
          <p className="text-sm text-gray-500 text-center">
            Para usar o WhatsApp Web Clone, escaneie o QR Code com seu telefone
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Link 
            href="/qrcode" 
            className="w-full py-2 bg-green-600 text-white rounded-md text-center font-medium hover:bg-green-700 transition-colors"
          >
            Sincronizar com WhatsApp
          </Link>
          
          <Link 
            href="/chat" 
            className="w-full py-2 bg-blue-600 text-white rounded-md text-center font-medium hover:bg-blue-700 transition-colors"
          >
            Demonstração (sem sincronização)
          </Link>
          
          {isInstallable && (
            <button
              onClick={handleInstallClick}
              className="w-full py-2 bg-gray-600 text-white rounded-md font-medium hover:bg-gray-700 transition-colors"
            >
              Instalar aplicativo
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

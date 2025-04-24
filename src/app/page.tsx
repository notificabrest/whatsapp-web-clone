export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-green-600">
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
        </div>
        <div className="flex flex-col gap-4">
          <button className="w-full py-2 bg-green-600 text-white rounded-md text-center font-medium hover:bg-green-700 transition-colors">
            Sincronizar com WhatsApp
          </button>
        </div>
      </div>
    </main>
  );
}

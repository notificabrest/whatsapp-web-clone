"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Contact = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
};

type Message = {
  id: string;
  text: string;
  sender: "me" | "other";
  time: string;
  status: "sent" | "delivered" | "read";
};

export default function ChatPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("checking");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Verificar status da conexão
  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Em uma implementação real, isso verificaria o status da conexão com a API WaAPI
        // Simulando uma verificação de status
        setTimeout(() => {
          // Simulando uma conexão bem-sucedida
          setConnectionStatus("connected");
        }, 1000);
      } catch (err) {
        setConnectionStatus("disconnected");
        console.error("Erro ao verificar conexão:", err);
      }
    };

    checkConnection();
  }, [router]);

  // Carregar contatos
  useEffect(() => {
    // Em uma implementação real, isso buscaria contatos da API WaAPI
    // Simulando contatos
    const mockContacts: Contact[] = [
      {
        id: "1",
        name: "Vendas",
        lastMessage: "Olá, como posso ajudar?",
        time: "12:30",
        unread: 2,
        avatar: "V",
      },
      {
        id: "2",
        name: "Financeiro",
        lastMessage: "Seu pagamento foi confirmado",
        time: "11:45",
        unread: 0,
        avatar: "F",
      },
      {
        id: "3",
        name: "Suporte Técnico",
        lastMessage: "Poderia fornecer mais detalhes?",
        time: "09:20",
        unread: 1,
        avatar: "S",
      },
      {
        id: "4",
        name: "Marketing",
        lastMessage: "Nova campanha será lançada amanhã",
        time: "Ontem",
        unread: 0,
        avatar: "M",
      },
    ];

    setContacts(mockContacts);
    setSelectedContact(mockContacts[0]);
  }, []);

  // Carregar mensagens quando um contato é selecionado
  useEffect(() => {
    if (selectedContact) {
      // Em uma implementação real, isso buscaria mensagens da API WaAPI
      // Simulando mensagens
      const mockMessages: Message[] = [
        {
          id: "1",
          text: "Olá, como posso ajudar?",
          sender: "other",
          time: "10:30",
          status: "read",
        },
        {
          id: "2",
          text: "Estou interessado nos seus produtos",
          sender: "me",
          time: "10:32",
          status: "read",
        },
        {
          id: "3",
          text: "Quais opções vocês têm disponíveis?",
          sender: "me",
          time: "10:33",
          status: "read",
        },
        {
          id: "4",
          text: "Temos várias opções! Posso te mostrar nosso catálogo",
          sender: "other",
          time: "10:35",
          status: "sent",
        },
      ];

      setMessages(mockMessages);
    }
  }, [selectedContact]);

  // Rolar para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMsg: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");

    // Simular resposta após 2 segundos
    setTimeout(() => {
      const responseMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "Obrigado pela sua mensagem! Um agente responderá em breve.",
        sender: "other",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "sent",
      };

      setMessages((prevMessages) => [...prevMessages, responseMsg]);
    }, 2000);
  };

  // Redirecionar para a página de QR code se não estiver conectado
  if (connectionStatus === "disconnected") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 whatsapp-primary">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-2xl font-bold text-center mb-2">
              Não conectado
            </h1>
            <p className="text-gray-600 text-center">
              Você precisa sincronizar com o WhatsApp para continuar
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

  if (connectionStatus === "checking") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 whatsapp-primary">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
            <p className="text-gray-600">Verificando conexão...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex h-screen bg-gray-100">
      {/* Sidebar - Lista de contatos */}
      <div className="w-1/3 border-r border-gray-300 bg-white flex flex-col">
        <div className="p-3 whatsapp-primary flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            <span className="ml-3 font-medium text-white">WhatsApp Web Clone</span>
          </div>
          <div className="flex space-x-3">
            <button className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
              </svg>
            </button>
            <button className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-2 bg-gray-100">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Pesquisar ou começar uma nova conversa" 
              className="w-full p-2 pl-10 rounded-lg bg-white"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact)  => (
            <div 
              key={contact.id}
              className={`flex items-center p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100 ${selectedContact?.id === contact.id ? 'bg-gray-200' : ''}`}
              onClick={() => setSelectedContact(contact)}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${
                contact.name === 'Vendas' ? 'bg-blue-500' : 
                contact.name === 'Financeiro' ? 'bg-green-500' : 
                contact.name === 'Suporte Técnico' ? 'bg-purple-500' : 
                'bg-red-500'
              }`}>
                {contact.avatar}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between">
                  <span className="font-medium">{contact.name}</span>
                  <span className="text-xs text-gray-500">{contact.time}</span>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                  {contact.unread > 0 && (
                    <span className="bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {contact.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Área de chat */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Cabeçalho do chat */}
            <div className="p-3 bg-gray-200 flex items-center justify-between border-b border-gray-300">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                  selectedContact.name === 'Vendas' ? 'bg-blue-500' : 
                  selectedContact.name === 'Financeiro' ? 'bg-green-500' : 
                  selectedContact.name === 'Suporte Técnico' ? 'bg-purple-500' : 
                  'bg-red-500'
                }`}>
                  {selectedContact.avatar}
                </div>
                <span className="ml-3 font-medium">
                  {selectedContact.name}
                </span>
              </div>
              <div className="flex space-x-3">
                <button className="text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                  </svg>
                </button>
                <button className="text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Mensagens */}
            <div className="flex-1 overflow-y-auto p-4 chat-background">
              {messages.map((message)  => (
                <div 
                  key={message.id}
                  className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3 mb-2 ${
                    message.sender === 'me' 
                      ? 'ml-auto bg-green-100 rounded-tr-none' 
                      : 'mr-auto bg-white rounded-tl-none'
                  }`}
                >
                  <p>{message.text}</p>
                  <p className="text-xs text-gray-500 text-right mt-1">
                    {message.time}
                    {message.sender === 'me' && (
                      <span className={`ml-1 ${message.status === 'read' ? 'text-blue-500' : 'text-gray-400'}`}>
                        {message.status === 'sent' ? '✓' : message.status === 'delivered' ? '✓✓' : '✓✓'}
                      </span>
                    )}
                  </p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input de mensagem */}
            <div className="p-3 bg-gray-200 flex items-center">
              <button className="text-gray-600 mx-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <button className="text-gray-600 mx-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
              <input 
                type="text" 
                placeholder="Digite uma mensagem" 
                className="flex-1 p-2 rounded-lg mx-2"
                value={newMessage}
                onChange={(e)  => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button 
                className="text-gray-600 mx-2"
                onClick={handleSendMessage}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </>
        )  : (
          <div className="flex-1 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <p className="text-gray-500 mb-2">Selecione um contato para iniciar uma conversa</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

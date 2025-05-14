// api/WebSocketService.js
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { WS_URL } from '@env';  // Örn. "http://192.168.211.97:8080/ws"

let client = null;

export const connectWebSocket = (routeId, onMessage) => {
  console.log('connectWebSocket() çağrıldı – routeId:', routeId);

  client = new Client({
    // SockJS factory kullanıyoruz:
    webSocketFactory: () => {
      console.log('webSocketFactory => yeni SockJS(', WS_URL, ') oluşturuluyor');
      const sock = new SockJS(WS_URL);
      // WebSocket olaylarını da loglayalım
      sock.onopen    = evt => console.log('SockJS open:', evt);
      sock.onclose   = evt => console.log('SockJS close:', evt);
      sock.onerror   = evt => console.error('SockJS error:', evt);
      return sock;
    },

    // STOMP debug:
    debug: msg => console.log('STOMP debug:', msg),

    reconnectDelay: 5000,  // yeniden bağlanma denemesi

    // Bağlantı kurulduğunda:
    onConnect: frame => {
      console.log('STOMP onConnect – frame:', frame.headers);
      // Subscribe
      const sub = client.subscribe(
        `/topic/route/${routeId}`,
        message => {
          console.log('STOMP mesaj alındı – raw body:', message.body);
          let data;
          try {
            data = JSON.parse(message.body);
          } catch(err) {
            console.error('JSON parse hatası:', err);
            return;
          }
          const latitude  = data.lat ?? data.latitude;
          const longitude = data.lon ?? data.longitude;
          const direction = data.direction; 
          console.log('Parsed coords+direction:', { latitude, longitude, direction });
          onMessage({ latitude, longitude, direction });
        },
        { ack: 'auto' }
      );
      console.log('Abone olundu:', `/topic/route/${routeId}`, 'subscriptionId:', sub.id);
    },

    // STOMP seviyesinde hata:
    onStompError: frame => {
      console.error('STOMP error:', frame.headers, frame.body);
    },

    // WebSocket kapandığında
    onWebSocketClose: evt => {
      console.log('STOMP WebSocket kapandı:', evt);
    },

    // WebSocket hatası
    onWebSocketError: evt => {
      console.error('STOMP WebSocket error:', evt);
    },
  });

  console.log('STOMP client.activate() çağrılıyor');
  client.activate();
};

export const disconnectedWebSocket = () => {
  if (client) {
    console.log('disconnectedWebSocket() – client.deactivate() çağrılıyor');
    client.deactivate();
    client = null;
    console.log('STOMP client nulllandı');
  } else {
    console.log('disconnectedWebSocket() çağrıldı ama client zaten null');
  }
};

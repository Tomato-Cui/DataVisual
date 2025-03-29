export function useWebSocket(url, callback) {
  let ws = null;
  let reconnectAttempts = 0;
  const maxReconnectAttempts = 5;
  const reconnectDelay = 3000; // 3秒后重试

  const connect = () => {
    try {
      ws = new WebSocket(url);

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          callback(data);
        } catch (e) {
          console.error('解析 WebSocket 数据失败:', e);
        }
      };

      ws.onopen = () => {
        console.log('WebSocket 连接成功');
        reconnectAttempts = 0; // 重置重连次数
      };

      ws.onclose = () => {
        console.log('WebSocket 连接关闭');
        attemptReconnect();
      };

      ws.onerror = (error) => {
        console.error('WebSocket 错误:', error);
      };
    } catch (error) {
      console.error('创建 WebSocket 连接失败:', error);
      attemptReconnect();
    }
  };

  const attemptReconnect = () => {
    if (reconnectAttempts < maxReconnectAttempts) {
      reconnectAttempts++;
      console.log(`尝试重新连接... (${reconnectAttempts}/${maxReconnectAttempts})`);
      setTimeout(connect, reconnectDelay);
    } else {
      console.error('达到最大重连次数，停止重连');
    }
  };

  connect();

  return {
    close: () => {
      if (ws) {
        ws.close();
      }
    },
    send: (data) => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(data));
      } else {
        console.error('WebSocket 未连接，无法发送数据');
      }
    }
  };
}
  
import RNEventSource from 'react-native-event-source';
export function useSSE(): any {
  const eventSource = new RNEventSource(
    'https://api.fleaauction.world/v2/sse/event',
    {
      headers: {
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive'
      },
    }
  );

  eventSource.addEventListener('open', e => console.log(e));
  eventSource.addEventListener('error', e => console.log(e));
  eventSource.addEventListener('close', e => console.log(e));

  eventSource.addEventListener('sse.auction_viewed', (e) => {
    console.log(e);
  });

  return eventSource;
}

import { RNEventSource } from 'rn-eventsource-reborn';
import { useCallback, useEffect } from 'react';

export function useSSE(): any {

  useEffect(() => {
    const source = new RNEventSource(
      'https://api.fleaauction.world/v2/sse/event',
    );
    source.addEventListener('sse.auction_viewed', (e) => console.log(e));
  }, []);

  return 1;
}

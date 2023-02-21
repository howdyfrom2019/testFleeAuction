import {RNEventSource} from 'rn-eventsource-reborn';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

export interface SSEProps {
  data: string;
  isTrusted: boolean;
  lastEventId: string;
}

export interface auctionType {
  auctionId: number;
  viewCount: number;
}

export function useSSE(
  start: number,
  callback: (e: Event) => void,
): [auctionType[], Dispatch<SetStateAction<auctionType[]>>] {
  const [currWeekArts, setCurrWeekArts] = useState<auctionType[]>([]);

  const initArtData = useCallback(() => {
    const targets: auctionType[] = Array.from({length: 20}, (_, i) => ({
      auctionId: start + i,
      viewCount: -1,
    }));
    setCurrWeekArts(targets);
  }, [start]);

  useEffect(() => {
    initArtData();
  }, []);

  useEffect(() => {
    const source = new RNEventSource(
      'https://api.fleaauction.world/v2/sse/event',
    );
    source.addEventListener('sse.auction_viewed', callback);

    return () => {
      source.removeEventListener('sse.auction_viewed', callback);
      source.close();
    };
  }, [callback]);

  return [currWeekArts, setCurrWeekArts];
}

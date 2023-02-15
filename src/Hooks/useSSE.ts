import { RNEventSource } from 'rn-eventsource-reborn';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";

export interface SSEProps {
  data: string;
  isTrusted: boolean;
  lastEventId: string;
}

export interface auctionType {
  auctionId: number;
  viewCount: number;
}

type ArtWorksType = auctionType[];

export function useSSE(
  callback: (e: Event) => void,
): [ArtWorksType, Dispatch<SetStateAction<ArtWorksType>>] {
  const [currWeekArts, setCurrWeekArts] = useState<ArtWorksType>([]);

  const initArtData = useCallback(() => {
    let start = 2123;
    const targets: ArtWorksType = Array.from({ length: 20 }, (_, i) => ({ auctionId: start + i, viewCount: -1 }));
    setCurrWeekArts(targets);
  }, []);

  useEffect(() => {
    initArtData();
  }, [initArtData]);

  useEffect(() => {
    const source = new RNEventSource(
      'https://api.fleaauction.world/v2/sse/event',
    );
    source.addEventListener('sse.auction_viewed', callback);
  }, [callback]);

  return [currWeekArts, setCurrWeekArts];
}

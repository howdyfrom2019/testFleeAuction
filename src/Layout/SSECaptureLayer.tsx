import React, {useCallback, useEffect, useState} from 'react';
import {auctionType, SSEProps, useSSE} from '../Hooks/useSSE';
import {useAuctionStore} from '../Store/store';

const SSECaptureLayer = ({children}: {children?: React.ReactNode}) => {
  // SSETarget: sse.auction_viewed 이벤트가 발생했을 때 event.data를 관리하는 상태
  const [SSETarget, setSSETarget] = useState<auctionType | null>(null);

  const itemClickedListener = useCallback((e: Event) => {
    const {data} = e as unknown as SSEProps;
    const auctionItem: auctionType = JSON.parse(data);
    console.log(auctionItem);
    setSSETarget(auctionItem);
  }, []);
  // useSSE: sse.auction_viewed 이벤트에 대응할 콜백을 매개변수로 받음.
  useSSE(2198, itemClickedListener);
  const {sseEmitted} = useAuctionStore();

  useEffect(() => {
    if (SSETarget) {
      sseEmitted(SSETarget);
    }
  }, [SSETarget, sseEmitted]);

  return <>{children}</>;
};

export default SSECaptureLayer;

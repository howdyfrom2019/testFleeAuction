import {create} from 'zustand';
import {auctionType} from '../Hooks/useSSE';

interface AuctionType {
  items: auctionType[];
  sseEmitted: (item: auctionType) => void;
}

export const useAuctionStore = create<AuctionType>(set => ({
  items: [],
  sseEmitted: item =>
    set(state => ({
      items: state.items.map(val => {
        if (val.auctionId === item.auctionId) {
          return item;
        }
        return val;
      }),
    })),
}));

import {render} from '@testing-library/react-native';
import {useSSE} from '../src/Hooks/useSSE';

describe('useSSE hooks 테스트', () => {
  it('useSSE hooks를 컴포넌트 안에서 렌더링합니다.', () => {
    const TestRenderer = () => {
      const [artwork, setArtWork] = useSSE(e => {});
      return <div>hi</div>;
    };
    render(<TestRenderer />);
  });
  // it('useSSE hooks로 sse.auction_viewed를 확인할 수 있습니다.')
});

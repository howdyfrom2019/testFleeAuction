import {render, screen} from '@testing-library/react-native';
import ArtworkDash from '../../src/Components/ArtworkDash';

describe('ArtworkDash 컴포넌트 테스트', () => {
  it('ArtworkDash 렌더링', () => {
    render(<ArtworkDash auctionType={{auctionId: 0, viewCount: -1}} />);
  });

  it(`viewCount 속성이 '-1'이면 '정보 없음'이라고 띄웁니다.`, () => {
    render(<ArtworkDash auctionType={{auctionId: 0, viewCount: -1}} />);
    expect(screen.getAllByText('정보 없음')).toBeTruthy();
  });

  it(`viewCount 속성이 유효한 값이면 조회수로 띄웁니다.`, () => {
    render(<ArtworkDash auctionType={{auctionId: 0, viewCount: 1459}} />);
    expect(screen.getAllByText('1459')).toBeTruthy();
  });
});

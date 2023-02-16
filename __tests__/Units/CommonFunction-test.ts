import {shuffle} from '../../src/Utils/CommonFunction';

describe('shuffle 테스트', () => {
  it('shuffle된 배열과 원래 배열의 순서는 다를 수 있습니다.', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const shuffled = shuffle(arr);
    expect(arr.join('') === shuffled.join('')).toBeFalsy();
  });
});

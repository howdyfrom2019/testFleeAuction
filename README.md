# 플리옥션 프론트엔드 과제 테스트

<br />

## GET STARTED

<br />

> 로컬 테스트를 android 환경에서만 진행했습니다.
> (iOS에서는 작동하지 못할 수도 있습니다.)
```bash
[dev]
yarn start -- --reset-cache #캐시 없이 코드 실행.
yarn android #안드로이드 시뮬레이터로 실행.
yarn ios #iOS 시뮬레이터(XCode)로 실행.
yarn test # 테스트 코드 수행
```

## 개발환경

<br />

* **Language** | TypeScript
* **Framework** | React Native
* **Test Tool** | Jest

<details>
    <summary style="text-decoration: underline"> 추가 설치 라이브러리들</summary>

* **테스트 관련** | @testing-library/jest-native, @testing-library/react-native
* **탭 레이아웃 관련** | react-native-tab-view, react-native-pager-view
* **EventSource** | rn-eventsource-reborn
</details>

## 폴더 구조 설계
<br />

> **[Entry point]** App.tsx

**📂 [__tests__]** 테스트 코드  
**📂 [Components]**  재사용 가능한 컴포넌트 관리  
**📂 [Hooks]** custom hooks 관리   
**📂 [Utils]**  공통 사용한 함수(shuffle) 관리  


## SSE(EventSource) 리스너

<br />

`useSSE.ts`

* hooks로 분리하여 요구사항에 맞는 `작품명(auctionID), 조회수(viewCount)`에 관한 상태와 SetStateAction을 내보냅니다.
* `sse.auction_viewed` 이벤트가 플리옥션 서비스의 작품을 클릭했을 때 호출되기 때문에 최초의 `viewCount = -1`로 초기화됩니다.
  * UI 상으로 viewCount가 -1인 경우에는 `정보 없음`으로 기재됩니다.
* 이벤트 감지는 hooks 생성시 매개변수로 콜백을 넣어서 대응합니다.

<details>
<summary style="font-weight:700;text-decoration:underline;">SSE 관련 이슈사항들</summary>

* **android에서 sse 이벤트를 감지하지 못하는 오류**
  * android/app/src/debug/java//ReactNativeFlipper.java 부분 수정
  * https://github.com/NepeinAV/rn-eventsource-reborn#eventsource-dont-works-on-android-in-debug-mode
</details>

## 테스트 코드
<br />
`ArtworkDash-test.tsx`

1. ArtworkDash 렌더링
2. viewCount 속성이 '-1'이면 '정보 없음'이라고 띄웁니다.
3. viewCount 속성이 유효한 값이면 조회수로 띄웁니다.

`HorizontalScrollView-test.tsx`

1. HorizontalScrollView 컴포넌트 렌더링
2. 가로 스크롤에서 hi는 한 번만 보입니다.

`shuffle-test.tsx`

1. shuffle된 배열과 원래 배열의 순서는 다를 수 있습니다.

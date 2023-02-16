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
</details>

## 폴더 구조 설계
<br />

> **[Entry point]** App.tsx

**📂 [__tests__]** 테스트 코드  
**📂 [Components]**  재사용 가능한 컴포넌트 관리  
**📂 [Hooks]** custom hooks 관리   
**📂 [Utils]**  공통 사용한 함수(shuffle) 관리  

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

# HiimKwak.github.io

#### personal blog powered by Next.js.

## What is this?

Next.js(App router)로 구현 중인 블로그입니다.

~~보일러플레이트는~~

- ~~[learn - Pre-rendering and Data Fetching](https://nextjs.org/learn/basics/data-fetching)~~
- ~~[learn - Dynamic Routes](https://nextjs.org/learn/basics/dynamic-routes)~~
  ~~위 Next.js 공식문서 튜토리얼을 참고하였습니다(튜토리얼 있는 줄 모르고 한참을 헤맸습니다ㅜ).~~

### App router로 migrate 할 때 참고한 문서입니다.

App router migration

- [NEXT.JS Docs: migrating-from-pages-to-app](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#migrating-from-pages-to-app)
- [DISQUIET: Next.js와 ContentLayer로 MDX 블로그 만들기(다소 문법적 오류 있음)](https://disquiet.io/@woongsnote/makerlog/next-js%EC%99%80-content-layer%EB%A1%9C-mdx-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0)

App router Static routing

- [NEXT.JS Docs: generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
- [NEXT.JS Docs: generateMetaData](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)

MDX

- [Contentlayer Docs: useMDXComponent](https://contentlayer.dev/docs/reference/next-contentlayer-e6e7eb3a#usemdxcomponent)
- [Contentlayer example code with Next.js](https://github.com/contentlayerdev/next-contentlayer-example/blob/main/app/posts/%5Bslug%5D/page.tsx)

Stying: TailwindCSS

- [NEXT.JS Docs: TailwindCSS](https://nextjs.org/docs/app/building-your-application/styling/tailwind-css)
- [TailwindCSS Docs: Content Configuration](https://tailwindcss.com/docs/content-configuration)

지속적으로 업데이트 및 배포 예정입니다.

### 왜 App router로 이전하였는가?

- 가장 큰 이유는 Page router의 기능을 모두 이해한 상황 속에서 App router가 stable해졌기 때문입니다.
  - Client/Server 컴포넌트로의 변경과 getStaticProps/getStaticParams 등의 API가 default화되어 더욱 사용이 간편해졌습니다.
  - 더 이상 정적 라우팅을 위한 함수들을 일일이 import하지 않아도 돼 코드가 매우 간결해지고 직관적이게 변했습니다.
  - 또한 폴더 단위의 라우팅도 기존 난잡하던 directory를 직관적으로 바꿔주었습니다.
- 또한 정확한 이유를 파악하지 못했으나 getStaticParams로 블로그 글들을 slug로 뿌려주는 함수에서 불필요한 페이지 데이터 뻥튀기(?)로 large-page-data 워닝이 지속적으로 뜨는 문제도 App router로 이전하면서 사라졌습니다...
- 굉장히 만족스럽습니다!

## Timeline

### 23.7.10

가장 기초적인 코드 베이스 작성을 완료했습니다.

| index.tsx                                                                                                                                | posts/[id].tsx                                                                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| <img width="1381" alt="image" src="https://github.com/HiimKwak/HiimKwak.github.io/assets/87803596/4f800015-fadc-4ed9-8b9a-92096dfe3f61"> | <img width="1381" alt="image" src="https://github.com/HiimKwak/HiimKwak.github.io/assets/87803596/faef8f14-b300-45a1-9a24-06b0ab5ad16a"> |

### 23.9.22

모바일 스크린 기준으로 스타일링 중입니다.

- 블로그 / 메모 카테고리 분리 필요
  - 메모 카테고리 아이폰 메모장 디자인으로 제작 예정
- Next.js Image 컴포넌트 MDX 코드 내에서 정적 렌더링 필요
- nested route 페이지 내 MDX 스타일링 필요
- 블로그 대문 제작 필요
- 댓글 utterance 제작 필요
- 이전 글 / 다음 글 제작 필요

등등..

| page.tsx                                                                                                                                 | posts/[...slugs].tsx                                                                                                                     |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| <img width="1381" alt="image" src="https://github.com/HiimKwak/HiimKwak.github.io/assets/87803596/8f8b7366-1155-4bb4-a7b2-168ca8b760c9"> | <img width="1381" alt="image" src="https://github.com/HiimKwak/HiimKwak.github.io/assets/87803596/802dfe13-b134-4eba-9d08-21e355e6024b"> |

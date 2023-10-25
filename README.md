# HiimKwak.github.io

#### personal blog powered by Next.js.

## What is this?

Next.js(App router)로 구현 중인 블로그입니다.

<details>
  <summary style="font-size: 1.25rem; font-weight: 600;">App router로 migrate 할 때 참고한 문서입니다.</summary>
    <ul>
      <span>App router migration</span>
      <ul>
        <li><a href="https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#migrating-from-pages-to-app">NEXT.JS Docs: migrating-from-pages-to-app</a></li>
        <li><a href="https://disquiet.io/@woongsnote/makerlog/next-js%EC%99%80-content-layer%EB%A1%9C-mdx-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0">DISQUIET: Next.js와 ContentLayer로 MDX 블로그 만들기(다소 문법적 오류 있음)</a></li>    
      </ul>
      <span>App router Static routing</span>
      <ul>
        <li><a href="https://nextjs.org/docs/app/api-reference/functions/generate-static-params">NEXT.JS Docs: generateStaticParams</a></li>
        <li><a href="https://nextjs.org/docs/app/api-reference/functions/generate-metadata">NEXT.JS Docs: generateMetaData</a></li>    
      </ul>
      <span>MDX</span>
      <ul>
        <li><a href="https://contentlayer.dev/docs/reference/next-contentlayer-e6e7eb3a#usemdxcomponent">Contentlayer Docs: useMDXComponent</a></li>
        <li><a href="https://github.com/contentlayerdev/next-contentlayer-example/blob/main/app/posts/%5Bslug%5D/page.tsx">Contentlayer example code with Next.js</a></li>    
      </ul>
      <span>Stying: TailwindCSS</span>
      <ul>
        <li><a href="https://nextjs.org/docs/app/building-your-application/styling/tailwind-css">NEXT.JS Docs: TailwindCSS</a></li>
        <li><a href="https://tailwindcss.com/docs/content-configuration">TailwindCSS Docs: Content Configuration</a></li>    
      </ul>
      <span>Image Optimization</span>
      <ul>
        <li><a href="https://nextjs.org/docs/app/api-reference/components/image#placeholder">NEXT.JS Docs: Image</a></li>
        <li><a href="https://contentlayer.dev/docs/sources/files/images-eeed57ba">Contentlayer Docs: Working with Images</a></li>    
      </ul>
      <span>지속적으로 업데이트 및 배포 예정입니다.</span>
    </ul>
</details>

<details>
  <summary style="font-size: 1.25rem; font-weight: 600;">왜 App router로 이전하였는가?</summary>
    <ul>
      <li>가장 큰 이유는 Page router의 기능을 모두 이해한 상황 속에서 App router가 stable해졌기 때문입니다.</li>
      <li>Client/Server 컴포넌트로의 변경과 getStaticProps/getStaticParams 등의 API가 default화되어 더욱 사용이 간편해졌습니다.</li>    
      <li>더 이상 정적 라우팅을 위한 함수들을 일일이 import하지 않아도 돼 코드가 매우 간결해지고 직관적이게 변했습니다.</li>
      <li>또한 폴더 단위의 라우팅도 기존 난잡하던 directory를 직관적으로 바꿔주었습니다.</li>
      <li>또한 정확한 이유를 파악하지 못했으나 getStaticParams로 블로그 글들을 slug로 뿌려주는 함수에서 불필요한 페이지 데이터 뻥튀기(?)로 large-page-data 워닝이 지속적으로 뜨는 문제도 App router로 이전하면서 사라졌습니다...</li>
      <li>굉장히 만족스럽습니다!</li>
    </ul>
</details>

## Timeline

### 23.10.24 ver 0.7.0

모바일 스크린 기준으로 스타일링 중입니다.

완료 목록

- ~~블로그 / 메모 카테고리 분리 **완료**~~
  - 메모 카테고리 아이폰 메모장 디자인으로 제작 중(웹 사이즈 반응형 필요)
- ~~MDX 내부 이미지 Next.js Image 컴포넌트로 최적화 **완료**~~
- MDX 스타일링 완료(각 포스트 페이지 전체 배경색 하얀색으로 통일시키는 법 연구 필요)
  - body > {main} > content 컨텐츠를 감싸는 Main 컴포넌트(클라이언트 컴포넌트) 생성해 반응형 배경색 적용
- 네비게이션바 상단 고정 및 조건부 불투명화 / 푸터 하단 고정 및 html, body 최소 높이 설정

To Do List

- 이전 글 / 다음 글 제작 필요
- 동영상 포맷 바꿔야함
- 좋아요 기능 및 블로그 이용자 수 기능 제작 필요
  - SEO, Lighthouse 최적화 필요
- 자기소개 페이지 구성 필요
- 정적 배포 필요(Vercel? S3?)

우선순위 낮은 것들

- 블로그 대문 제작 필요
- 댓글 utterance 제작 필요

| page.tsx                                                                                                                    | posts/[...slugs].tsx                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| <img alt="image" src="https://github.com/HiimKwak/HiimKwak.github.io/assets/87803596/8b411746-9282-4979-a15d-92fac40224ff"> | <img alt="image" src="https://github.com/HiimKwak/HiimKwak.github.io/assets/87803596/719ea162-74ec-4892-a0a5-fd35229f5c93"> |

### 23.10.20 ver 0.5.0

모바일 스크린 기준으로 스타일링 중입니다.

완료 목록

- 블로그 / 메모 카테고리 분리 **완료**
  - 메모 카테고리 아이폰 메모장 디자인으로 제작 중(웹 사이즈 반응형 필요)
- MDX 내부 이미지 Next.js Image 컴포넌트로 최적화 **완료**

To Do List

- MDX 스타일링 완료(각 포스트 페이지 전체 배경색 하얀색으로 통일시키는 법 연구 필요)
- 이전 글 / 다음 글 제작 필요
- 좋아요 기능 및 블로그 이용자 수 기능 제작 필요
  - SEO, Lighthouse 최적화 필요
- 자기소개 페이지 구성 필요
- 좀 더 예쁜 MDX 스타일링 레퍼런스 찾아보기..
- 정적 배포 필요(Vercel? S3?)

우선순위 낮은 것들

- 블로그 대문 제작 필요
- 댓글 utterance 제작 필요

| page.tsx                                                                                                                    | posts/[...slugs].tsx                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| <img alt="image" src="https://github.com/HiimKwak/HiimKwak.github.io/assets/87803596/28b5d1c7-7e96-40a9-92be-b7dafda1cd7b"> | <img alt="image" src="https://github.com/HiimKwak/HiimKwak.github.io/assets/87803596/23442152-e749-486c-9516-d7bdf9b729f9"> |

### 23.9.22 ver 0.2.0

모바일 스크린 기준으로 스타일링 중입니다.

- 블로그 / 메모 카테고리 분리 필요
  - 메모 카테고리 아이폰 메모장 디자인으로 제작 예정
- Next.js Image 컴포넌트 MDX 코드 내에서 정적 렌더링 필요
- nested route 페이지 내 MDX 스타일링 필요
- 블로그 대문 제작 필요
- 댓글 utterance 제작 필요
- 이전 글 / 다음 글 제작 필요

등등..

| page.tsx                                                                                                                    | posts/[...slugs].tsx                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| <img alt="image" src="https://github.com/HiimKwak/HiimKwak.github.io/assets/87803596/8f8b7366-1155-4bb4-a7b2-168ca8b760c9"> | <img alt="image" src="https://github.com/HiimKwak/HiimKwak.github.io/assets/87803596/802dfe13-b134-4eba-9d08-21e355e6024b"> |

### 23.7.10 ver 0.0.0

가장 기초적인 코드 베이스 작성을 완료했습니다.

| index.tsx                                                                                                                                | posts/[id].tsx                                                                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| <img width="1381" alt="image" src="https://github.com/HiimKwak/HiimKwak.github.io/assets/87803596/4f800015-fadc-4ed9-8b9a-92096dfe3f61"> | <img width="1381" alt="image" src="https://github.com/HiimKwak/HiimKwak.github.io/assets/87803596/faef8f14-b300-45a1-9a24-06b0ab5ad16a"> |

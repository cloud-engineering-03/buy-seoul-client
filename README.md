# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

```mermaid
flowchart TD
  Start[홈 화면]

  Start --> SearchPage[검색 페이지]
  SearchPage --> InputForm[조건 입력 폼]
  InputForm --> |예산, 출발역, 거리| Submit[검색 버튼 클릭]
  Submit --> ResultPage[추천 결과 페이지]
  ResultPage --> DistrictCardList[지역 추천 카드 리스트]
  DistrictCardList --> |상세 보기 클릭 시| DistrictDetail[지역 상세 페이지 / 모달]
  DistrictDetail --> TrendChart[거래가 시계열 그래프]
  ResultPage --> MapView[지도에서 위치 시각화]

  Start --> AboutPage[서비스 소개 / 설명 페이지]
```
## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

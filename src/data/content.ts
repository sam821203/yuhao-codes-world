import type { L } from "@/lib/prefs";
import insightaero from "@/assets/p-insightaero.jpg";
import hisem from "@/assets/p-hisem.jpg";
import radiation from "@/assets/p-radiation.jpg";

export const links = {
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/",
  resume: "/resume.pdf",
  email: "hello@yuhaohuang.dev",
};

export const skills: { cat: L; items: string[] }[] = [
  { cat: { zh: "核心", en: "Core" }, items: ["Vue 3", "React", "Angular", "TypeScript", "JavaScript (ES6+)"] },
  { cat: { zh: "樣式與 UI", en: "Styling & UI" }, items: ["Tailwind CSS", "SCSS", "Element Plus", "PrimeVue", "RWD", "Figma"] },
  { cat: { zh: "資料視覺化與地圖", en: "Data Viz & Maps" }, items: ["D3.js", "Chart.js", "Canvas", "Google Maps API"] },
  { cat: { zh: "工具鏈", en: "Tooling" }, items: ["Vite", "Webpack", "Gulp", "Pinia", "Vuex", "RxJS", "PWA"] },
  { cat: { zh: "亦熟悉", en: "Also familiar with" }, items: ["Node.js / Nest.js", "FastAPI", "WebSocket", "OpenAI API", "LangChain"] },
];

export const experience: { title: L; desc: L; tags: string[] }[] = [
  { title: { zh: "中華 HiSEM 資安管理系統", en: "Chunghwa HiSEM Security Management" }, desc: { zh: "主導前端架構與共用元件庫，統一多團隊開發規範。", en: "Led front-end architecture and a shared component library across teams." }, tags: ["Vue 3", "TypeScript", "PrimeVue"] },
  { title: { zh: "輻射防護雲化服務系統", en: "Radiation Protection Cloud Service" }, desc: { zh: "即時地圖追蹤與告警推播，處理大量感測器資料。", en: "Real-time map tracking and alerts over high-volume sensor data." }, tags: ["Google Maps", "WebSocket", "Chart.js"] },
  { title: { zh: "資料治理平台", en: "Data Governance Platform" }, desc: { zh: "資料血緣視覺化與權限管理介面。", en: "Data lineage visualization and permission management UI." }, tags: ["D3.js", "Vue 3", "Pinia"] },
  { title: { zh: "華航地勤排班系統", en: "China Airlines Ground Crew Scheduling" }, desc: { zh: "複雜排班甘特圖與拖拉互動，優化大量資料渲染。", en: "Complex Gantt scheduling with drag-and-drop and heavy render optimization." }, tags: ["Angular", "RxJS", "Canvas"] },
  { title: { zh: "中華電信官網", en: "Chunghwa Telecom Website" }, desc: { zh: "響應式官網改版與無障礙優化。", en: "Responsive redesign with accessibility improvements." }, tags: ["SCSS", "RWD", "Gulp"] },
  { title: { zh: "東森購物", en: "ETMall Shopping" }, desc: { zh: "電商活動頁與購物流程前端開發。", en: "E-commerce campaign pages and checkout flow." }, tags: ["Vue", "Webpack", "PWA"] },
];

export type Project = {
  slug: string;
  type: "work" | "side";
  featured?: boolean;
  image: string;
  title: L;
  short: L;
  tags: string[];
  demo?: string;
  repo?: string;
  problem: L;
  role: L;
  challenges: L[];
  solutions: { label: L; text: L }[];
  result: L;
};

export const projects: Project[] = [
  {
    slug: "insightaero", type: "side", featured: true, image: insightaero,
    title: { zh: "InsightAero", en: "InsightAero" },
    short: { zh: "以 Google Maps 與 WebSocket 打造的即時無人機監控介面", en: "Real-time drone monitoring UI with Google Maps and WebSocket" },
    tags: ["Vue 3", "TypeScript", "Google Maps API", "WebSocket", "Chart.js"],
    demo: "https://example.com", repo: "https://github.com/",
    problem: { zh: "操作員需要在單一畫面同時追蹤多架無人機的位置、遙測與告警，既有工具延遲高且資訊分散。", en: "Operators needed to track position, telemetry and alerts for many drones on one screen; existing tools were laggy and fragmented." },
    role: { zh: "獨立負責前端：架構設計、地圖整合、即時資料流與 UI/UX。", en: "Sole front-end owner: architecture, map integration, real-time data flow and UI/UX." },
    challenges: [
      { zh: "每秒數十筆位置更新導致地圖重繪卡頓", en: "Dozens of position updates per second caused map jank" },
      { zh: "斷線重連時資料一致性", en: "Data consistency across reconnects" },
      { zh: "高資訊密度下的可讀性", en: "Readability at high information density" },
    ],
    solutions: [
      { label: { zh: "架構", en: "Architecture" }, text: { zh: "WebSocket 層與 Pinia store 分離，以事件匯流排分派至地圖與圖表模組。", en: "Decoupled WebSocket layer from Pinia stores, dispatching via an event bus to map and chart modules." } },
      { label: { zh: "元件", en: "Components" }, text: { zh: "封裝 Marker、軌跡、地理圍欄為可組合元件。", en: "Composable Marker, trail and geofence components." } },
      { label: { zh: "效能", en: "Performance" }, text: { zh: "以 requestAnimationFrame 批次更新 marker，渲染負載降低約 60%。", en: "Batched marker updates with requestAnimationFrame, cutting render load ~60%." } },
      { label: { zh: "UX", en: "UX" }, text: { zh: "告警分級色彩與聚焦動畫，讓關鍵事件一眼可見。", en: "Severity color system and focus animations surface critical events instantly." } },
    ],
    result: { zh: "在 50+ 架同時飛行下維持 60fps，告警反應時間顯著縮短。", en: "Holds 60fps with 50+ concurrent drones; alert response time dropped significantly." },
  },
  {
    slug: "hisem", type: "work", featured: true, image: hisem,
    title: { zh: "中華 HiSEM 資安管理系統", en: "Chunghwa HiSEM" },
    short: { zh: "前端架構與跨團隊共用元件庫", en: "Front-end architecture and shared component library" },
    tags: ["Vue 3", "TypeScript", "PrimeVue", "Vite", "Pinia"],
    problem: { zh: "多個子系統由不同團隊開發，UI 與程式風格不一致，維護成本高。", en: "Multiple sub-systems built by different teams had inconsistent UI and code, making maintenance costly." },
    role: { zh: "前端技術負責人：制定架構、建立元件庫與開發規範。", en: "Front-end lead: defined architecture, built the component library and conventions." },
    challenges: [
      { zh: "在不中斷開發下逐步導入共用元件", en: "Introduce shared components without halting delivery" },
      { zh: "大量資料表格的效能", en: "Performance of massive data tables" },
      { zh: "權限驅動的動態介面", en: "Permission-driven dynamic UI" },
    ],
    solutions: [
      { label: { zh: "架構", en: "Architecture" }, text: { zh: "Monorepo 管理元件庫與各子系統，型別共享。", en: "Monorepo for component library and sub-systems with shared types." } },
      { label: { zh: "元件", en: "Components" }, text: { zh: "基於 PrimeVue 的設計 token 與 30+ 共用元件，附文件站。", en: "Design tokens on PrimeVue plus 30+ shared components with docs site." } },
      { label: { zh: "效能", en: "Performance" }, text: { zh: "虛擬捲動與路由層級 code-splitting。", en: "Virtual scrolling and route-level code splitting." } },
      { label: { zh: "UX", en: "UX" }, text: { zh: "統一互動模式與鍵盤操作支援。", en: "Unified interaction patterns with keyboard support." } },
    ],
    result: { zh: "新頁面開發時間縮短約 40%，介面一致性大幅提升。", en: "New page delivery ~40% faster with far greater UI consistency." },
  },
  {
    slug: "radiation-cloud", type: "work", featured: true, image: radiation,
    title: { zh: "輻射防護雲化服務系統", en: "Radiation Protection Cloud" },
    short: { zh: "即時地圖追蹤與告警", en: "Real-time map tracking and alerts" },
    tags: ["Vue 3", "Google Maps API", "WebSocket", "Chart.js"],
    problem: { zh: "需即時掌握全區感測器輻射數值，並在異常時立即通知。", en: "Needed live visibility of sensor radiation levels region-wide with instant anomaly alerts." },
    role: { zh: "前端主要開發者：地圖模組、告警系統與圖表。", en: "Primary front-end developer: map module, alerting and charts." },
    challenges: [
      { zh: "數百個感測點同時更新", en: "Hundreds of sensors updating simultaneously" },
      { zh: "告警不可遺漏且不可干擾", en: "Alerts must be unmissable yet not disruptive" },
    ],
    solutions: [
      { label: { zh: "架構", en: "Architecture" }, text: { zh: "WebSocket 訂閱分區資料，只更新可視範圍。", en: "Region-based WebSocket subscriptions, updating only the visible viewport." } },
      { label: { zh: "元件", en: "Components" }, text: { zh: "可重用的感測點、圖例與告警佇列元件。", en: "Reusable sensor marker, legend and alert queue components." } },
      { label: { zh: "效能", en: "Performance" }, text: { zh: "Marker clustering 與節流更新。", en: "Marker clustering and throttled updates." } },
      { label: { zh: "UX", en: "UX" }, text: { zh: "分級告警、聲音提示與一鍵定位。", en: "Tiered alerts, audio cues and one-click locate." } },
    ],
    result: { zh: "系統上線後成為日常監控核心工具。", en: "Became the core daily monitoring tool after launch." },
  },
  {
    slug: "data-governance", type: "work", image: hisem,
    title: { zh: "資料治理平台", en: "Data Governance Platform" },
    short: { zh: "資料血緣視覺化與權限管理", en: "Data lineage visualization and access management" },
    tags: ["Vue 3", "D3.js", "Pinia"],
    problem: { zh: "資料來源複雜，使用者難以理解資料流向。", en: "Complex sources made data flow hard to understand." },
    role: { zh: "前端開發：血緣圖與管理介面。", en: "Front-end dev: lineage graph and admin UI." },
    challenges: [{ zh: "大型節點圖的互動與效能", en: "Interaction and performance of large node graphs" }],
    solutions: [
      { label: { zh: "元件", en: "Components" }, text: { zh: "D3 力導向圖封裝為 Vue 元件。", en: "D3 force graph wrapped as a Vue component." } },
      { label: { zh: "效能", en: "Performance" }, text: { zh: "節點收合與漸進式載入。", en: "Node collapsing and progressive loading." } },
    ],
    result: { zh: "使用者能快速追溯資料來源。", en: "Users trace data origins quickly." },
  },
  {
    slug: "ai-chat-ui", type: "side", image: insightaero,
    title: { zh: "AI 文件問答介面", en: "AI Doc Q&A Interface" },
    short: { zh: "以 OpenAI 與 LangChain 打造的串流對話 UI", en: "Streaming chat UI powered by OpenAI and LangChain" },
    tags: ["React", "TypeScript", "OpenAI API", "LangChain", "FastAPI"],
    repo: "https://github.com/",
    problem: { zh: "想快速查詢內部文件內容。", en: "Wanted fast answers over internal documents." },
    role: { zh: "全端個人專案。", en: "Full-stack side project." },
    challenges: [{ zh: "串流回應的流暢呈現", en: "Smooth rendering of streamed responses" }],
    solutions: [{ label: { zh: "UX", en: "UX" }, text: { zh: "逐字串流與引用來源標示。", en: "Token streaming with source citations." } }],
    result: { zh: "查詢時間大幅縮短。", en: "Lookup time cut dramatically." },
  },
];

// All copy and links for the home page, extracted from the reference page.

const GP = "https://goodpatch.com";

export const NAV_PRIMARY = [
  { label: "Our Design", href: `${GP}/ja/design` },
  { label: "Business", href: `${GP}/ja/service` },
  { label: "Work", href: `${GP}/ja/work` },
  { label: "AI × Design", href: `${GP}/ja/ai` },
];

export const NAV_SECONDARY = [
  { label: "Company", href: `${GP}/ja/company` },
  { label: "IR", href: `${GP}/ja/ir` },
  { label: "Careers", href: "https://careers.goodpatch.com/", external: true },
  { label: "News", href: `${GP}/ja/news` },
];

export const LINKS = {
  contact: `${GP}/ja/contact`,
  downloads: "https://design-partnership.goodpatch.com/downloads",
  careers: "https://careers.goodpatch.com/",
};

export const HERO_NEWS = {
  title: "AIデザインプロダクト「Ensio」β版の提供を開始しました！",
  date: "2026.10.27",
  href: `${GP}/ja/news/20261027_ensio`,
};

export const INTRO = {
  heading: [
    [{ text: "デザインと体験", accent: true }, { text: "を" }],
    [{ text: "起点に" }, { text: "企業の変革", accent: true }, { text: "を" }],
    [{ text: "前進させる" }],
  ],
  body: [
    "グッドパッチは、デザインの力で",
    "事業・プロダクト・ブランド・組織の未来を構想し、",
    "変革をリードするデザインカンパニーです。",
  ],
};

export type BusinessKey = "partner" | "ai";

export const BUSINESS: {
  key: BusinessKey;
  label: string;
  heading: [string, string];
  body: [string, string];
  href: string;
  image: string;
  icon: string;
  chip: string;
}[] = [
  {
    key: "partner",
    label: "Design Partner Service",
    heading: ["Drive with", "Experience"],
    body: ["顧客体験を起点に事業と組織を", "パートナーとして共に成長させる"],
    href: `${GP}/ja/service`,
    image: "/images/business/business-design-partner.jpg",
    icon: "/images/business/icon-handshake.png",
    chip: "UX Design",
  },
  {
    key: "ai",
    label: "AI Agentic UX Design",
    heading: ["AI Driven", "Transformation"],
    body: ["AIで事業と組織を変革し", "人の力を最大化する"],
    href: `${GP}/ja/ai`,
    image: "/images/business/business-ai-agentic-ux.jpg",
    icon: "/images/business/icon-fire.png",
    chip: "AX Design",
  },
];

export const WORK_FILTERS = [
  { label: "All", value: "all" },
  { label: "事業・戦略デザイン", value: "Business / Strategy Design" },
  { label: "UI/UXデザイン", value: "UI/UX Design" },
  { label: "事業・プロダクトグロース", value: "Product Growth" },
  { label: "ブランドエクスペリエンスデザイン", value: "Brand Experience Design" },
  { label: "AIソリューション", value: "AI Solution" },
  { label: "DX戦略支援", value: "DX Support" },
  { label: "組織デザイン", value: "Organization Design" },
  { label: "インサイトリサーチ", value: "Insight Research" },
];

export const WORKS = [
  {
    category: "Brand Experience Design",
    client: "デジタルグリッド株式会社",
    description: "急成長期に伴う実態と発信のギャップを解消 全社で創るブランドの共通言語",
    href: `${GP}/ja/work/digitalgrid`,
    front: "/images/work/digitalgrid-front.jpg",
    back: "/images/work/digitalgrid-back.jpg",
  },
  {
    category: "Brand Experience Design",
    client: "株式会社メディアフォース",
    description: "企業理念策定を起点に、ロゴ・コーポレートサイト・採用サイトを刷新したブランディングプロジェクト",
    href: `${GP}/ja/work/mforce`,
    front: "/images/work/mforce-front.png",
    back: "/images/work/mforce-back.png",
  },
  {
    category: "Business / Strategy Design",
    client: "イオンペット株式会社",
    description: "リリース半年で50万DL、会員登録数を月平均4倍に伸ばした公式アプリの体験デザイン",
    href: `${GP}/ja/work/aeonpet`,
    front: "/images/work/aeonpet-front.png",
    back: "/images/work/aeonpet-back.png",
  },
  {
    category: "AI Solution",
    client: "株式会社オービックビジネスコンサルタント（OBC）",
    description: "複雑な体制のプラットフォーム開発で実現した、デザイン主導の意思決定加速",
    href: `${GP}/ja/work/obc`,
    front: "/images/work/obc-front.png",
    back: "/images/work/obc-back.png",
  },
  {
    category: "DX Support",
    client: "株式会社イトーヨーカ堂",
    description:
      "「レジの前」から「暮らしの中へ」——イトーヨーカドー・ヨーク公式アプリ×Webマガジン、リテールメディアのトータルデザイン",
    href: `${GP}/ja/work/itoyokado`,
    front: "/images/work/itoyokado-front.jpg",
    back: "/images/work/itoyokado-back.png",
  },
  {
    category: "Business / Strategy Design",
    client: "スズキ株式会社",
    description: "ビジョンプロトタイプで未来の基幹システムを描く",
    href: `${GP}/ja/work/suzuki`,
    front: "/images/work/suzuki-front.jpg",
    back: "/images/work/suzuki-back.png",
  },
];

export const INTERVIEWS = [
  {
    date: "2026.09.17",
    title: "コープデリ「ほぺたんアプリ」プロジェクト デザイナーとエンジニアの連携で目指す理想のユーザー体験",
    tags: ["サービスブランディング", "開発", "クライアントインタビュー", "アプリケーションデザイン"],
    href: `${GP}/blog/2026-09-hopetan/`,
    image: "/images/interview/hopetan.webp",
  },
  {
    date: "2026.09.15",
    title:
      "UIデザイナーがいかにして「開発」まで越境したか？ 「カイポケ」開発メンバーに聞く、生成AI時代の画面開発の新常識",
    tags: ["AI", "クライアントインタビュー", "デザインシステム", "デザインハーネス", "生成AI", "開発", "UIデザイン"],
    href: `${GP}/blog/2026-08-sms-eng/`,
    image: "/images/interview/sms.jpg",
  },
  {
    date: "2026.09.08",
    title:
      "採用課題、解決の第一歩はなんと「VMVの見直し」だった──老舗SIer「メディアフォース」のリブランディング、1年以上にわたったプロジェクトの成果とは？",
    tags: ["クライアントインタビュー", "ブランドデザイン"],
    href: `${GP}/blog/2026-09-mediaforce/`,
    image: "/images/interview/mediaforce.jpg",
  },
];

export const INTERVIEWS_ALL = `${GP}/blog/category/casestudy`;

export const PLATFORMS_INTRO = [
  "デザイン支援の立場だけでなく",
  "自らも事業創造者として、",
  "デザインの可能性を広げる",
  "サービスを提供しています。",
];

export const PLATFORMS = [
  {
    name: "ReDesigner",
    description: "デザイナーのキャリアに並走するデザイナーに特化したキャリア支援サービス",
    href: "https://redesigner.jp/",
    icon: "/images/platforms/icon-redesigner.svg",
    image: "/images/platforms/redesigner.jpg",
  },
  {
    name: "ReDesigner for Student",
    description: "デザイナーを目指す学生と企業のマッチングプラットフォーム",
    href: "https://student.redesigner.jp/",
    icon: "/images/platforms/icon-redesigner-student.svg",
    image: "/images/platforms/redesigner-student.jpg",
  },
  {
    name: "Strap",
    description: "リモートコラボレーションの可能性を広げるオンラインホワイトボード",
    href: "https://product.strap.app/",
    icon: "/images/platforms/icon-strap.svg",
    image: "/images/platforms/strap.jpg",
  },
  {
    name: "Layermate",
    description: "生成AIとの対話でUIデザインを自走生成するAIデザインツール",
    href: "https://www.layermate.ai/",
    icon: "/images/platforms/icon-layermate.svg",
    image: "/images/platforms/layermate.png",
  },
  {
    name: "HRmony AI",
    description: "採用業務を効率化するAIエージェント",
    href: "https://hrmony-ai.jp/",
    icon: "/images/platforms/icon-hrmony.svg",
    image: "/images/platforms/hrmony.png",
  },
];

export const NEWS = [
  {
    category: "プレスリリース",
    title: "グッドパッチ、AIで誰でも自社らしいデザインを作成し続けられる新プロダクト「Ensio」を提供開始",
    date: "2026.10.27",
    href: `${GP}/ja/news/20261027_ensio`,
    image: "/images/news/ensio.png",
  },
  {
    category: "トピックス",
    title: "Japan IT Week 秋 2026内 「第8回ソフトウェア受託開発・開発支援」展に出展します",
    date: "2026.10.19",
    href: `${GP}/ja/news/20261019_japanitweek`,
    image: "/images/news/japanitweek.png",
  },
  {
    category: "トピックス",
    title: "グッドパッチ、利益の1％を寄付。熊本地震への義援金を含む、社会を前進させる8団体に寄付",
    date: "2026.10.16",
    href: `${GP}/ja/news/2026-10-donate`,
    image: "/images/news/donate.png",
  },
];

export const SEMINARS = [
  {
    open: true,
    place: "オンライン（Zoom）",
    date: "2026年8月28日(金) 16:00-17:00",
    title: "四半期で測られるマーケティングと、3年で効くブランド ─ 時間軸とKPIの非対称性をつなぐ、思考法と実践",
    tags: ["bx：BX"],
    href: "https://design-partnership.goodpatch.com/events/20260828",
    image: "/images/seminar/bx.png",
  },
  {
    open: false,
    place: "オンライン（Zoom）",
    date: "2026年8月26日(水) 13:00-14:00",
    title: 'フィジカルAIを支えるIoTと体験設計 〜"技術ありき"で始めない、現場×データ×AIの設計論〜',
    tags: ["事業開発", "AI", "UXデザイン"],
    href: "https://design-partnership.goodpatch.com/events/20260826",
    image: "/images/seminar/physical-ai.png",
  },
  {
    open: false,
    place: "オンライン（Zoom）",
    date: "2026年6月4日(木) 12:00~13:00",
    title: "「作る × 届ける」が両輪で動く プロダクト組織のつくり方〜グロース期に必要なPdM × PMMの役割設計〜",
    tags: ["プロダクトマーケティング", "PMM", "プロダクトマネジメント", "PdM", "プロダクトグロース"],
    href: "https://design-partnership.goodpatch.com/events/20260604",
    image: "/images/seminar/pdm.png",
  },
];

export const BLOGS = [
  {
    category: "トレンド",
    date: "2026.10.30",
    title: "新しいものが大好きなGoodpatchで10月話題になったアプリ、サービス、デザインまとめ（2026）",
    tags: ["月間おすすめのアプリ・webサービスまとめ"],
    href: `${GP}/blog/2026-10-monthly-topic`,
    image: "/images/blog/monthly.jpg",
  },
  {
    category: "ナレッジ・ノウハウ",
    date: "2026.10.29",
    title: "AI駆動開発を阻む「3つの障壁」をどう乗り越える？ 成功のために必要な環境づくりとは",
    tags: ["生成AI", "AI", "イベントレポート", "開発"],
    href: `${GP}/blog/2026-10-ai-driven-development-webinar`,
    image: "/images/blog/ai-webinar.jpg",
  },
  {
    category: "用語解説",
    date: "2026.10.26",
    title: "デザインハーネスとは？ AIの出力精度を高め、自社らしいデザインを作る4つの仕組みと始め方を解説",
    tags: ["デザインハーネス", "生成AI", "AI", "デザインシステム", "UIデザイン"],
    href: `${GP}/blog/2026-10-design-harness`,
    image: "/images/blog/design-harness.jpg",
  },
];

export const UPDATE_LINKS = {
  news: `${GP}/ja/news`,
  seminar: "https://design-partnership.goodpatch.com/events",
  blog: `${GP}/blog`,
};

export const FIFTEENTH = {
  title: "15周年特設サイト",
  body: "グッドパッチは2026年9月1日に15周年を迎えました。「Charge, Chaos」をテーマに、私たちがこのAI時代というカオスを楽しく乗り越えていく姿を特設サイトにて表現しています。是非触ってお楽しみください。",
  href: `${GP}/15th`,
};

export const COMPANY = {
  vision: ["ハートを揺さぶるデザインで", "世界を前進させる"],
  mission: "デザインの力を証明する",
  body: [
    "デザインには、世界を前進させる力がある。",
    "私たちはビジネスの本質的価値を最大化するため、",
    "日々デザインに向き合っています。",
  ],
  links: [
    { label: "Company Top", href: `${GP}/ja/company` },
    { label: "Vision, Mission & Values", href: `${GP}/ja/company/vision-mission-values` },
  ],
};

export const CAREERS = {
  heading: ["あなたのやりたいことは", "デザインかもしれない"],
  body: [
    "グッドパッチにはデザイナー以外にも、多種多様なスペシャリストが在籍し活躍しています。",
    "採用サイトでは、ハートを揺さぶるデザインを追い求める組織のカルチャーやリアルな働き方をご紹介します。",
  ],
  href: "https://careers.goodpatch.com/",
};

export const CONTACT = {
  body: [
    "サービス・プロダクトのUI/UXデザイン、",
    "ブランド構築、AI導入、新規事業開発、",
    "経営・事業戦略まで、お気軽にご相談ください。",
  ],
};

export const FOOTER_COLUMNS = [
  {
    heading: { label: "Our Design", href: `${GP}/ja/design` },
    links: [
      { label: "Why Design", href: `${GP}/ja/design` },
      { label: "Our Promise", href: `${GP}/ja/promise` },
      { label: "Our Strength", href: `${GP}/ja/strength` },
      { label: "AI × Design", href: `${GP}/ja/ai` },
    ],
  },
  {
    heading: { label: "Business", href: `${GP}/ja/service` },
    links: [
      { label: "Design Partnerships", href: `${GP}/ja/service` },
      { label: "Service Site", href: "https://design-partnership.goodpatch.com/", external: true },
      { label: "Design Platforms", href: `${GP}/ja/platform` },
    ],
    extra: { label: "Work", href: `${GP}/ja/work` },
  },
  {
    heading: { label: "Company", href: `${GP}/ja/company` },
    links: [
      { label: "IR", href: `${GP}/ja/ir`, strong: true },
      { label: "Careers", href: "https://careers.goodpatch.com/", external: true, strong: true },
      { label: "15周年特設サイト", href: `${GP}/15th`, external: true, strong: true },
      { label: "ぱっちーと遊ぶ", href: `${GP}/patchy`, external: true, strong: true },
    ],
  },
];

export const FOOTER_OTHERS = [
  { label: "News", href: `${GP}/ja/news` },
  { label: "Blogs", href: `${GP}/blog`, external: true },
  { label: "Seminar", href: "https://design-partnership.goodpatch.com/events", external: true },
  { label: "Press kit", href: `${GP}/ja/press-kit` },
];

export const FOOTER_LEGAL = [
  { label: "Privacy Policy", href: `${GP}/ja/privacy-policy` },
  { label: "Security Policy", href: `${GP}/ja/security-policy` },
  { label: "Web Accessibility", href: `${GP}/ja/web-accessibility` },
];

export const SOCIALS = [
  { label: "X", href: "https://x.com/goodpatchtokyo" },
  { label: "note", href: "https://note.com/goodpatch" },
  { label: "YouTube", href: "https://www.youtube.com/@goodpatch_yohaku" },
  { label: "Instagram", href: "https://www.instagram.com/goodpatch_tokyo" },
] as const;

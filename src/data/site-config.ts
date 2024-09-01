export type Image = {
  src: string;
  alt?: string;
  caption?: string;
};

export type Link = {
  text: string;
  href: string;
};

export type Hero = {
  title?: string;
  text?: string;
  image?: Image;
  actions?: Link[];
};

export type Subscribe = {
  title?: string;
  text?: string;
  formUrl: string;
};

export type SiteConfig = {
  logo?: Image;
  title: string;
  subtitle?: string;
  description: string;
  image?: Image;
  headerNavLinks?: Link[];
  footerNavLinks?: Link[];
  socialLinks?: Link[];
  hero?: Hero;
  subscribe?: Subscribe;
  postsPerPage?: number;
  projectsPerPage?: number;
};

const siteConfig: SiteConfig = {
  title: "Peacock's Website",
  description: `I'm Yoichi Takai, a.k.a. "Peacock"`,
  headerNavLinks: [
    {
      text: "Home",
      href: "/",
    },
    {
      text: "Blog",
      href: "/blog",
    },
  ],
  footerNavLinks: [
    {
      text: "活動実績 / Archivements (Japanese)",
      href: "/achievements",
    },
    {
      text: "職務経歴書 / Resume (Japanese)",
      href: "/resume",
    },
  ],
  socialLinks: [
    {
      text: "Twitter",
      href: "https://twitter.com/peacock0803sz",
    },
    {
      text: "Instagram",
      href: "https://instagram.com/peacock0803sz",
    },
    {
      text: "Facebook",
      href: "https://www.facebook.com/peacock0803sz",
    },
    {
      text: "GitHub",
      href: "https://github.com/peacock0803sz",
    },
  ],
  hero: {
    title: `I'm Yoichi Takai, a.k.a. "Peacock"`,
    text:
      ` <a href="https://www.topgate.co.jp">株式会社トップゲート</a>にてGoogle Cloudを使用したDevOpsやIaC(Infrastructure as Code)の普及に貢献すべく、開発エンジニアとして勤務。 その傍ら、2020年よりPythonの国際カンファレンスである<a href="https://pycon.jp">PyCon JP</a >のスタッフとして運営に携わる。<br />2022, 2023(PyCon APAC 2023として開催)年は副座長も務めた。<br />また、<a href="https://tv.pycon.jp">PyCon JP TV</a >のディレクターとして一般社団法人PyCon JP Associationに運営メンバーとして参加もしている。 好きなことはクラシック音楽(B. Bartokがお気に入りの作曲家)で、他にもスキー・ミラーレスカメラ・ビールやウイスキーなど。
`,
    image: {
      src: "/PyConTW2023.jpg",
      alt: "Speaking at the PyCon TW 2023",
    },
  },
  postsPerPage: 2,
};

export default siteConfig;

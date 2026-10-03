import { SiteName } from "../constants";

const color = {
  cover: "#FFFFFF",
  band: "#123D22",
  edge: "#00A497",
  onBand: "#F2F6F3",
  onBand2: "#9DB8A6",
  ink2: "#4A6B52",
};

/** Largest title size whose wrapped lines still fit above the band. */
function titleSize(title: string) {
  // Rough advance width in em: full-width glyphs ~1, Latin ~0.55.
  const ems = [...title].reduce(
    (sum, ch) => sum + (/[\u0000-ɏ]/.test(ch) ? 0.55 : 1),
    0,
  );
  const width = 1040;
  const height = 250;
  for (const size of [64, 54, 48]) {
    const lines = Math.ceil((ems * size * 1.05) / width);
    if (lines * size * 1.35 <= height) return size;
  }
  return 42;
}

export function PostCard(props: {
  title: string;
  emoji: string;
  date: string;
  seal: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: color.cover,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexGrow: 1,
          padding: "44px 60px 36px 64px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              fontFamily: "Noto Emoji",
              fontSize: 84,
              lineHeight: 1,
              color: color.band,
            }}
          >
            {props.emoji}
          </div>
          <img src={props.seal} width={260} height={110} />
        </div>
        <div
          style={{
            display: "flex",
            width: 1040,
            fontFamily: "Shippori Mincho",
            fontWeight: 600,
            fontSize: titleSize(props.title),
            lineHeight: 1.35,
            color: color.band,
          }}
        >
          {props.title}
        </div>
      </div>
      <div
        style={{ display: "flex", height: 6, backgroundColor: color.edge }}
      />
      <div
        style={{
          display: "flex",
          height: 190,
          padding: "0 60px 0 64px",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: color.band,
          color: color.onBand,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontFamily: "Newsreader",
            fontStyle: "italic",
            fontSize: 56,
          }}
        >
          <span style={{ fontWeight: 500 }}>Blog</span>
          <span
            style={{ width: 48, height: 2, backgroundColor: color.onBand2 }}
          />
          <span style={{ fontWeight: 400 }}>{props.date}</span>
        </div>
        <div
          style={{
            fontFamily: "IBM Plex Mono",
            fontWeight: 500,
            fontSize: 44,
            letterSpacing: 0.5,
          }}
        >
          {SiteName}
        </div>
      </div>
    </div>
  );
}

export function SiteCard(props: { logo: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: color.cover,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 18,
          flexGrow: 1,
          padding: "40px 80px 24px",
        }}
      >
        <img src={props.logo} width={820} height={346} />
        <div
          style={{
            fontFamily: "Cormorant Garamond",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: 32,
            color: color.band,
          }}
        >
          Building cloud infrastructure, gathering techies, playing the
          clarinet.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "0 64px 36px",
          fontFamily: "IBM Plex Mono",
          fontSize: 22,
          letterSpacing: 1,
          color: color.ink2,
        }}
      >
        {SiteName}
      </div>
    </div>
  );
}

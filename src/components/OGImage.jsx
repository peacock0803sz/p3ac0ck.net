// from: https://skyfall.dev/posts/astro-og-with-satori
import { format } from "date-fns";

import { SiteName } from "../constants";

export default function(props) {
  return (
    <div tw="flex flex-col font-[IBMPlexSansJP] w-full h-full px-12 py-12 items-left text-left justify-left text-gray-950 bg-gray-50">
      <div tw="flex font-bold text-7xl mb-3">{props.data.title}</div>
      <div tw="flex font-regular text-4xl my-6">{props.data.description}</div>
      {props.data.pubDate ? (
        <div tw="flex font-regular text-5xl mt-12">
          {"Published: " + format(props.data.pubDate, "yyyy-MM-dd")}
        </div>
      ) : (
        <div />
      )}
      <div tw="flex absolute bottom-12 left-18 right-18 font-meduim text-5xl">
        {SiteName}
      </div>
    </div>
  );
}

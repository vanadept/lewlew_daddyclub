import { NextRequest, NextResponse } from "next/server";

export const revalidate = 3600;

const FACEBOOK_HOSTS = new Set([
  "facebook.com",
  "www.facebook.com",
  "m.facebook.com",
  "web.facebook.com",
]);

export async function GET(request: NextRequest) {
  const postUrl = request.nextUrl.searchParams.get("https://scontent.fbkk29-4.fna.fbcdn.net/v/t39.99422-6/841488883_1778718603383480_5859216446102866194_n.png?stp=dst-jpg_tt6&cstp=mx1500x1500&ctp=s1500x1500&_nc_cat=103&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeE87l1EPwx9OoNSjYMzHyG54VTNwdN9gJzhVM3B032AnPe-Fqz_fJYDkl6EM-1HMpyvrpcyBpwSa4T14a4_FfVq&_nc_ohc=g1dO7laNskcQ7kNvwH16peo&_nc_oc=AdoUHDibg-O-N4tSanCh3ikoXklLepVjyvl6DSM1sK3aWk5mk2lzANLAa-UrP-25r6gzyCyE_K6i4QFIK-e3Q5RU&_nc_zt=14&_nc_ht=scontent.fbkk29-4.fna&_nc_gid=y7-oDorifbchSFideohE2Q&_nc_ss=7b2a8&oh=00_AQOp9td_N7EsMrJ9ZgOf7coCpm8RFvi8pQX6hL916L_R0Q&oe=6AD40D51");

  if (!postUrl) {
    return NextResponse.json(
      { error: "Missing Facebook post URL" },
      { status: 400 },
    );
  }

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(postUrl);
  } catch {
    return NextResponse.json(
      { error: "Invalid URL" },
      { status: 400 },
    );
  }

  if (
    parsedUrl.protocol !== "https:" ||
    !FACEBOOK_HOSTS.has(parsedUrl.hostname)
  ) {
    return NextResponse.json(
      { error: "Only HTTPS Facebook URLs are supported" },
      { status: 400 },
    );
  }

  try {
    const endpoint = new URL(
      "https://graph.facebook.com/v26.0/oembed_post",
    );

    endpoint.searchParams.set("url", parsedUrl.toString());
    endpoint.searchParams.set("maxwidth", "500");
    endpoint.searchParams.set("omitscript", "true");

    const response = await fetch(endpoint, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            "Facebook could not provide embed data for this post.",
        },
        { status: 502 },
      );
    }

    const data: unknown = await response.json();

    if (
      typeof data !== "object" ||
      data === null ||
      !("html" in data) ||
      typeof data.html !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid Facebook oEmbed response" },
        { status: 502 },
      );
    }

    return NextResponse.json({
      provider: "Facebook",
      html: data.html,
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to reach Facebook right now" },
      { status: 502 },
    );
  }
}
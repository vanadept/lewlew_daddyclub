import Link from "next/link";
import styles from "./feed.module.css";

const socialPlatforms = [
  {
    id: "instagram",
    name: "Instagram",
    shortName: "IG",
    description: "Photos, stories & everyday moments.",
    profileUrl: "https://www.instagram.com/lewlew.cgm48official/",
    postUrl:
      "https://www.instagram.com/p/DeMM8hhn63O/?utm_source=ig_web_copy_link&psln=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==",
    imageUrl: "",
  },
  {
    id: "tiktok",
    name: "TikTok",
    shortName: "TikTok",
    description: "Short videos, fun & behind the scenes.",
    profileUrl: "https://www.tiktok.com/@lewlew.cgm485thgen",
    postUrl:
      "https://www.tiktok.com/@lewlew.cgm485thgen/video/7695259128133881108",
    imageUrl: "",
  },
  {
    id: "facebook",
    name: "Facebook",
    shortName: "Facebook",
    description: "News, announcements & activities.",
    profileUrl: "https://www.facebook.com/lewlew.cgm48official/",
    postUrl: "https://www.facebook.com/share/p/1JWVsthWZo/",
    imageUrl: "",
  },
  {
    id: "iam48",
    name: "iAM48",
    shortName: "iAM48",
    description: "Official artist updates & activities.",
    profileUrl: "https://app.bnk48.com/members/cgm48/lewlew",
    postUrl: "https://app.bnk48.com/member-playback/839944",
    imageUrl: "",
  },
];

const youtubeCategories = [
  {
    id: "mv",
    eyebrow: "MUSIC",
    title: "Music Videos",
    description: "Music videos and performances.",
    videos: [
      {
        id: "mv-latest",
        title: "Kimi to Doko ka e Ikitai – อยากจะไปกับเธอ / BNK48 & CGM48",
        url: "https://www.youtube.com/watch?v=qdBtGpZl_jE&list=RDqdBtGpZl_jE&start_radio=1",
        isLatest: true,
      },
      {
        id: "mv-02",
        title: "Kibou Ressha – รถไฟแห่งความหวัง / CGM48",
        url: "https://www.youtube.com/watch?v=-HNfFArKiPQ&list=RD-HNfFArKiPQ&start_radio=1",
        isLatest: false,
      },
    ],
  },
  {
    id: "live-variety",
    eyebrow: "ON SCREEN",
    title: "Live & Variety",
    description: "Live streams, variety and other videos.",
    videos: [
      {
        id: "live-latest",
        title: "【Behind the Scenes】Kibou Ressha - รถไฟแห่งความหวัง",
        url: "https://www.youtube.com/watch?v=oJBWvsulBYs",
        isLatest: true,
      },
      {
        id: "live-02",
        title: "#CGM48PopUpLive 🔴 หมวดนี้ 4 พยางค์ 🧠🔥",
        url: "https://www.youtube.com/watch?v=YXOHnbMNLwM&t=2187s",
        isLatest: false,
      },
    ],
  },
];

export default function Feed() {
  return (
    <section className={styles.section} id="feed" aria-labelledby="feed-title">
      <div className={styles.container}>
        {/* Main section heading */}
        <header className={styles.header}>
          <div className={styles.headingGroup}>
            {/* Eyebrow: add wording when the brand direction is finalized. */}

            <h2 className={styles.title} id="feed-title">
              Feed
            </h2>

            <p className={styles.description}>
              รวมข่าวสาร กิจกรรม และเรื่องราวของแด๊ดดี้
              ไว้ในที่เดียวสำหรับเหล่าตัวเหล็ก ♡
            </p>
          </div>
        </header>

        {/* Social media profiles */}
        <section className={styles.subsection} aria-labelledby="social-title">
          <header className={styles.subsectionHeader}>
            <div className={styles.subsectionHeading}>
              <span className={styles.subsectionEyebrow}>SOCIAL PLATFORMS</span>

              <h3 className={styles.subsectionTitle} id="social-title">
                Social Media
              </h3>
            </div>

            {/* <span className={styles.sectionIndex} aria-hidden="true">
              01 / 02
            </span> */}
          </header>

          <div className={styles.socialGrid}>
            {socialPlatforms.map((platform) => (
              <article className={styles.socialCard} key={platform.id}>
                {/* Reserved for a platform image or visual identity. */}
                <div className={styles.socialImage}>
                  <div className={styles.skeletonImage} aria-hidden="true" />

                  <span className={styles.skeletonPlatform}>
                    <span className={styles.visuallyHidden}>
                      {platform.name}
                    </span>
                  </span>
                </div>

                <div className={styles.socialBody}>
                  <p className={styles.platformName}>{platform.name}</p>

                  <p className={styles.platformDescription}>
                    {platform.description}
                  </p>

                  <div className={styles.socialActions}>
                    <a
                      className={styles.readPost}
                      href={platform.postUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Post <span aria-hidden="true">↗</span>
                    </a>

                    <a
                      className={styles.profileLink}
                      href={platform.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Profile <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* YouTube subsection */}
        <section
          className={styles.subsection}
          aria-labelledby="youtube-heading"
        >
          <header className={styles.subsectionHeader}>
            <div className={styles.subsectionHeading}>
              <span className={styles.subsectionEyebrow}>WATCH & LISTEN</span>

              <h3 className={styles.subsectionTitle} id="youtube-heading">
                MUSIC & VARIETY
              </h3>
            </div>
          </header>

          {youtubeCategories.map((category) => (
            <div className={styles.videoGroup} key={category.id}>
              <header className={styles.videoGroupHeader}>
                <div>
                  <h4 className={styles.videoGroupTitle}>{category.title}</h4>

                  <p className={styles.platformDescription}>
                    {category.description}
                  </p>
                </div>

                <span className={styles.videoGroupLabel}>
                  {category.id === "mv" ? "MV" : "LIVE / VARIETY"}
                </span>
              </header>

              <div className={styles.videoGrid}>
                {category.videos.map((video) => {
                  const videoId = new URL(video.url).searchParams.get("v");

                  return (
                    <article className={styles.videoCard} key={video.id}>
                      <a
                        className={styles.videoLink}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Watch ${video.title} on YouTube`}
                      >
                        <div className={styles.videoThumbnail}>
                          {videoId && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              className={styles.videoThumbnailImage}
                              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                              alt=""
                              loading="lazy"
                            />
                          )}

                          <div className={styles.videoPlay} aria-hidden="true">
                            <span />
                          </div>

                          {video.isLatest && (
                            <span className={styles.latestBadge}>LATEST RELEASE</span>
                          )}
                        </div>
                      </a>

                      <div className={styles.videoBody}>
                        <h5 className={styles.videoTitle}>{video.title}</h5>

                        {/* <a
                          className={styles.readPost}
                          href={video.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Watch on YouTube <span aria-hidden="true">↗</span>
                        </a> */}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {/* Main CTA — bottom of Feed section */}
        <div className={styles.sectionFooter}>
          <Link href="/feed" className={styles.viewAll}>
            Explore All Updates
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

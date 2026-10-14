import { scheduleEvents } from "./schedule.data";
import styles from "./schedule.module.css";
import Link from "next/link";

const CARD_COUNT = 3;

export default function Schedule() {
  const events = [...scheduleEvents]
    .sort((a, b) => a.order - b.order)
    .slice(0, CARD_COUNT);

  // มี Card อย่างน้อย 3 ใบ แม้ยังไม่มีข้อมูล
  const cards = Array.from({ length: CARD_COUNT }, (_, index) => ({
    event: events[index] ?? null,
    key: events[index]?.id ?? `schedule-skeleton-${index}`,
  }));

  return (
    <section
      className={styles.section}
      id="schedule"
      aria-labelledby="schedule-title"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>WHATS COMING UP</span>

            <h2 className={styles.title} id="schedule-title">
              Upcoming Events
            </h2>

            <p className={styles.description}>
              ติดตามตารางงาน กิจกรรม และอีเวนต์ที่กำลังจะมาถึงของแด๊ดดี้
            </p>
          </div>
        </header>

        <div className={styles.grid}>
          {cards.map(({ event, key }, index) => (
            <article className={styles.card} key={key}>
              {event ? (
                <>
                  {event.sourceUrl ? (
                    <a
                      className={styles.eventLink}
                      href={event.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`ดูประกาศกิจกรรม ${event.title}`}
                    >
                      <EventImage event={event} index={index} />
                    </a>
                  ) : (
                    <EventImage event={event} index={index} />
                  )}

                  <div className={styles.cardBody}>
                    {event.date && (
                      <p className={styles.eventDate}>
                        {event.date}
                        {event.startTime && ` · ${event.startTime}`}
                        {event.endTime && `–${event.endTime}`}
                      </p>
                    )}

                    <h3 className={styles.eventTitle}>{event.title}</h3>

                    {event.venue && (
                      <p className={styles.eventVenue}>{event.venue}</p>
                    )}

                    {event.description && (
                      <p className={styles.eventDescription}>
                        {event.description}
                      </p>
                    )}

                    {event.sourceUrl && (
                      <a
                        className={styles.readPost}
                        href={event.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View original announcement
                        <span aria-hidden="true"> ↗</span>
                      </a>
                    )}
                  </div>
                </>
              ) : (
                <SkeletonCard index={index} />
              )}
            </article>
          ))}
        </div>

        {/* Schedule CTA */}
        <div className={styles.sectionFooter}>
          <Link href="/schedule" className={styles.viewAll}>
            Explore Schedule
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function SkeletonCard({ index }: { index: number }) {
  return (
    <>
      <div className={styles.imageSkeleton} aria-hidden="true">
        <span className={styles.imageMark}>EVENT 0{index + 1}</span>
      </div>

      <div className={styles.cardBody} aria-hidden="true">
        <div className={styles.metaSkeleton} />
        <div className={styles.titleSkeleton} />
        <div className={styles.textSkeleton} />
        <div className={styles.textSkeletonShort} />
      </div>
    </>
  );
}

function EventImage({
  event,
  index,
}: {
  event: (typeof import("./schedule.data"))["scheduleEvents"][number];
  index: number;
}) {
  return (
    <div className={styles.eventImage}>
      {event.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={styles.eventImageElement}
          src={event.imageUrl}
          alt={event.imageAlt ?? ""}
          loading="lazy"
        />
      ) : (
        <div className={styles.imageSkeleton}>
          <span className={styles.imageMark}>EVENT 0{index + 1}</span>
        </div>
      )}

      <span className={styles.sourceLabel}>
        {event.status === "postponed"
          ? "POSTPONED"
          : event.status === "cancelled"
            ? "CANCELLED"
            : "EVENT"}
      </span>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./schedule-view.module.css";

type EventStatus = "upcoming" | "postponed" | "cancelled";

type ScheduleEvent = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD

  imageUrl: string;
  imageAlt: string;
  sourceUrl: string;

  startTime?: string;
  endTime?: string;
  venue?: string;
  description?: string;

  status: EventStatus;
  order: number;
};

// วันที่อ้างอิง: วันเสาร์ที่ 17 ตุลาคม 2026
// โปรดตรวจสอบวันที่จากประกาศต้นฉบับก่อนเผยแพร่
const scheduleEvents: ScheduleEvent[] = [
  {
    id: "lewlew-facebook-001",
    title: "Roadshow",
    date: "2026-10-17",
    imageUrl: "ใส่ imageUrl ของ Roadshow เดิม",
    imageAlt: "ภาพประกาศกิจกรรม Roadshow",
    sourceUrl: "https://www.facebook.com/share/p/1EqwUtJZXQ",
    status: "upcoming",
    order: 1,
  },
  {
    id: "lewlew-facebook-002",
    title: "งานแสดงของกงสุลญี่ปุ่น",
    date: "2026-10-17",
    imageUrl: "ใส่ imageUrl ของงานกงสุลญี่ปุ่นเดิม",
    imageAlt: "ภาพประกาศงานแสดงของกงสุลญี่ปุ่น",
    sourceUrl: "https://www.facebook.com/share/p/1WGbAorg6N",
    status: "upcoming",
    order: 2,
  },
  {
    id: "lewlew-facebook-003",
    title: "Handshake Event",
    date: "2026-10-17",
    imageUrl: "ใส่ imageUrl ของ Handshake Event เดิม",
    imageAlt: "ภาพประกาศกิจกรรม Handshake Event",
    sourceUrl: "https://www.facebook.com/share/p/19j7PD5Bgc",
    status: "upcoming",
    order: 3,
  },
];

const events = scheduleEvents;

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const monthFormatter = new Intl.DateTimeFormat("en", {
  month: "long",
  year: "numeric",
});

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatTime(event: ScheduleEvent) {
  if (event.startTime && event.endTime) {
    return `${event.startTime} – ${event.endTime}`;
  }

  return event.startTime || event.endTime || null;
}

export default function ScheduleView() {
  // ใช้ Lazy Initial State คำนวณวันที่ปัจจุบันเฉพาะฝั่ง Client ตอนรันบนเบราว์เซอร์
  // หลีกเลี่ยง useEffect และหลีกเลี่ยง Static Prerender Error โดยให้ค่าเริ่มต้นอิงตามเวลาปัจจุบัน
  const [visibleMonth, setVisibleMonth] = useState(() => new Date(2026, 9, 1));

  const [todayKey, setTodayKey] = useState("");

  useEffect(() => {
    setTodayKey(toDateKey(new Date()));
  }, []);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const calendarDays = useMemo(() => {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();

    const firstWeekday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPreviousMonth = new Date(year, month, 0).getDate();

    const totalCells = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;

    return Array.from({ length: totalCells }, (_, index) => {
      const dayNumber = index - firstWeekday + 1;

      if (dayNumber < 1) {
        const date = new Date(year, month - 1, daysInPreviousMonth + dayNumber);

        return {
          date,
          key: toDateKey(date),
          day: date.getDate(),
          outsideMonth: true,
        };
      }

      if (dayNumber > daysInMonth) {
        const date = new Date(year, month + 1, dayNumber - daysInMonth);

        return {
          date,
          key: toDateKey(date),
          day: date.getDate(),
          outsideMonth: true,
        };
      }

      const date = new Date(year, month, dayNumber);

      return {
        date,
        key: toDateKey(date),
        day: dayNumber,
        outsideMonth: false,
      };
    });
  }, [visibleMonth]);

  const eventDates = useMemo(
    () => new Set(events.map((event) => event.date)),
    [],
  );

  const visibleEvents = useMemo(() => {
    return events
      .filter((event) => {
        const matchesDate = selectedDate
          ? event.date === selectedDate
          : event.date.startsWith(
              `${visibleMonth.getFullYear()}-${String(
                visibleMonth.getMonth() + 1,
              ).padStart(2, "0")}`,
            );

        return matchesDate;
      })
      .sort((a, b) => a.date.localeCompare(b.date) || a.order - b.order);
  }, [selectedDate, visibleMonth]);

  function changeMonth(offset: number) {
    setVisibleMonth(
      (current) =>
        new Date(current.getFullYear(), current.getMonth() + offset, 1),
    );
    setSelectedDate(null);
  }

  function goToToday() {
    const now = new Date();
    const dateKey = toDateKey(now);

    setTodayKey(dateKey);
    setVisibleMonth(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelectedDate(dateKey);
  }

  return (
    <section className={styles.section} aria-labelledby="schedule-view-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>
            A LITTLE CALENDAR OF HER JOURNEY
          </span>

          <h1 className={styles.title} id="schedule-view-title">
            Upcoming Events
          </h1>

          <p className={styles.description}>
            ติดตามกิจกรรมและตารางงานของแด๊ดดี้ได้ที่นี่
          </p>
        </header>

        {/* 01. Calendar */}
        <section className={styles.calendarSection} aria-label="Event calendar">
          <div className={styles.calendarHeader}>
            <div>
              <span className={styles.sectionEyebrow}>MARK YOUR CALENDAR</span>

              <h2 className={styles.monthTitle}>
                {monthFormatter.format(visibleMonth)}
              </h2>
            </div>

            <div className={styles.calendarControls}>
              <button
                type="button"
                className={styles.todayButton}
                onClick={goToToday}
              >
                Today
              </button>

              <button
                type="button"
                className={styles.monthButton}
                onClick={() => changeMonth(-1)}
                aria-label="Previous month"
              >
                ←
              </button>

              <button
                type="button"
                className={styles.monthButton}
                onClick={() => changeMonth(1)}
                aria-label="Next month"
              >
                →
              </button>
            </div>
          </div>

          <div className={styles.calendarGrid}>
            {weekdays.map((weekday) => (
              <div className={styles.weekday} key={weekday}>
                {weekday}
              </div>
            ))}

            {calendarDays.map((day) => {
              const hasEvent = eventDates.has(day.key);
              const isToday = day.key === todayKey;
              const isSelected = day.key === selectedDate;

              return (
                <button
                  type="button"
                  key={day.key}
                  className={[
                    styles.dayButton,
                    day.outsideMonth ? styles.outsideMonth : "",
                    isToday ? styles.today : "",
                    isSelected ? styles.selectedDay : "",
                    hasEvent ? styles.hasEvent : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => setSelectedDate(day.key)}
                  aria-pressed={isSelected}
                  aria-label={`${dateFormatter.format(day.date)}${
                    hasEvent ? ", has events" : ""
                  }`}
                >
                  <span>{day.day}</span>
                  {hasEvent && (
                    <span className={styles.eventDot} aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>

          <div className={styles.calendarFooter}>
            <span className={styles.legend}>
              <span className={styles.legendDot} aria-hidden="true" /> Event
              scheduled
            </span>

            <button
              type="button"
              className={styles.clearDate}
              onClick={() => setSelectedDate(null)}
            >
              {selectedDate ? "View month" : "Select a date"}
            </button>
          </div>
        </section>

        {/* 02. Schedule list */}
        <section
          className={styles.scheduleSection}
          aria-labelledby="schedule-list-title"
        >
          <div className={styles.listHeader}>
            <div>
              <span className={styles.sectionEyebrow}>THE DETAILS</span>

              <h2 className={styles.listTitle} id="schedule-list-title">
                {selectedDate
                  ? dateFormatter.format(new Date(`${selectedDate}T12:00:00`))
                  : "Schedule"}
              </h2>

              <p className={styles.listDescription}>
                {selectedDate
                  ? "กิจกรรมในวันที่เลือก"
                  : "Upcoming appearances, events & activities"}
              </p>
            </div>

            {selectedDate && (
              <button
                type="button"
                className={styles.clearDate}
                onClick={() => setSelectedDate(null)}
              >
                Clear date
              </button>
            )}
          </div>

          {visibleEvents.length > 0 ? (
            <div className={styles.eventList}>
              {visibleEvents.map((event) => (
                <article className={styles.eventCard} key={event.id}>
                  <div className={styles.eventDate}>
                    <span>
                      {new Date(`${event.date}T12:00:00`).toLocaleDateString(
                        "en",
                        { month: "short" },
                      )}
                    </span>

                    <strong>
                      {new Date(`${event.date}T12:00:00`).getDate()}
                    </strong>
                  </div>

                  <div className={styles.eventContent}>
                    <span
                      className={`${styles.status} ${styles[event.status]}`}
                    >
                      {event.status === "upcoming"
                        ? "Upcoming"
                        : event.status === "postponed"
                          ? "Postponed"
                          : "Cancelled"}
                    </span>

                    <h3 className={styles.eventTitle}>{event.title}</h3>

                    {formatTime(event) && (
                      <p className={styles.eventMeta}>{formatTime(event)}</p>
                    )}

                    {event.venue && (
                      <p className={styles.eventMeta}>{event.venue}</p>
                    )}

                    {event.description && (
                      <p className={styles.eventDescription}>
                        {event.description}
                      </p>
                    )}

                    {event.sourceUrl && (
                      <a
                        className={styles.sourceLink}
                        href={event.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View original announcement ↗
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <span className={styles.emptyMark} aria-hidden="true">
                ✳
              </span>

              <h3 className={styles.emptyTitle}>No events scheduled yet</h3>

              <p className={styles.emptyDescription}>
                {selectedDate
                  ? "ยังไม่มีข้อมูลกิจกรรมสำหรับวันที่เลือก"
                  : "ยังไม่มีข้อมูลกำหนดการในเดือนนี้ โปรดกลับมาตรวจสอบอีกครั้ง"}
              </p>

              {selectedDate && (
                <button
                  type="button"
                  className={styles.returnButton}
                  onClick={() => setSelectedDate(null)}
                >
                  View all events this month
                </button>
              )}
            </div>
          )}
        </section>
      </div>
    </section>
  );
}

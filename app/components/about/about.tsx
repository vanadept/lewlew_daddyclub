import Image from "next/image";
import styles from "./about.module.css";

export default function About() {
  return (
    <section className={styles.aboutSection} id="about">
      <div className={styles.container}>
        <div className={styles.aboutCard}>

          {/* PROFILE */}
          <div className={styles.aboutProfile}>
            <div className={styles.aboutAvatar}>
              <Image
                src="/images/profile/lewlew_profile3.jpg"
                alt="LEWLEW"
                width={1000}
                height={1500}
                className={styles.aboutAvatarImage}
              />
            </div>

            <div className={styles.aboutProfileLabel}>
              {/* Future profile metadata */}
            </div>
          </div>


          {/* INFORMATION */}
          <div className={styles.aboutInfo}>

            <div className={styles.aboutHeading}>
              <span>LEWLEW CGM48</span>
            </div>

            <p className={styles.aboutDescription}>
              สมาชิกวง CGM48 รุ่นที่ 5 พี่คนโตของรุ่น
              ที่ใครเห็นเป็นต้องตกหลุมรัก ด้วยความน่ารัก สดใส 
              แถมยังชอบขายขำมากกว่าขายสวย 
            </p>


            {/* DETAILS */}
            <div className={styles.aboutDetails}>

              <div className={styles.aboutDetail}>
                <span>Birthday</span>
                <strong>2006-12-24</strong>
              </div>

              <div className={styles.aboutDetail}>
                <span>Birthplace</span>
                <strong>Phisanulok</strong>
              </div>

              <div className={styles.aboutDetail}>
                <span>Blood type</span>
                <strong>O</strong>
              </div>

              <div className={styles.aboutDetail}>
                <span>Hobby</span>
                <strong>ไม่รู้ค้าบ รอการยืนยันอีกที</strong>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
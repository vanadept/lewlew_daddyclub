import Image from "next/image";

export default function About() {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="about-card">
          <div className="about-profile">
            <div className="about-avatar">
              <Image
                          src="/images/profile/lewlew_profile3.jpg"
                           alt="LEWLEW"
                          width={1000}
                          height={1500}
                          priority
                      />
            </div>

            <div className="about-profile-label">
              {" "}
              {/* <span>Profile</span> <span>01 / 2026</span>{" "} */}
            </div>
          </div>

          <div className="about-info">
            {/* <div className="eyebrow"> About </div> */}

            <div className="about-heading">
              {" "}
              {/* <h6>LEWLEW</h6>  */}
              <span>LEWLEW CGM48</span>
              {" "}
            </div>

            <p className="about-description">
              {" "}
                สมาชิกวง CGM48 รุ่นที่ 5 พี่คนโตของรุ่น ที่ใครเห็นเป็นต้องตกหลุมรัก
              {" "}
            </p>

            <div className="about-details">
              {/* <div className="about-detail">
                {" "}
                <span>Full name</span> <strong>Full Name</strong>{" "}
              </div> */}

              <div className="about-detail">
                {" "}
                <span>Birthday</span> <strong>2006-12-24</strong>{" "}
              </div>

              <div className="about-detail">
                {" "}
                <span>Birthplace</span> <strong>Thailand</strong>{" "}
              </div>

              <div className="about-detail">
                {" "}
                <span>Blood type</span> <strong>O</strong>{" "}
              </div>

              <div className="about-detail">
                {" "}
                <span>Hobby</span> <strong>เล่นกีต้าร์ ร้องเพลง</strong>{" "}
              </div>


            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

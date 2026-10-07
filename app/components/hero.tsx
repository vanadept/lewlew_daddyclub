import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero">

        <div className="hero-content">

            <div className="hero-copy">

            <div className="eyebrow">
        Official Website — 2026
      </div>

      <h1 className="hero-title display">
        <span>LEWLEW</span>
        <span className="indent">CGM48</span>
        
      </h1>

      

    </div>


    <div className="hero-image">

      <Image
            src="/images/hero/member-159-1791205733886.png"
             alt="LEWLEW"
            width={1000}
            height={1500}
            priority
        />

      {/* <div className="hero-image-label">
        <span>01</span>
        <span>Portrait / 2026</span>
      </div> */}

    </div>

  </div>


  <div className="hero-bottom">

    <div>
      Music / Moment / Memories
    </div>

    <div className="scroll-indicator">
      <span className="scroll-line"></span>
      This is PoC ver, Informations and Features coming soon...
    </div>

  </div>

</section>
  );
}
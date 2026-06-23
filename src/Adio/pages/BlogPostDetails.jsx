import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaRegClock, FaCalendarAlt, FaUser, FaShareAlt } from "react-icons/fa";
import "./blogpostdetails.css";

// Simulated repository layout mapping matching ID arrays using pure HTML/JSX
// Replace your existing object with this complete three-article repository
const ARTICLE_REPOSITORY = {
  "1": {
    title: "Understanding Rare Blood Groups: Why Genotype and Phenotype Matching Matters",
    author: "Dr. Amadi Chinedu (Hematologist)",
    date: "June 20, 2026",
    readTime: "6 min read",
    category: "Medical Insights",
    coverImage: "https://en.seamaty.com/Uploads/2021-04-25/608517fe15774.jpg",
    content: (
      <>
        <h2>The Precision Medicine Gap in Acute Logistics</h2>
        <p>
          In emergency transfusion setups across Nigeria, basic <strong>ABO and Rh factor screening</strong> solves roughly 95% of cross-matching tasks. However, the remaining 5% hidden in localized sub-group polymorphisms represents a massive clinical risk window.
        </p>
        <p>
          When a patient exhibits rare blood antigens, standard donor matching rules fail, triggering immediate acute transfusion rejections or subtle hemolytic reactions.
        </p>

        <h3>Why Surface Phenotyping Changes Everything</h3>
        <ol>
          <li>
            <strong>Immune Sensitization Prevention:</strong> Multi-transfused individuals (such as sickle cell anemia profiles) rapidly formulate complex antibodies against foreign erythrocyte targets.
          </li>
          <li>
            <strong>Accelerated Routing:</strong> By digitally mapping deep phenotype profiles, the platform bypasses conventional blind laboratory trial-and-error processes.
          </li>
        </ol>

        <blockquote>
          <strong>Clinical Operational Metric:</strong> Utilizing immediate telemetry filters, SLODAT reduces the localized verification window for rare phenotypes from a standard 14-hour cycle to under 45 minutes flat.
        </blockquote>

        <h3>Modern Implementation Protocols</h3>
        <p>
          To safely onboard a donor onto our advanced phenotyping track, participating hospitals must complete three core steps:
        </p>
        <ul>
          <li><strong>Automated Gel Card Centrifugation:</strong> Verification via precise high-throughput testing kits.</li>
          <li><strong>Encrypted Antigen Mapping:</strong> Ingesting specific Kell, Duffy, and Kidd data tags directly into our secure platform infrastructure.</li>
          <li><strong>Broadcast Tokenization:</strong> Obfuscating donor identities behind dynamic single-use tokens to prevent targeted scraping or privacy compromises.</li>
        </ul>

        <pre>
          <code>
{`// Structural validation response schema for blood metadata
{
  "bloodGroup": "O-Negative",
  "phenotypeFlags": {
    "kellAntigen": "negative",
    "duffyA": "positive",
    "kiddB": "negative"
  },
  "verificationStatus": "COMPLIANT_MDCN"
}`}
          </code>
        </pre>

        <p>
          Moving forward, expanding the platform’s localized screening registry remains our top infrastructural priority across southwestern medical hubs. By converting static medical data layers into interactive routing assets, we ensure no patient loses critical windows due to an unexpected antigen mismatch.
        </p>
      </>
    )
  },

  "2": {
    title: "How Voluntary Blood Donors Rescued 14 Emergency Obstetric Patients in Lagos",
    author: "Tunde Alabi",
    date: "June 18, 2026",
    readTime: "4 min read",
    category: "Donor Stories",
    coverImage: "https://hsch.ceflixcdn.com/eths3/blood_donations_sept24a.jpg",
    content: (
      <>
        <h2>Maternal Mortality Defied Through Rapid Crowdsourcing</h2>
        <p>
          Last Tuesday, critical supply deficits threatened several obstetric rooms across metropolitan Lagos. Within minutes of a high-priority system broadcast, voluntary donors filled critical dispatch queues.
        </p>
        <p>
          Postpartum hemorrhage remains a leading factor in regional maternal mortality rates. When traditional blood bank inventories fall short, localized peer-to-peer distribution networks bridge the temporal gap.
        </p>

        <h3>Anatomy of a Swift Dispatch Run</h3>
        <ul>
          <li><strong>08:12 WAT:</strong> Hospital issues an emergency request for 3 units of O-positive blood.</li>
          <li><strong>08:15 WAT:</strong> Digital routing match criteria triggers smart alerts for 12 standby donors within a 5km radius.</li>
          <li><strong>08:42 WAT:</strong> First two qualified donors arrive on-site for immediate screening and verification.</li>
        </ul>

        <blockquote>
          Every single unit of blood secured through rapid community sourcing acts as a literal shield against maternal mortality trends.
        </blockquote>

        <p>
          This successful intervention underscores the vital role of civic mobilization. By maintaining an active, verified standby roster, we remove the panic from acute emergency logistics.
        </p>
      </>
    )
  },

  "3": {
    title: "Optimizing Cold Chain Logistics for Emergency Blood Deliveries in Urban Traffic",
    author: "Engr. Funmi Ojo",
    date: "June 12, 2026",
    readTime: "5 min read",
    category: "Platform News",
    coverImage: "https://img.magnific.com/premium-photo/portrait-black-man-happy-doctor-with-arms-crossed-hospital-healthcare-african-medical-professional-face-surgeon-person-confident-employee-from-nigeria-with-smile-wellness_590464-203727.jpg?semt=ais_hybrid&w=740&q=80",
    content: (
      <>
        <h2>Beating Mainland Traffic Bottlenecks with Smart Thermal Logistics</h2>
        <p>
          Biological transport requires strict, unyielding environmental tracking. Moving critical blood supplies across heavy urban traffic patterns presents a two-fold problem: gridlock delays and temperature degradation.
        </p>
        <p>
          If a sample warms past its narrow clinical threshold during a prolonged transit window, the biological payload becomes completely unviable.
        </p>

        <h3>Implementing Real-Time Thermal Telemetry</h3>
        <p>
          Our latest operational configuration integrates cellular IoT sensors directly into active transport containers. Dispatchers monitor key parameters live:
        </p>
        <ol>
          <li><strong>Internal Core Temperature:</strong> Maintained consistently between 1°C and 6°C using phased cooling packs.</li>
          <li><strong>Dynamic Route Recalculation:</strong> Automatically rerouting dispatch riders based on real-time traffic density metrics.</li>
        </ol>

        <pre>
          <code>
{`// Simulated IoT payload mapping active transit telemetry
{
  "containerId": "CC-LSR-044",
  "currentTempCelsius": 3.4,
  "batteryPercent": 92,
  "gpsCoords": "6.5244, 3.3792",
  "transitStatus": "IN_TRAFFIC_MAINLAND"
}`}
          </code>
        </pre>

        <p>
          By establishing strict hardware and software tracking frameworks, we can confidently extend our operating range across more remote corridors without risking product integrity.
        </p>
      </>
    )
  }
};

const BlogPostDetails = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [post, setPost] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (ARTICLE_REPOSITORY[id]) {
      setPost(ARTICLE_REPOSITORY[id]);
    }
  }, [id]);

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!post) {
    return (
      <div className="details-error-fallback">
        <h3>Article Registry Offline</h3>
        <p>The system could not resolve the specific article index requested.</p>
        <button onClick={() => nav("/blog")}>Return to Knowledge Hub</button>
      </div>
    );
  }

  return (
    <div className="post-details-wrapper">
      {/* Article Utility Header Navbar */}
      <nav className="details-sticky-nav">
        <div className="details-nav-container">
          <button className="details-back-action" onClick={() => nav("/blog")}>
            <FaArrowLeft /> Back to Articles
          </button>
          <button className="details-share-action" onClick={handleShareClick}>
            <FaShareAlt /> {copied ? "Link Copied!" : "Share Link"}
          </button>
        </div>
      </nav>

      <main className="details-main-layout">
        {/* Article Meta Header Group */}
        <header className="details-article-header">
          <span className="details-category-tag">{post.category}</span>
          <h1>{post.title}</h1>
          
          <div className="details-meta-row">
            <div className="meta-item"><FaUser /> <span>{post.author}</span></div>
            <div className="meta-item"><FaCalendarAlt /> <span>{post.date}</span></div>
            <div className="meta-item"><FaRegClock /> <span>{post.readTime}</span></div>
          </div>
        </header>

        {/* Core Feature Cover Image Frame */}
        <div className="details-cover-frame">
          <img src={post.coverImage} alt="Laboratory testing environment overview" />
        </div>

        {/* Pure JSX Article Content Container */}
        <article className="details-markdown-container">
          <div className="markdown-body">
            {post.content}
          </div>
        </article>
      </main>
    </div>
  );
};

export default BlogPostDetails;
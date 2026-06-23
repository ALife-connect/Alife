import React, { useState, useEffect } from "react";
import { FaSearch, FaRegClock, FaChevronRight, FaHeart } from "react-icons/fa";
import "./blogpage.css";
import { useNavigate } from "react-router-dom"; // Assured correct routing module path string

// Dynamic article dataset curated for the SLODAT platform
const BLOG_DATABASE = [
  {
    id: 1,
    title: "Understanding Rare Blood Groups: Why Genotype and Phenotype Matching Matters",
    excerpt: "Demystifying the complexities of rare sub-blood types in Nigeria and how localized digital routing pipelines dramatically reduce hospital processing windows.",
    category: "Medical Insights",
    readTime: "6 min read",
    date: "June 20, 2026",
    image: "image_agent_tag_9209402275883148", 
    featured: true,
    author: "Dr. Amadi Chinedu (Hematologist)"
  },
  {
    id: 2,
    title: "How Voluntary Blood Donors Rescued 14 Emergency Obstetric Patients in Lagos",
    excerpt: "A deep dive into real-world dispatch logs highlighting how swift community intervention acts as a shield against maternal mortality trends.",
    category: "Donor Stories",
    readTime: "4 min read",
    date: "June 18, 2026",
    image: "image_agent_tag_9209402275884309", 
    featured: false,
    author: "Tunde Alabi"
  },
  {
    id: 3,
    title: "Optimizing Cold Chain Logistics for Emergency Blood Deliveries in Urban Traffic",
    excerpt: "Examining new operational parameters for safe biological transport across mainland transportation bottlenecks using thermal telemetry logs.",
    category: "Platform News",
    readTime: "5 min read",
    date: "June 12, 2026",
    image: "image_agent_tag_9209402275881987", 
    featured: false,
    author: "Engr. Funmi Ojo"
  }
];

const BlogPage = () => {
  //  The navigation hook is now correctly instantiated within the component boundary
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ["All", "Medical Insights", "Donor Stories", "Platform News"];

  // Filtering algorithmic logic chain
  const filteredPosts = BLOG_DATABASE.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = BLOG_DATABASE.find(p => p.featured);

  return (
    <div className="blog-page-container">
      {/* Dynamic Header Frame */}
      <header className="blog-hero-section">
        <div className="blog-hero-content">
          <span className="blog-badge-tag"><FaHeart /> Knowledge Hub</span>
          <h1>SLODAT Insights</h1>
          <p>Stay updated with professional medical resources, live impact narratives, and tactical system operational updates from Nigeria's emergency donor network.</p>
          
          {/* Integrated Multi-functional Search Bar */}
          <div className="blog-search-wrapper">
            <FaSearch className="search-icon-inside" />
            <input 
              type="text" 
              placeholder="Search articles by title, keywords or medical themes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Main Structural Body */}
      <main className="blog-main-grid">
        
        {/* Category Filtration Tab Row */}
        <div className="blog-tabs-row">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`blog-tab-btn ${selectedCategory === cat ? "active-tab" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Content Spotlight Layout Section */}
        {selectedCategory === "All" && searchQuery === "" && featuredPost && (
          <section className="featured-article-card" onClick={() => navigate(`/blog/${featuredPost.id}`)} style={{ cursor: "pointer" }}>
            <div className="featured-img-frame">
              <img src={featuredPost.image === "image_agent_tag_9209402275883148" ? "https://www.neoteryx.com/hubfs/shutterstock_293967086%20%282%29.jpg" : ""} alt="Laboratory matching process" />
            </div>
            <div className="featured-text-details">
              <span className="card-category-pill">{featuredPost.category}</span>
              <h2>{featuredPost.title}</h2>
              <p>{featuredPost.excerpt}</p>
              <div className="author-meta-footer">
                <span className="author-name-text">{featuredPost.author}</span>
                <div className="time-metric-group">
                  <span><FaRegClock /> {featuredPost.readTime}</span>
                  <span className="meta-dot-divider">|</span>
                  <span>{featuredPost.date}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Main Resource Grid Section */}
        <h2 className="grid-section-title">
          {searchQuery ? `Search Results (${filteredPosts.length})` : "Recent Publications"}
        </h2>
        
        {filteredPosts.length === 0 ? (
          <div className="blog-empty-state">
            <p>No publications match your exact keyword metrics. Please adjust filters.</p>
          </div>
        ) : (
          <div className="blog-articles-grid">
            {filteredPosts.map((post) => {
              let imgSrc = "";
              if (post.image === "image_agent_tag_9209402275883148") imgSrc = "https://www.neoteryx.com/hubfs/shutterstock_293967086%20%282%29.jpg";
              if (post.image === "image_agent_tag_9209402275884309") imgSrc = "https://hsch.ceflixcdn.com/eths3/blood_donations_sept24a.jpg";
              if (post.image === "image_agent_tag_9209402275881987") imgSrc = "https://img.magnific.com/premium-photo/portrait-black-man-happy-doctor-with-arms-crossed-hospital-healthcare-african-medical-professional-face-surgeon-person-confident-employee-from-nigeria-with-smile-wellness_590464-203727.jpg?semt=ais_hybrid&w=740&q=80";

              return (
                <article key={post.id} className="blog-standard-card">
                  <div className="card-image-box">
                    <img src={imgSrc} alt={post.title} />
                    <span className="card-inline-category">{post.category}</span>
                  </div>
                  <div className="card-body-content">
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <div className="card-footer-meta">
                      <div className="card-time-stats">
                        <span>{post.date}</span>
                        <span className="meta-dot-divider">•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <button className="card-read-link" onClick={() => navigate(`/blog/${post.id}`)}>
                        Read <FaChevronRight />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogPage;
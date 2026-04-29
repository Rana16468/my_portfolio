import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import LoadingSpinner from './LoadingSpinner';
import ErrorPage from './ErrorPage';

const MyBlog = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  console.log(hoveredIndex)

  const { data: allblogs = [], isLoading, error } = useQuery({
    queryKey: ["allblogs"],
    queryFn: async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/blog/`, {
          method: "GET",
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) throw new Error("Network response was not ok");
        return await res.json();
      } catch (error) {
        toast.error(`Failed to fetch blogs: ${error?.message}`);
      }
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorPage />;

  const blogs = allblogs?.data || [];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --ink: #0a0a0f;
          --paper: #f5f0e8;
          --accent: #ff3d2e;
          --gold: #c9a84c;
          --muted: #6b6560;
        }

        .blog-root {
          font-family: 'DM Sans', sans-serif;
          background-color: var(--ink);
          min-height: 100vh;
          padding: 80px 0;
          position: relative;
          overflow: hidden;
        }

        .blog-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 20% 10%, #1a0a2e 0%, transparent 60%),
                      radial-gradient(ellipse 60% 40% at 80% 90%, #0d1a3a 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        .noise {
          position: fixed;
          inset: 0;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
          position: relative;
          z-index: 2;
        }

        /* Header */
        .header-section {
          margin-bottom: 80px;
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: end;
          gap: 32px;
        }

        .eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .eyebrow::before {
          content: '';
          display: block;
          width: 32px;
          height: 1px;
          background: var(--gold);
        }

        .main-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(52px, 7vw, 96px);
          font-weight: 900;
          line-height: 0.9;
          color: #fff;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .main-title em {
          font-style: italic;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.4);
        }

        .subtitle {
          font-size: 15px;
          color: rgba(255,255,255,0.45);
          max-width: 280px;
          text-align: right;
          line-height: 1.7;
          font-weight: 300;
        }

        .divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15) 30%, rgba(201,168,76,0.4) 50%, rgba(255,255,255,0.15) 70%, transparent);
          margin-bottom: 64px;
        }

        /* Grid */
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 24px;
        }

        .blog-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 4px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          transition: border-color 0.4s ease, transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease;
        }

        .blog-card:hover {
          border-color: rgba(201,168,76,0.3);
          transform: translateY(-6px);
          box-shadow: 0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.2);
        }

        .blog-card:nth-child(1) { grid-column: span 7; }
        .blog-card:nth-child(2) { grid-column: span 5; }
        .blog-card:nth-child(3) { grid-column: span 5; }
        .blog-card:nth-child(4) { grid-column: span 7; }
        .blog-card:nth-child(n+5) { grid-column: span 6; }

        @media (max-width: 900px) {
          .blog-card { grid-column: span 12 !important; }
          .header-section { grid-template-columns: 1fr; }
          .subtitle { text-align: left; max-width: 100%; }
        }

        .card-image-wrap {
          position: relative;
          overflow: hidden;
        }

        .blog-card:nth-child(1) .card-image-wrap,
        .blog-card:nth-child(4) .card-image-wrap { height: 280px; }
        .blog-card:nth-child(2) .card-image-wrap,
        .blog-card:nth-child(3) .card-image-wrap { height: 200px; }
        .card-image-wrap { height: 220px; }

        .card-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s cubic-bezier(0.23, 1, 0.32, 1), filter 0.4s ease;
          filter: saturate(0.8) brightness(0.85);
        }

        .blog-card:hover .card-image-wrap img {
          transform: scale(1.06);
          filter: saturate(1) brightness(1);
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 40%, rgba(10,10,15,0.95) 100%);
        }

        .card-number {
          position: absolute;
          top: 16px;
          right: 16px;
          font-family: 'Playfair Display', serif;
          font-size: 11px;
          font-weight: 700;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.15em;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(8px);
          padding: 4px 10px;
          border-radius: 2px;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .tag-pill {
          position: absolute;
          bottom: 16px;
          left: 16px;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          background: rgba(10,10,15,0.8);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(201,168,76,0.3);
          padding: 5px 12px;
          border-radius: 2px;
        }

        .card-body {
          padding: 24px 28px 28px;
        }

        .card-meta {
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.1em;
          margin-bottom: 12px;
          text-transform: uppercase;
          font-weight: 500;
        }

        .card-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(18px, 2vw, 24px);
          font-weight: 700;
          color: #fff;
          margin: 0 0 14px;
          line-height: 1.25;
          letter-spacing: -0.01em;
          transition: color 0.3s ease;
        }

        .blog-card:hover .card-title {
          color: rgba(201,168,76,0.9);
        }

        .card-excerpt {
          font-size: 13.5px;
          color: rgba(255,255,255,0.4);
          line-height: 1.75;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-weight: 300;
        }

        .card-excerpt * { font-size: inherit; color: inherit; }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.07);
        }

        .author-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .author-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid rgba(201,168,76,0.4);
          display: block;
        }

        .author-name {
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.7);
          margin: 0;
        }

        .author-handle {
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          text-decoration: none;
          letter-spacing: 0.03em;
          transition: color 0.2s;
        }

        .author-handle:hover { color: var(--gold); }

        .read-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          text-decoration: none;
          border: 1px solid rgba(201,168,76,0.4);
          padding: 8px 16px;
          border-radius: 2px;
          transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
          white-space: nowrap;
        }

        .read-btn:hover {
          background: var(--gold);
          color: var(--ink);
          border-color: var(--gold);
        }

        .read-btn svg {
          transition: transform 0.3s ease;
        }

        .read-btn:hover svg {
          transform: translateX(4px);
        }

        /* Empty State */
        .empty-state {
          grid-column: span 12;
          text-align: center;
          padding: 120px 32px;
        }

        .empty-state h3 {
          font-family: 'Playfair Display', serif;
          font-size: 36px;
          color: rgba(255,255,255,0.2);
          margin-bottom: 12px;
        }

        .empty-state p {
          color: rgba(255,255,255,0.15);
          font-size: 14px;
        }

        /* Floating deco */
        .deco-line {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 1px;
          height: 80px;
          background: linear-gradient(to bottom, transparent, rgba(201,168,76,0.4));
          z-index: 2;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .blog-card {
          animation: fadeUp 0.6s cubic-bezier(0.23,1,0.32,1) both;
        }
        .blog-card:nth-child(1) { animation-delay: 0.05s; }
        .blog-card:nth-child(2) { animation-delay: 0.15s; }
        .blog-card:nth-child(3) { animation-delay: 0.25s; }
        .blog-card:nth-child(4) { animation-delay: 0.35s; }
        .blog-card:nth-child(5) { animation-delay: 0.45s; }
        .blog-card:nth-child(6) { animation-delay: 0.55s; }
      `}</style>

      <div name="blogs" className="blog-root">
        <div className="noise" />
        <div className="deco-line" />

        <div className="container">
          {/* Header */}
          <div className="header-section">
            <div>
              <p className="eyebrow">Personal Journal</p>
              <h1 className="main-title">
                My Blog<br />
                <em>Collection</em>
              </h1>
            </div>
            <p className="subtitle">
              Exploring technology, design, and innovation through a personal lens.
            </p>
          </div>

          <div className="divider" />

          {/* Blog Grid */}
          <div className="blog-grid">
            {blogs.length === 0 ? (
              <div className="empty-state">
                <h3>No stories yet</h3>
                <p>Check back soon for new articles.</p>
              </div>
            ) : (
              blogs.map((blog, index) => (
                <article
                  key={index}
                  className="blog-card"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="card-image-wrap">
                    <img src={blog.photo} alt={blog.title} loading="lazy" />
                    <div className="image-overlay" />
                    <span className="card-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {blog.subjectname && (
                      <span className="tag-pill">{blog.subjectname}</span>
                    )}
                  </div>

                  <div className="card-body">
                    <p className="card-meta">
                      {new Date(blog.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>

                    <h2 className="card-title">{blog.title}</h2>

                    <div
                      className="card-excerpt"
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    <div className="card-footer">
                      <div className="author-row">
                        <img
                          className="author-avatar"
                          src="https://randomuser.me/api/portraits/men/1.jpg"
                          alt="A M Sohel Rana"
                        />
                        <div>
                          <p className="author-name">A M Sohel Rana</p>
                          <a
                            href="http://example.com/profile"
                            className="author-handle"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            @sohelrana
                          </a>
                        </div>
                      </div>

                      <a
                        href="https://www.linkedin.com/in/ali-mohammad-sohel-rana-377050216/"
                        className="read-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyBlog;
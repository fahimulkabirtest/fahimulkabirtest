import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { loadNews } from "../utils/loadNews";
import type { NewsItem } from "../types/news";

// 1. Helper function to turn "2025-12-01" into "December 2025"
function formatMonthYear(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

type NewsPreviewProps = {
  limit?: number;
  showMoreLink?: boolean;
};

export default function NewsPreview({
  limit,
  showMoreLink = true,
}: NewsPreviewProps) {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    loadNews().then((items) => {
      setNews(limit ? items.slice(0, limit) : items);
    });
  }, [limit]);

  if (news.length === 0) return null;

  return (
    <section>
      <h1>News & Updates</h1>

      <hr />

      <ul className="list">
        {news.map((item, i) => {
          // 2. Create the bolded prefix (e.g., "**December 2025:** ")
          const formattedPrefix = `**${formatMonthYear(item.date)}:** `;

          return (
            <li className="custom-list" key={i}>
              {/* 3. Stitch the prefix and the CMS body text together */}
              <ReactMarkdown>{formattedPrefix + item.body}</ReactMarkdown>
            </li>
          );
        })}
      </ul>

      {showMoreLink && limit && (
        <div id="show-more">
          <Link to="/news">Show more →</Link>
        </div>
      )}
    </section>
  );
}

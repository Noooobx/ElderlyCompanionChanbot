import React, { useState, useEffect } from "react";

const API_KEY = "4d4cc7032e4821331afee1bb4d011198"; // Replace with your actual API key
const LANGUAGES = {
  en: "English",
  hi: "Hindi",
  ml: "Malayalam",
};

const News = () => {
  const [news, setNews] = useState([]);
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `https://gnews.io/api/v4/top-headlines?category=general&lang=${language}&country=in&apikey=${API_KEY}`
        );
        const data = await response.json();

        if (data.articles) {
          setNews(data.articles);
        } else {
          setNews([]);
          setError(data.message || "No news available.");
        }
      } catch (error) {
        setError("Failed to fetch news. Please try again later.");
      }
      setLoading(false);
    };

    fetchNews();
  }, [language]);

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">📰 Daily News</h1>

      {/* Language Selector */}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="mb-4 p-2 border rounded-lg shadow-sm"
      >
        {Object.entries(LANGUAGES).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>

      {/* News List */}
      {loading ? (
        <p>Loading news...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="w-full max-w-2xl">
          {news.length > 0 ? (
            news.map((article, index) => (
              <div key={index} className="p-4 mb-4 bg-white rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">{article.title}</h2>
                {article.image && (
                  <img src={article.image} alt="" className="w-full h-48 object-cover mt-2 rounded-lg" />
                )}
                <p className="text-gray-700 mt-2">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline mt-2 inline-block"
                >
                  Read more
                </a>
              </div>
            ))
          ) : (
            <p>No news available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default News;

          
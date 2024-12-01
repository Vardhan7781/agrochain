// Navigation between sections
function navigateTo(sectionId) {
  const sections = document.querySelectorAll("div");
  sections.forEach((section) => {
    section.classList.add("hidden");
  });

  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.remove("hidden");
  }
}

// Fetch Weekly News using NewsAPI
async function fetchNews() {
  const apiKey = '283569626bca4cc3bdc11a3c022cbc71'; // Your NewsAPI key
  const url = `https://newsapi.org/v2/everything?q=agriculture&sortBy=publishedAt&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = ""; // Clear any placeholder text

    if (data.articles && data.articles.length > 0) {
      data.articles.slice(0, 5).forEach((article) => {
        const newsItem = document.createElement("div");
        newsItem.className = "news-item";
        newsItem.innerHTML = `
          <h3>${article.title}</h3>
          <p>${article.description || 'No description available.'}</p>
          <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsContainer.appendChild(newsItem);
      });
    } else {
      newsContainer.innerHTML = "<p>No news articles found.</p>";
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    document.getElementById("news-container").innerHTML = "<p>Error loading news.</p>";
  }
}

// Fetch news when navigating to the Weekly News section
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("weekly-news").addEventListener("show", fetchNews);
});

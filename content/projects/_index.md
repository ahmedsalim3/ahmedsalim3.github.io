---
title: "Projects"
date: 2024-10-12
---

<article class="portfolio" data-page="portfolio">
  <header>
    <h2 class="h2 article-title">Portfolio</h2>
  </header>
  <section class="projects">
    <ul class="filter-list">
      <li class="filter-item">
        <button class="active" data-filter-btn="all">All</button>
      </li>
      <li class="filter-item">
        <button data-filter-btn="web-design">Web design</button>
      </li>
      <li class="filter-item">
        <button data-filter-btn="applications">Applications</button>
      </li>
      <li class="filter-item">
        <button data-filter-btn="web-development">Web development</button>
      </li>
    </ul>
    <div class="filter-select-box">
      <ul class="select-list">
        <li class="select-item">
          <button data-select-item class="active" data-select-value="all">All</button>
        </li>
        <li class="select-item">
          <button data-select-item data-select-value="web-design">Web design</button>
        </li>
        <li class="select-item">
          <button data-select-item data-select-value="applications">Applications</button>
        </li>
        <li class="select-item">
          <button data-select-item data-select-value="web-development">Web development</button>
        </li>
      </ul>
    </div>
    <ul class="project-list">
      <li class="project-item" data-filter-item data-category="web-development">
        <a href="#">
          <figure class="project-img">
            <img src="/images/avatar.jpg" alt="Project 1" loading="lazy">
          </figure>
          <h3 class="project-title">Finance</h3>
          <p class="project-category">Web development</p>
        </a>
      </li>
      <li class="project-item" data-filter-item data-category="web-development">
        <a href="#">
          <figure class="project-img">
            <img src="/images/avatar.jpg" alt="Project 2" loading="lazy">
          </figure>
          <h3 class="project-title">Orizon</h3>
          <p class="project-category">Web development</p>
        </a>
      </li>
      <li class="project-item" data-filter-item data-category="web-design">
        <a href="#">
          <figure class="project-img">
            <img src="/images/avatar.jpg" alt="Project 3" loading="lazy">
          </figure>
          <h3 class="project-title">Fundo</h3>
          <p class="project-category">Web design</p>
        </a>
      </li>
      <!-- Add more projects here as needed -->
    </ul>
  </section>
</article>

<style>
.project-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style-type: none;
  padding: 0;
}

.project-item {
  width: calc(33.333% - 20px);
  margin-bottom: 20px;
  box-sizing: border-box;
  transition: transform 0.3s;
}

.project-item:hover {
  transform: scale(1.05);
}

.project-img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.filter-list {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin-bottom: 20px;
}

.filter-item {
  margin-right: 10px;
}

.filter-item button,
.filter-select {
  padding: 10px 15px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.filter-item button.active,
.filter-select:hover {
  background-color: #0056b3;
}

.filter-select-box {
  position: relative;
}

.select-list {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  z-index: 1000;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.select-item button {
  width: 100%;
  text-align: left;
  background: none;
}

.select-item button:hover {
  background-color: #f0f0f0;
}
</style>

<script>
document.querySelectorAll('[data-filter-btn]').forEach(button => {
  button.addEventListener('click', () => {
    const filterValue = button.getAttribute('data-filter-btn');

    // Remove active class from all buttons
    document.querySelectorAll('[data-filter-btn]').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active'); // Add active class to clicked button

    // Filter projects
    document.querySelectorAll('.project-item').forEach(item => {
      if (filterValue === 'all' || item.dataset.category === filterValue) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});


// Handle selection from dropdown
document.querySelectorAll('[data-select-item]').forEach(item => {
  item.addEventListener('click', () => {
    const value = item.getAttribute('data-select-value');
    document.querySelector('.select-value').textContent = value;
    
    // Trigger the filter button click to apply the same filter
    document.querySelector(`[data-filter-btn="${value}"]`).click();
  });
});
</script>

/* 
JavaScripts for project page @ /content/projects/_index.md
The HTML using these scripts @ /layouts/shortcodes/project.html + /layouts/shortcodes/projects_list.html 
*/

document.querySelectorAll('[data-filter-btn]').forEach(button => {
  button.addEventListener('click', () => {
    const filterValue = button.getAttribute('data-filter-btn');

    document.querySelectorAll('[data-filter-btn]').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active'); 

    document.querySelectorAll('.project-item').forEach(item => {
      const categories = item.dataset.category.split(' '); // split into array
      if (filterValue === 'all' || categories.includes(filterValue)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

document.querySelectorAll('[data-select-item]').forEach(item => {
  item.addEventListener('click', () => {
    const value = item.getAttribute('data-select-value');
    document.querySelector('.select-value').textContent = value;
    
    document.querySelector(`[data-filter-btn="${value}"]`).click();
  });
});

function toggleContent(event) {
    event.preventDefault();
    const hiddenContent = event.currentTarget.closest('.project-item').querySelector('.hidden-content');
    if (hiddenContent.style.display === "none" || hiddenContent.style.display === "") {
        hiddenContent.style.display = "block";
    } else {
        hiddenContent.style.display = "none";
    }
}
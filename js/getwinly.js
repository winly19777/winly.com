//顯示周年
// Get the current year
const currentYear = new Date().getFullYear();

// Calculate the difference
const result = currentYear - 1977;

// Find the element with id 'winlyAnniversary' and set its content
const anniversaryElement = document.getElementById('winlyAnniversary');
if (anniversaryElement) {
    anniversaryElement.textContent = result;
}
const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = currentYear;
}

document.addEventListener("DOMContentLoaded", function () {
    const masonryContainer = document.querySelector(".masonry");
    const images = [
      { id: 1, image: "https://picsum.photos/id/10/400/600" },
      { id: 2, image: "https://picsum.photos/id/14/400/500" },
      { id: 3, image: "https://picsum.photos/id/15/400/450" },
      { id: 4, image: "https://picsum.photos/id/16/400/550" },
      { id: 5, image: "https://picsum.photos/id/17/400/350" },
      { id: 6, image: "https://picsum.photos/id/19/400/500" },
      { id: 7, image: "https://picsum.photos/id/37/400/450" },
      { id: 8, image: "https://picsum.photos/id/39/400/550" },
      { id: 9, image: "https://picsum.photos/id/85/400/400" }
    ];

    function createMasonry() {
      masonryContainer.innerHTML = "";
      const columnCount = getComputedStyle(masonryContainer).getPropertyValue("--columns");
      const columns = Array.from({ length: columnCount }, () => document.createElement("div"));
      columns.forEach(col => col.classList.add("column"));
      images.forEach((item, index) => {
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("masonry-item");

        const img = document.createElement("img");
        img.src = item.image;
        img.alt = "Masonry Image";

        imgContainer.appendChild(img);
        columns[index % columnCount].appendChild(imgContainer);
      });
      columns.forEach(col => masonryContainer.appendChild(col));
    }

    window.addEventListener("resize", () => {
      requestAnimationFrame(createMasonry);
    });

    createMasonry(); // 初始化 Masonry
  });
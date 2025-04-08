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


//相片牆功能
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

  let carouselInterval;
  let currentSlide = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  function createMasonry() {
    masonryContainer.innerHTML = "";
    
    // 檢查是否為手機版視圖
    const isMobile = window.innerWidth <= 599;
    
    if (isMobile) {
      // 手機版轉為輪播圖
      masonryContainer.classList.add("carousel");
      masonryContainer.classList.remove("masonry-grid");
      
      // 創建輪播圖容器
      const carouselContainer = document.createElement("div");
      carouselContainer.classList.add("carousel-container");
      
      // 創建輪播圖內容
      const carouselContent = document.createElement("div");
      carouselContent.classList.add("carousel-content");
      
      // 添加觸控事件監聽器
      carouselContent.addEventListener("touchstart", handleTouchStart, false);
      carouselContent.addEventListener("touchmove", handleTouchMove, false);
      carouselContent.addEventListener("touchend", handleTouchEnd, false);
      
      // 添加所有圖片
      images.forEach((item, index) => {
        const slide = document.createElement("div");
        slide.classList.add("carousel-slide");
        if (index === currentSlide) {
          slide.classList.add("active");
        }
        
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("masonry-item");
        
        const img = document.createElement("img");
        img.src = item.image;
        img.alt = "Carousel Image";
        
        imgContainer.appendChild(img);
        slide.appendChild(imgContainer);
        carouselContent.appendChild(slide);
      });
      
      // 創建導航指示器
      const indicators = document.createElement("div");
      indicators.classList.add("carousel-indicators");
      
      images.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.classList.add("indicator");
        if (index === currentSlide) {
          dot.classList.add("active");
        }
        
        dot.addEventListener("click", () => {
          goToSlide(index);
        });
        
        indicators.appendChild(dot);
      });
      
      // 創建前後按鈕
      const prevBtn = document.createElement("button");
      prevBtn.classList.add("carousel-btn", "prev-btn");
      prevBtn.innerHTML = "❮";
      prevBtn.addEventListener("click", prevSlide);
      
      const nextBtn = document.createElement("button");
      nextBtn.classList.add("carousel-btn", "next-btn");
      nextBtn.innerHTML = "❯";
      nextBtn.addEventListener("click", nextSlide);
      
      // 組裝輪播圖
      carouselContainer.appendChild(carouselContent);
      carouselContainer.appendChild(indicators);
      carouselContainer.appendChild(prevBtn);
      carouselContainer.appendChild(nextBtn);
      masonryContainer.appendChild(carouselContainer);
      
      // 設置自動輪播
      startCarousel();
      
    } else {
      // 桌面版為馬賽克布局
      masonryContainer.classList.remove("carousel");
      masonryContainer.classList.add("masonry-grid");
      
      // 停止輪播
      stopCarousel();
      
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
  }
  
  // 觸控事件處理函數
  function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
    // 暫停自動輪播
    stopCarousel();
  }
  
  function handleTouchMove(event) {
    touchEndX = event.touches[0].clientX;
  }
  
  function handleTouchEnd() {
    const touchDiff = touchStartX - touchEndX;
    
    // 確認是有效的滑動距離（避免點擊誤判）
    if (Math.abs(touchDiff) > 50) {
      if (touchDiff > 0) {
        // 向左滑動，顯示下一張
        nextSlide();
      } else {
        // 向右滑動，顯示上一張
        prevSlide();
      }
    }
    
    // 重新啟動自動輪播
    startCarousel();
  }
  
  // 輪播圖功能
  function nextSlide() {
    currentSlide = (currentSlide + 1) % images.length;
    updateCarousel();
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + images.length) % images.length;
    updateCarousel();
  }
  
  function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
  }
  
  function updateCarousel() {
    const slides = document.querySelectorAll(".carousel-slide");
    const indicators = document.querySelectorAll(".indicator");
    
    slides.forEach((slide, index) => {
      if (index === currentSlide) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });
    
    indicators.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }
  
  function startCarousel() {
    stopCarousel();
    carouselInterval = setInterval(nextSlide, 3000);
  }
  
  function stopCarousel() {
    if (carouselInterval) {
      clearInterval(carouselInterval);
    }
  }
  
  // 調整視窗大小時重新布局
  window.addEventListener("resize", () => {
    requestAnimationFrame(createMasonry);
  });
  
  // 初始化
  createMasonry();
});
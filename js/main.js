document.addEventListener("DOMContentLoaded", () => {
  // 設定
  const SCROLL_SPEED = 300;
  const scrollLinks = document.querySelectorAll(".scroll-link");
  const nav = document.getElementById('navArea');
  const btn = document.querySelector('.toggle_btn');
  const mask = document.getElementById('mask');
  const closeMenu = document.querySelectorAll('.close-menu');
  const open = 'open'; // クラス名

  const popup = document.getElementById('popup');
  const popupImg = document.getElementById('popup-img');
  const popupText = document.getElementById('popup-text');
  const closeBtn = document.querySelector('.close');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');

  let currentGallery = null;
  let currentIndex = 0;
  let slides = [];

  // スムーズスクロール
  function scrollToElement(targetEl) {
    window.scrollTo({
      top: targetEl.offsetTop,
      behavior: "smooth"
    });
  }

  // スクロールリンクのイベント設定
  scrollLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetID = link.getAttribute("href").replace("#", "");
      const targetEl = document.getElementById(targetID);
      if (targetEl) {
        scrollToElement(targetEl);
      }
    });
  });

  // メニューの開閉
  function toggleMenu() {
    nav.classList.toggle(open);
    btn.classList.toggle('active');
  }

  // toggle_btn のクリックでメニューを開閉
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu();
  });

  // mask クリックでメニューを閉じる
  mask.addEventListener('click', () => {
    nav.classList.remove(open);
    btn.classList.remove('active');
  });

  // close-menu クリックでメニューを閉じる
  closeMenu.forEach(close => {
    close.addEventListener('click', () => {
      nav.classList.remove(open);
      btn.classList.remove('active');
    });
  });

  // ギャラリー画像クリック
  document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('click', () => {
      const galleryId = 'gallery' + img.dataset.gallery;
      currentGallery = document.getElementById(galleryId);

      slides = Array.from(currentGallery.querySelectorAll('.slide'));
      currentIndex = 0;

      popupText.innerHTML = currentGallery.querySelector('.text').innerHTML;
      showSlide(currentIndex);

      popup.style.display = 'flex';
      setTimeout(() => {
        popup.classList.add('show');
      }, 10);
    });
  });

  // スライド表示
  function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentIndex = index;

    // 画像を更新
    popupImg.innerHTML = '';
    popupImg.appendChild(slides[currentIndex].querySelector('img').cloneNode(true));

    // ナビゲーションボタンの表示制御
    prevBtn.style.display = (slides.length <= 1) ? 'none' : 'block';
    nextBtn.style.display = (slides.length <= 1) ? 'none' : 'block';
  }

  // ナビゲーション
  prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
  nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));

  // 閉じる
  closeBtn.addEventListener('click', () => {
    popup.classList.remove('show'); // ポップアップを閉じる
    setTimeout(() => {
      popup.style.display = 'none'; // アニメーション後に非表示
    }, 300); // アニメーションの時間（0.3秒後に非表示にする）
  });
  
  window.addEventListener('click', e => {
    if (e.target === popup) {
      popup.classList.remove('show'); // クリックでポップアップ閉じる
      setTimeout(() => {
        popup.style.display = 'none'; // アニメーション後に非表示
      }, 300);
    }
  });
});


// Swiper
const mySwiper = new Swiper('.swiper', {
  // Optional parameters
  loop: true,
 
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },
 
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
 
  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },

  //自動再生
  autoplay: {
    delay: 10000,
    disableOnInteraction: false,
    waitForTransition: false,
  },
  speed: 1000,

  //ページネーション
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    type: 'bullets'
  },
});

document.addEventListener('DOMContentLoaded', function () {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  const browseProductsEl = document.getElementById('browse-products');
  const myProductsEl = document.getElementById('my-products');
  let productsLoaded = false;
  let myProductsLoaded = false;

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const tabName = button.getAttribute('data-tab');
      tabButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      tabContents.forEach((content) => content.classList.remove('active'));
      document.getElementById(tabName).classList.add('active');

      if (tabName === 'browse' && !productsLoaded) {
        loadBrowseProducts();
      } else if (tabName === 'my-ingredients' && !myProductsLoaded) {
        loadMyProducts();
      }
    });
  });

  loadBrowseProducts();

  function loadBrowseProducts() {
    browseProductsEl.innerHTML =
      '<div class="loading">데이터를 불러오는 중...</div>';

    axios
      .get('http://3.37.172.142:8081/api/items')
      .then((response) => {
        productsLoaded = true;
        renderProducts(response.data, browseProductsEl, false);
      })
      .catch(() => {
        browseProductsEl.innerHTML = '<p>상품 목록을 불러오지 못했습니다.</p>';
      });
  }

  function loadMyProducts() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    myProductsEl.innerHTML =
      '<div class="loading">데이터를 불러오는 중...</div>';

    axios
      .get(`http://3.37.172.142:8081/api/items/my?userId=${userId}`)
      .then((response) => {
        myProductsLoaded = true;
        renderProducts(response.data, myProductsEl, true);
      })
      .catch(() => {
        myProductsEl.innerHTML = '<p>내 식재료 목록을 불러오지 못했습니다.</p>';
      });
  }

  function renderProducts(products, container, isMyProducts) {
    container.innerHTML = '';

    if (products.length === 0) {
      container.innerHTML = '<p>등록된 식재료가 없습니다.</p>';
      return;
    }

    products.forEach((product) => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';

      const statusBadge =
        product.itemStatus === 'SHARE'
          ? '<span class="badge sharing">나눔</span>'
          : '<span class="badge exchange">교환</span>';

      let actionsHtml = `
          <div class="product-actions">
            <button class="contact-btn" data-user-id="${product.userId}">연락하기</button>
          </div>
        `;

      if (isMyProducts) {
        actionsHtml = `
            <div class="product-actions">
              <button class="edit-btn">수정</button>
              <button class="delete-btn" data-id="${product.itemId}">삭제</button>
            </div>
          `;
      }

      productCard.innerHTML = `
          <div class="product-image">
            <img src="${product.thumbnailUrl}" alt="${product.itemName}" />
            ${statusBadge}
          </div>
          <div class="product-info">
            <h3>${product.itemName}</h3>
            <div class="category">${
              product.categoryName || '카테고리 없음'
            }</div>
            <div class="description">${
              product.itemDescription || '설명 없음'
            }</div>
            <div class="quantity">수량: ${product.quantity}</div>
            <div class="expiry">유통기한: ${product.expirationDate}</div>
            <div class="location">위치: ${product.itemLocation}</div>
            <div class="registered">등록자: ${product.registeredBy}</div>
          </div>
          ${actionsHtml}
        `;

      container.appendChild(productCard);
    });

    if (!isMyProducts) {
      const contactButtons = container.querySelectorAll('.contact-btn');
      contactButtons.forEach((button) => {
        button.addEventListener('click', function () {
          const userId = this.getAttribute('data-user-id');
          if (!userId) {
            alert('유효하지 않은 사용자입니다.');
            return;
          }
          localStorage.setItem('contactUserId', userId);
          window.location.href = 'yourpage.html';
        });
      });
    }

    if (isMyProducts) {
      const deleteButtons = container.querySelectorAll('.delete-btn');
      deleteButtons.forEach((button) => {
        button.addEventListener('click', function () {
          const itemId = this.getAttribute('data-id');
          if (confirm('정말로 이 식재료를 삭제하시겠습니까?')) {
            deleteItem(itemId);
          }
        });
      });
    }
  }

  function deleteItem(itemId) {
    const userId = localStorage.getItem('userId');

    axios
      .delete(`http://3.37.172.142:8081/api/items/${itemId}?userId=${userId}`)
      .then(() => {
        alert('식재료가 삭제되었습니다.');
        loadMyProducts();
      })
      .catch(() => {
        alert('식재료 삭제에 실패했습니다.');
      });
  }

  const userId = localStorage.getItem('userId');
  if (!userId) {
    window.location.href = 'fooding_login.html';
  }
});

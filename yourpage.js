document.addEventListener('DOMContentLoaded', function () {
  const contactUserId = localStorage.getItem('contactUserId');

  if (!contactUserId) {
    alert('사용자 정보가 없습니다.');
    window.location.href = 'fooding_dashboard.html';
    return;
  }

  // API 요청
  axios
    .get(`https://3.37.172.142:8081/api/users/${contactUserId}/mypage`)
    .then((response) => {
      const { user, items } = response.data;

      // 사용자 정보 표시
      document.getElementById('user-name').textContent = user.userName || '-';
      document.getElementById('user-phone').textContent = `📞 ${
        user.phoneNumber || '-'
      }`;
      document.getElementById('user-region').textContent = `📍 ${
        user.location || '-'
      }`;

      // 아이템 목록 표시
      const listContainer = document.getElementById('ingredient-list');

      if (!items || items.length === 0) {
        listContainer.innerHTML = '<p>등록된 식재료가 없습니다.</p>';
        return;
      }

      listContainer.innerHTML = '';
      items.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'ingredient-card';

        card.innerHTML = `
              <div class="top-row">
                <strong>${item.itemName}</strong>
                <span class="weight">${item.quantity || '수량 정보 없음'}</span>
              </div>
              <p class="date">📅 유통기한: ${
                item.expirationDate || '정보 없음'
              }</p>
              <p class="comment">💬 ${
                item.itemDescription || '추가 설명 없음'
              }</p>
            `;

        listContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error('사용자 정보를 불러오지 못했습니다', error);
      alert('사용자 정보를 불러오지 못했습니다.');
    });
});

// 👉 페이지 이탈 시 contactUserId 삭제
window.addEventListener('beforeunload', () => {
  localStorage.removeItem('contactUserId');
});

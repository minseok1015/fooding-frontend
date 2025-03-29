// modal.js
class Modal {
  constructor() {
    this.createModalElement();
    this.bindEvents();
  }

  createModalElement() {
    // 모달 오버레이 생성
    this.overlay = document.createElement('div');
    this.overlay.className = 'modal-overlay';

    // 모달 컨테이너 생성
    this.container = document.createElement('div');
    this.container.className = 'modal-container';

    // 모달 컨텐츠 영역 생성
    this.content = document.createElement('div');
    this.content.className = 'modal-content';

    // 모달 구조 조립
    this.container.appendChild(this.content);
    this.overlay.appendChild(this.container);

    // body에 모달 추가
    document.body.appendChild(this.overlay);
  }

  bindEvents() {
    // 오버레이 클릭 시 모달 닫기
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });

    // ESC 키 누르면 모달 닫기
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  open(userId) {
    // 모달 내용 로드
    this.loadUserProfile(userId);

    // 모달 표시
    this.overlay.classList.add('active');
    this.isOpen = true;

    // 스크롤 방지
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.overlay.classList.remove('active');
    this.isOpen = false;

    // 스크롤 복원
    document.body.style.overflow = '';

    // 내용 초기화
    this.content.innerHTML = '';
  }

  loadUserProfile(userId) {
    // 로딩 표시
    this.content.innerHTML = `
        <div class="profile-box">
          <div class="profile-header">
            <h2>상대방 프로필</h2>
            <button class="back-btn" id="modal-close-btn">닫기</button>
          </div>
          <p class="subtitle">상대방 정보 및 등록한 식재료</p>
  
          <div class="user-info">
            <div class="profile-img"></div>
            <div class="user-details">
              <strong id="modal-user-name">로딩 중...</strong>
              <p id="modal-user-phone">📞 로딩 중...</p>
              <p id="modal-user-region">📍 로딩 중...</p>
            </div>
          </div>
  
          <h3 class="section-title">등록된 식재료</h3>
          <div id="modal-ingredient-list">
            <p>데이터를 불러오는 중...</p>
          </div>
        </div>
      `;

    // 닫기 버튼 이벤트 리스너
    document.getElementById('modal-close-btn').addEventListener('click', () => {
      this.close();
    });

    // API 호출
    axios
      .get(`http://3.37.172.142:8081/api/users/${userId}/username`)
      .then((response) => {
        // 사용자 기본 정보 표시
        const userName = response.data.userName;
        document.getElementById('modal-user-name').textContent =
          userName || '-';
        document.getElementById(
          'modal-user-phone'
        ).textContent = `📞 연락처 정보`;
        document.getElementById(
          'modal-user-region'
        ).textContent = `📍 지역 정보`;

        // 사용자의 식재료 목록 가져오기
        return axios.get(
          `http://3.37.172.142:8081/api/items/my?userId=${userId}`
        );
      })
      .then((response) => {
        const items = response.data;
        const listContainer = document.getElementById('modal-ingredient-list');

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
        console.error('데이터를 불러오는 중 오류가 발생했습니다', error);
        document.getElementById('modal-user-name').textContent =
          '정보를 불러올 수 없습니다';
        document.getElementById('modal-user-phone').textContent = '📞 -';
        document.getElementById('modal-user-region').textContent = '📍 -';
        document.getElementById('modal-ingredient-list').innerHTML =
          '<p>식재료 정보를 불러올 수 없습니다.</p>';
      });
  }
}

// 전역 모달 인스턴스 생성
const userProfileModal = new Modal();

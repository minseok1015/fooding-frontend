// 로그인 상태에 따라 다른 네비게이션 바를 보여주는 공통 컴포넌트
function createNavbar() {
  const userId = localStorage.getItem('userId');
  const isLoggedIn = !!userId;

  const navbar = document.createElement('nav');
  navbar.className = 'navbar';

  // 로고 부분
  const logo = document.createElement('div');
  logo.className = 'logo';
  logo.textContent = 'Fooding';
  logo.onclick = () => {
    window.location.href = isLoggedIn ? 'after_login.html' : 'fooding.html';
  };
  logo.style.cursor = 'pointer';

  // 네비게이션 링크
  const navLinks = document.createElement('ul');
  navLinks.className = 'nav-links';

  // 로그인 상태에 따라 다른 메뉴 표시
  if (isLoggedIn) {
    // 로그인 상태일 때 메뉴
    const menuItems = [
      { text: '대시보드', href: 'fooding_dashboard.html' },
      { text: '식재료 등록', href: 'new-item.html' },
      { text: '식재료 검색', href: 'fooding_search.html' },
    ];

    menuItems.forEach((item) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.text;
      li.appendChild(a);
      navLinks.appendChild(li);
    });

    // 인증 영역 (로그인 상태)
    const authArea = document.createElement('div');
    authArea.className = 'auth-area';

    const mypageBtn = document.createElement('a');
    mypageBtn.href = 'mypage.html';
    mypageBtn.className = 'mypage-btn';
    mypageBtn.textContent = '마이페이지';

    const logoutBtn = document.createElement('a');
    logoutBtn.href = '#';
    logoutBtn.className = 'logout-btn';
    logoutBtn.textContent = '로그아웃';
    logoutBtn.onclick = (e) => {
      e.preventDefault();
      localStorage.removeItem('userId');
      alert('로그아웃 되었습니다.');
      window.location.href = 'fooding.html';
    };

    authArea.appendChild(mypageBtn);
    authArea.appendChild(logoutBtn);

    navbar.appendChild(logo);
    navbar.appendChild(navLinks);
    navbar.appendChild(authArea);
  } else {
    // 비로그인 상태일 때 메뉴
    const menuItems = [
      { text: '홈', href: 'fooding.html' },
      { text: '검색', href: 'fooding_search.html' },
      { text: '나눔', href: 'fooding_login.html' },
      { text: '교환', href: 'fooding_login.html' },
      { text: '지도', href: 'fooding_login.html' },
    ];

    menuItems.forEach((item) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.text;
      li.appendChild(a);
      navLinks.appendChild(li);
    });

    // 인증 버튼 (비로그인 상태)
    const authButtons = document.createElement('div');
    authButtons.className = 'auth-buttons';

    const loginBtn = document.createElement('a');
    loginBtn.href = 'fooding_login.html';
    loginBtn.className = 'btn';
    loginBtn.textContent = '로그인';

    const signupBtn = document.createElement('a');
    signupBtn.href = 'fooding_signup.html';
    signupBtn.className = 'btn signup';
    signupBtn.textContent = '회원가입';

    authButtons.appendChild(loginBtn);
    authButtons.appendChild(signupBtn);

    navbar.appendChild(logo);
    navbar.appendChild(navLinks);
    navbar.appendChild(authButtons);
  }

  return navbar;
}

// 페이지 로드 시 네비게이션 바 삽입
document.addEventListener('DOMContentLoaded', function () {
  const headerElement = document.querySelector('header');
  if (headerElement) {
    headerElement.innerHTML = '';
    headerElement.appendChild(createNavbar());
  }
});

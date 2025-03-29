# 🍽️ Fooding - Frontend

식재료 공유 및 교환 플랫폼 **Fooding**의 Frontend Repository입니다.

## 📌 프로젝트 소개
**Fooding**은 지역 기반으로 식재료를 나누고 교환할 수 있는 서비스입니다.  
불필요하게 버려지는 식재료를 서로 나누고, 필요한 사람들과 효율적으로 연결될 수 있도록 돕습니다.

## 🚀 기술 스택

| 구분      | 스택                                |
|---------|-----------------------------------|
| Language | HTML, CSS, JavaScript (Vanilla) |
| Infra    | AWS EC2, Nginx, Certbot(SSL)    |

## 🗂️ 프로젝트 구조

```
fooding-frontend
├── css
│   └── fooding_dashboard.css (등 스타일 파일들)
├── js
│   └── fooding_dashboard.js (기능별 JS 파일)
├── images
│   └── noimage.png (기본 이미지)
├── fooding.html (메인 페이지)
├── fooding_login.html (로그인 페이지)
├── fooding_signup.html (회원가입 페이지)
└── ... 기타 페이지
```

## ⚙️ Environment Variables
> 환경 변수는 **Backend에만 존재**하며, Frontend에서는 사용하지 않습니다.  
> API 요청 시 Backend 서버의 환경 변수 기반으로 처리됩니다.

## 🛠️ 주요 기능

- **회원가입 & 로그인 (JWT 기반)**
- **식재료 등록, 수정, 삭제, 조회 기능 구현**
- **카테고리별 조회 및 검색 기능**
- **사용자별 식재료 관리**
- **식재료 이미지 미리보기 (없을 경우 noimage.png 표시)**
- **연락하기 버튼 클릭 시 상대방 YourPage로 이동**
- **반응형 UI 적용**

## 🗺️ Deployment Architecture

```
사용자 (https://fooding.store)
     ↓
  Nginx (SSL)
     ↓
HTML, CSS, JavaScript (Static Frontend)
     ↓
API 요청 → Spring Boot Backend Server (EC2 :8081)
     ↓
  MySQL, S3, Redis
```

## ⚡️ 실행 방법

> **배포 환경에서 자동 제공되는 정적 파일**
>
> 개발 중 로컬에서 실행하려면:

```
cd fooding-frontend
python3 -m http.server 8080
```

브라우저에서 [http://localhost:8080/fooding.html](http://localhost:8080/fooding.html) 접속

## 👨🏻‍💻 개발자

- **강웅천**  
- **정주원**  



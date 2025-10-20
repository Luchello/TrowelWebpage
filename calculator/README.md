# 간이 루베 계산기 (Rube Calculator Widget)

건설/미장 영업용 콘크리트 부피(루베) 계산 위젯입니다. 순수 HTML/CSS/JavaScript로 작성되어 외부 의존성 없이 어디든 붙여넣어 사용할 수 있습니다.

## 설치 방법

### 방법 1: 단일 파일 버전 (권장)

`rube-calculator-single.html` 파일의 `<!-- BEGIN: RUBE CALCULATOR -->` ~ `<!-- END: RUBE CALCULATOR -->` 부분을 복사하여 원하는 HTML 페이지에 붙여넣으세요.

```html
<!-- 당신의 웹페이지 어디든 -->
<body>
    <!-- BEGIN: RUBE CALCULATOR -->
    <div id="rube-calculator"></div>
    <style>
        /* 스타일 코드... */
    </style>
    <script>
        /* 스크립트 코드... */
    </script>
    <!-- END: RUBE CALCULATOR -->
</body>
```

### 방법 2: 파일 분리 버전

1. `rube-calculator.css`, `rube-calculator.js` 파일을 웹사이트 디렉토리에 업로드
2. HTML 페이지에 다음 코드 추가:

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="rube-calculator.css">
</head>
<body>
    <div id="rube-calculator"></div>
    <script src="rube-calculator.js"></script>
</body>
</html>
```

## 핵심 기능

- **자동 계산**: 입력값이 변경되면 즉시 계산
- **단위**: 가로/세로는 m(미터), 두께는 cm(센티미터)로 입력 (내부적으로 자동 변환)
- **입력 검증**: 잘못된 값(0 이하, 숫자 아님) 입력 시 오류 메시지 표시
- **클립보드 복사**: 계산 결과를 클릭 한 번으로 복사
- **접근성**: aria-live, 키보드 내비게이션 완벽 지원
- **반응형**: 모바일(360px)부터 데스크톱까지 완벽 대응

## URL 파라미터 사용법

URL에 파라미터를 추가하여 초기값을 설정할 수 있습니다:

```
https://your-site.com/calculator.html?length=10&width=5&thickness=20
```

**사용 가능한 파라미터:**
- `length`: 가로(m)
- `width`: 세로(m)
- `thickness`: 두께(cm)
- `unit`: 하위호환용 - `m`으로 설정 시 thickness 값을 m에서 cm로 자동 변환

**예시:**
```
?length=10&width=5&thickness=20
```
→ 가로 10m, 세로 5m, 두께 20cm로 자동 입력 및 계산

**하위호환 예시:**
```
?length=10&width=5&thickness=0.2&unit=m
```
→ 두께 0.2m를 20cm로 자동 변환하여 입력

## 커스터마이징

### 색상 변경

CSS 변수를 수정하여 색상을 쉽게 변경할 수 있습니다:

```css
#rube-calculator {
    --rc-primary: #2563eb;        /* 메인 색상 (파란색) */
    --rc-primary-hover: #1d4ed8;  /* 버튼 호버 색상 */
    --rc-bg: #ffffff;             /* 배경색 */
    --rc-text: #1f2937;           /* 텍스트 색상 */
    --rc-text-muted: #6b7280;     /* 보조 텍스트 */
    --rc-border: #d1d5db;         /* 테두리 */
    --rc-error: #dc2626;          /* 오류 메시지 */
    --rc-success: #16a34a;        /* 성공 메시지 */
}
```

### 소수점 자리수 변경

JavaScript에서 `toFixed()` 값을 수정하세요:

```javascript
// 기본: 소수점 2자리
volumeRounded.toFixed(2)

// 소수점 3자리로 변경
volumeRounded.toFixed(3)
```

## QA / 테스트 예시

**테스트 케이스 1:**
- 가로: `10` m
- 세로: `5` m
- 두께: `20` cm

**예상 결과:**
```
필요 루베: 10.00
```

**테스트 케이스 2:**
- 가로: `6` m
- 세로: `2` m
- 두께: `10` cm

**예상 결과:**
```
필요 루베: 1.20
```

**테스트 케이스 3:**
- 가로: `10` m
- 세로: `6` m
- 두께: `20` cm

**예상 결과:**
```
필요 루베: 12.00
```

## 주의사항

1. **단위 기준**: 
   - 가로/세로: 미터(m)로 입력
   - 두께: 센티미터(cm)로 입력 (내부적으로 m로 자동 변환)
2. **두께 입력 팁**: 
   - 20cm라면 → "20" 입력
   - 콘크리트 타설 두께가 보통 10~30cm이므로 cm 단위가 편리합니다
3. **루베란?**: 
   - 루베는 콘크리트 부피를 나타내는 단위입니다 (1 루베 = 1 m³)
4. **브라우저 호환성**: 모던 브라우저(Chrome, Firefox, Safari, Edge) 지원. IE는 미지원.
5. **CSS 충돌 방지**: 모든 클래스는 `rc-` 접두사를 사용하여 기존 사이트 스타일과 충돌하지 않습니다.
6. **복사 기능**: 클립보드 API를 사용하며, 지원하지 않는 브라우저는 자동으로 폴백 방식을 사용합니다.

## 계산식

```
가로(m) × 세로(m) × 두께(cm ÷ 100 → m) = 필요 루베
```

**루베(rube)**: 콘크리트 부피를 나타내는 단위로, 1 루베 = 1 m³

## 기술 스택

- 순수 HTML5
- 순수 CSS3 (CSS 변수, Flexbox, 미디어 쿼리)
- 순수 JavaScript (ES6+)
- 외부 라이브러리 없음
- 외부 CDN 없음
- 빌드 도구 불필요

## 라이선스

자유롭게 사용, 수정, 배포하세요.


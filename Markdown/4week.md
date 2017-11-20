# Mongoose

RDBMS의 ORM과 같은 개념, MongoDB엔 스키마가 없기 떄문에 스키마를 적용할 수 있게 된다.

<li> 몽구스 설치 : npm install --save mongoose
<li> 몽구스 auto imcresement : 오토 인크리스먼트

---

<br/>

# 뷰엔진 ejs vs jade 

<li> ejs : 기본적인 html 기반 (프론트 엔드와 연계가 쉬움)
<li> jade : jade 문법이 존재, (프론트 엔드와 연계가 어려움)

<br/>

<li> npm install --save ejs : ejs 설치 (ejs로 끝나는 템플릿 페이지를 연결해줌)
<li> npm install --save path : path 설치 (path는 경로를 찾아갈 수 있게 해줌)
 
<li> ejs 패스 설정 설정

```javascript

app.set('views', path.join(__dirname,'views')); // 현위치에 views 라는 폴더로 설정
app.set('view engine','ejs');

```

<br/>

---

# body-parser , morgan

<li> body-parser : form 에서 넘어온 데이터를 javascript 객체로 맵핑해줌
<li> morgan : post나 get 요청이  왔을시 console에 로깅 가능

<br/>

---

# 


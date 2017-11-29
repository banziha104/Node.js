# XSS 

<li> 글 등록시 <script>location.href</script>와 같이 페이지를 이동하게 하거나 매 초마다 목표사이트를 공격하게 하는
스크립트 삽입 또는 사이트 쿠키를 가로채고 전송

<li> script 삽입 iframe삽임, img

---

# CSRF

<li> 사용자가 자신의 의지와는 무관하게 글을 등록 수정 , 삭제를 서버에 요청

<li> npm install csruf --save
<li> npm install cookie-parser 

<li> 라우터의 미들웨어로 전달

```javascript
router.get('/products/write', csrfProtection, (req,res)=>{ //미들웨어로 넣음
   res.render('admin/form', {product : "", csrfToken : req.csrfToken}); //쿠키를 뷰로 전달
});
```

<li> HTML에서 보기

```html
    <input type="hidden" name="_csrf" value="<%=csrfToken%>"/>
```

---

# 미들웨어 만들기


```javascript
function testMiddleWare(req, res, next) {
    console.log("미들 웨어 작동");
    if (req.user){
        next();
    }else{
        res.redirect("login 페이지로 이동");
    }
    next();
}

/*app.js*/

app.use(testMiddleWare()); // 프로젝트 전체에 미들웨어로 작동함

/*admin.js*/
router.get('/',testMiddleWare(),(req,res) => {res.send('admin app 123')}); //해당 자바스크립트에서만 작동함
``` 

---

<br>

# multer

<li> 웹 파일 전송방식중 multipart/form-data 방식을 지원해줌

<li> DB 저장된 필드 수정
<li> uploads 폴더생성
<li> router처리
<li> view 처리
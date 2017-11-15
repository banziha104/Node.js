# MongoDB

<li> use exercise : 데이터베이스를 사용(없으면 생성, 컬렉션이 들어가기 전까지는 만들어지지 않음)
<li> show dbs : 데이터베이스 리스트 확인
<li> db.콜렉션명.drop() : 콜렉션 삭제
<li> db.dropDatabase() : 데이터 베이스 삭제
<li> 콜렉션 생성

```javascriptdb.createCollection("test",{
                 capped : true,
                 size : 2048000
             });

```

<li> db.콜렉션명.find() : 콜렉션 데이터 조회
<li> db.콜렉션명.find().pretty() :  조금더 편하게 조회
<li> db.콜렉션명.find({"writter" : "admin"}).pretty() : 조건 검색
<li> db.콜렉션명.find({"hit":{ $gt : 20}}).pretty() : 최소 20개 이상인 것을 검
<li> db.콜렉션명.find({"조건"},"보여줄 칼럼")

<br/>

---

# 비교 연산자

<li> $eq : 일치하는 값
<li> $gt : 큰 값
<li> $gte : 크거나 같은
<li> $lt : 작은
<li> $lte : 작거나 같은
<li> $ne : != 일치하지 않는 값
<li> $in : 배열 안에 속하는 경우
<li> $nin : 배열 안에 속하지 않는 경우

# commanjs

<li> module.exports.변수이름 = 값 : 모듈 내보내기
<li> require(파일) : 모듈 임포트


```javascript
var a = "hello";

module.exports.a = a;
module.exports.setA = ()=>{return "Return function"};

function Myvar() {
    this.name = "my Instance";
}

module.exports = Myvar;
```

```javascript

//index.js 

var myvar = require("./myvar");
var setVar = new myvar();
console.log(setVar.a);
console.log(setVar.setA());
console.log(setVar.name);

```

# Express

package.json : 안드로이드의 Gradle과 같이 프로젝트와 관련된 모듈 및 설정을 담당
npm init : package.josn 을 만듬
npm install --save express : express 설치

```javascript
var express = require('express'); //익스프레스 모듈 불러오기

var app = express(); //익스프레스 객체 생성
var port = 3000;     //포ㅡ 번호 설정

app.get('/',(req,res)=>{
   res.send('first app'); 
});

app.listen( port, ()=>{
   console.log('Express listening on port', port); 
});
```

# 앱 서버 띄우기

package.json의 스크립트 부분 변경

```javascript
  "scripts": {
    "start": "node app.js"
  },
```


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
<li> $in : 배열안에 속하는 경우
<li> $nin : 배열안에 속하지 않는 경우
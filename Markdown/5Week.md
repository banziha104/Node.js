# Mongoose
****
<li> findOne("조건") : 한줄불러오기

<li> ProductsModel.find( 조회조건 , function( err, products ) ) : 전체 조회
<li> 
var product = new ProductsModel({ 데이터 셋팅 })
product.save() : 저장

<li> ProductsModel.findOne( { 조회조건 }, functon( err, product ) ) : 한줄 조회
<li> ProductsModel.update( { 조회조건 } , {  바꿀변수들 } , function(err) ) : 수정
<li> ProductsModel.remove( { 조회조건 }, function(err) ) : 삭제

```javascript


```


<li> virtual : 호출되면 실행하는 함수

```javascript
//virtual 변수는 호출되면 실행하는 함수
// Object create 의 get과 set과 비슷함
//set은 변수의 값을 바꾸거나 셋팅하면 호출
// get은 getDate변수를 호출하는 순간 날짜 월일이 찍힌다.
ProductsSchema.virtual('getDate').get(function(){
    var date = new Date(this.created_at);
    return {
        year : date.getFullYear(),
        month : date.getMonth()+1,
        day : date.getDate()
    };
});

```

---

<br/>


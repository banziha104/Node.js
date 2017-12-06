# Promise

> 콜백헬 개선



```javascript
function printLater(number, fn) {
    setTimeout(
        function() { console.log(number); fn(); },
        1000
    );
}

printLater(1, function() {
    printLater(2, function() {
        printLater(3, function() {
            printLater(4);
        })
    })
});

```

> Promise 사용

```javascript
function printLater(number) {
    return new Promise( // new로 Promise 생성
        resolve => {
            setTimeout( // 1초뒤 실행하도록 설정
                () => {
                    console.log(number);
                    resolve(); // promise 종료
                },
                1000
            )
        }
    )
}


printLater(1)
.then(() => printLater(2))
.then(() => printLater(3))
.then(() => printLater(4))
.then(() => printLater(5))
.then(() => printLater(6))
```

---

<br />

# iteral & co

```javascript
function* iterFunc() {
  yield console.log("첫번째 출력");
  yield console.log("두번째 출력");
  yield console.log("세번째 출력");
  yield console.log("네번째 출력");
}

let iter = iterFunc();
iter.next(); // 첫번째 출력
iter.next(); // 두번째 출력

```

> co

```javascript
 let getData = co(function* (){//co파라미터로 제너레이터 전달
        let product = yield ProductsModel.findOne( { 'id' :  req.params.id }).exec();
   
        return {
            product : yield ProductsModel.findOne( { 'id' :  req.params.id }).exec(),
            comments : yield CommentsModel.find( { 'product_id' :  req.params.id }).exec();
        };
    });
    getData.then( function(result){
        res.render('admin/productsDetail', { product: result.product , comments : result.comments });
    });
    
```

# asycn await

1. co(function*) 부분은 async로
2. yield 부분은 await
3. 리턴함수인자로 바꿈


```javascript
 let getData = async => ({                          //co파라미터로 제너레이터 전달
            product : await ProductsModel.findOne( { 'id' :  req.params.id }).exec(),
            comments : await CommentsModel.find( { 'product_id' :  req.params.id }).exec();
    });

    getData.then( function(result){
        res.render('admin/productsDetail', { product: result.product , comments : result.comments });
    });
    
```

<br />

---

# 위지웍에디터, 서머노트
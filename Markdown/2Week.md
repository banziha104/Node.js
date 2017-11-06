# 즉시실행 익명함수

함수 선언 + 함수 선

# 콜백패턴 


# 메서드 체이닝

메서드안 함수를 이어서 사용

구현법 

```javascript
return this;
```

예

```javascript
var account = {
    id : "",
    password : "",
    setId : function(myId){
        this.id = myId;
        return this;
    },
    setPassword : function(myPassword){
        this.password = myPassword;
        return this;
    },
    print : function(){
        console.log("id : " + this.id);
        console.log("password :" + this.password);
    }
};
account.setId('abc').setPassword('1234');
account.print();
 
```
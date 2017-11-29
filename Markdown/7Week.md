# 암호화 기법

<li> Ciper 방식 : 평문 -> 암호문 -> 복호문, 암호 복원가능
<li> Hmac 방식 : 복원불가능
<li> form에서 입력된 정보 + salt(의미 없는 값)을 더한 후 sha512 암호화 기법으로 해시를 만들어 제공

---

<br>

# 암호화 모듈 만들기

```javascript
let crypto = require('crypto'); //모듈
let mysalt = "fastcampus"; //의미없는 값

module.exports = (password) =>{
  return crypto.createHash('sha512').update(password + mysalt).digest('base64');
};
```
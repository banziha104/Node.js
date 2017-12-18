# 주소록연동 

1. 팝업방식
2. iframe 방식
3. 지도와 함께보여주는 방식

# Request 모듈 

> node.js에서 크롤링하는 모듈

```javascript
request(url, (error, response, body) => {
    //한글 변환
    var $ = cheerio.load(body, { decodeEntities: false });

    var tdElements = $(".board_area").find("table.mb15 tbody tr td"); //td의 데이터를 전부 긁어온다
    // console.log(tdElements) 로 찍어본다.

    //한 row가 4개의 칼럼으로 이루어져 있으므로
    // 4로 나눠서 각각의 줄을 저장한 한줄을 만든다
    for( var i=0 ; i<tdElements.length ; i++ ){

      if(i%4===0){
        var temp = {}; //임시로 한줄을 담을 변수
        temp["step"] = removeEmpty(tdElements[i].children[0].data);
        //removeEmpty의 경우 step의 경우 공백이 많이 포함됨
      }else if(i%4===1){
        temp["date"] = tdElements[i].children[0].data;
      }else if(i%4===2){

        //여기는 children을 1,2한게 배송상태와 두번째줄의 경우 담당자의 이름 br로 나뉘어져있다.
        // 0번째는 배송상태, 1은 br, 2는 담당자 이름
        temp["status"] = tdElements[i].children[0].data;
        if(tdElements[i].children.length>1){
          temp["status"] += tdElements[i].children[2].data;
        }

      }else if(i%4===3){
        temp["location"] = tdElements[i].children[1].children[0].data;
        result.push(temp); //한줄을 다 넣으면 result의 한줄을 푸시한다
        temp = {}; //임시변수 초기화
      }
    }
```

# cheerio 모듈

> jquery 방식으로 DOM을 가져옮.

```javascript
var $ = cheerio.load(body, { decodeEntities: false });
```
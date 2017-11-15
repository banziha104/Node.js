import $ from 'jquery'

var num = 2;
var num2: number = 2;

let boolArray : boolean[] = [];
boolArray.push(true);

let ab : any = 30;
class A{

}
enum Level {
    B,
    S,
    G
}
var a = (a,b) => {return a+b};

class Base{
    public x : number;
    private y : number;
    protected z : number;
}
var b = new Base();
class Childe extends Base{
    constructor(){
        super();
        this.z;
    }
}

class Person{
    constructor(public name : string){

    }
}


interface Name{ //Name이라는 형태의 자료형이 가지고있는 스트럭쳐를 구성
    first : string, //속성
    second : string
}
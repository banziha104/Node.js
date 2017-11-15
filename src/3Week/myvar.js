var a = "hello";

module.exports.a = a;
module.exports.setA = ()=>{return "Return function"};

function Myvar() {
    this.name = "my Instance";
}

module.exports = Myvar;
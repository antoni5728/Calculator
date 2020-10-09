//все числа будут типа стринг
function isNumber(str){
	return !isNaN(str);
}
//console.log("10 isNumber "+isNumber("10"));
//console.log("ab isNumber "+isNumber("ab"));

//отрицательные числа будут стринги с первым символом минус
function isNegative(num){
	return num.charAt(0)==="-";
}
//console.log("-1 isNegative "+isNegative("-1"));
//console.log("1 isNegative "+isNegative("1"));

function isZero(num){
	return num==="0"|| num==="-0";
}
//console.log("0 isZero "+isZero("0"));
//console.log("-0 isZero "+isZero("-0"));
//console.log("1 isZero "+isZero("1"));

function convertToPositive(num){
	if(isNegative(num)){
		return num.substring(1);
	}else{
		return num;
	}
}
//console.log("-10 convertToPositive "+convertToPositive("-10"));
//console.log("110 convertToPositive "+convertToPositive("110"));

function convertToNegative(num){
	if(isNegative(num)){
		return num;
	}else{
		return "-"+num;
	}
}
//console.log("-10 convertToNegative "+convertToNegative("-10"));
//console.log("10 convertToNegative "+convertToNegative("10"));

function compare(n1, n2){
	if(n1===n2){
		return 0;
	}else if(isNegative(n1)&&!isNegative(n2)){
		return -1;
	}else if(!isNegative(n1)&&isNegative(n2)){
		return 1;
	}else{
		let isTwoNegative = isNegative(n1)&&isNegative(n2);
		if(isTwoNegative){
			let tmp = convertToPositive(n1);
			n1 = convertToPositive(n2);
			n2 = tmp;
		}
		if(n1.length>n2.length){
			return 1;
		}else if(n1.length<n2.length){
			return -1;
		}else{
			for(let i=0; i<n1.length; ++i){
				let num1 = parseInt(n1.charAt(i));
				let num2 = parseInt(n2.charAt(i));
				if(num1>num2){
					return 1;
				}else if(num1<num2){
					return -1;
				}else{
					continue;
				}
			}
		}
	}
}
//test("200:10", 1, compare("200", "10"));
//test("10:200", -1, compare("10", "200"));
//test("10:10", 0, compare("10", "10"));
//test("999:9", 1, compare("999", "9"));
//test("9:999", -1, compare("9", "999"));
//test("-9:999", -1, compare("-9", "999"));
//test("9:-999", 1, compare("9", "-999"));
//test("9:-9", 1, compare("9", "-9"));
//test("-9:9", -1, compare("-9", "9"));
//test("-9:-9", 0, compare("-9", "-9"));
//test("-9:-8", -1, compare("-9", "-8"));
//test("-8:-9", 1, compare("-8", "-9"));

function verify(n1,n2){
	if(!isNumber(n1)||!isNumber(n2)){
		throw new Error("not a number");
	};
	
}
//console.log(verify("abc"));

function test(msg, expected, actual){
	console.log(msg,Boolean(expected===actual));
}
//test("false=","0","1");
//test("true=","0","0");


function plus(n1, n2){
	verify(n1,n2);
	let result="";
	let d=0;
	let length=n1.length>n2.length?n1.length:n2.length;
	let isResultNegative = false;
	if(isZero(n1)){
		return n2;
	}else if(isZero(n2)){
		return n1;
	}else if(isNegative(n1)&&isNegative(n2)){
		isResultNegative = true;
		n1 = convertToPositive(n1);
		n2 = convertToPositive(n2);
	}else if(!isNegative(n1)&&isNegative(n2)){
		return minus(n1, convertToPositive(n2));
	}else if(isNegative(n1)&&!isNegative(n2)){
		return minus(n2, convertToPositive(n1));
	}
	
	for(let i=n1.length-1,j=n2.length-1;i>=0||j>=0;--i,--j){
		let num1=0;
		let num2=0;
		if(i>=0){
			num1=parseInt(n1.charAt(i));
		}
		if(j>=0){
			num2=parseInt(n2.charAt(j));
		}
		let num=num1 + num2 + d;
		if(num>9){
			d=1;
			result+=(num-10).toString();
		}else{
			d=0;
			result+=num.toString();
		}
	}
	if(d===1){
		result+="1";
	}
	if(isResultNegative){
		result+="-"; 
	}
	result=result.split("").reverse().join("");
	return result;
}
//test("0+0", "0", plus("0", "0"));
//test("0+1", "1", plus("0", "1"));
//test("1+0", "1", plus("1", "0"));
//test("1+1", "2", plus("1", "1"));
//test("9+9", "18", plus("9", "9"));
//test("999+9", "1008", plus("999", "9"));
//test("9+999", "1008", plus("9", "999"));
//test("-9+(-9)", "-18", plus("-9", "-9"));
//test("-999+(-9)", "-1008", plus("-999", "-9"));
//test("-9+(-999)", "-1008", plus("-9", "-999"));
//test("-9+(+100)", "91", plus("-9", "100"));
//test("+100+(-9)", "91", plus("100", "-9"));
//test("+9+(-100)", "-91", plus("9", "-100"));
//test("-100+(+9)", "-91", plus("-100", "9"));


function minus(n1, n2){
	verify(n1, n2);
	let result="";
	let isResultNegative=false;
	if((isZero(n1)&&isZero(n2))||(n1===n2)){
		return "0";
	}else if(isZero(n1)&&!isZero(n2)){
		return n2;
	}else if(!isZero(n1)&&isZero(n2)){
		return n1;
	}else if(isNegative(n1)&&!isNegative(n2)){
		return "-"+plus(convertToPositive(n1),n2);	
	}else if(isNegative(n2)&&!isNegative(n1)){
		return plus(n1,convertToPositive(n2));
	}else {
		isResultNegative=compare(n1, n2)===-1;
		let num1=convertToPositive(n1);
		let num2 =convertToPositive(n2);
		if(compare(num1, num2)===-1){
			n1 = num2;
			n2 = num1;
		}else{
			n1 = num1;
			n2 = num2;
		}
		let d = 0;
		for(let i = n1.length-1, j = n2.length-1;i>=0||j>=0; --i, --j){
			let num1 = 0;
			let num2 = 0;
			if(i>=0){
				num1 = parseInt(n1.charAt(i));
			}
			if(j>=0){
				num2 = parseInt(n2.charAt(j));
			}
			let num = 10+num1-num2-d;
			if(num<10){
				d = 1;
				result+=num.toString();
			}else{
				d = 0;
				result+=num.toString().charAt(1);
			}			
		}
		result = result.split("").reverse().join("");
		if(result.length>1&&result.charAt(0)==="0"){
			for(let i = 0;i<result.length; ++i){
				if(result.charAt(i)!=="0"){
					result = result.substring(i);
					break;
				}
			}
		}
		if(isResultNegative){
			result = "-"+result;
		}
		return result;
	}
}
//test("0-0","0", minus("0","0"));
//test("+20-+20","0", minus("20","20"));
//test("-20--20","0", minus("-20","-20"));
//test("0-+20","20", minus("0","20"));
//test("+20-0","20", minus("20","0"));
//test("0--20","-20", minus("0","-20"));
//test("-20-0","-20", minus("-20","0"));
//test("-20-+40","-60", minus("-20","40"));
//test("+20--40","60", minus("20","-40"));
//test("+9--99","108", minus("9","-99"));
//test("-9-+99","-108", minus("-9","99"));
//test("99--9","108", minus("99","-9"));
//test("-99-+9","-108", minus("-99","9"));
//test("-99--9","-90", minus("-99","-9"));
//test("+99-+9","90", minus("99","9"));
//test("-99--100","1", minus("-99","-100"));
//test("+99-+100","-1", minus("99","100"));
//test("+9-+100","-91", minus("9","100"));
//test("-9--100","91", minus("-9","-100"));
//test("-100--9","-91", minus("-100","-9"));

function multiply(n1, n2){
	let result = "0";
	let isResultNegative = false;
	if((isNegative(n1)&&!isNegative(n2))||(!isNegative(n1)&&isNegative(n2))){
		isResultNegative = true;
	}
	n1 = convertToPositive(n1);
	n2 = convertToPositive(n2);
	if(isZero(n1)||isZero(n2)){
		return "0";
	}	
	for(let i = n2;!isZero(i);i = minus(i,"1")){
		result = plus(result, n1);
	}
	if(isResultNegative){
		result = "-"+result;
	}
	return result;
}

//test("0*0", "0", multiply("0", "0"));
//test("1*0", "0", multiply("1", "0"));
//test("0*1", "0", multiply("0", "1"));
//test("2*1", "2", multiply("2", "1"));
//test("1*2", "2", multiply("1", "2"));
//test("100*2", "200", multiply("100", "2"));
//test("2*100", "200", multiply("2", "100"));
//test("-2*-1", "2", multiply("-2", "-1"));
//test("-1*-2", "2", multiply("-1", "-2"));
//test("-100*-2", "200", multiply("-100", "-2"));
//test("-2*-100", "200", multiply("-2", "-100"));
//test("-2*1", "-2", multiply("-2", "1"));
//test("1*-2", "-2", multiply("1", "-2"));
//test("-100*2", "-200", multiply("-100", "2"));
//test("-2*100", "-200", multiply("-2", "100"));

function division(n1 ,n2){
	verify(n1, n2 );	
	if(isZero(n2)){
		throw new Error("division by 0");
	}
	if(isZero(n1)){
		return "0";
	}
	let result = "0";
	let isResultNegative = (!isNegative(n1)&&isNegative(n2))||(isNegative(n1)&&!isNegative(n2));
	if(n2==="1"){
		return n1;
	}else if(n2==="-1"){
		return isNegative(n1)?convertToPositive(n1):convertToNegative(n1);
	}
	n1 = convertToPositive(n1);
	n2 = convertToPositive(n2);
	let i = n1;
	do{
		i = minus(i, n2);
		if(!isNegative(i)){
			result = plus(result, "1");
		}
	}while(!isNegative(i)&&!isZero(i));
	if(isResultNegative){
		result = convertToNegative(result);
	}
	return result;	
}

//test("0/1", "0", division("0", "1"));
//test("0/5", "0", division("0", "5"));
//test("1/1", "1", division("1", "1"));
//test("0/-1", "0", division("0", "-1"));
//test("0/-5", "0", division("0", "-5"));
//test("1/-1", "-1", division("1", "-1"));
//test("-1/-1", "1", division("-1", "-1"));
//test("10/5", "2", division("10", "5"));
//test("10/-5", "-2", division("10", "-5"));
//test("-10/-5", "2", division("-10", "-5"));
//test("1/2", "0", division("1", "2"));
//test("5/2", "2", division("5", "2"));
//test("10000/2", "5000", division("10000", "2"));

let currentNum = "0";
let currentOp = null;
let lastNum = null;
let lastOp = null;
let isLastClickOp = false;
const OP_PLUS = 1;
const OP_MINUS = 2;
const OP_MULTIPLY = 3;
const OP_DIVISION = 4;
const OP_RESULT  = 5;	

function setOperation(op){
	if (!isLastClickOp&&lastOp!==null){		
		makeOp();
		lastOp = null;
	}else{
		lastNum = currentNum;	
	}
	currentOp = op;
	lastOp = currentOp;
	isLastClickOp = true;
	if(op===OP_RESULT){
		lastOp = null;
		currentOp = null;
		lastNum = null;
	}
}

function setPlusOp(){
	setOperation(OP_PLUS);
	updateDisplay();
}

function setMinusOp(){
	setOperation(OP_MINUS);
	updateDisplay();
}

function setMultiplyOp(){
	setOperation(OP_MULTIPLY);
	updateDisplay();
}

function setDivisionOp(){
	setOperation(OP_DIVISION);
	updateDisplay();
}

function setResultOp(){
	setOperation(OP_RESULT);
	updateDisplay();
}

function makeOp(){
	if(currentOp===OP_PLUS){
		lastNum = plus(lastNum, currentNum);
		currentNum = lastNum;
	}
	if(currentOp===OP_MINUS){
		lastNum = minus(lastNum, currentNum);
		currentNum = lastNum;
	}
	if(currentOp===OP_MULTIPLY){
		lastNum = multiply(lastNum, currentNum);
		currentNum = lastNum;
	}
	if(currentOp===OP_DIVISION){
		lastNum = division(lastNum, currentNum);
		currentNum = lastNum;
	}
}

function updateCurrentNum(num){
	verify(num, num);	
	if(isLastClickOp){
		currentNum = num;
		isLastClickOp = false;
	}else if(currentNum==="0"&&num!=="0"){
		currentNum = num;
	}else if(currentNum.length>0&&currentNum!=="0"&&!isMax()){
		currentNum+=num;
	}
	updateDisplay();
}

function updateDisplay(){
	let ele = document.getElementById("displayId");
	ele.innerHTML = currentNum;
	updateMax();
}

function switchNum(){
	if(isZero(currentNum)){
		return;
	}
	if(isNegative(currentNum)){
		currentNum = convertToPositive(currentNum);		
	}else{
		currentNum = convertToNegative(currentNum);
	}
	updateDisplay();
}

function isMax(){
	return currentNum.length>=10;
}

function updateMax(){
	let ele = document.getElementById("maxId");
	if(isMax()){
		ele.innerHTML = "max";
	}else{
		ele.innerHTML = "";
	}
}
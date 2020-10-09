const IS_RUN_ALL_TEST = true;

const RUN_NUMBER_TEST = false;
const RUN_NUMPAD_TEST = true;
const RUN_BTN_TEST = false;
/*=======================
| run all tests         |
=======================*/
runTests();
function runTests(){
	if(!IS_RUN_ALL_TEST) return;
	runBTNTests();
	runNumpadTests();
	runNumberTests();
}

/*=======================
| unit test function    |
=======================*/
function startTestsMsg(className){
	console.log(">>>>>>>>>>>>>>>>>>>> Run "+className+" tests");
}
function redLog(msg){
	console.log("%c" + msg, "color: red");
}
function greenLog(msg){
	console.log("%c" + msg, "color: green");
}
function generateTestLog(testResult, actual, expected, className, initVals, functName, functParams, isErrorExpected, err){
	let msg = "TEST: expected:["+expected+"] actual:["+actual+"]";
	let errDetails = err?"\n\terror:["+err.toString()+"]": "";
	let details = "\n\tclassName:["+className+"] initVals:["+initVals+"]\n\tfunctName:["+functName+"] functParams:["+functParams+"]\n\tisErrorExpected:["+isErrorExpected+"]";
	if(testResult){
		greenLog(msg+errDetails);
	}else{
		redLog(msg+details+errDetails);
	}	
}
function test(expected, className, initVals, functName, functParams, isErrorExpected=false){
	let actual;
	initVals = initVals? initVals: [];
	functParams = functParams? functParams: [];
	let testResult = false;
	try{	
		let obj = eval(className);
		if(initVals.length>3){
			throw new Error("error, max 3 initVals");
		}	
		if(initVals.length===3){
			obj = new obj(initVals[0], initVals[1], initVals[2]);
		}else if(initVals.length===2){
			obj = new obj(initVals[0], initVals[1]);
		}else if(initVals.length===1){
			obj = new obj(initVals[0]);
		}else{
			obj = new obj();
		}
		if(functName){
			if(functParams.length>3){
				throw new Error("error, max 3 functParams");
			}			
			if(functParams.length===3){
				actual = obj[functName](functParams[0], functParams[1], functParams[2]);
			}else if(functParams.length===2){
				actual = obj[functName](functParams[0], functParams[1]);
			}else if (functParams.length===1){
				actual = obj[functName](functParams[0]);
			}else{
				actual = obj[functName]();
			}
		}			
		actual = actual!== undefined? actual instanceof Object? actual.toString():actual:obj.toString();
		testResult = !isErrorExpected?expected===actual:false;
		generateTestLog(testResult, actual, expected, className, initVals, functName, functParams, isErrorExpected);						
	}catch(err){
		testResult = err instanceof MyError && isErrorExpected;
		generateTestLog(testResult, actual, expected, className, initVals, functName, functParams, isErrorExpected, err);
	}
}
function generateTestTag(testHtmlId){
	let ele = document.createElement("div");
	ele.id = testHtmlId;
	ele.style.cssText = 'width: 200px; height: 200px; background-color: red; z-index: 999;';
	document.body.appendChild(ele);
	return ele;
}
function removeTestTag(ele){
		document.body.removeChild(ele);
}
function eventFire(ele, etype){
  if (ele.fireEvent) {
    ele.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    ele.dispatchEvent(evObj);
  }
}

/*=======================
| BTN test function     |
=======================*/
function runBTNTests(){
	let className = "BTN";
	if(!RUN_BTN_TEST){
		return;
	}
	startTestsMsg(className);
	test("5,id5,name5", className, ["5", "id5", "name5"],"toString");	
	test(null, className, ["", "id5", "name5"],"toString",null,true);	
	test(null, className, ["5", "", "name5"],"toString",null,true);	
	test(null, className, ["5", "id5", ""],"toString",null,true);	
	test("5", className, ["5", "id5", "name5"],"getValue");	
	test("id5", className, ["5", "id5", "name5"],"getHtmlId");	
	test("name5", className, ["5", "id5", "name5"],"getName");
	BTNInitDOMElementTest();
	
}
function BTNInitDOMElementTest(){
	let testValue = "testValue";
	let testHtmlId = "testHtmlId";
	let testName = "testName";
	let btn = new BTN(testValue, testHtmlId, testName);	
	let ele = generateTestTag(testHtmlId);
	let cb = function(){
		console.log("cb on click btn");
	};	
	let msg = "TEST: call: BTN.initDOMElement() innerHTML:"+ele.innerHTML+" onclick:["+ele.onclick+"]";
	let isError = false;
	try{
		btn.initDOMElement(cb);		
	}catch(err){
		msg = "Was error "+msg;
		isError = true;
	}
	
	if(!isError&&ele.innerHTML===testName&&ele.onclick===cb){
		greenLog(msg);
	}else{
		redLog(msg);
	}	
	removeTestTag(ele);
}

/*=======================
| numpad test function  |
=======================*/

function runNumpadTests(){
	let className = "Numpad";
	if(!RUN_NUMPAD_TEST) return;
	let testVal1 = "testVal1";
	let testId1 = "testId1";
	let testName1 = "testName1";
	let testVal2 = "testVal2";
	let testId2 = "testId2";
	let testName2 = "testName2";
	let valuesIdsNames = [[testVal1, testId1, testName1], [testVal2, testId2, testName2]];
	let ele1;
	let ele2;
	let testCb;
	let expected;
	
	startTestsMsg(className);
	test("MyError", className, ["5", null], "toString", [], true);
	test("MyError", className, [ null, ()=>{}], "toString", [], true);
	
	ele1 = generateTestTag(testId1);
	ele2 = generateTestTag(testId2);
	expected = [new BTN(testVal1, testId1, testName1), new BTN(testVal2, testId2, testName2)];
	test(expected.toString(), className, [ valuesIdsNames, ()=>{}], "getBtns", []);
	removeTestTag(ele1);
	removeTestTag(ele2);
	
	ele1 = generateTestTag(testId1);
	ele2 = generateTestTag(testId2);
	expected = [new BTN(testVal1, testId1, testName1), new BTN(testVal2, testId2, testName2)];
	let clickedBtnId = expected[0].getHtmlId();
	testCb = (clickedBtn)=>{
		if(clickedBtn.getHtmlId()===clickedBtnId){
			greenLog("clickedBtnId confirm");
		}else{
			redLog("clickedBtnId not confirm clickedBtn:"+clickedBtn.toString());
		}
	};
	new Numpad(valuesIdsNames, testCb);
	eventFire(ele1, "click");
	removeTestTag(ele1);
	removeTestTag(ele2);
}

/*=======================
| number test function  |
=======================*/

function runNumberTests(){
	let className = "Number";
	if(!RUN_NUMBER_TEST) return;
	
	startTestsMsg(className);
	test("0", className, ["0"],"toString");
	test("0", className, [null],"toString");
	test("0", className, [undefined],"toString");
	test("MyError", className, ["abc"],"toString", [], true);
	test("MyError", className, [22],"toString", [], true);
	test("-22", className, ["-22"]);
	test("22", className, ["22"]);
	test(true, className, ["0"], "isZero");
	test(true, className, ["-0"], "isZero");
	test(false, className, ["22"], "isZero");
	test(false, className, ["1"], "isNegative");
	test(true, className, ["-1"], "isNegative");
	test(false, className, ["-1"], "isPositive");
	test(true, className, ["1"], "isPositive");
	test("-1", className, ["-1"], "convertToNegative");
	test("-1", className, ["1"], "convertToNegative");
	test("1", className, ["1"], "convertToPositive");
	test("1", className, ["-1"], "convertToPositive");
	test("2", className, ["-1"], "setNumber", "2");
	test("-1", className, ["-1"], "getNumber");
	test((new Number()).max, className, ["-1"], "getMax");
	test((new Number()).min, className, ["-1"], "getMin");
	test("MyError", className, ["-1"], "compare", [""], true);
	test("MyError", className, ["-1"], "compare", [20], true);
	test(-1, className, ["10"], "compare", [new Number("20")]);
	test(0, className, ["20"], "compare", [new Number("20")]);
	test(1, className, ["30"], "compare", [new Number("20")]);
	test(-1, className, ["-30"], "compare", [new Number("-20")]);
	test(0, className, ["-20"], "compare", [new Number("-20")]);
	test(1, className, ["-10"], "compare", [new Number("-20")]);
	test(1, className, ["10"], "compare", [new Number("-20")]);
	test(-1, className, ["-10"], "compare", [new Number("20")]);
	test(true, className, ["30"], "bt", [new Number("20")]);
	test(false, className, ["10"], "bt", [new Number("20")]);
	test(true, className, ["10"], "lt", [new Number("20")]);
	test(false, className, ["30"], "lt", [new Number("20")]);
	test(false, className, ["30"], "equal", [new Number("20")]);
	test(true, className, ["20"], "equal", [new Number("20")]);
	test(true, className, ["20"], "lqt", [new Number("20")]);
	test(true, className, ["10"], "lqt", [new Number("20")]);
	test(false, className, ["30"], "lqt", [new Number("20")]);
	test(false, className, ["10"], "bqt", [new Number("20")]);
	test(true, className, ["20"], "bqt", [new Number("20")]);
	test(true, className, ["30"], "bqt", [new Number("20")]);
	test("0", className, ["30"], "reset");
	test(false, className, ["30"], "isMax");
	test(true, className, [(new Number()).max], "isMax");
	test(true, className, [(new Number()).max+"9"], "isMax");
	test(true, className, [(new Number()).min+"9"], "isMin");
	test(true, className, [(new Number()).min], "isMin");
	test(false, className, ["2"], "isMin");	
}

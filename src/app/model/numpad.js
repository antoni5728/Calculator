class Numpad{
	btns;
	constructor(valuesIdsNames, calculatorCb){
		if(!valuesIdsNames || !calculatorCb){
			throw new MyError("Error need all params!");
		}
		this.btns = [];
		for(let i = 0; i<valuesIdsNames.length; ++i){
			let arr = valuesIdsNames[i];
			let btn = new BTN(arr[0], arr[1], arr[2]);
			let cb = function(){
				calculatorCb(btn);
			};
			btn.initDOMElement(cb);
			this.btns.push(btn);
		}
	}
	getBtns(){
		return this.btns;
	}
	toString(){
		return "clickedBtn:"+this.clickedBtn+" btns:["+this.btns+"]";
	}
}


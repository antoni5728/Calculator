class Display{
	displayId;
	maxId;
	isMax = false;
	constructor(displayId, maxId){
		if(!displayId || !maxId){
			throw new MyError("displayId and maxId must exist");
		}else if((typeof displayId !=="string") || (typeof maxId!=="string")){
			throw new MyError("displayId and maxId must be String");
		}
		this.displayId = displayId;
		this.maxId = maxId;
	}
	toString(){
		return this.displayId+","+this.maxId;
	}
	show(num){
		if(!num || !(num instanceof Number)){
			throw new MyError("num must be Number");
		}
		if(num.isMax()){
			this.setMaxValue("max");
		}else if(num.isMin()){
			this.setMaxValue("min");
		}else{
			this.setMaxValue("");
		}
		this.setDisplayValue(num.isZero()? new Number(): num);
	}
	getDisplayElement(){
		return document.getElementById(this.displayId);
	}
	getMaxElement(){
		return document.getElementById(this.maxId);
	}
	setDisplayValue(value){
		if(!value || !(value instanceof Number)){
			throw new MyError("value must be Number");
		}
		this.getDisplayElement().innerHTML = value.getNumber();
	}
	setMaxValue(value){
		if((value === undefined) || (typeof value !== "string")){
			throw new MyError("value must be String");
		}
		this.getMaxElement().innerHTML = value;
	}
}
class BTN{
	value;
	htmlId;
	name;
	constructor(value, htmlId, name){
		if(!value||!htmlId||!name){
			throw new MyError("value:["+value+"] htmlId:["+htmlId+"] name:["+name+"] msg:need all params]");
		}
		this.value = value;
		this.htmlId = htmlId;
		this.name = name;
	}
	toString(){
		return this.value+","+this.htmlId+","+this.name;
	}
	getValue(){
		return this.value;
	}
	getHtmlId(){
		return this.htmlId;
	}
	getName(){
		return this.name;
	}
	initDOMElement(cbOnClick){
		let ele = document.getElementById(this.htmlId);
		ele.innerHTML = this.name;
		ele.onclick = cbOnClick;
	}	
}
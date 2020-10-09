class Number{
	number;
	max = "9999999999";
	min = "-"+this.max;
	constructor(n){	
		if(n){
			if(isNaN(n)){
				throw new MyError("Not a number!");
			}
			if(typeof n!=="string"){
				throw new MyError("Not a string!");
			}
			this.number = n;
		}else{
			this.number = "0";
		}				
	}
	toString(){
		return this.number;
	}
	isZero(){
		return this.number==="0"||this.number==="-0"||this.number==="+0";
	}
	isNegative(){
		return this.number.charAt(0)==="-";
	}
	convertToNegative(){
		if(this.isPositive()){
			this.number = "-"+this.number;
		}
	}
	isPositive(){
		return !this.isNegative();
	}
	convertToPositive(){
		if(this.isNegative()){
			this.number = this.number.substring(1);
		}
	}
	getNumber(){
		return this.number;
	}
	setNumber(n){
		let num = new Number(n);
		this.number = num.number;
	}
	getMax(){
		return this.max;
	}
	getMin(){
		return this.min;
	}
	compare(number){
		if(typeof number!==typeof this){
			throw new MyError("Compare only with class Number!");
		}
		let n1 = this.number;
		let n2 = number.number;
		if(n1===n2){
			return 0;
		}else if(this.isNegative()&&number.isPositive()){
			return -1;
		}else if(this.isPositive()&&number.isNegative()){
			return 1;
		}else{
			let isTwoNegative = this.isNegative()&&number.isNegative();
			if(isTwoNegative){
				n1 = new Number(number.number);
				n2 = new Number(this.number);
				n1.convertToPositive();
				n2.convertToPositive();
				n1 = n1.number;
				n2 = n2.number;
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
	bt(number){
		return this.compare(number)===1;
	}
	lt(number){
		return this.compare(number)===-1;
	}
	equal(number){
		return this.compare(number)===0;
	}
	bqt(number){
		return this.bt(number)||this.equal(number);
	}
	lqt(number){
		return this.lt(number)||this.equal(number);
	}
	notEqual(number){
		return !this.equal(number);
	}
	reset(){
		this.number = "0";
	}
	isMax(){
		return this.bqt(new Number(this.max));
	}
	isMin(){
		return this.lqt(new Number(this.min));
	}
}




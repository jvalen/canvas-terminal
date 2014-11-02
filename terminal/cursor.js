/**
 * Create a cursor classs
 * @class cursor Implement a flashing terminal cursor like
 * @param {object} context A canvas context
 * @param {String} customSymbol Cursor symbol
 * @param {String} fontStyle CSS font-style
 * @returns {cursor}
 */
var cursor = function (context, customSymbol, fontStyle) {
	var ctx = context,
        x = new Number(0),
        y = new Number(0),
        cursorActive = new Boolean(true),
        symbol = !!customSymbol ? customSymbol : '_',
        style = fontStyle,
        cursorWidth = ctx.measureText(symbol).width,        
        cursorHeight = measureFontHeight(style);
	
	function changeState () {
		cursorActive = !cursorActive;
	}
	
	this.draw = function (xPos,yPos) {			
		changeState();	
		if (cursorActive) {			
			ctx.fillText(symbol, xPos, yPos);
			x = xPos;
			y = yPos;
		}	
		else {            			
            this.erase(xPos,yPos);
		}
	};
    
	this.erase = function (xPos,yPos) {
        ctx.clearRect(xPos, yPos - cursorHeight, cursorWidth, cursorHeight);        
	};
};
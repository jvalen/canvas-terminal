/**
 * Create a cursor of a command line
 * @class cursor Implement a flashing terminal cursor like
 * @param {object} context A canvas context
 * @param {String} customSymbol Cursor symbol
 * @param {String} fontStyle CSS font-style
 * @param {Integer} lHeight Line height
 */
var cursor = function (context, customSymbol, fontStyle, lHeight) {
	var ctx = context,
        x = new Number(0),
        y = new Number(0),
        cursorActive = new Boolean(true),
        symbol = !!customSymbol ? customSymbol : '_',
        style = fontStyle,
        cursorWidth = measureCharWidth(ctx, symbol),
        cursorHeight = measureFontHeight(style),
        lineHeight = lHeight;

    /**
     * Draw the cursor
     * @param {integer} xPos
     * @param {integer} yPos
     */
	this.draw = function (xPos,yPos) {			
		changeState();	
		if (cursorActive) {			
			ctx.fillText(symbol, xPos, yPos);
			x = xPos;
			y = yPos;
		}	
		else {            			
            this.erase(xPos - 1, yPos); //FIXME: 1px error offset
		}
	};
    
    /**
     * Erase the cursor
     * @param {integer} xPos
     * @param {integer} yPos
     */
	this.erase = function (xPos, yPos) {
        ctx.clearRect(xPos, yPos - (cursorHeight + (cursorWidth/2)), cursorWidth, cursorHeight + lineHeight);
	};
    
    /**
     * Toggle cursor state (show/hidden)
     * @private
     */
	function changeState () {
		cursorActive = !cursorActive;
	}    
};
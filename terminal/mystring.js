/**
 * Defines the current command of the terminal
 * @class MyString
 * @param {type} context
 * @param {type} text
 * @param {type} p
 * @param {type} xPosOffset
 * @param {type} yPosOffset
 * @param {type} w
 * @param {type} tsize
 * @param {Integer} lHeight Line height
 */
var MyString = function (context, text, p, xPosOffset, yPosOffset, w, tsize, lHeight){
	var ctx = context,
        txt = new String(text),
        cursor = p,
        indentOffset = 20,
        newLineOffset = 5,
        lineHeight = lHeight,
        x = xPosOffset + indentOffset,
        y = yPosOffset + indentOffset,
        limit = w - (xPosOffset + indentOffset * 2),
        characterHeight = tsize,        
        cursorListenerId = 0,
        initialData = {
            xPosOffset: x,
            yPosOffset: y
        },
        cursorDistanceToLastChar = 4,
        cursorSpeed = 400;
        
    /**
     * Reset command
     */
	this.reset = function() {
		txt = new String(text);
        x = initialData.xPosOffset;
        y = initialData.yPosOffset;
        ctx.fillText(">", x - indentOffset, y);
	};    
	
    /**
     * Returns 'y' position
     * @returns {integer} y
     */
	this.returnYpos = function() {
		return y;
	};
	
    /**
     * Returns cursor id
     * @returns {integer}
     */
	this.returnIdCursor = function() {
		return cursorListenerId;
	};
    
	/**
     * Draw a prompt symbol
     */
	this.crPrompt = function() {
		ctx.fillText(">", x - indentOffset, y);
	};
	
    /**
     * Start cursor loop
     */
	this.cursorLoop = function() {        
		cursorListenerId = setInterval(function(){
			var textSize = ctx.measureText(txt);	
			cursor.draw(x + textSize.width + cursorDistanceToLastChar, y);
		},cursorSpeed);
	};
    
    /**
     * Add a new character to the command
     * @param {string} text
     * @param {event} keyboardEvent
     */
	this.add = function(text, keyboardEvent) {
		if (!!keyboardEvent) {
            txt += giveMeChar(text, keyboardEvent);
        } else {
            txt += text;
        }
	};
    
    /**
     * Add a carriage return
     * @returns {undefined}
     */
	this.cr = function() {
			var textSize = ctx.measureText(txt);

			/** Delete the cursor track */
            cursor.erase(x + textSize.width + cursorDistanceToLastChar, y);
			
			/** New line */
			y = y + lineHeight + newLineOffset;
			txt= new String(text);
	};
    
    /**
     * Remove last command character
     */
    this.removeLastChar = function () {
        var textSize= ctx.measureText(txt);
        cursor.erase(x + textSize.width + cursorDistanceToLastChar, y);
        txt = txt.substr(0, txt.length - 1);        
    };
    
    /**
     * Return command
     * @returns {string} txt
     */
	this.currentCommand = function() {
			return txt;
	};
    
    /**
     * Draw the command
     */
	this.draw = function() {
		var textSize= ctx.measureText(txt),
            char_aux= txt.charAt(textSize.width);
        
        /** Clean the line and paint the new string */
		ctx.clearRect(x, y - characterHeight, textSize.width + cursorDistanceToLastChar, lineHeight);
		ctx.fillText(txt, x, y);

		/** If reach the end of line (create new line, could be a command split in several lines) */
		if (textSize.width >= limit) {
            /** Delete the cursor track */
            cursor.erase(x + textSize.width + cursorDistanceToLastChar, y);
			
			/** New line because line width exceeded */
			y =  y + lineHeight + newLineOffset;
			txt += char_aux;
			txt = new String(text); 
			
			ctx.fillText( txt, x, y);
		}
	};
};
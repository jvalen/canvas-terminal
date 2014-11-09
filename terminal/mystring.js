/**
 * Create a custom string object
 * @class myString
 * @param {type} context
 * @param {type} text
 * @param {type} p
 * @param {type} xPosOffset
 * @param {type} yPosOffset
 * @param {type} w
 * @param {type} tsize
 * @param {Integer} lHeight Line height
 * @returns {myString}
 */
var myString = function (context, text, p, xPosOffset, yPosOffset, w, tsize, lHeight){
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
        p_id = 0,
        initialData = {
            xPosOffset: x,
            yPosOffset: y
        },
        cursorDistanceToLastChar = 4,
        cursorSpeed = 400;
        
    
    // Public methods
	this.reset = function() {
		txt = new String(text);
        x = initialData.xPosOffset;
        y = initialData.yPosOffset;
        ctx.fillText(">", x - indentOffset, y);
	};    
	
	this.returnYpos = function() {
		return y;
	};
	
	this.returnIdCursor = function() {
		return p_id;
	};	
    
	// Y coord of the last line
	this.crPrompt = function() {
		ctx.fillText(">", x - indentOffset, y);
	};
	
	this.cursorLoop = function() {        
		p_id = setInterval(function(){
			var textSize = ctx.measureText(txt);	
			cursor.draw(x + textSize.width + cursorDistanceToLastChar, y);
		},cursorSpeed);
	};
    
	this.add = function(text, keyboardEvent) {
		if (!!keyboardEvent) {
            txt += giveMeChar(text, keyboardEvent);
        } else {
            txt += text;
        }
	};
    
	this.cr = function() {
			var textSize= ctx.measureText(txt);

			//Delete the cursor track			
            cursor.erase(x + textSize.width + cursorDistanceToLastChar, y);
			
			//New line
			y = y + lineHeight + newLineOffset;
			txt= new String(text);
	};
    
    this.removeLastChar = function () {
        var textSize= ctx.measureText(txt);
        cursor.erase(x + textSize.width + cursorDistanceToLastChar, y);
        txt = txt.substr(0, txt.length - 1);        
    };
    
	this.currentCommand = function() {
			return (txt);			
	};
	
	this.draw = function() {
		var textSize= ctx.measureText(txt),
            char_aux= txt.charAt(textSize.width);
        
        //Clean the line and paint the new string
		ctx.clearRect(x, y - characterHeight, textSize.width + cursorDistanceToLastChar, lineHeight);
		ctx.fillText(txt, x, y);

		//If reach the end of line (not new prompt, just creat new line, could be a command split in several lines)
		if (textSize.width >= limit) {
            //Delete the cursor track			
            cursor.erase(x + textSize.width + cursorDistanceToLastChar, y);
			
			//New line because line width exceeded
			y =  y + lineHeight + newLineOffset;
			txt += char_aux;
			txt = new String(text); 
			
            //TODO: Handle more than one line command
			ctx.fillText( txt, x, y);
		}

	};
};
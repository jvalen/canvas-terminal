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
 * @returns {myString}
 */

var myString = function (context, text, p, xPosOffset, yPosOffset, w, tsize){	
	var ctx = context,
        txt = new String(text),
        cursor = p,
        offset = 20,        
        x = xPosOffset + offset,
        y = yPosOffset + offset,
        limit = w - (xPosOffset + offset * 2),
        caracterHeight = tsize,        
        p_id = 0,
        initialData = {
            xPosOffset: xPosOffset,
            yPosOffset: yPosOffset
        };
    
    // Private methods	
	function size () {
		return txt.length;
	}
	
	function returnSubstring (ini, end) {
		return txt.substring(ini, end);
	}
    
    // Public methods
	this.reset = function() {
		txt = new String(text);
        x = initialData.xPosOffset + offset;
        y = initialData.yPosOffset + offset;
        ctx.fillText(">", x-(offset), y);
	};    
	
	this.returnYpos = function() {
		return y;
	};
	
	this.returnIdCursor = function() {
		return p_id;
	};	
    
	// Y coord of the last line
	this.crPrompt = function() {
		ctx.fillText(">", x-(offset), y);        
	};
	
	this.cursorLoop = function() {		
		p_id = setInterval(function(){
			var textSize = ctx.measureText(txt);	
			cursor.draw((x)+(textSize.width)+4, y);
		},400);
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
			ctx.clearRect(textSize.width + 40, y - (caracterHeight - 1),textSize.width + offset, offset);
			
			//New line
			y = y + offset;            
			txt= new String(text);
	};
    
	this.currentCommand = function() {
			return (txt);			
	};
	
	this.draw = function() {
		var textSize= ctx.measureText(txt),
            char_aux= txt.charAt(textSize.width);

		ctx.clearRect(x, y - (caracterHeight - 1), textSize.width + 10, 20);
		ctx.fillText(txt, x, y);

		//If reach the end of line (not new prompt, just creat new line, could be a command split in several lines)
		if (textSize.width >= limit){
          		
			//delete the cursor track
			ctx.clearRect(textSize.width + 40, y - offset, textSize.width, offset);            
			
			//New line because line width exceeded
			y =  y + offset;
			txt += char_aux;

			txt = new String(text); 
			/*
				If we want to execute a command that is bigger than one line we have to concatenate every line
				and finally executing that.
			*/
			ctx.fillText( txt, x, y);
		}

	};
};
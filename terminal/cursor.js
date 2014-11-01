/**
 * Create a cursor classs
 * @class cursor Implement a flashing terminal cursor like
 * @param {object} context A canvas context
 * @returns {cursor}
 */
var cursor = function (context) {
	var ctx = context,
        x = new Number(0),
        y = new Number(0),
        cursorActive = new Boolean(true);
	
	function changeState () {
		cursorActive = !cursorActive;
	}
	
	this.draw = function (xPos,yPos) {			
		changeState();	
		if (cursorActive) {			
			ctx.fillText(String.fromCharCode(95), xPos, yPos);
			x = xPos;
			y = yPos;
		}	
		else {            			
            this.erase(xPos,yPos);
		}
	};
    
	this.erase = function (xPos,yPos) {
        //Measure to delete cursor track (-12,10,16)
        ctx.clearRect(xPos, yPos-12, 10, 16);        
	};    
    
}
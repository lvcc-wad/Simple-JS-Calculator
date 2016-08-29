document.addEventListener('keydown', function(event) {
  var isShift = window.event.shiftKey ? true : false;
  var key = event.keyCode;
  if (key == 48 || key == 96) calc.passNum(0);
  if (key == 49 || key == 97) calc.passNum(1);
  if (key == 50 || key == 98) calc.passNum(2);
  if (key == 51 || key == 99) calc.passNum(3);
  if (key == 52 || key == 100) calc.passNum(4);
  if (key == 53 || key == 101) calc.passNum(5);
  if (key == 54 || key == 102) calc.passNum(6);
  if (key == 55 || key == 103) calc.passNum(7);
  if ((isShift == false && key == 56) || key == 104) calc.passNum(8);
  if (key == 57 || key == 105) calc.passNum(9);
  if ((isShift == true && key == 56) || key == 106) calc.passMethod('multiply');
  if ((isShift == true && key == 187) || key == 107) calc.passMethod('add');
  if (key == 189 || key == 109) calc.passMethod('subtract');
  if (key == 190 || key == 110) calc.passNum('decimal'); 
  if (key == 191 || key == 111) calc.passMethod('divide');
  if (key == 46 || key == 8 || key == 12 || key == 27) calc.clearResult();
  if ((isShift == false && key == 187) || key == 13) calc.doMath();
}, true);

var calc = (function() {
  var screen = document.getElementById('result');
  var method = '',
      storedMethod = '',
      stored = 0,
      result = 0,
      total = 0,
      decimal = false,
      solved = false,
      stringRequest = false;

  screen.innerHTML = 0;
  
  return {
    
    passNum: function(num) {
    
      if (solved == true && stringRequest == false) {
        method = '', storedMethod = '', stored = 0, result = 0, total = 0, decimal = false, solved = false;
      }
    
      if (num == 'decimal' && decimal == false) {
        result = result + '.';
        decimal = true;
      }
      
      if (num != 'decimal') {
        if (result == 0 && decimal == false) {
          result = num;
        } else {
          result = result + '' + num;
        }
      }
    
      screen.innerHTML = result;
    },
    
    passMethod: function(m) {
      method = m;
      stored = result;
      result = 0;
      decimal = false;
      
      if (solved == true) {
        stringRequest = true;
      }
      
      if (storedMethod != '') {
        document.getElementById(storedMethod).className = " ";
      }
      document.getElementById(method).className = "active";
      storedMethod = m;
    },
    
    doMath: function() {
      stored = parseFloat(stored);
      result = parseFloat(result);
          
      if (solved == false) {
        stored = stored;             
      } else {
        stored = parseFloat(total);
      }
      
      if (result == 0 && method == 'divide') {
        total = "undefined";
      }
      else if ((stored == 0 || result == 0) && (method == 'divide' || method == 'multiply')) {
        total = 0;
      } else {
        if (method == 'divide') {total = stored / result;}
        if (method == 'multiply') {total = stored * result;} 
        if (method == 'add') {total = stored + result;} 
        if (method == 'subtract') {total = stored - result;}  
      }      
      
      solved = true;
      screen.innerHTML = total;   
      
      if (method != '') {
        document.getElementById(storedMethod).className = " ";  
        method = '';
      }
    },
    
    clearResult: function() {
      stored = 0, result = 0, total = 0, decimal = false, solved = false, stringRequest = false;   
      
      if (method != '') {
        document.getElementById(storedMethod).className = " ";  
        method = '';
      }
      
      screen.innerHTML = result;   
    }
  };
})();
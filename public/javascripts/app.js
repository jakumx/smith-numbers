$(document).ready(function () {

  function isNormalInteger(str) {
    var n = ~~Number(str);
    return String(n) === str && n > 0;
  }

  function clearAll () {
    $('#numVal').empty();
    $('#correctOrNot').empty();
    $('#primeFac').empty();
    $('#sumStringNum1').empty();
    $('#sumStringNum2').empty();
    $('#sumNum1').empty();
    $('#sumNum2').empty();
    $('.eqOrNot').empty();
  }

  $('#clear').on('click', function (e) {
    $('#number').val('');
    clearAll();
  });

  $('#check').on('click', function (e) {
    clearAll();
    var $number = $('#number').val();
    if (!isNormalInteger($number)) {
      $('#error')
        .stop()
        .fadeOut(0);
     $('#error')
          .fadeIn('fast')
          .delay(1500)
          .fadeOut('fast');
      return;
    }
    var minNum = 2,
      numToReduce = $number,
      arryNums = [],
      sumNum = 0,
      sumArryNums = 0;
    function pushOrSum(strg, objOrNum) {
      for (var i = 0; i < strg.length; i++ ) {
          typeof objOrNum == 'object' ?
              objOrNum.push(parseInt(strg[i])) :
            objOrNum += parseInt(strg[i]);
      }
      if (typeof objOrNum === 'number')  return objOrNum;   
    }
    var array1 = [];
    while (numToReduce > 1) {
      if (numToReduce % minNum == 0) {
        array1.push(minNum);
        var stringMin = minNum.toString();
        if (stringMin.length > 1) {
          pushOrSum(stringMin, arryNums);
        } else {
          arryNums.push(minNum); 
        }
        numToReduce /= minNum;
      } else {
        minNum += 1;
        continue;
      }
    }
    var arry2 = [];
    pushOrSum($number, arry2);
    $number = $number.toString();
    sumNum = pushOrSum($number, sumNum);
    sumArryNums = pushOrSum(arryNums, sumArryNums);
    var eqOrNot = '', correctOrNot = '';
    if (sumNum == sumArryNums && minNum.toString() != $number) {
      correctOrNot = ' true';
      eqOrNot = ' = '; 
    } else {
      correctOrNot = ' false';
      eqOrNot = ' != ';
    }
    function sumOrMult (arry, strng, jSelector) {
      var x = arry.join(strng);
      $(jSelector).text(x);
    }
    $('#numVal').text($number);
    sumOrMult(array1, ' * ', '#primeFac');
    $('#correctOrNot').text(correctOrNot);
    if (minNum.toString() != $number) {
      sumOrMult(arry2, ' + ', '#sumStringNum1');
      sumOrMult(arryNums, ' + ', '#sumStringNum2');
      $('.eqOrNot').text(eqOrNot);
      $('#sumNum1').text(sumNum);
      $('#sumNum2').text(sumArryNums);
    }
  });

});
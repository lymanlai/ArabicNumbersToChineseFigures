// 3. 请将阿拉伯数字转换成中文数字：5234 => “五千二百三十四”
// http://baike.baidu.com/view/568203.htm ，这里只解析到“大数”
// 直接在node环境下，直接node 3.js即可看到结果

var testCase = [
  '001',
  '012',
  '1024',
  '10240',
  '1024000',
  '01024000',
  '10240000',
  '010240000',
  '001.024',
  '010240000230034.024000',
  '0102400002345450034.024000',
  '0102400034398770230034.024000',
  '0102400034398770230034948398303030403043943439493949394939493.024000',
  '02024000343987702300349483983030304030439434765639493949394343988764994939493.024000',
  '030240003439877023003494839830303040304394347656394939493943439887649949394993.024000',
]

for (var val in testCase) {
  var input = testCase[val];
  console.log('input ', input);
  console.log(ArabicNumbersToChineseFigures(input));
}


function ArabicNumbersToChineseFigures(input) {
  var output = '';
  var Helper = {
    numberHash: ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"],
    numberHashPostFix: ["", "十", "百", "千"],
    numberUnit: ["",
      '万', //：代表的是10的四次方。
      '亿', //：代表的是10的八次方。
      '兆', //：代表的是10的十二次方。
      '京', //：代表的是10的十六次方。
      '垓', //：代表的是10的二十次方。
      '杼', //：代表的是10的二十四次方。
      '穰', //：代表的是10的二十八次方。
      '沟', //：代表的是10的三十二次方。
      '涧', //：代表的是10的三十六次方。
      '正', //：代表的是10的四十次方。
      '载', //：代表的是10的四十四次方。
      '极', //：代表的是10的四十八次方。
      '恒河沙', //：代表的是10的五十二次方。
      '阿僧祗', //：代表的是10的五十六次方。
      '那由它', //：代表的是10的六十次方。
      '不可思议', //：代表的是10的六十四次方。
      '无量', //：代表的是10的六十八次方。
      '大数', //：代表的是10的七十二次方。
    ]
  };

  input = splitIntegerFraction(input);
  var integerPart = input[0];
  var fractionPart = input[1];

  if(integerPart.length > 76){
    output = input + ' 该数的整数位数为' + integerPart.length;
    output += ', 整数位数不能大于76位，否则无法解析';

    return output;
  }

  output = transformIntegerPart(integerPart) + transformFractionPart(fractionPart);

  return output;

  function splitIntegerFraction(input) {
    input = input.split('.');
    input[0] = input[0].replace(/\b(0+)/gi, "");

    return input;
  }

  function transformIntegerPart(input) {
    var output = '';
    var integerPartReverse = strReverse(integerPart);
    var length = integerPartReverse.length;
    var numberUnitIndex = -1;
    var zero = '';
    for (var i = 0; i < length; i++) {
      var currentDigitStr = integerPartReverse[i];
      if (i % 4 == 0) {
        numberUnitIndex++;
        output = Helper.numberUnit[numberUnitIndex] + output;
        zero = '';
      }

      if (currentDigitStr !== '0') {
        output = Helper.numberHash[parseInt(currentDigitStr)] + Helper.numberHashPostFix[i % 4] + output;
        continue; // end of current loop
      }

      if (currentDigitStr == '0') {
        switch (i % 4) {
          case 0:
            //如果位置索引能被4整除，表示它所处位置是万级单位位置，这个位置的0的读法在前面就已经设置好了，所以这里直接跳过
            // 即已经添加了 numberUnit
            break;
          case 1:
          case 2:
          case 3:
            if (integerPartReverse[i - 1] != '0') {
              zero = "零";
            }; //如果不被4整除，那么都执行这段判断代码：如果它的下一位数字（针对当前字符串来说是上一个字符，因为之前执行了反转）也是0，那么跳过，否则读作“零”
            break;

        }

        output = zero + output;
        zero = '';
      }
    }

    return output;
  }

  function transformFractionPart(input) {
    if (!input) {
      return '';
    }

    var output = '';
    var length = input.length;

    for (var i = 0; i < length; i++) {
      output += Helper.numberHash[input[i]];
    }

    output = '点' + output;
    return output;
  }

  function strReverse(str) {
    var arr = [];
    for (var i = str.length; i >= 0; i--) {
      arr.push(str[i]);
    }

    return arr.join("");
  }
}

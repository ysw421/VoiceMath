const Items = [
  {
    name: 'p1',
    text: `새로운 메모에 오신 것을 환영합니다.<br/>마음껏 메모하세요! $y=x^2$`,
    geogebra: '',
  },
  {
    name: 'p1',
    text:
      '그림과 같이 $\\angle{ABC}={\\pi \\over 2}$인 삼각형 $ABC$에 내접하고 반지름의 길이가 $3$인 원의 중심을 $O$라 하자. 직선 $AO$가 선분 $BC$와 만나는 점을 $D$라 할 때, $\\overline{DB} = 4$이다. 삼각형 $ADC$의 외접원의 넓이는?',
    geogebra:
      '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',
  },
];

export default Items;

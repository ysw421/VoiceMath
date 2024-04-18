// // Define replacements for transcription text
// const replacements: { [key: string]: any } = {
//   equals: '=',
//   squared: '^2',
//   'to the power of': '^',
//   plus: '+',
//   minus: '-',
//   times: '*',
//   over: '/',
//   cubed: '^3',
//   'divided by': '/',
//   comma: ''
// };
//
// // Function to replace specified words in the transcription text
// function replaceWords(inputString: string) {
//   let modifiedString = inputString;
//   Object.keys(replacements).forEach((key) => {
//     const pattern = new RegExp(key, 'gi'); // 'gi' for global and case-insensitive matching
//     modifiedString = modifiedString.replace(pattern, replacements[key]);
//   });
//   return modifiedString;
// }

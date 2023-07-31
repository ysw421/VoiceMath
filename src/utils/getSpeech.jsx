// export const getSpeech = (text) => {
//   let voices = [];
//   const setVoiceList = () => {
//     voices = window.speechSynthesis.getVoices();
//   };

//   setVoiceList();

//   console.log(window.speechSynthesis.onvoiceschanged);
//   if (window.speechSynthesis.onvoiceschanged !== undefined) {
//     window.speechSynthesis.onvoiceschanged = setVoiceList;
//   }

//   const speech = (txt) => {
//     const lang = 'ko-KR';
//     const utterThis = new SpeechSynthesisUtterance(txt);

//     utterThis.lang = lang;

//     const kor_voice = voices.find((elem) => elem.lang === lang || elem.lang === lang.replace('-', '_'));

//     if (kor_voice) {
//       utterThis.voice = kor_voice;
//     } else {
//       return;
//     }

//     window.speechSynthesis.speak(utterThis);
//   };

//   speech(text);
// };

export const getSpeech = async (text) => {
  let voices = [];

  const setVoiceList = () => {
    voices = window.speechSynthesis.getVoices();
  };

  setVoiceList();

  async function waitUntilTrue() {
    while (true) {
      console.log(window.speechSynthesis.onvoiceschanged);
      // const condition = await checkConditionAsync();
      if (window.speechSynthesis.onvoiceschanged in [undefined, null]) {
        console.log('!@#!#@! ');
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  window.speechSynthesis.onvoiceschanged = setVoiceList;
  // await waitUntilTrue();

  // const waitForVoicesChanged = () => {
  //   return new Promise((resolve) => {
  //     console.log(window.speechSynthesis.onvoiceschanged);
  //     if (!window.speechSynthesis.onvoiceschanged in [undefined, null]) {
  //       window.speechSynthesis.onvoiceschanged = () => {
  //         setVoiceList();
  //         resolve();
  //       };
  //     } else {
  //       // If onvoiceschanged is not supported, resolve immediately.
  //       // resolve();
  //     }
  //   });
  // };

  // await waitForVoicesChanged();

  const speech = (txt) => {
    const lang = 'ko-KR';
    const utterThis = new SpeechSynthesisUtterance(txt);

    utterThis.lang = lang;

    const kor_voice = voices.find((elem) => elem.lang === lang || elem.lang === lang.replace('-', '_'));

    if (kor_voice) {
      utterThis.voice = kor_voice;
    } else {
      return 0;
    }

    window.speechSynthesis.speak(utterThis);
  };

  setTimeout(function() {
    speech(text);
  }, 500);
};

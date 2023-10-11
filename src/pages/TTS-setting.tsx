import Button from '@components/Button';
import { ttsVoiceAtom, useTTS } from '@hooks/use-tts';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function TTS_setting() {
  const [voiceAtom, setVoiceAtom] = useAtom(ttsVoiceAtom);
  const { getVoices, speak, setText } = useTTS();
  const [voice, setVoice] = useState<number>(0);
  const [inputValue, setInputValue] = useState<number>(voiceAtom);

  const [voiceList, setVoiceList] = useState<string>('');
  const handleShowList = () => {
    let text = ``;
    const list = getVoices();
    for (let i = 0; i < list.length; i++) {
      text += `${i}: ${list[i].name}      `;
    }
    setVoiceList(text);
  };

  useEffect(() => {
    setInputValue(voiceAtom);
    setText('안녕하세요 hello world');
  }, []);

  return (
    <div className="tw-w-full tw-h-full tw-p-8">
      <p>tts의 목소리 설정....</p>
      <div>
        {`===>`}
        <div className="flex">
          <input
            placeholder="여기에 입력, 숫자만 사용!"
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(Number(e.target.value))}
          />
          <Button
            onClick={() => {
              setVoiceAtom(inputValue);
              Swal.fire({
                title: '설정!!',
                html: '설정 되었습니다.',
                icon: 'success',
                timer: 1000,
                timerProgressBar: true
              });
            }}
          >
            설정
          </Button>
        </div>
        {`<=== 이 곳에 id를 입력하여 목소리 설정.`}
        <p>현재 설정... {voiceAtom}</p>
        <pre>
          {`테스트... 테스트 문구는 '안녕하세요 hello world'
⚠️ 사용 전 새로 고침(예상 컨대, 2번 정도 눌러보기를 권장)
'안녕하세요'출력 안될 경우 한글 사용 불가
edge의 177: Microsoft InJoon Online (Natural) - Korean (Korea) 178: Microsoft SunHi Online (Natural) - Korean (Korea) 사용 적극 권장`}
        </pre>
        <Button onClick={() => speak()}>테스트</Button>
        <div className="tw-h-16"></div>
      </div>
      <p>{`아래 버튼을 클릭하여 사용 가능한 목소리 확인...
      'Korean'과 같은 검색어로 검색...`}</p>
      <Button onClick={handleShowList}>list...</Button>
      {voiceList}
    </div>
  );
}

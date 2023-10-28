import { isKoreanAtom } from '@pages/mode';
import { useSetAtom } from 'jotai';
import { MdLanguage } from 'react-icons/md';

export default function GlobeButton() {
  const setIsKorean = useSetAtom(isKoreanAtom);

  return (
    <div className="tw-absolute tw-z-50 tw-top-3 tw-right-6" onClick={() => setIsKorean((e) => !e)}>
      <MdLanguage size={30} />
    </div>
  );
}

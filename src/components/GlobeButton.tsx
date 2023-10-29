import { langAtom } from '@pages/mode';
import { useSetAtom } from 'jotai';
import { MdLanguage } from 'react-icons/md';
import { Lang } from 'typings';

export default function GlobeButton() {
  const setLang = useSetAtom(langAtom);

  return (
    <div
      className="tw-absolute tw-z-50 tw-top-3 tw-right-6"
      onClick={() => setLang((e: Lang) => (e === 'ko-KR' ? 'en-US' : 'ko-KR'))}
    >
      <MdLanguage size={30} />
    </div>
  );
}

import Button from 'components/common/Button';
import { useEffect } from 'react';

interface FindAddressProps {
  onCompleted: (address: string) => void;
}

const SCRIPT_URL = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

const FindAddress = ({ onCompleted }: FindAddressProps) => {
  // 1. 스크립트 로드
  useEffect(() => {
    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // 2. 핸들러
  const handleOpen = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        onCompleted(data.address);
      },
    }).open();
  };

  // 3. 입력
  return (
    <div>
      <Button type="button" size="medium" scheme="default" onClick={handleOpen}>
        주소찾기
      </Button>
    </div>
  );
};

export default FindAddress;

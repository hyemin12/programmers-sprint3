import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FaAngleDown } from 'react-icons/fa';
import Button from './Button';

interface EllipsisBoxProps {
  line: number;
  children: React.ReactNode;
  $expanded?: boolean;
}

const EllipsisBox = ({ line, children, $expanded = false }: EllipsisBoxProps) => {
  const ellipsisTextRef = useRef<HTMLDivElement | null>(null);
  const [overflowText, setOverflowText] = useState(false);
  const [expanded, setExpanded] = useState(false);

  /** 말줄임 텍스트가 설정된 line(줄)보다 짧은 경우에는 펼쳐보기 버튼 렌더하지 않도록 설정 */
  useEffect(() => {
    const text = ellipsisTextRef.current;
    if (text) {
      const lineHeight = parseInt(getComputedStyle(text, null).getPropertyValue('line-height'));
      const lines = text.offsetHeight / lineHeight;

      // 펼쳐보기 버튼이 사용될 때
      if ($expanded && lines > line) {
        setOverflowText(true);
      }
    }
  }, []);

  return (
    <EllipsisBoxStyle $expanded={expanded} $line={line}>
      <div ref={ellipsisTextRef}>{children}</div>
      {overflowText && (
        <div className="toggle">
          <Button size="small" scheme="default" onClick={() => setExpanded(!expanded)}>
            <FaAngleDown />
            {expanded ? '접기' : '펼쳐보기'}
          </Button>
        </div>
      )}
    </EllipsisBoxStyle>
  );
};
const EllipsisBoxStyle = styled.div<{ $line: number; $expanded: boolean }>`
  /* Webkit기반 브라우저 동작 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: ${({ $line, $expanded }) => ($expanded ? 'none' : $line)};
  text-overflow: ellipsis;
  .toggle {
    svg {
      transform: rotate(${({ $expanded }) => ($expanded ? '180deg' : '0deg')});
    }
  }
`;
export default EllipsisBox;

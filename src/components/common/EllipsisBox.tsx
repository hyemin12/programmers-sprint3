import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import Button from './Button';

interface EllipsisBoxProps {
  line: number;
  children: React.ReactNode;
  $expanded?: boolean;
}

const EllipsisBox = ({ line, children, $expanded = false }: EllipsisBoxProps) => {
  const ellipsisTextRef = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState($expanded);

  /** 말줄임 텍스트가 설정된 line(줄)보다 짧은 경우에는 펼쳐보기 버튼 렌더하지 않도록 설정 */
  const overflowText = $expanded && React.Children.count(children) > line;

  return (
    <>
      <EllipsisBoxStyle $expanded={expanded} $line={line}>
        <div ref={ellipsisTextRef}>{children}</div>
      </EllipsisBoxStyle>
      {overflowText && (
        <Button size="small" scheme="default" onClick={() => setExpanded(!expanded)}>
          {expanded ? <FaAngleUp /> : <FaAngleDown />}
          {expanded ? '접기' : '펼쳐보기'}
        </Button>
      )}
    </>
  );
};
const EllipsisBoxStyle = styled.div<{ $line: number; $expanded: boolean }>`
  /* Webkit기반 브라우저 동작 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: ${({ $line, $expanded }) => ($expanded ? 'none' : $line)};
  text-overflow: ellipsis;
`;
export default EllipsisBox;

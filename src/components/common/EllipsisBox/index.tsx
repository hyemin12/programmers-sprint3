import React, { useState } from 'react';
import styled from 'styled-components';
import { FaAngleDown } from 'react-icons/fa';
import Button from '../Button';

interface EllipsisBoxProps {
  line: number;
  children: React.ReactNode;
  $expanded?: boolean;
}

const EllipsisBox = ({ line, children, $expanded = false }: EllipsisBoxProps) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <EllipsisBoxStyle $expanded={expanded} line={line}>
      {children}
      {$expanded && (
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
const EllipsisBoxStyle = styled.div<Omit<EllipsisBoxProps, 'children'>>`
  /* Webkit기반 브라우저 동작 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: ${({ line, $expanded }) => ($expanded ? 'none' : line)};
  text-overflow: ellipsis;
  .toggle {
    svg {
      transform: rotate(${({ $expanded }) => ($expanded ? '180deg' : '0deg')});
    }
  }
`;
export default EllipsisBox;

import React from 'react';
import styled from 'styled-components';
import { Title } from 'components/common';

interface EmptyProps {
  icon?: React.ReactNode;
  title: string;
  description?: React.ReactNode;
}

const Empty = ({ icon, title, description }: EmptyProps) => {
  return (
    <EmptyStyle>
      {icon && <div className="icon">{icon}</div>}

      <Title size="large" color="secondary">
        {title}
      </Title>

      {description && <>{description}</>}
    </EmptyStyle>
  );
};

const EmptyStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 120px 0;
  .icon {
    font-size: 4rem;
    svg {
      fill: #ccc;
    }
  }
`;

export default Empty;

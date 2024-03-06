import { Title, EllipsisBox } from 'components/common';
import React from 'react';
import { splitOnNewLine } from 'utils/splitOnNewLine';

const BookIntroduction = ({ description }: { description: string }) => {
  if (!description) return null;
  return (
    <section>
      <Title size="medium">책 소개</Title>
      <EllipsisBox line={4} $expanded>
        {splitOnNewLine(description).map((sentence, idx) => (
          <React.Fragment key={idx}>
            {sentence}
            <br />
          </React.Fragment>
        ))}
      </EllipsisBox>
    </section>
  );
};

export default BookIntroduction;

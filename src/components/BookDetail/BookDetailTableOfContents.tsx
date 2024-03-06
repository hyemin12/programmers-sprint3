import { Title, EllipsisBox } from 'components/common';
import { splitOnNewLine } from 'utils/splitOnNewLine';

const BookDetailTableOfContents = ({ index }: { index: string | undefined }) => {
  if (!index) return null;
  return (
    <section>
      <Title size="medium">목차</Title>
      <EllipsisBox line={5} $expanded>
        {splitOnNewLine(index).map((item, index) => {
          if (item.startsWith('-')) {
            // '-'로 시작하는 경우
            return <p key={index}>&nbsp;&nbsp;&nbsp;&nbsp;{item}</p>;
          } else if (/^Ⅰ|Ⅱ|Ⅲ|Ⅳ|Ⅴ|Ⅵ/.test(item)) {
            // 로마 숫자로 시작하는 경우
            return (
              <p key={index}>
                <strong>{item}</strong>
              </p>
            );
          } else {
            return <p key={index}>{item}</p>;
          }
        })}
      </EllipsisBox>
    </section>
  );
};

export default BookDetailTableOfContents;

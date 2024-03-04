import { Title, EllipsisBox } from 'components/common';

const BookIntroduction = ({ description }: { description: string }) => {
  if (!description) return null;
  return (
    <section>
      <Title size="medium">책 소개</Title>
      <EllipsisBox line={4} $expanded>
        <p className="detail">{description}</p>
      </EllipsisBox>
    </section>
  );
};

export default BookIntroduction;

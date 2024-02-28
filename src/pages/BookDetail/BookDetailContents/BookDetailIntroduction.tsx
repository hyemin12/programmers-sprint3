import EllipsisBox from 'components/common/EllipsisBox';
import Title from 'components/common/Title';

const BookIntroduction = ({ description }: { description: string }) => {
  if (!description) return null;
  return (
    <>
      <Title size="medium">책 소개</Title>
      <EllipsisBox line={4} $expanded>
        <p className="detail">{description}</p>
      </EllipsisBox>
    </>
  );
};

export default BookIntroduction;

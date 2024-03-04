import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { Button } from 'components/common';
import { IReviewsPayload } from 'models/book.model';
import { useRequireLogin } from 'hooks/useRequireLogin';

interface BookReviewAddProps {
  onAdd: (data: IReviewsPayload) => void;
  isAddMode: boolean;
  setIsAddMode: (bl: boolean) => void;
}

const BookReviewAdd = ({ onAdd, isAddMode, setIsAddMode }: BookReviewAddProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IReviewsPayload>();
  const { requireLogin } = useRequireLogin();

  const handleAddReview = async (data: IReviewsPayload) => {
    if (!requireLogin()) return;
    const newReview = { ...data, created_at: dayjs().format('YYYY-MM-DD') };

    // api 요청
    await onAdd(newReview);

    // api 요청이 성공이라면, form 초기화, addmode 종료
    reset();
    setIsAddMode(false);
  };

  if (!isAddMode) return null;

  return (
    <BookReviewAddStyle>
      <form onSubmit={handleSubmit(handleAddReview)}>
        <fieldset className="textarea-fieldset">
          <textarea placeholder="리뷰 내용을 작성하세요." {...register('content', { required: true })}></textarea>
          {errors.content && <p className="error-text">리뷰 내용은 필수로 입력해야합니다.</p>}
        </fieldset>

        <fieldset>
          <select {...register('score', { required: true, valueAsNumber: true })}>
            {Array.from({ length: 5 }).map((_, idx) => (
              <option key={idx} value={idx + 1}>
                {idx + 1}점
              </option>
            ))}
          </select>
          <Button buttonType="submit" size="medium" scheme="primary">
            리뷰 등록하기
          </Button>
        </fieldset>
      </form>
    </BookReviewAddStyle>
  );
};
const BookReviewAddStyle = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 6px;
    fieldset {
      display: flex;
      justify-content: end;
      gap: 12px;
      padding: 0;
      border: 0;
      .error-text {
        color: tomato;
      }
      select {
        padding: 0 6px;
      }
      &.textarea-fieldset {
        display: flex;
        flex-direction: column;
        width: 100%;
        textarea {
          width: 100%;
          height: 100px;
          padding: 12px;
          border: 1px solid ${({ theme }) => theme.color.border};
          border-radius: ${({ theme }) => theme.borderRadius.default};
          resize: none;
        }
      }
    }
  }
`;

export default BookReviewAdd;

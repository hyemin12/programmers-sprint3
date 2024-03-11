import { InputText } from 'components/common';
import { FieldsetProps } from './EmailFieldset';

const PasswordFieldset = ({ register, errors }: FieldsetProps) => {
  return (
    <fieldset>
      <InputText
        placeholder="비밀번호를 입력하세요"
        inputType="password"
        {...register('password', {
          required: true,
          minLength: { value: 8, message: '비밀번호는 최소 8글자여야 합니다.' },
          maxLength: {
            value: 16,
            message: '비밀번호는 최대 16글자입니다.',
          },
        })}
      />
      {errors.password && (
        <p className="error-text">
          {errors.password.message ? errors.password.message : '비밀번호는 필수로 입력해야합니다.'}
        </p>
      )}
    </fieldset>
  );
};

export default PasswordFieldset;

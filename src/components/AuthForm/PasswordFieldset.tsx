import { InputText } from 'components/common';
import { FieldsetProps } from './EmailFieldset';

const PasswordFieldset = ({ register, errors }: FieldsetProps) => {
  return (
    <fieldset>
      <InputText
        placeholder="비밀번호를 입력하세요"
        inputType="password"
        {...register('password', { required: true })}
      />
      {errors.password && <p className="error-text">비밀번호는 필수로 입력해야합니다.</p>}
    </fieldset>
  );
};

export default PasswordFieldset;

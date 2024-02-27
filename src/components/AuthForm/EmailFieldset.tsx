import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { IAuthData } from 'models/user.model';
import InputText from 'components/common/InputText';

export interface FieldsetProps {
  register: UseFormRegister<IAuthData>;
  errors: FieldErrors<IAuthData>;
}

const EmailFieldset = ({ register, errors }: FieldsetProps) => {
  return (
    <fieldset>
      <InputText placeholder="이메일을 입력하세요" inputType="email" {...register('email', { required: true })} />
      {errors.email && <p className="error-text">이메일은 필수로 입력해야합니다.</p>}
    </fieldset>
  );
};

export default EmailFieldset;

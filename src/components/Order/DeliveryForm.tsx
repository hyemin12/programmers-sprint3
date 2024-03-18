import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import styled from 'styled-components';
import { InputText } from 'components/common';
import { IDeliveryForm } from 'pages/Order';
import FindAddress from './FindAddress';
import PaymentMethodItem from './PaymentMethodItem';

const paymentMethods = ['신용카드', '무통장입금', '네이버페이', '카카오페이'];

interface DeliveryFormProps {
  register: UseFormRegister<IDeliveryForm>;
  errors: FieldErrors<IDeliveryForm>;
  setValue: UseFormSetValue<IDeliveryForm>;
}

const DeliveryForm = ({ register, errors, setValue }: DeliveryFormProps) => {
  return (
    <DeliveryFormStyle>
      <fieldset>
        <label>수령인</label>
        <div className="input">
          <InputText type="text" {...register('recipient', { required: true })} />
        </div>
      </fieldset>
      {errors.recipient && <p className="error-text">수령인을 입력해주세요.</p>}

      <fieldset>
        <label>전화번호</label>
        <div className="input">
          <InputText
            type="text"
            {...register('contact', {
              required: true,
              pattern: {
                value: /^\d{2,3}-\d{3,4}-\d{4}$/,
                message: '올바른 전화번호 형식이 아닙니다.',
              },
            })}
          />
        </div>
      </fieldset>
      {errors.contact && <p className="error-text">{errors.contact.message ?? '전화번호를 입력해주세요.'}</p>}

      <fieldset>
        <label>주소</label>
        <div className="input">
          <InputText type="text" {...register('address', { required: true })} readOnly />
        </div>
        <FindAddress onCompleted={(address) => setValue('address', address)} />
      </fieldset>
      {errors.address && <p className="error-text">주소를 입력해주세요.</p>}

      <fieldset>
        <label>상세주소</label>
        <div className="input">
          <InputText type="text" {...register('addressDetail', { required: true })} />
        </div>
      </fieldset>
      {errors.addressDetail && <p className="error-text">상세 주소를 입력해주세요.</p>}

      <fieldset className="payment-method-fieldset">
        <p>결제수단</p>

        <div>
          {paymentMethods.map((item) => (
            <PaymentMethodItem register={register} value={item} key={item} />
          ))}
        </div>
      </fieldset>
      {errors.payment && <p className="error-text">결제 수단을 선택해주세요.</p>}
    </DeliveryFormStyle>
  );
};
const DeliveryFormStyle = styled.form`
  .error-text {
    color: tomato;
    padding-bottom: 12px;
    text-align: right;
  }
  fieldset {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 8px;
    padding: 0 0 12px 0;
    border: none;
    > label {
      width: 80px;
    }
    .input {
      flex: 1;
      input {
        width: 100%;
      }
    }
  }
  .payment-method-fieldset {
    display: flex;
    p {
      width: 80px;
    }
    > div {
      display: flex;
      gap: 8px;
    }
  }
`;

export default DeliveryForm;

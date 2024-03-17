import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Button } from 'components/common';
import { InputText } from 'components/common';
import Title from 'components/common/Title';
import { CartStyle } from 'pages/Cart';
import CartSummary from 'components/Cart/CartSummary';
import FindAddress from '../components/Order/FindAddress';
import { order } from 'api/order.api';
import { IDelivery, IOrderSheet } from 'models/order.model';
import { useAlert } from 'hooks/useAlert';
import { PaymentMethodItem } from 'components/Order';

export interface IDeliveryForm extends IDelivery {
  addressDetail: string;
  payment: string;
}

const paymentMethods = ['신용카드', '무통장입금', '네이버페이', '카카오페이'];

const Order = () => {
  const location = useLocation();
  const orderDataFromCart = location.state;
  const { books, first_book_title, total_quantity, total_price } = orderDataFromCart;
  const { showAlert, showConfirm } = useAlert();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IDeliveryForm>();

  const handlePay = (data: IDeliveryForm) => {
    const orderData: IOrderSheet = {
      ...orderDataFromCart,
      payment: data.payment,
      delivery: {
        recipient: data.recipient,
        contact: data.contact,
        address: `${data.address} ${data.addressDetail}`,
      },
    };

    showConfirm('주문을 하시겠습니까?', () => {
      // 서버로 넘기기
      order(orderData).then(() => {
        showAlert('주문이 성공적으로 처리되었습니다');
        navigate('/orderlist');
      });
    });
  };
  return (
    <>
      <Title size="large">주문서 작성</Title>
      <OrderStyle>
        <div className="content">
          <div className="order-form">
            <Title size="medium" color="text">
              배송 정보
            </Title>
            <form className="delivery">
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
            </form>
          </div>
          <div className="order-info">
            <Title size="medium" color="text">
              주문 상품
            </Title>
            <strong>
              {first_book_title} 등 총 {books.length}권
            </strong>
          </div>
        </div>
        <div className="summary">
          <CartSummary totalPrice={total_price} totalQuantity={total_quantity} />
          <Button size="large" scheme="primary" onClick={handleSubmit(handlePay)}>
            결제하기
          </Button>
        </div>
      </OrderStyle>
    </>
  );
};

const OrderStyle = styled(CartStyle)`
  padding: 24px 0;
  .order-info,
  .order-form {
    padding: 12px 0;
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
    h1 {
      margin-bottom: 24px;
    }
  }
  .delivery {
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

export default Order;

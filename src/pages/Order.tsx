import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Button, InputText, Title } from 'components/common';
import { CartStyle } from 'pages/Cart';
import { CartSummary } from 'components/Cart';
import { PaymentMethodItem, FindAddress } from 'components/Order';
import { order } from 'api/order.api';
import { IDelivery, IOrderSheet } from 'models/order.model';
import { useAlert } from 'hooks/useAlert';
import DeliveryForm from 'components/Order/DeliveryForm';

export interface IDeliveryForm extends IDelivery {
  addressDetail: string;
  payment: string;
}

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
          {/* 주문자 정보 */}
          <div className="order-form">
            <Title size="medium" color="text">
              배송 정보
            </Title>
            <DeliveryForm register={register} errors={errors} setValue={setValue} />
          </div>

          {/* 주문상품 정보 */}
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
  padding: 0 0 24px 0;

  .order-info,
  .order-form {
    padding: 12px 0;
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
    h1 {
      margin-bottom: 24px;
    }
  }
`;

export default Order;

import styled from 'styled-components';

export const BookDetailStyle = styled.div`
  header {
    display: flex;
    align-items: start;
    gap: 24px;
    padding: 0 0 24px 0;
    .img {
      flex: 1;
      img {
        width: 100%;
        height: auto;
      }
    }
    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
      .title-wrapper {
        width: 100%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        .subtitle {
          color: ${({ theme }) => theme.color.secondary};
        }
      }
      dl {
        display: flex;
        margin: 0;
        dt {
          width: 80px;
          color: ${({ theme }) => theme.color.secondary};
        }
        a {
          color: ${({ theme }) => theme.color.primary};
        }
      }
    }
  }
  .content {
    > div {
      padding: 18px 0%;
    }
  }
  section {
    padding: 20px 0;
  }
`;

export const AddToCartStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-top: 1px solid ${({ theme }) => theme.color.border};

  .total-price {
    display: flex;
    align-items: center;
    gap: 12px;
    h4 {
      font-size: 1.2rem;
    }
  }
  .button-box {
    display: flex;
    align-items: center;
    gap: 20px;
  }
`;

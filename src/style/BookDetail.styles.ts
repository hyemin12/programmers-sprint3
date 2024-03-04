import styled from 'styled-components';

export const BookDetailStyle = styled.div`
  .content {
    > div {
      padding: 18px 0%;
    }
  }
  section {
    padding: 20px 0;
  }
`;

export const DetailHeaderStyle = styled.header`
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
    padding: 12px 0;

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
`;

export const QuantityBoxStyle = styled.div`
  background-color: #f4f4f4;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  margin-top: 24px;
  padding: 24px;
  h4 {
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
  }
  div {
    display: flex;
    justify-content: space-between;
    span {
      font-weight: bold;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 5px 0;
  gap: 12px;
  text-align: center;
  > button {
    width: 50%;
  }
  > div {
    width: 50%;
    button {
      width: 100%;
    }
  }
`;

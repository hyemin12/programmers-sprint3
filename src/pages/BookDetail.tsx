import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const BookDetail = () => {
  const { bookId } = useParams();
  return <BookDetailStyle>BookDetail</BookDetailStyle>;
};

const BookDetailStyle = styled.div``;
export default BookDetail;

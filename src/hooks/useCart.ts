import { fetchCart } from 'api/carts.api';
import { ICart } from 'models/cart.model';
import { useEffect, useState } from 'react';
import { useAlert } from './useAlert';
import useCartStore from 'store/cart.store';

export const useCart = () => {
  // const [carts, setCarts] = useState<ICart[]>([]);
  // const [isEmpty, setIsEmpty] = useState(true);
  const { showConfirm } = useAlert();

  // const { setCartItem, setIsEmpty } = useCartStore();

  // const deleteCartItem = (id: number) => {
  //   // showConfirm('정말 삭제하시겠습니까?', () => setCarts(carts.filter((cart) => cart.id !== id)));
  // };

  // useEffect(() => {
  //   fetchCart().then((res) => {
  //     setCartItem(res);
  //     setIsEmpty(res.length === 0);
  //   });
  // }, []);

  // return { deleteCartItem };
};

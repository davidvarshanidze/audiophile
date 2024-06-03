import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "redux/types/reduxTypes";
import Link from "next/link";
import Image from "next/image";
import {
  HeaderContainer,
  HeaderWrap,
  MobileNav,
  MobileToggle,
  MobileMenu,
  HeaderLogoWrap,
  HeaderLogo,
  HeaderMenu,
  MenuWrap,
  MenuWrapItem,
  CartWrap,
  Cart,
  CartNumber,
} from "components/shared/header/headerStyles";
import MenuCard from "components/shared/menuCard/menuCard";
import Overlay from "components/shared/overlay/overlay";
import scrollTop from "helpers/scrollTop";
import CartMenu from "components/shared/cart/cart";
import useWindow from "hooks/useWindow";
import { RootState } from "redux/store";
import { totalCartQuantity } from "redux/slices/cartSlice";
import { toggleCartMenu } from "redux/slices/cartMenuSlice";
import ActiveLink from "components/shared/activeLink/activeLink";

interface HeaderProps {
  data: {
    logo: {
      image: string;
      imageAlt: string;
      link: string;
    };
    menu: {
      title: string;
      link: string;
      active: boolean;
      cta: string;
      image: {
        src: any;
        alt: string;
      };
    }[];
    cart: {
      icon: string;
      iconAlt: string;
    };
  };
  setShowOverlay;
  showOverlay;
}

const Header = ({
  data,
  setShowOverlay,
  showOverlay,
}: HeaderProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { logo, menu, cart } = data;
  const [menuToggle, setMenuToggle] = useState(false);
  const cartToggle = useAppSelector((state: RootState) => state.cartMenu.value);
  const totalProductCount = useAppSelector(totalCartQuantity);
  const { size } = useWindow();

  const handleMenuToggle = () => {
    setMenuToggle(!menuToggle);
    dispatch(toggleCartMenu(false));
    scrollTop();
  };

  const handleRemove = () => {
    setMenuToggle(false);
    dispatch(toggleCartMenu(false));
    scrollTop();
  };

  const handleCustomRemove = () => {
    setMenuToggle(false);
    dispatch(toggleCartMenu(false));
  };

  const handleMenuClose = () => {
    setMenuToggle(false);
  };

  const handleCartToggle = () => {
    dispatch(toggleCartMenu(!cartToggle));
    setMenuToggle(false);
    setShowOverlay(!showOverlay);
  };

  useEffect(() => {
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    const body = document.body;
  })
}

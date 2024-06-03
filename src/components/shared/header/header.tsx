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

    if (size <= 649) {
      if (menuToggle) {
        main.style.display = "none";
        footer.style.display = "none";
      } else {
        main.style.display = "block";
        footer.style.display = "block";
      }
    }

    if (cartToggle) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
      setShowOverlay(false);
    }
  });

  const removeMenuOnEscape = (e) => {
    if (e.key === "Escape") {
      handleCustomRemove();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", removeMenuOnEscape);

    return () => {
      window.removeEventListener("keydown", removeMenuOnEscape);
    };
  });

  return (
    <>
      <HeaderContainer menuToggle={menuToggle}>
        <HeaderWrap>
          <MobileNav>
            <MobileToggle onClick={handleMenuToggle}>
              {menuToggle ? (
                <i className="fas fa-times"></i>
              ) : (
                <i className="fas fa-bars" />
              )}
            </MobileToggle>
            {menuToggle && (
              <MobileMenu>
                {menu.slice(1, 4).map((menuItem, index) => {
                  return (
                    <MenuCard
                      key={index}
                      data={menuItem}
                      event={handleMenuClose}
                    />
                  );
                })}
              </MobileMenu>
            )}
          </MobileNav>
          <HeaderLogoWrap>
            <HeaderLogo>
              <Link href={logo.link}>
                <a>
                  <Image
                    src={logo.image}
                    alt={logo.imageAlt}
                    onClick={handleCustomRemove}
                  />
                </a>
              </Link>
            </HeaderLogo>
          </HeaderLogoWrap>
          <HeaderMenu>
            <MenuWrap>
              {menu.map((menuItem, index) => {
                return (
                  <MenuWrapItem key={index} onClick={handleCustomRemove}>
                    <ActiveLink href={menuItem.link}>
                      {menuItem.title}
                    </ActiveLink>
                  </MenuWrapItem>
                );
              })}
            </MenuWrap>
          </HeaderMenu>
          <CartWrap>
            <Cart aria-label="open your cart menu">
              <Image
                src={cart.icon}
                alt=" "
                aria-hidden="true"
                onClick={handleCartToggle}
              />
              {totalProductCount >= 1 && (
                <CartNumber
                  aria-label={'You have ${totalProductCount} in your cart'}
                >
                  <p>{totalProductCount}</p>
                </CartNumber>
              )}
            </Cart>
            {cartToggle && <CartMenu />}
          </CartWrap>
        </HeaderWrap>
      </HeaderContainer>
      {menuToggle && <Overlay event={handleRemove} menuOption />}
    </>
  );
};

export default Header;

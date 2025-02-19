import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "assets/icons/HomeIcon";
import BackIcon from "assets/icons/BackIcon";
import CartIcon from "assets/icons/CartIcon";
import useSyluvAxios from "hooks/useSyluvAxios";
import Splash from "components/Common/Splash";
import {
    Container,
    ImageContainer,
    Image,
    BackButton,
    HomeButton,
    CartButton,
    Title,
    Description,
    QuantityContainer,
    QuantityLabel,
    QuantityWrapper,
    QuantityButton1,
    QuantityButton2,
    Quantity,
    AddToCartButton,
    ModalBackground,
    VisitModal,
    ModalButton,
    CartBadge,
    HeaderBack1,
    HeaderBack2,
    HeaderBack3,
} from "./MenuItemDetailStyle";

const MenuItemDetail = ({
    menu,
    cartLength,
    handleCartLength = () => {},
    handleSelectedMenu = () => {},
}) => {
    const navigate = useNavigate();
    const syluvAxios = useSyluvAxios();
    const [quantity, setQuantity] = useState(1);
    const [showModal, setShowModal] = useState(false);

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = async () => {
        const menuId = menu?.menuId;
        const menuName = menu?.name;
        if (!menuId || !menuName) {
            console.error("Menu ID 또는 이름이 정의안됨");
            return;
        }
        try {
            const addResponse = await syluvAxios.post(`/cart`, {
                menuId: menuId,
                quantity: quantity,
            });

            // 장바구니 다시 불러오기
            const updatedCartResponse = await syluvAxios.get("/cart");
            handleCartLength(updatedCartResponse.data.payload.length);
            setQuantity(1);

            setShowModal(true); // 모달 표시
        } catch (addError) {
            console.error(
                "Add Error: ",
                addError.response ? addError.response.data : addError
            );
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    if (!menu) {
        return <Splash />;
    }

    return (
        <Container>
            <ImageContainer>
                <HeaderBack3 />
                <BackButton
                    onClick={() => handleSelectedMenu()}
                    aria-label="뒤로가기"
                >
                    <BackIcon color="white" />
                </BackButton>
                <HeaderBack1 />
                <HomeButton onClick={() => navigate("/")}>
                    <HomeIcon color="white" />
                </HomeButton>
                <HeaderBack2 />
                <CartButton
                    onClick={() => navigate("/cart")}
                    aria-label="장바구니로"
                >
                    <CartIcon color="white" />
                    {cartLength > 0 && <CartBadge>{cartLength}</CartBadge>}
                </CartButton>
                <Image src={menu.menuImage} alt={menu.name} />
            </ImageContainer>
            <Title>{menu.name}</Title>
            <Description>{menu.content}</Description>
            <QuantityContainer>
                <QuantityLabel>수량</QuantityLabel>
                <QuantityWrapper>
                    <QuantityButton1
                        onClick={handleDecrease}
                        aria-label="수량 줄이기"
                    >
                        -
                    </QuantityButton1>
                    <Quantity>{quantity}</Quantity>
                    <QuantityButton2
                        onClick={handleIncrease}
                        aria-label="수량 늘리기"
                    >
                        +
                    </QuantityButton2>
                </QuantityWrapper>
            </QuantityContainer>
            <AddToCartButton onClick={handleAddToCart}>
                {formatPrice(menu.price * quantity)}원 담기
            </AddToCartButton>
            {showModal && (
                <ModalBackground show={showModal}>
                    <VisitModal>
                        <div className="title-text">
                            메뉴가 장바구니에 담겼어요!
                        </div>
                        <div className="sub-text">{menu.name}</div>
                        <div className="buttons">
                            <ModalButton onClick={() => navigate("/cart")}>
                                주문하러 가기
                            </ModalButton>
                            <ModalButton onClick={handleCloseModal}>
                                계속 둘러보기
                            </ModalButton>
                        </div>
                    </VisitModal>
                </ModalBackground>
            )}
        </Container>
    );
};

export default MenuItemDetail;

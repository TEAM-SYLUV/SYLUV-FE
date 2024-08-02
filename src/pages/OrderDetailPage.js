import Button from "components/Common/Button";
import Header from "components/Common/Header";
import Splash from "components/Common/Splash";
import MenuList from "components/OrderList/OrderDetail/MenuList";
import SimpleReceipt from "components/OrderList/OrderDetail/SimpleReceipt";
import useSyluvAxios from "hooks/useSyluvAxios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ReviewPage from "./ReviewPage";

const OrderDetailPage = () => {
    const syluvAxios = useSyluvAxios();
    const { orderId } = useParams();
    const [orderDetail, setOrderDetail] = useState(null);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        const getOrderDetail = async () => {
            try {
                const res = await syluvAxios.get(`/order/${orderId}/detail`);
                setOrderDetail(res.data.payload);
                console.log(res.data.payload);
            } catch (error) {
                console.error(error);
            }
        };
        getOrderDetail();
    }, [orderId]);

    const deleteOrder = async () => {
        alert("api안나옴");
    };

    const handleClick = useCallback(() => {
        setIsClicked((prev) => !prev);
    }, []);

    const handleDate = useCallback((date) => {
        // "2024-08-01T01:54:46" -> "2024.08.01 오후 1:54"
        const dateObj = new Date(date);
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        const hour = dateObj.getHours();
        const minute = dateObj.getMinutes();
        const ampm = hour >= 12 ? "오후" : "오전";
        const hour12 = hour % 12;
        return `${year}.${month}.${day} ${ampm} ${hour12}:${minute}`;
    }, []);

    if (!orderDetail) return <Splash />;

    return !isClicked ? (
        <Container>
            <Header
                title="주문상세"
                rightText="삭제"
                cart={false}
                handleRight={deleteOrder}
            />
            <SimpleReceipt
                date={handleDate(orderDetail.orderDate)}
                orderNum={orderDetail.orderNum}
                name={orderDetail.storeName}
                state={"상태주세요"}
            />
            <MenuList order={orderDetail} />
            <BillContainer>
                <div>
                    <p className="left">결제금액</p>
                    <p className="right">63,000원</p>
                </div>
                <div>
                    <p className="left">결제방법</p>
                    <p className="right">토스페이</p>
                </div>
            </BillContainer>
            <ButtonContainer>
                <Button
                    text="리뷰 남기기"
                    type="2"
                    onClick={() => {
                        handleClick();
                    }}
                />
            </ButtonContainer>
        </Container>
    ) : (
        <ReviewPage
            name={orderDetail.storeName}
            date={handleDate(orderDetail.orderDate)}
            handleClick={handleClick}
            orderId={orderId}
        />
    );
};

export default OrderDetailPage;

const BillContainer = styled.div`
    border-top: 1px solid ${({ theme }) => theme.color.gray900};
    padding-top: 20px;
    flex-direction: column;
    width: 440px;
    display: flex;
    gap: 16px;

    div {
        display: flex;
        justify-content: space-between;

        .left {
            font-size: 14px;
            color: ${({ theme }) => theme.color.gray800};
            font-weight: ${({ theme }) => theme.fontWeight.regular};
        }
        .right {
            font-size: 18px;
            color: ${({ theme }) => theme.color.black900};
            font-weight: ${({ theme }) => theme.fontWeight.semiBold};
        }
    }

    @media (max-width: 480px) {
        width: calc(100dvw - 40px);
    }

    margin-bottom: 100px;
`;

const Container = styled.div`
    display: flex;
    min-height: 100dvh;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none; // IE 및 Edge
    scrollbar-width: none; // Firefox

    position: relative;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 440px;
    gap: 17px;
    position: fixed;
    bottom: 32px;

    @media (max-width: 480px) {
        width: calc(100dvw - 40px);
    }
`;

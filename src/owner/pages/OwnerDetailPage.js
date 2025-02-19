import Button from "components/Common/Button";
import Header from "components/Common/Header";
import OrderItem from "owner/components/OrderItem";
import { useCallback } from "react";
import styled from "styled-components";

const OwnerDetailPage = ({
    item,
    status,
    handleItem = () => {},
    handleAccept = () => {},
}) => {
    const handleDate = useCallback((date) => {
        // "2024-08-01T01:54:46" -> "2024.08.01 오후 1:54"
        const dateObj = new Date(date);
        const year = dateObj.getFullYear();
        const month = (dateObj.getMonth() + 1).toString().padStart(2, "0"); // 월을 두 자리로 표현
        const day = dateObj.getDate().toString().padStart(2, "0"); // 일을 두 자리로 표현
        const hour = dateObj.getHours();
        const minute = dateObj.getMinutes().toString().padStart(2, "0"); // 분을 두 자리로 표현
        const ampm = hour >= 12 ? "오후" : "오전";
        const hour12 = (hour % 12 || 12).toString().padStart(2, "0"); // 시간을 12시간제로 표현하고 두 자리로 표현
        return `${year}.${month}.${day} ${ampm} ${hour12}:${minute}`;
    }, []);
    const formatAmount = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <>
            <Header
                title="주문상세"
                cart={false}
                onLeftClick={() => handleItem(null, null)}
            />
            <Wrapper>
                <div className="info">
                    <span>
                        주문일시: {handleDate(item.createdAt)} {item.orderTime}
                    </span>
                    <span>주문번호: {item.orderNum}</span>
                    <span>주문자명: {item.userName}</span>
                </div>
                {item.menu.map((order) => (
                    <OrderItem key={order.menuImg} order={order} />
                ))}
                <BillContainer>
                    <div>
                        <span>결제금액</span>
                        <span className="right">
                            {formatAmount(item.totalPrice)}원
                        </span>
                    </div>
                    <div>
                        <span>결제방법</span>
                        <span className="right">토스페이</span>
                    </div>
                </BillContainer>
                {status === "접수" && (
                    <ButtonContainer>
                        <Button
                            text="접수하기"
                            type="2"
                            onClick={() => {
                                handleAccept(item.orderId);
                                handleItem(null, null);
                            }}
                        />
                    </ButtonContainer>
                )}
            </Wrapper>
        </>
    );
};

export default OwnerDetailPage;

const ButtonContainer = styled.div`
    position: fixed;
    bottom: 20px;
    padding: 0 20px;
    display: flex;
    gap: 12px;

    width: 440px;

    @media (max-width: 480px) {
        width: calc(100% - 40px);
    }
`;

const BillContainer = styled.div`
    border-top: 1px solid ${({ theme }) => theme.color.gray900};
    margin: 0px 20px;
    padding: 24px 0px;

    display: flex;
    flex-direction: column;
    gap: 16px;

    div {
        display: flex;
        justify-content: space-between;
    }

    font-size: 14px;
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    color: ${({ theme }) => theme.color.gray800};

    .right {
        color: ${({ theme }) => theme.color.gray900};
        font-weight: ${({ theme }) => theme.fontWeight.semiBold};
        font-size: 18px;
    }
`;

const Wrapper = styled.div`
    margin-top: 70px;
    margin-bottom: 80px;
    .info {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin: 16px 20px 24px 20px;

        span {
            font-size: 14px;
            font-weight: ${({ theme }) => theme.fontWeight.medium};
            color: ${({ theme }) => theme.color.gray600};
        }
    }
`;

import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import OrderManageItem from "./OrderManageItem";
import OwnerDetailPage from "owner/pages/OwnerDetailPage";
import useSyluvAxios from "hooks/useSyluvAxios";

const OrderManageTab = ({ storeId }) => {
    const syluvAxios = useSyluvAxios();
    const [selected, setSelected] = useState("신규/진행중");
    const [items, setItems] = useState([]);
    const [endItems, setEndItems] = useState([]);
    const [newItems, setNewItems] = useState([]);
    const [detailItem, setDetailItem] = useState(null);
    const [detailStatus, setDetailStatus] = useState();

    useEffect(() => {
        syluvAxios
            .get(`/customer/${storeId}`)
            .then((res) => {
                setItems(res.data.payload);
            })
            .catch((err) => {
                setItems([]);
            });
    }, [storeId]);

    useEffect(() => {
        const newItems = items.filter(
            (item) =>
                item.orderStatus !== "VISITED" && item.orderStatus !== "BEFORE"
        );
        const endItems = items.filter((item) => item.orderStatus === "VISITED");
        setNewItems(newItems);
        setEndItems(endItems);
    }, [items]);

    const handleDetailItem = useCallback((item, status) => {
        setDetailItem(item);
        setDetailStatus(status);
    }, []);

    const handleAccept = useCallback((orderId) => {
        syluvAxios
            .post(`/customer/${storeId}/${orderId}/preparing`)
            .then((res) => {
                setItems((prev) => {
                    return prev.map((item) => {
                        if (item.orderId === orderId) {
                            return { ...item, orderStatus: "PREPARING" };
                        }
                        return item;
                    });
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    if (detailItem !== null) {
        return (
            <OwnerDetailPage
                item={detailItem}
                status={detailStatus}
                handleItem={handleDetailItem}
                handleAccept={handleAccept}
            />
        );
    }

    return (
        <Container>
            <div className="button-bar">
                <button
                    className={selected === "신규/진행중" ? "selected" : ""}
                    onClick={() => setSelected("신규/진행중")}
                >
                    신규/진행중
                </button>
                <button
                    className={selected === "준비 완료" ? "selected" : ""}
                    onClick={() => setSelected("준비 완료")}
                >
                    완료한 주문
                </button>
            </div>
            {selected === "신규/진행중" ? (
                <div className="body">
                    {newItems.map((item, index) => (
                        <OrderManageItem
                            key={item.createdAt}
                            item={item}
                            handleItem={handleDetailItem}
                        />
                    ))}
                </div>
            ) : (
                <div className="body">
                    {endItems.map((item, index) => (
                        <OrderManageItem
                            key={item.createdAt}
                            item={item}
                            handleDetailItem={handleDetailItem}
                        />
                    ))}
                </div>
            )}
        </Container>
    );
};

export default OrderManageTab;

const Container = styled.div`
    .body {
        margin-top: -20px;
        display: flex;
        flex-direction: column;
        gap: 8px;

        color: ${({ theme }) => theme.color.gray600};
        font-size: 14px;
        font-weight: ${({ theme }) => theme.fontWeight.medium};
    }

    margin-top: 130px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 35px;

    .button-bar {
        margin: 0px 20px;
        display: flex;
        gap: 7px;

        button {
            color: ${({ theme }) => theme.color.gray400};
            font-weight: ${({ theme }) => theme.fontWeight.regular};
            font-size: 14px;
            padding: 8px 12px;
            border-radius: 54px;
            border: 1px solid ${({ theme }) => theme.color.gray400};
            background-color: white;
            cursor: pointer;
        }
        .selected {
            color: ${({ theme }) => theme.color.primary};
            border: 1px solid ${({ theme }) => theme.color.primary};
        }
    }
`;

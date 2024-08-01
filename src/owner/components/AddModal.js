import styled from "styled-components";
import add from "assets/images/add-button.png";
import { useCallback, useState } from "react";
import Button from "components/Common/Button";

const AddModal = ({ onClose = () => {} }) => {
    const [menu, setMenu] = useState({
        name: "",
        description: "",
        price: "",
    });

    const handleChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setMenu({
                ...menu,
                [name]: value,
            });
        },
        [menu]
    );
    return (
        <AddMenu>
            <div className="body">
                <div className="photo">
                    <span>사진을 추가해주세요</span>
                    <img src={add} alt="add" />
                </div>
                <div className="form">
                    <div className="item">
                        <span>메뉴</span>
                        <input
                            type="text"
                            name="name"
                            value={menu.name}
                            onChange={handleChange}
                            placeholder="메뉴 이름을 입력해주세요"
                        />
                    </div>
                    <div className="item">
                        <span>설명</span>
                        <input
                            type="text"
                            name="description"
                            value={menu.description}
                            onChange={handleChange}
                            placeholder="이 메뉴에 대해 설명해주세요"
                        />
                    </div>
                    <div className="item">
                        <span>가격</span>
                        <input
                            type="text"
                            name="price"
                            value={menu.price}
                            onChange={handleChange}
                            placeholder="가격을 입력해주세요"
                        />
                    </div>
                </div>
                <div className="buttons">
                    <Button text="취소" onClick={() => onClose()} />
                    <Button text="완료" type="2" onClick={() => onClose()} />
                </div>
            </div>
        </AddMenu>
    );
};

export default AddModal;

const AddMenu = styled.div`
    z-index: 100;
    position: fixed;
    width: 100dvw;
    height: 100dvh;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    .buttons {
        display: flex;
        justify-content: space-between;
        gap: 13px;
    }

    .body {
        width: 400px;
        background-color: white;
        border-radius: 10px;
        padding: 20px;

        @media (max-width: 480px) {
            width: calc(100% - 80px);
        }

        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .form {
        display: flex;
        flex-direction: column;
        gap: 20px;
        .item {
            display: flex;
            flex-direction: column;
            gap: 12px;
            span {
                font-size: 16px;
                font-weight: ${({ theme }) => theme.fontWeight.semiBold};
                color: ${({ theme }) => theme.color.gray900};
            }
            input {
                height: 46px;
                border: 1px solid ${({ theme }) => theme.color.gray200};
                font-weight: ${({ theme }) => theme.fontWeight.mediaum};
                color: ${({ theme }) => theme.color.gray900};
                border-radius: 8px;
                padding: 0 16px;
                font-size: 16px;
                outline: none;

                &::placeholder {
                    color: ${({ theme }) => theme.color.gray600};
                }
            }
        }
    }

    .photo {
        background-color: ${({ theme }) => theme.color.gray50};
        height: 142px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 12px;

        border-radius: 8px;
        border: 1px solid ${({ theme }) => theme.color.gray200};

        span {
            font-size: 18px;
            font-weight: ${({ theme }) => theme.fontWeight.semiBold};
            color: ${({ theme }) => theme.color.gray900};
        }

        img {
            &:hover {
                cursor: pointer;
                transform: scale(1.08);
                transition: transform 0.1s;
            }
        }
    }
`;
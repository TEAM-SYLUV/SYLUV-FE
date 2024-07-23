import styled from "styled-components";
import theme from "styles/SyluvTheme";

const MarketInfoSmall = ({ type, name, desc, imgSrc }) => {
    return (
        <ItemContainer>
            <MenuImage src={imgSrc} alt="메뉴 이미지" />
            <ItemInfo>
                <ItemTitleContainer>
                    <Category>{type}</Category>
                    <ItemTitle>{name}</ItemTitle>
                </ItemTitleContainer>
                <ItemDescription>{desc}</ItemDescription>
            </ItemInfo>
        </ItemContainer>
    );
};

export default MarketInfoSmall;

const ItemTitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Category = styled.div`
    color: ${({ theme }) => theme.color.gray600};
    font-size: 14px;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const ItemContainer = styled.div`
    display: flex;
    gap: 12px;
`;

const ItemDescription = styled.span`
    font-size: 14px;
    color: ${({ theme }) => theme.color.gray600};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    margin-right: 80px;
    word-break: keep-all;
`;

const MenuImage = styled.img`
    width: 104px;
    height: 104px;
    border-radius: 12px;
`;

const ItemInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 4px 0;
`;

const ItemTitle = styled.div`
    font-size: 16px;
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    color: ${({ theme }) => theme.color.gray900};
`;
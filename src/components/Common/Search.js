import { ReactComponent as SearchIcon } from "assets/images/search.svg";
import { useCallback, useState } from "react";
import styled from "styled-components";
import Hangul from "hangul-js";
import { useNavigate } from "react-router-dom";

const Search = ({ marketList }) => {
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState("");

    const getHighlightedText = (text, highlight) => {
        const regex = new RegExp(`(${highlight})`, "gi");
        const parts = text.split(regex);

        return parts.map((part, index) =>
            regex.test(part) ? <Highlight key={index}>{part}</Highlight> : part
        );
    };

    const filteredMarkets = marketList.filter(
        (market) => Hangul.search(market.marketName, searchInput) >= 0
    );

    const handleChange = useCallback((e) => {
        setSearchInput(e.target.value);
    }, []);

    const handleKeyDown = useCallback(
        (event) => {
            if (event.key === "Enter") {
                if (filteredMarkets.length > 0) {
                    navigate(`/market/${filteredMarkets[0].marketId}`);
                }
            }
        },
        [filteredMarkets, navigate]
    );

    return (
        <Container>
            <SearchIcon />
            <SearchInput
                placeholder="무슨 시장에 가고 싶으신가요?"
                value={searchInput}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            {searchInput.length > 0 && (
                <div className="search-list">
                    <div>
                        {filteredMarkets.length > 0 ? (
                            filteredMarkets.map((market, index) => (
                                <SearchResult
                                    key={index}
                                    onClick={() => {
                                        navigate(`/market/${market.marketId}`);
                                    }}
                                >
                                    {getHighlightedText(
                                        market.marketName,
                                        searchInput
                                    )}
                                </SearchResult>
                            ))
                        ) : (
                            <NoResults>검색 결과가 없습니다.</NoResults>
                        )}
                    </div>
                </div>
            )}
        </Container>
    );
};

export default Search;

const Container = styled.div`
    margin-top: 12px;
    width: calc(100% - 28px);
    padding: 0 14px;
    display: flex;
    gap: 8px;
    align-items: center;
    height: 40px;
    border: ${(props) => `1px solid ${props.theme.color.gray100}`};
    border-radius: 8px;
    background-color: ${(props) => props.theme.color.gray50};
    position: relative;

    .search-list {
        position: absolute;
        width: 100%;
        min-height: 40px;
        max-height: 152px;
        background-color: white;
        border: 1px solid ${({ theme }) => theme.color.gray100};
        left: 0px;
        top: 42px;
        border-radius: 8px;
        overflow-y: auto;

        /* Webkit 기반 브라우저 (Chrome, Safari) */
        ::-webkit-scrollbar {
            width: 8px; /* 스크롤바 너비 */
        }

        ::-webkit-scrollbar-track {
            background: transparent; /* 스크롤바 배경을 투명하게 */
        }

        ::-webkit-scrollbar-thumb {
            background-color: ${({ theme }) =>
                theme.color.gray200}; /* 스크롤바 막대 색상 */
            border-radius: 10px; /* 스크롤바 막대 둥글게 */
        }

        /* Firefox */
        scrollbar-width: thin; /* 스크롤바 너비 설정 */
        scrollbar-color: ${({ theme }) => theme.color.gray300} transparent; /* 스크롤바 막대 및 배경 색상 */

        div {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 10px;
        }
    }
`;

const SearchInput = styled.input`
    border: none;
    background-color: transparent;
    width: 100%;
    font-size: 16px;
    //활성화시 보더 삭제
    &:focus {
        outline: none;
    }
    color: ${(props) => props.theme.color.gray900};
    // 플레이스홀더 컬러
    &::placeholder {
        color: ${(props) => props.theme.color.gray500};
    }
`;

const SearchResult = styled.span`
    padding: 0 14px;
    padding-top: 10px;
    font-size: 16px;
    color: ${({ theme }) => theme.color.gray500};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    border-top: 1px solid ${({ theme }) => theme.color.gray100};
    cursor: pointer;
`;

const NoResults = styled.span`
    padding: 0 14px;
    padding-top: 10px;
    font-size: 16px;
    color: ${({ theme }) => theme.color.gray500};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    border-top: 1px solid ${({ theme }) => theme.color.gray100};
`;

const Highlight = styled.span`
    color: ${({ theme }) => theme.color.primary};
`;

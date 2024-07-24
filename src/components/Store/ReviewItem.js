import React, { useState } from "react";
import styled from "styled-components";
import starIcon from "../../assets/images/star.png";
import goodIcon from "../../assets/images/good.png";
import badIcon from "../../assets/images/bad.png";

const ReviewContainer = styled.div`
  margin-bottom: 44px; // 각 리뷰 항목 사이의 간격을 44px로 설정
  &:first-child {
    margin-top: 0; // 첫 번째 리뷰의 상단 여백 제거
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserProfile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc;
  margin-right: 10px;
`;

const UserName = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: 14px;
`;

const StarsAndTime = styled.div`
  display: flex;
  align-items: center;
`;

const Stars = styled.div`
  display: flex;
  align-items: center;
  margin-right: 4px;
`;

const Star = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 1.33px;
`;

const Time = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.color.gray400};
  font-size: 12px;
`;

const ReviewImageContainerSingle = styled.div`
  width: 440px; // 넓이 고정 시켰놨는데 핸드폰에 따라 변하는거 추가해야함
  height: 264px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 19px;
`;

const ReviewImageContainerMultiple = styled.div`
  width: calc(200% - 20px);
  height: 166px;
  border-radius: 8px;
  overflow-x: auto;
  display: flex;
  margin-top: 19px;
  padding-right: 20px;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; // IE 및 Edge
  scrollbar-width: none; // Firefox
`;

const ReviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const MenuName = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  font-size: 14px;
  color: ${({ theme }) => theme.color.gray300};
  margin-top: 19px;
`;

const ReviewText = styled.p`
  margin-top: 12px;
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.color.gray800};
  margin-bottom: 6px;
`;

const Helpfulness = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.color.gray500};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: 14px;
  margin-top: 10px;
  height: 24px;
`;

const HelpfulButton = styled.button`
  background: none;
  border: 1px solid ${({ active }) => (active ? "#9A9A9A" : "#ff6b00")};
  border-radius: 54px;
  color: ${({ active }) => (active ? "#9A9A9A" : "#ff6b00")};
  padding: 5px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  left: 0px;
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 3px;
`;

const ReviewResponse = styled.div`
  padding: 20px;
  margin-top: 20px;
  background-color: #fafafa;
  border-radius: 8px;
`;

const ResponseHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const ResponseTitle = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  margin-right: 4px;
  font-size: 14px;
`;

const ResponseTime = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.color.gray400};
`;

const ResponseText = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.color.gray800};
`;

const ReviewItem = ({ review }) => {
  const [helpfulness, setHelpfulness] = useState(review.helpfulness);
  const [isHelpfulClicked, setIsHelpfulClicked] = useState(false);

  const handleHelpfulnessClick = () => {
    setHelpfulness(helpfulness + 1);
    setIsHelpfulClicked(true);
  };

  return (
    <ReviewContainer>
      <Header>
        <UserInfo>
          <UserProfile />
          <div>
            <UserName>{review.reviewer}</UserName>
            <StarsAndTime>
              <Stars>
                {[...Array(5)].map((_, index) => (
                  <Star key={index} src={starIcon} alt="star" />
                ))}
              </Stars>
              <Time>{review.time} 전</Time>
            </StarsAndTime>
          </div>
        </UserInfo>
      </Header>
      {review.images && review.images.length === 1 ? (
        <ReviewImageContainerSingle>
          <ReviewImage src={review.images[0]} alt="review" />
        </ReviewImageContainerSingle>
      ) : review.images && review.images.length > 1 ? (
        <ReviewImageContainerMultiple>
          {review.images.map((image, index) => (
            <ReviewImage key={index} src={image} alt={`review-${index}`} />
          ))}
        </ReviewImageContainerMultiple>
      ) : null}
      <MenuName>{review.menu}</MenuName>
      <ReviewText>{review.comment}</ReviewText>
      <Helpfulness>
        <div>{helpfulness}명에게 도움이 되었어요</div>
        <HelpfulButton
          onClick={handleHelpfulnessClick}
          active={isHelpfulClicked}
        >
          <Icon src={isHelpfulClicked ? badIcon : goodIcon} alt="thumbs up" />
          도움이 돼요
        </HelpfulButton>
      </Helpfulness>
      {review.response && (
        <ReviewResponse>
          <ResponseHeader>
            <ResponseTitle>사장님</ResponseTitle>
            <ResponseTime>1시간 전</ResponseTime>
          </ResponseHeader>
          <ResponseText>{review.response}</ResponseText>
        </ReviewResponse>
      )}
    </ReviewContainer>
  );
};

export default ReviewItem;

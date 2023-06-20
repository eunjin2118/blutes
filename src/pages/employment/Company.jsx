import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const categories = [
  { id: 1, name: '학력' },
  { id: 2, name: '경력' },
  { id: 3, name: '기업형태' }
];

const CompanyList = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CompanyCard = styled.div`
  width: calc(20% - 20px);
  height: 20vh;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-right: 20px;
`;

const CompanyName = styled.h3`
  font-size: 16px;
  color: #3f51b5;
  margin-bottom: 5px;
`;

const CompanyTitle = styled.p`
  font-size: 14px;
  color: #555;
`;

const CategoryWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const CategoryButton = styled.button`
  background-color: ${props => (props.isActive ? '#3f51b5' : '#fff')};
  color: ${props => (props.isActive ? '#fff' : '#3f51b5')};
  padding: 10px;
  border: 1px solid #3f51b5;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const Checkbox = styled.input`
  margin-right: 5px;
`;

const OptionLabel = styled.label`
  color: #555;
`;

const AppWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-top: 10%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f7f7f7;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  text-align: center;
  color: #3f51b5;
  margin-bottom: 20px;
`;

const CompanyCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 800px;
  width: 100%;
`;

const Company = () => {
  const [activeCategories, setActiveCategories] = useState([]);
  
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const apiUrl = 'YOUR_API_URL'; // Replace with your API URL

    const fetchCompanies = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        setCompanies(data);
      } catch (error) {
        console.error('API 요청 오류:', error);
      }
    };

    fetchCompanies();
  }, []);

  const handleCategoryClick = categoryId => {
    setActiveCategories(prevActiveCategories => {
      if (prevActiveCategories.includes(categoryId)) {
        return prevActiveCategories.filter(id => id !== categoryId);
      }
      return [...prevActiveCategories, categoryId];
    });
  };

  const renderOptions = () => {
    if (activeCategories.length === 0) {
      return null;
    }

    return (
      <OptionWrapper>
        {activeCategories.map(categoryId => {
          let categoryOptions = null;
          switch (categoryId) {
            case 1:
              categoryOptions = (
                <React.Fragment key={categoryId}> {/* key 속성 추가 */}
                  <OptionItem key={1}>
                    <Checkbox type="checkbox" id="option1" name="option1" value="학력무관" />
                    <OptionLabel htmlFor="option1">학력무관</OptionLabel>
                  </OptionItem>
                  <OptionItem key={2}>
                    <Checkbox type="checkbox" id="option2" name="option2" value="고졸" />
                    <OptionLabel htmlFor="option2">고졸</OptionLabel>
                  </OptionItem>
                </React.Fragment>
              );
              break;
            case 2:
              categoryOptions = (
                <React.Fragment key={categoryId}> {/* key 속성 추가 */}
                  <OptionItem key={3}>
                    <Checkbox type="checkbox" id="option3" name="option3" value="신입" />
                    <OptionLabel htmlFor="option3">신입</OptionLabel>
                  </OptionItem>
                  <OptionItem key={4}>
                    <Checkbox type="checkbox" id="option4" name="option4" value="관계없음" />
                    <OptionLabel htmlFor="option4">관계없음</OptionLabel>
                  </OptionItem>
                </React.Fragment>
              );
              break;
            case 3:
              categoryOptions = (
                <React.Fragment key={categoryId}> {/* key 속성 추가 */}
                  <OptionItem key={5}>
                    <Checkbox type="checkbox" id="option5" name="option5" value="중소기업" />
                    <OptionLabel htmlFor="option5">중소기업</OptionLabel>
                  </OptionItem>
                  <OptionItem key={6}>
                    <Checkbox type="checkbox" id="option6" name="option6" value="대기업" />
                    <OptionLabel htmlFor="option6">대기업</OptionLabel>
                  </OptionItem>
                  <OptionItem key={7}>
                    <Checkbox type="checkbox" id="option7" name="option7" value="스타트업" />
                    <OptionLabel htmlFor="option7">스타트업</OptionLabel>
                  </OptionItem>
                </React.Fragment>
              );
              break;
            default:
              categoryOptions = null;
          }
          return categoryOptions;
        })}
      </OptionWrapper>
    );
  };

  return (
    <>
      <AppWrapper>
        <Title>채용정보 카테고리</Title>
        <CategoryWrapper>
          {categories.map(category => (
            <CategoryButton
              key={category.id}
              isActive={activeCategories.includes(category.id)}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </CategoryButton>
          ))}
        </CategoryWrapper>
        {renderOptions()}
      </AppWrapper>
      <CompanyList>
        {companies.map(company => (
          <CompanyCard key={company.id}>
            <CompanyName>{company.name}</CompanyName>
            <CompanyTitle>{company.title}</CompanyTitle>
          </CompanyCard>
        ))}
      </CompanyList>
    </>
  );
};

export default Company;

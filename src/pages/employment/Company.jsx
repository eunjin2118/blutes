import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Header from '../Header';
import { useLocation } from 'react-router-dom';

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
  width: auto;
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
  font-family: 'ContentFont3';  
  font-size: 16px;
  color: #3f51b5;
  margin-bottom: 5px;
`;

const CompanyTitle = styled.p`
  font-family: 'ContentFont2';  
  font-size: 14px;
  color: #555;
`;

const CategoryWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: center;
`;

const CategoryButton = styled.button`
  font-family: 'ContentFont2';  
  margin-right: 5px;
  background-color: ${({ isActive }) => (isActive ? '#3f51b5' : '#ccc')};
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
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
  font-family: 'ContentFont2';  
  margin-right: 5px;
`;

const OptionLabel = styled.label`
  font-family: 'ContentFont2';  
  color: #555;
`;

const AppWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-top: 3%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f7f7f7;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-family: 'ContentFont3';  
  font-size: 24px;
  text-align: center;
  color: #3f51b5;
  margin-bottom: 20px;
`;

const CompanyCardContainer = styled.div`  
  margin-top: 2%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  max-width: 800px;
  width: 100%;
`;

const Company = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [userToggled, setUserToggled] = useState(false);
  const [activeCategories, setActiveCategories] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [companies, setCompanies] = useState([]); // Added companies state
  const [filteredCompanies, setFilteredCompanies] = useState([]); // Added filteredCompanies state

  const location = useLocation();
  const name = location.state.value;

  useEffect(() => {
    const apiUrl = 'http://localhost:3000/job_info'; // Replace with your API URL

    const fetchCompanies = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        setCompanies(data.wantedRoot.wanted);
      } catch (error) {
        console.error('API 요청 오류:', error);
      }
    };

    fetchCompanies();
  }, []);

  const handleCheckboxChange = (e, categoryId) => {
    const { value, checked } = e.target;
    setSelectedOptions((prevSelectedOptions) => {
      if (checked) {
        return [...prevSelectedOptions, { categoryId, value }];
      } else {
        return prevSelectedOptions.filter(
          (option) => option.categoryId !== categoryId || option.value !== value
        );
      }
    });
  };
  
  useEffect(() => {
    // Filter companies based on active categories and selected options
    const filtered = companies.filter((c) => {
      if (activeCategories.includes(1)) {
        const selectedOption = selectedOptions.find(
          (option) => option.categoryId === 1
        );
        if (selectedOption) {
          if (selectedOption.value === "학력무관") {
            return c.minEdubg === "학력무관";
          } else if (selectedOption.value === "고졸") {
            return c.minEdubg === "고졸";
          }
        }
      }
      if (activeCategories.includes(2)) {
        const selectedOption = selectedOptions.find(
          (option) => option.categoryId === 2
        );
        if (selectedOption) {
          if (selectedOption.value === "신입") {
            return c.career === "신입";
          } else if (selectedOption.value === "관계없음") {
            return c.career === "관계없음";
          }
        }
      }
      if (activeCategories.includes(3)) {
        // Filter based on 기업형태 category
        const selectedOption = selectedOptions.find(
          (option) => option.categoryId === 3
        );
        if (selectedOption) {
          if (selectedOption.value === "중소기업") {
            return c.companyType === "중소기업";
          } else if (selectedOption.value === "대기업") {
            return c.companyType === "대기업";
          } else if (selectedOption.value === "스타트업") {
            return c.companyType === "스타트업";
          }
        }
      }
      return true;
    });
    setFilteredCompanies(filtered);
  }, [activeCategories, selectedOptions, companies]);

  useEffect(() => {
    // Filter companies based on active categories
    const filtered = companies.filter((c) => {
      if (activeCategories.includes(1)) {
        // Check if "학력무관" checkbox is active
        return c.minEdubg === '학력무관';
      }
      return true;
    });
    setFilteredCompanies(filtered);
  }, [activeCategories, companies]);

  const handleCategoryClick = (categoryId) => {
    setActiveCategories((prevActiveCategories) => {
      if (prevActiveCategories.includes(categoryId)) {
        return prevActiveCategories.filter((id) => id !== categoryId);
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
      {activeCategories.map((categoryId) => {
        let categoryOptions = null;
        switch (categoryId) {
          case 1:
            categoryOptions = (
              <>
                <OptionItem key={1}>
                  <Checkbox
                    type="checkbox"
                    id="option1"
                    name="option1"
                    value="학력무관"
                    onChange={(e) => handleCheckboxChange(e, categoryId)}
                  />
                  <OptionLabel htmlFor="option1">학력무관</OptionLabel>
                </OptionItem>
                <OptionItem key={2}>
                  <Checkbox
                    type="checkbox"
                    id="option2"
                    name="option2"
                    value="고졸"
                    onChange={(e) => handleCheckboxChange(e, categoryId)}
                  />
                  <OptionLabel htmlFor="option2">고졸</OptionLabel>
                </OptionItem>
              </>
            );
            break;
          case 2:
            categoryOptions = (
              <>
                <OptionItem key={3}>
                  <Checkbox
                    type="checkbox"
                    id="option3"
                    name="option3"
                    value="신입"
                    onChange={(e) => handleCheckboxChange(e, categoryId)}
                  />
                  <OptionLabel htmlFor="option3">신입</OptionLabel>
                </OptionItem>
                <OptionItem key={4}>
                  <Checkbox
                    type="checkbox"
                    id="option4"
                    name="option4"
                    value="관계없음"
                    onChange={(e) => handleCheckboxChange(e, categoryId)}
                  />
                  <OptionLabel htmlFor="option4">관계없음</OptionLabel>
                </OptionItem>
              </>
            );
            break;
            case 3:
              categoryOptions = (
                <>
                  <OptionItem key={5}>
                    <Checkbox
                      type="checkbox"
                      id="option5"
                      name="option5"
                      value="중소기업"
                      onChange={(e) => handleCheckboxChange(e, categoryId)}
                    />
                    <OptionLabel htmlFor="option5">중소기업</OptionLabel>
                  </OptionItem>
                  <OptionItem key={6}>
                    <Checkbox
                      type="checkbox"
                      id="option6"
                      name="option6"
                      value="대기업"
                      onChange={(e) => handleCheckboxChange(e, categoryId)}
                    />
                    <OptionLabel htmlFor="option6">대기업</OptionLabel>
                  </OptionItem>
                  <OptionItem key={7}>
                    <Checkbox
                      type="checkbox"
                      id="option7"
                      name="option7"
                      value="스타트업"
                      onChange={(e) => handleCheckboxChange(e, categoryId)}
                    />
                    <OptionLabel htmlFor="option7">스타트업</OptionLabel>
                  </OptionItem>
                </>
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
      <Header
        isToggled={isToggled}
        userToggled={userToggled}
        setIsToggled={setIsToggled}
        setUserToggled={setUserToggled}
        setUserName={name}
      />
      <AppWrapper>
        <Title>채용정보 카테고리</Title>
        <CategoryWrapper>
          {categories.map((category) => (
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
        <CompanyCardContainer>
          {filteredCompanies.map((c, index) => (
            <CompanyCard key={index}>
              <CompanyName>{c.company}</CompanyName>
              <CompanyTitle>{c.career}</CompanyTitle>
              <CompanyTitle>{c.minEdubg}</CompanyTitle>
            </CompanyCard>
          ))}
        </CompanyCardContainer>
      </CompanyList>
    </>
  );
};

export default Company;

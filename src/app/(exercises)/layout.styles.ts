import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
`;

export const Footer = styled.footer`
  width: 100%;
`;

export const FooterNavigationWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const NavigationContainer = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
  color: #757575;
  font-weight: bold;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
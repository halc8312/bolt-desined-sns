import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterContainer = styled.footer`
  padding: 4rem 2rem;
  background: rgba(0, 0, 0, 0.05);
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }

  p, a {
    margin-bottom: 0.5rem;
    opacity: 0.8;
    text-decoration: none;
    color: var(--color-text);
    display: block;
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  opacity: 0.6;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>会社情報</h3>
          <p>〒100-0001</p>
          <p>東京都千代田区</p>
          <p>電話: 03-1234-5678</p>
        </FooterSection>
        <FooterSection>
          <h3>リンク</h3>
          <a href="#about">概要</a>
          <a href="#features">特徴</a>
          <a href="#contact">お問い合わせ</a>
        </FooterSection>
        <FooterSection>
          <h3>SNS</h3>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
        </FooterSection>
      </FooterContent>
      <Copyright>
        <p>&copy; 2023 和のモダン. All rights reserved.</p>
      </Copyright>
    </FooterContainer>
  );
}

export default Footer;

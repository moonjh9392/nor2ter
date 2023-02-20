'use client';

import React from 'react';
import styled from 'styled-components';

const Header = () => {
  const menuList: string[] = ['강화계산기', '돌깍기'];

  return (
    <HeaderDiv>
      <Logo></Logo>
      <TopMenu>
        {menuList.map((e: string, i: number) => {
          return <nav key={i}>{e}</nav>;
        })}
      </TopMenu>
    </HeaderDiv>
  );
};

export default Header;

const HeaderDiv = styled.div`
  position: sticky;
  width: 100vw;
  height: 100px;

  box-shadow: 0 4px 4px -4px black;
`;

const Logo = styled.div``;

const TopMenu = styled.div`
  height: inherit;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

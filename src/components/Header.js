import styled from "styled-components";
import { ethers } from "ethers";
import { FiMenu } from "react-icons/fi";
import { CgSearch } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { Colors, Devices } from "./Theme";
import Button from "./styled/Button.styled";
import SearchBar from "./Header/SearchBar";
import SearchBarMob from "./Header/MobileSearchBar";
import { useState } from "react";

const HeaderEl = styled.header`
  z-index: 10;
  display: flex;
  color: ${Colors.White};
  width: 100%;
  align-items: center;
  height: 10%;
  gap: 1rem;
  padding: 1rem 1.5rem;
  top: 0;
  background-color: ${Colors.Background};
  position: sticky;

  svg {
    font-size: 2rem;
    cursor: pointer;
  }
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoText = styled.a`
  font-size: 1.2rem;
  font-weight: 500;
  color: #bbbbbb;
`;

const Logo = styled.img`
  width: 45px;
  border-right: 1px solid ${Colors.Gray};
  padding-right: 1rem;
`;

const Nav = styled.nav`
  margin-left: auto;
  border-right: 1px solid ${Colors.Gray};
  padding-right: 1rem;
  display: none;

  ul {
    display: flex;
    align-items: center;
    list-style: none;
    gap: 1rem;
  }

  @media ${Devices.Laptop} {
    display: block;
  }
`;

const NavItem = styled.a`
  font-size: 1rem;
  font-weight: 400;
`;

const SearchIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${Devices.Laptop} {
    display: none;
  }
`;
const MenuIcon = styled(SearchIcon)``;

const AuthItems = styled(NavItem)`
  font-size: 1rem;
  display: none;
  @media ${Devices.Laptop} {
    display: inherit;
  }
`;


const Navigation = ({ account, setAccount, mobileMenu }) => {
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = ethers.utils.getAddress(accounts[0])
    setAccount(account);
  }

  const { MobileMenuIsOpen, setMobileMenuIsOpen } = mobileMenu

  function toggleMenu() {
    setMobileMenuIsOpen(!MobileMenuIsOpen);
  }

  return (
    <HeaderEl>
      <MenuIcon>
        {MobileMenuIsOpen ? (
          <IoClose
            style={{ fontSize: "2.5rem" }}
            color={Colors.Primary}
            onClick={() => {
              toggleMenu();
            }}
          />
        ) : (
          <FiMenu
            onClick={() => {
              toggleMenu();
            }}
          />
        )}
      </MenuIcon>
      <Center>
        <Logo src="/images/cryptoLogo.png" />
        <LogoText href="#">TrustWise Estates</LogoText>
        <Nav>
          {account ? (
            <Button
            >
              {account.slice(0, 6) + '...' + account.slice(38, 42)}
            </Button>
          ) : (
            <Button
              onClick={connectHandler}
            >
              Connect Wallet
            </Button>
          )}
          <Button><a href ="https://my-app-beta-hazel.vercel.app/">Create your buissness</a></Button>
        </Nav>
      </Center>
    </HeaderEl>    
  );
}

export default Navigation



import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  return (
    <Nav>
      <NavContainer>
        <Logo>Task Manager</Logo>
        <NavMenu>
          <NavItem>
            <NavLink to="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/new">Add Task</NavLink>
          </NavItem>
        </NavMenu>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 10px 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px; /* Adjust the max-width as needed */
`;

const Logo = styled.div`
  font-size: 1.5rem;
  color: #333;
  font-weight: bold;
`;

const NavMenu = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin-left: 50px;
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-size: 1rem;
  position: relative;
  padding: 5px 0;
  transition: color 0.3s ease;

  &:hover {
    color: #f9a825; /* Accent color on hover */
  }

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    left: 0;
    bottom: -2px;
    background-color: #f9a825;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

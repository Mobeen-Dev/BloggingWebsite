import React from "react";
import { Logo, Container } from "../index";
import LogoutAction from "./logoutBtn";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header>
      <Container>
        <nav>
          <div>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <ul>
            {navItems.map((item) => {
              return item.active ? (
                <li key={item.slug} className="inline-block mr-4">
                  <button className="text-gray-700 hover:text-gray-900">
                    onClick={() => navigate(item.slug)}
                  </button>
                </li>
              ) : null;
              {
                authStatus && (
                  <li className="inline-block mr-4">
                    <LogoutAction />
                  </li>
                );
              }
            })}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;

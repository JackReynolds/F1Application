import React from "react";
import Link from "./Link";
import "../css/header.css";

const Header = () => {
  return (
    <section id="header">
      <header>
        <nav
          className="navbar is-danger"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="">
            <a
              href="#"
              role="button"
              className="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <Link href="/" className="navbar-item">
                Compare Drivers
              </Link>
              <Link href="/standings" className="navbar-item">
                Driver Standings
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </section>
  );
};

//Bulma CSS navbar required JS
document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach((el) => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

export default Header;

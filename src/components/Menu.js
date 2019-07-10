import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import { createLocalLink } from "../utils"
import styled from "styled-components"

const HeaderMenu = styled.nav`
  display: flex;
  align-items: center;
  ul {
    display: flex;
    justify-content: flex-end;
    margin: 0;
    > li {
      padding-right: 20px;
      &:last-child {
        padding-right: 0;
      }

      a {
        text-decoration: none;
        text-transform: uppercase;
        color: #999999;
        font-size: 13px;
        font-weight: 300;
        letter-spacing: 1.5px;
        border: none;

        &:hover,
        &:active {
          color: #111;
        }
      }
    }
  }
`

const MENU_QUERY = graphql`
  fragment MenuFields on WPGraphQL_MenuItem {
    id
    label
    url
    target
    connectedObject {
      __typename
    }
  }

  query GET_MENU_ITEMS {
    wpgraphql {
      menuItems(where: { location: MENU_1 }) {
        nodes {
          ...MenuFields
          childItems {
            nodes {
              ...MenuFields
            }
          }
        }
      }
    }
  }
`

const renderLink = menuItem =>
  menuItem.connectedObject.__typename === "WPGraphQL_MenuItem" ? (
    <a href={menuItem.url} target="_blank" rel="noopener noreferrer">
      {menuItem.label}
    </a>
  ) : createLocalLink(menuItem.url) ? (
    <Link to={createLocalLink(menuItem.url)}>{menuItem.label}</Link>
  ) : (
    menuItem.label
  )

const renderMenuItem = menuItem => {
  if (menuItem.childItems && menuItem.childItems.nodes.length) {
    return renderSubMenu(menuItem)
  } else {
    return (
      <li className="menu-item" key={menuItem.id}>
        {renderLink(menuItem)}
      </li>
    )
  }
}

const renderSubMenu = menuItem => {
  return (
    <li className="has-subMenu menu-item" key={menuItem.id}>
      {renderLink(menuItem)}

      <ul className="menuItemGroup sub-menu">
        {menuItem.childItems.nodes.map(item => renderMenuItem(item))}
      </ul>
    </li>
  )
}

const Menu = () => {
  const data = useStaticQuery(MENU_QUERY)

  if (data.wpgraphql.menuItems) {
    return (
      <HeaderMenu>
        <ul role="menu">
          {data.wpgraphql.menuItems.nodes.map(menuItem => {
            if (menuItem.childItems.nodes.length) {
              return renderSubMenu(menuItem)
            } else {
              return renderMenuItem(menuItem)
            }
          })}
        </ul>
      </HeaderMenu>
    )
  } else {
    return null
  }
}

export default Menu

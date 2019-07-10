import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Menu from "./Menu"
import styled from "styled-components"
import { Container } from "../styles"

const StyledHeader = styled.header`
  div {
    @media (min-width: 600px) {
      display: flex;
      justify-content: space-between;
    }
  }
  @media (min-width: 768px) {
    padding: 80px 0;
  }
  padding: 40px 0;
`

const SiteTitle = styled.h1`
  font-size: 42px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;

  a {
    color: #222;
    border: none;
  }
`

const Header = () => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      wpgraphql {
        generalSettings {
          description
          title
        }
      }
    }
  `)

  const { title, description } = data.wpgraphql.generalSettings

  return (
    <StyledHeader id="masthead" className="site-header">
      <Container>
        <SiteTitle>
          <Link to="/" rel="home">
            {title}
          </Link>
        </SiteTitle>
        <Menu />
      </Container>
    </StyledHeader>
  )
}

export default Header

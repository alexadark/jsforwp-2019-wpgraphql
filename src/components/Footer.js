import React from "react"
import { Container } from "../styles"
import styled from "styled-components"

const StyledFooter = styled.footer`
  @media (min-width: 768px) {
    padding: 80px 0;
  }
  padding: 40px 0;
`

const Footer = () => (
  <StyledFooter>
    <Container>
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </Container>
  </StyledFooter>
)

export default Footer

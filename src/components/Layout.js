import React from "react"
import Header from "./Header.js"
import Footer from "./Footer.js"
import { GlobalStyles, Container } from "../styles"

const Layout = ({ children }) => (
  <>
    <GlobalStyles />
    <Header />
    <Container width="960px">{children}</Container>
    <Footer />
  </>
)

export default Layout

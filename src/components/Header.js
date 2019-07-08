import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

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
    <header id="masthead" className="site-header">
      <p className="site-title">
        <Link to="/" rel="home">
          {title}
        </Link>
      </p>

      <p className="site-description">{description}</p>
    </header>
  )
}

export default Header

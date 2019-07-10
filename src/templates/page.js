import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import { PageTitle } from "../styles"

const Page = ({ data }) => {
  const { title, content } = data.wpgraphql.page
  return (
    <Layout>
      <PageTitle dangerouslySetInnerHTML={{ __html: title }} />
      <p className="content" dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  )
}

export default Page

export const pageQuery = graphql`
  query GET_PAGE($id: ID!) {
    wpgraphql {
      page(id: $id) {
        title
        content
        uri
      }
    }
  }
`

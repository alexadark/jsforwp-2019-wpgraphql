import React from "react"
import Layout from "../components/Layout"
import { graphql, Link } from "gatsby"
import Pagination from "../components/Pagination"

const Blog = ({ data, pageContext }) => {
  const posts = data.wpgraphql.posts.nodes
  const { pageNumber, hasNextPage, itemsPerPage, allPosts } = pageContext
  return (
    <Layout>
      {data &&
        data.wpgraphql &&
        posts.map(post => (
          <article key={post.id}>
            {post.featuredImage && (
              <img
                src={post.featuredImage.sourceUrl}
                alt={post.featuredImage.altText}
              />
            )}

            <h2>
              <Link
                to={`/blog/${post.uri}`}
                dangerouslySetInnerHTML={{ __html: post.title }}
              />
            </h2>
            <p
              className="content"
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
          </article>
        ))}
      <Pagination
        pageNumber={pageNumber}
        hasNextPage={hasNextPage}
        allPosts={allPosts}
        itemsPerPage={itemsPerPage}
      />
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  query GET_POSTS($ids: [ID]) {
    wpgraphql {
      posts(first: 3, where: { in: $ids }) {
        nodes {
          id
          uri
          title
          excerpt
          date
          featuredImage {
            altText
            sourceUrl
          }
        }
      }
    }
  }
`

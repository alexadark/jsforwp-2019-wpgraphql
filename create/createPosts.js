const path = require(`path`)

module.exports = async ({ actions, graphql }) => {
  const GET_POSTS = `
    query GET_POSTS($first:Int $after:String){
        wpgraphql {
          posts(
            first: $first
            after:$after
          ) {
            pageInfo {
              endCursor
              hasNextPage
            }
            nodes {
              id
              uri
              postId
              title
            }
          }
        }
      }
    `

  const { createPage } = actions
  const allPosts = []
  const blogPages = []
  let pageNumber = 1

  const fetchPosts = async variables =>
    await graphql(GET_POSTS, variables).then(({ data }) => {
      const {
        wpgraphql: {
          posts: {
            nodes,
            pageInfo: { hasNextPage, endCursor },
          },
        },
      } = data

      const ids = nodes.map(node => node.postId)
      const blogTemplate = path.resolve(`./src/templates/blog.js`)
      const blogPagePath = !variables.after ? `/` : `/page/${pageNumber}` //If after is empty, we are on the first page = root of the site if we choose to have the blog has front page

      blogPages[pageNumber] = {
        path: blogPagePath,
        component: blogTemplate,
        context: {
          ids,
          pageNumber,
          hasNextPage,
          allPosts,
          itemsPerPage: 3,
        },
      }

      //Get all posts
      nodes.map(post => {
        allPosts.push(post)
      })
      if (hasNextPage) {
        pageNumber++ //If it hasNextPage, then we increase the pageNumber by one
        return fetchPosts({ first: 3, after: endCursor })
      }
      return allPosts
    })

  await fetchPosts({ first: 3, after: null }).then(allPosts => {
    blogPages.map(blogPage => {
      console.log(`createBlogPage ${blogPage.context.pageNUmber}`)
      createPage(blogPage)
    })
    const postTemplate = path.resolve(`./src/templates/post.js`)
    allPosts.map(post => {
      console.log(`create post: ${post.uri}`)
      createPage({
        path: `/blog/${post.uri}/`,
        component: postTemplate,
        context: post,
      })
    })
  })
}

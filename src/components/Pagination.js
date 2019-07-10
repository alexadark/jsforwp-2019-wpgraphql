import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const StyledPagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding-right: 50px;
  margin-bottom: 40px;
  .mutted {
    color: #bbb;
  }
`
const PageNumbers = styled.div`
  a {
    padding: 5px 10px;
    background: #f5f5f5;
    border: none;
    margin-right: 5px;
    &:hover {
      background-color: #222;
      color: #fff;
    }
  }
`
const PrevNextLinks = styled.div`
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
  a {
    padding-bottom: 5px;
  }
`

const Pagination = ({ pageNumber, hasNextPage, allPosts, itemsPerPage }) => (
  <StyledPagination>
    {pageNumber > 1 && (
      <PrevNextLinks>
        <Link to={pageNumber > 2 ? `/page/${pageNumber - 1}` : `/`}>
          Previous Posts
        </Link>
      </PrevNextLinks>
    )}
    <PageNumbers>
      {Array.from({ length: allPosts.length / itemsPerPage }, (_, i) => (
        <Link
          key={`pagination-number${i + 1}`}
          to={i === 0 ? "/" : `/page/${i + 1}`}
        >
          {i + 1}
        </Link>
      ))}
    </PageNumbers>
    {hasNextPage && (
      <PrevNextLinks>
        <Link to={`page/${pageNumber + 1}`}>Next Posts</Link>
      </PrevNextLinks>
    )}
  </StyledPagination>
)

export default Pagination

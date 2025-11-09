import styled from 'styled-components'
import { usePostBlocker } from '../context/postBlocker'

const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;

  > tr > th {
    padding-bottom: 8px;
  }
`

const SubredditContainer = styled.td`
  border: 1px solid #ccc;
  padding: 4px 8px;
`

const CountContainer = styled.td`
  border: 1px solid #ccc;
  padding: 4px 8px;
  text-align: right;
`

const Stats = () => {
  const { blockedPostsMap, total } = usePostBlocker()

  return (
    <TableContainer>
      <tr>
        <th>Subreddit</th>
        <th>💩 posts blocked</th>
      </tr>
      <>
        {[...blockedPostsMap.entries()].map(([subreddit, count]) => (
          <tr key={subreddit}>
            <SubredditContainer>{subreddit}</SubredditContainer>
            <CountContainer>{count}</CountContainer>
          </tr>
        ))}
      </>
    </TableContainer>
  )
}

export default Stats

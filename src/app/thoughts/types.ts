export const types = `#graphql
type Thought {
  id: String!
  content: String!
  createdAt: String!
  updatedAt: String!
  user: [User]
}
`
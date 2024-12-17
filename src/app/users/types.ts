export const types = `#graphql
type User {
  id: String!
  name: String!
  email: String!
  proflieImgURL: String
  thoughts: [Thought]
}
`
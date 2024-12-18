export const types = `#graphql

input ThoughtInput {
  content: String
}

type Thought {
  id: String!
  content: String!
  authorId: String!
  private: Boolean!
  createdAt: String!
  updatedAt: String!
  user: [User]
}
`
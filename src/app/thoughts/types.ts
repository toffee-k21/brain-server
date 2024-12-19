export const types = `#graphql

input ThoughtInput {
  content: String!,
  private: Boolean
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
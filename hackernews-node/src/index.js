
const { ApolloServer } = require('apollo-server')
const fs = require('fs')
const path = require('path')

const links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

// 2
// Resolvers object implement the GraphQL schema
let idCount = links.length
const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackernews Clone',
    feed: () => links,
    link: (parent, args) => {
      let result = null
      links.forEach(
        (link) => {
          console.log(link)
          if (link.id === args.id) {
            result = link
          }
        }
      )
      console.log(result, args.id)
      return result
    }
  },

  // This is implicitly defined by graphQL
  //   Link: {
  //     id: (parent) => parent.id,
  //     url: (parent) => parent.url,
  //     description: (parent) => parent.description
  //   },

  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      }
      links.push(link)
      return link
    },

    updateLink: (parent, args) => {
      let result = null
      links.forEach(
        (link) => {
        //   console.log(link)
          if (link.id === args.id) {
            link.description = args.description
            link.url = args.url
            result = link
          }
        }
      )
      return result
    },

    deleteLink: (parent, args) => {
      let result = null
      let idx = null
      for (let i = 0; i < links.length; i++) {
        if (links[i].id === args.id) {
          result = links[i]
          idx = i
          break
        }
      }
      if (idx !== null) {
        links.slice(idx)
      }
      return result
    }
  }
}

// 3
// Schema and resolvers are bundled and passed to the ApolloServer. This tells the srever what API operations are accepted and how they should be resolved.
const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf-8'
  ),
  resolvers
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  )

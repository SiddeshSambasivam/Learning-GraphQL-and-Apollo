<p align="center">
<img src="./Assets/graph-logo.png" alt="graphql-logo" width="80px"/>
<img src="./Assets/node.png" alt="node-logo"  width="90px" />
<img src="./Assets/apollo-logo.png" alt="apollo-logo"  width="90px" />
<img src="./Assets/prisma.png" alt="apollo-logo"  width="200px" />
</p>

<h1 align="center" style="font-weight:bold">Learning-GraphQL-and-Apollo</h1>
<p align="center">All the code and notes I used to learn graphql and apollo</p>

I used the [official graphql documentation](https://graphql.org/learn/) and [how to graphql](https://www.howtographql.com/) as learning resources. This repository contains two parts combined into one. First, using graphql and node.js for the creating a graphql server and second, using react and apollo to create a high level abstraction to use graphql server in the client side.

<h2 style="font-weight: bold"> 
Introductory Concepts and Keywords
</h2>

_(The following text is just me dumping everything that I read for my understanding, so please refer to the actual documentation for a clear introduction). For personal use._

In any complex or basic web application, there is always two components, the client side and the server side which communicate and transfer data via APIs (Application Programming Interface). The usual standard for API is a RESTful API, which has rigid structure and with variable endpoints to meet the needs for various operations and data. This might introduce a lot a problems in several cases. One such problem is over/under fetching data, which can be really crucial when you are developing an application for low-powered devices.

GraphQL caters to all the potential drawbacks of the REST APIs. It acts as a query language for APIs and should only be considered as a standard. GraphQL provides only one endpoint with a set of queries that a user can provide to fetch data dynamically. This reduces the data loading by a large margin and also makes development a lot more easier.

<h3 style="font-weight: bold"> 
Schema & Type System
</h3>

> GraphQL has its own type system that’s used to define the schema of an API. The syntax for writing schemas is called Schema Definition Language (SDL).

Source: https://www.howtographql.com/basics/2-core-concepts/

Example:

```node
<!-- Schema for the Time Field -->
type Time{
    hours: int!
    mins: int!
    secs: int!
}

<!-- Schema for the Game Field -->
type Game{
    name: String!
    duration: [Time!]!
}

<!-- Note that Game and Time have a many to one relationship -->
```

<h3 style="font-weight: bold">
Core Concepts
</h3>

-   **Queries**
    When working with REST APIs, data is loaded from specific endpoints. Each endpoint has a clearly defined structure of the information that it returns. This means that the data requirements of a client are effectively encoded in the URL that it connects to.

    The approach that’s taken in GraphQL is radically different. Instead of having multiple endpoints that return fixed data structures, GraphQL APIs typically only expose a single endpoint. This works because the structure of the data that’s returned is not fixed. Instead, it’s completely flexible and lets the client decide what data is actually needed.

    That means that the client needs to send more information to the server to express its data needs - this information is called a query.
    Basic Queries
    Let’s take a look at an example query that a client could send to a server:

    ```node
    {
        allPersons {
            name
        }
    }
    ```

-   **Mutations**
    Mutations follow the same syntactical structure as queries, but they always need to start with the mutation keyword. Here’s an example for how we might create a new Person:

    ```node
    mutation {
        createPerson(name: "Bob", age: 36) {
            name
            age
        }
    }
    ```

-   **Subscriptions**

    When a client subscribes to an event, it will initiate and hold a steady connection to the server. Whenever that particular event then actually happens, the server pushes the corresponding data to the client. Unlike queries and mutations that follow a typical “request-response-cycle”, subscriptions represent a stream of data sent over to the client.

    Subscriptions are written using the same syntax as queries and mutations. Here’s an example where we subscribe on events happening on the Person type:

    ```node
    subscription {
        newPerson {
            name
            age
        }
    }
    ```

-   **Resolver Functions:** Needs to be defined for mutations or subscriptions, which basically resolves each field in the query given by the user.

<h3 style="font-weight: bold">
GraphQL Client
</h3>

-   Imperative data fetching

    1. Construct and send a HTTP request
    2. Receive and parse the data from response
    3. Store the data locally
    4. Disply the data in the UI

-   Declarative data fetching

    1. Describe data request
    2. Display informatino in the UI

As seen, there is a great level of abstraction in the declartive data fetching and this is abstraction is provided by apollo on the client side.

<h2 style="font-weight: bold">
Project-Development
</h2>

The `hackernews-node` folder contains all the files for the GraphQL server.

**Task List**

-   [x] Setup Basic schema and resolvers
-   [x] Setup Schema for Links
-   [x] Implement resolver for link query from in-memory db
-   [x] Add post mutation for the links
-   [x] Implement resolver for fetching post by id
-   [x] Implement resolver for updating post by id
-   [x] Implement resolver for deleting post by id

```bash
# Install the dependencies
npm install
npm start

```

Navigate to [http://localhost:4000/](http://localhost:4000/) to access the GraphQL playground

<h3 style="font-weight: bold">
Project Dev Notes
</h3>

`apollo-server` is a fully-featured GraphQL server. It is based on Express.js and a few other libraries to help you build production-ready GraphQL servers.

Here’s a list of its features:

-   GraphQL spec-compliant
-   Realtime functionality with GraphQL subscriptions
-   Out-of-the-box support for GraphQL Playground
-   Extensible via Express middlewares
-   Resolves custom directives in your GraphQL schema
-   Query performance tracing
-   Runs everywhere: Can be deployed via Vercel, Up, AWS Lambda, Heroku etc.

Every GraphQL schema has three special root types: `Query`, `Mutation`, and `Subscription`. The root types correspond to the three operation types offered by GraphQL: queries, mutations, and subscriptions. The fields on these root types are called root fields and define the available API operations.

**Extending the schema definition**
In general, when adding a new feature to the API, the process will look pretty similar every time:

1. Extend the GraphQL schema definition with a new root field (and new object types, if needed)
2. Implement corresponding resolver functions for the added fields

This process is also referred to as schema-driven or schema-first development.

<h3 style="font-weight: bold">
Resources
</h3>

1. [GraphQL Server Basics: GraphQL Schemas, TypeDefs & Resolvers Explained](https://www.prisma.io/blog/graphql-server-basics-the-schema-ac5e2950214e)

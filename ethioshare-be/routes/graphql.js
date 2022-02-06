const { graphqlHTTP } = require("express-graphql")
const { buildSchema } = require("graphql")


const graphqlHandler = graphqlHTTP({
    // The type company type is what is supposed to be retured after the search
    // The RootQuery is the search function that searchs the Database and returns the type company
    schema: buildSchema(`
        type Company {
            companyName: String!
            companySector: String!
            companyPrice: Float!
        }

        input CompanyInput {
            companyName: String
            companySector: String
            companyPrice: Float
        }

        type RootQuery {
            company(companyInput: CompanyInput): Company!
        }

        schema {
            query: RootQuery
        }
    `),
    rootValue: {
        company: (args) => {
            // The Dictonary here and the Company type must be the same
            // TODO this is where the search happens with the parameters given by the client after the search returns the company dictonary with the values of the search
            const company = {
                companyName: args.companyInput.companyName,
                companyPrice: args.companyInput.companyPrice,
                companySector: args.companyInput.companySector,
            }
            return company
        }
    },
    graphiql: true
})

module.exports = graphqlHandler
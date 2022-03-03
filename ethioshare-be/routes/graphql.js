const { graphqlHTTP } = require("express-graphql")
const { buildSchema } = require("graphql")
let Companies = require("../models/companies.model")
const Users = require("../models/users.model")

const graphqlHandler = graphqlHTTP({
    // The type company type is what is supposed to be returned after the search
    // The RootQuery is the search function that searches the Database and returns the type company
    schema: buildSchema(`
        type Company {
            _id: ID!
            companyName: String!
            companySector: String!
            companyPrice: Float!
            companyEmail: String!
            companyLogo: String!
            companyExchangeScore: Int!
            companyDescription: String!
        }

        input CompanyInput {
            companyName: String
            companySector: String
            companyPrice: Float
            companyDescription: String
        }
        
        type User {
            firstName: String!
            lastName: String!
            email: String!
            username: String!
            profilePicture: String!
        }

        type Response {
            status: Boolean!
            reason: String
        }

        input UserInput {
            _id: ID!
            firstName: String
            lastName: String
            email: String
            username: String
            profilePicture: String
            language: String
            Birthday: String
        }

        type RootQuery {
            company(companyInput: CompanyInput): [Company]!
            changeUserSettings(userInput: UserInput): Response!
        }

        schema {
            query: RootQuery
        }
    `),
    rootValue: {
        company: (args) => {

            const companyName = args.companyInput.companyName
            const companyPrice = args.companyInput.companyPrice
            const companySector = args.companyInput.companySector

            const searchParameter = {
                companyName: companyName,
                companySector: companySector,
                companyPrice: { $lt: companyPrice },
            }

            if (companyName == "") delete searchParameter.companyName;
            if (companySector == "") delete searchParameter.companySector;
            if (companyPrice == 0) delete searchParameter.companyPrice;

            return Companies.find(searchParameter).then(comp => {
                const companies = []
                comp.forEach((company => {
                    companies.push({
                        _id: company._id,
                        companyName: company.companyName,
                        companySector: company.companySector,
                        companyPrice: +company.companyPrice,
                        companyEmail: company.companyEmail,
                        companyLogo: company.companyLogo,
                        companyExchangeScore: company.companyExchangeScore,
                        companyDescription: company.companyDescription
                    })
                }))
                return companies
            }).catch(err => console.log(err))
        },
        changeUserSettings: (args) => {
            const { _id, firstName, lastName, email, username, profilePicture, language, birthday } = args.userInput
            const userInput = { firstName, lastName, email, username, profilePicture, language, birthday }
            const filteredUserInput = {}
            for (const [key, value] of Object.entries(userInput)) {
                if (value !== undefined) {
                    filteredUserInput[key] = value
                }
            }

            return Users.findOneAndUpdate({ _id }, filteredUserInput).then(() => {
                return { status: true }
            }).catch((error) => {
                if (error.codeName === "DuplicateKey") {
                    return { status: false, reason: error.codeName }
                }
                return false
            })
        }

    },
    graphiql: true
})

module.exports = graphqlHandler
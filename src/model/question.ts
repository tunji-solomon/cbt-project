import { db } from "../datasource";
import { UUID, DataTypes } from "sequelize";
import { QuestionPayload,QuestionModel } from "../interface";
import { UUIDV4 } from "sequelize";

const  Question = db.define<QuestionModel,QuestionPayload>(
    'question',
    {
        id : {
            type : DataTypes.UUID,
            defaultValue : UUIDV4,
            primaryKey : true
        },
        question : {
            type : DataTypes.TEXT,
            allowNull : false
        },
        options : {
            type : DataTypes.JSON,
            allowNull : false
        },
        answer : {
            type : DataTypes.STRING,
            allowNull : false
        },
        assigned : {
            type : DataTypes.STRING,
            allowNull : false
        }

    },
    {
        timestamps : true,

        defaultScope : {
            attributes : {
                exclude : ['createdAt', 'updatedAt', 'answer']
            }
        },

        scopes: {
            withAnswer : {
                attributes : {
                    include : ['answer']
                }
            }
        }
    }
)

export default Question
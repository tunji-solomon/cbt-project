import { db } from "../datasource";
import { StudentModel,StudentPayload } from "../interface";
import { DataTypes, UUIDV4 } from "sequelize";
import { hashPassword } from "../utils";
import sequelize from "sequelize";
import { ARRAY } from "sequelize";

const Student = db.define<StudentModel, StudentPayload>(
    'student',
    {
        id : {
            type :DataTypes.UUID,
            primaryKey : true,
            defaultValue : UUIDV4,
        },
        firstname : {
            type : DataTypes.STRING,
            allowNull : false
        },
        lastname : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        middlename : {
            type : DataTypes.STRING
        },
        gender : {
            type : DataTypes.STRING,
            allowNull : false
        },
        email : {
            type : DataTypes.STRING,
            unique : 'email',
            allowNull : false
        },
        dept : {
            type : DataTypes.STRING,
            allowNull : false
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false
        },
        regNum : {
            type : DataTypes.STRING,
            allowNull : false
        },
        scoreCard : {
            type : DataTypes.ARRAY(DataTypes.JSON)
        },
        score : {
            type : DataTypes.INTEGER,
            defaultValue : 0
        },
        submitted : {
            type : DataTypes.BOOLEAN,
            defaultValue : false
        }
    },

    {
        timestamps : true,

        defaultScope : {
            attributes : {
                exclude: ['password', 'updatedAt', 'createdAt']
            }
        },

        scopes : {
            withPassword : {
                attributes : {
                    include : ['password']
                }
            }
        }
    }
)

Student.beforeCreate(async (Student) => {

    try {
        const hashedPassword : any = await hashPassword(Student.password)
        Student.password = hashedPassword
        
    } catch (error) {
        console.log(`Error creating student`)
        
    }
})

export default Student

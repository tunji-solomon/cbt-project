import * as Sequelize  from "sequelize";

export interface StudentPayload {
    id? : string,
    firstname : string,
    lastname : string,
    middlename? : string,
    age : number,
    gender : Gender,
    email : string,
    dept : string,
    password? : string,
    regNum? : string
}

export interface StudentModel extends Sequelize.Model<StudentModel, StudentPayload>{
    id? : string,
    firstname : string,
    lastname : string,
    middlename? : string,
    age : number,
    gender : Gender,
    email : string,
    dept : string,
    password : string,
    regNum : string

}

enum Gender {
    male = 'male',
    female ='female'
}
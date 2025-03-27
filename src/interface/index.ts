import * as Sequelize  from "sequelize";
export interface StudentPayload {
    id? : string,
    firstname : string,
    lastname : string,
    middlename? : string,
    gender : string,
    email : string,
    dept : string,
    password? : string,
    regNum? : string,
    scoreCard? : any,
    score? : number
}

export interface QuestionPayload {
    id? : string,
    question : string,
    options : any,
    assigned : string
    answer : string
}

export interface StudentModel extends Sequelize.Model<StudentModel, StudentPayload>{
    id? : string,
    firstname : string,
    lastname : string,
    middlename? : string,
    gender : string,
    email : string,
    dept : string,
    password : string,
    regNum : string,
    scoreCard : any,
    score : number

}

export interface QuestionModel extends Sequelize.Model<QuestionModel,QuestionPayload> {

}

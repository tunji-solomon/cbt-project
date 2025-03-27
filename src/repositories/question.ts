import { Question } from "../model";

class QuestionRepo {

    async add ( payload : any ) : Promise<Object> {
        return await Question.create(payload)
    }

    async fetchAll () : Promise<Object> {
        return await Question.findAll()
    }

    async findOne (id : string) : Promise<any> {
        return await Question.scope('withAnswer').findByPk(id)
    }
}

export default QuestionRepo
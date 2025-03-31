import { ObjectLiteralExpression } from "typescript";
import { QuestionRepo, StudentRepo } from "../repositories";
import { Response } from "express";
import { array } from "joi";

class QuestionService {
    private readonly questionRepo;
    private readonly studentRepo;

    constructor() {
        this.questionRepo = new QuestionRepo()
        this.studentRepo = new StudentRepo()
    }

    async add ( payload : any, res : Response ) : Promise<Object> {
        
        const question = await this.questionRepo.add(payload)

        return res.status(201).json({
            status : 'Successful',
            data : question
        })
    }

    async fetchAll (res : Response) : Promise<Object> {
        const questions : any = await this.questionRepo.fetchAll();

        return res.status(200).json({
            status : 'Successful',
            Questions : {
                count : questions.length,
                questions
            }
        })
    }

    async answerQuestions (
        payload : any, 
        questionId : string, 
        res : Response 
    ) : Promise<object> {
        
        const { answer } = payload
        const { regNumber, id } = res.locals.user
        const getQuestion = await this.questionRepo.findOne(questionId)
        const getStudent = await this.studentRepo.findByParameter(regNumber)
        const isCorrect = getQuestion.answer === answer

        if(getStudent.submitted === true){
            return res.status(400).json({
                status : 'Failed',
                message : 'You already submitted. wait for result.'
            })
        }

        const updateScoreCard = {
            questionId,
            optionSelected : answer,
            correct : isCorrect 
        }
        if(getStudent.scoreCard === null){
            getStudent.scoreCard  = []
            getStudent.scoreCard.push(updateScoreCard)

            getStudent.score = isCorrect ? getStudent.score + 5 : 0
            
        }else{
            const existingAnswer = getStudent.scoreCard.find((item : any) => {
                if (item.questionId === questionId){
                    const existingCorrect = getStudent.scoreCard[getStudent.scoreCard.indexOf(item)].correct
                    if(isCorrect === true && existingCorrect === false){
                        getStudent.score += 5
    
                    }else if (isCorrect === false && existingCorrect === true){
                        if(getStudent.score > 0){
                            getStudent.score -= 5
                        }else{
                            getStudent.score = 0
                        }
                    }
                    item.optionSelected = answer
                    item.correct = isCorrect
                    return item
                }
            })
            if(!existingAnswer){
                getStudent.scoreCard.push(updateScoreCard)
                getStudent.score = isCorrect ? getStudent.score + 5 : getStudent.score
            }
        }
        await this.studentRepo.update(
            {
                scoreCard : getStudent.scoreCard,
                score : getStudent.score
            },
             id
             )
        return res.status(200).json({
            status : 'Success',
            message : 'Answer submitted successfully'
        })
    }

    async submit (res : Response) :Promise<object>{
        const { regNumber, id} = res.locals.user
        const user = await this.studentRepo.findByParameter(regNumber)
        await this.studentRepo.update({
            submitted : true
            },
            id
        )
        return res.status(201).json({
            status : 'Success',
            meessage : 'you have successfully submitted your answer. GoodLuck'
        })

    }

    async checkResult (res : Response): Promise<object> {
        const { regNumber } = res.locals.user

        const user = await this.studentRepo.findByParameter(regNumber)
        const grade = user.score >= 90 ? 'A' : user.score >= 75 && user.score < 90 ? 'B' : 
                        user.score >= 55 && user.score < 75 ? "C" : user.score >= 45 && user.score < 55 ?
                        "D" : 'E'
        return res.status(200).json({
            status : 'Success',
            message : `${user.lastname} your grade is ${grade}`
        })

    }
}

export default new QuestionService()
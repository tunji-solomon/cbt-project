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
        const isCorrect = await getQuestion.answer === answer
        
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
                        console.log(getStudent.score)
    
                    }else if (isCorrect === false && existingCorrect === true){
                        if(getStudent.score > 0){
                            getStudent.score -= 5
                            console.log(getStudent.score)
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
}

export default new QuestionService()
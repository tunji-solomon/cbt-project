import { Sequelize } from 'sequelize'
import {env} from '../config'
import * as pg from 'pg'

const dbConnect = new Sequelize(String(env.DB_URL), {
    dialect : 'postgres',
    logging : false,
    pool: {
        max: 2,
        min: 0,
        acquire: 3000,
        idle: 0
    },
    dialectModule: pg,
    define: {
        freezeTableName: true
    }

})

dbConnect.sync()
         .then(()=> console.log('Database connected succesfully'))
         .catch((err) => console.log('Error connecting to database', err.message))

export default dbConnect;
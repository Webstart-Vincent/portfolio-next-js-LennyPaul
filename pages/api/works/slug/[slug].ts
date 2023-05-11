import type { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from '@/utils/mongodb/db-connect'
import  WorkModel from '@/utils/mongodb/model'
import { IWork } from '@/@types/work.js'

type Data = {
    works?: IWork[]
    work?: IWork
    message: string
}


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const{
        query: { slug },
        method,
    } = req


    if (req.method === 'GET') {


        try {

            dbConnect()

            const work = await WorkModel.findOne({'slug': slug})

            if(!work){
                throw new Error("Error Work")
            }

            return res.status(200).json({ work, message: 'OK' })

        } catch (error) {

            console.log(error)
            var message = `Une erreur c'est produite, veuillez réessayer!`
            var code = 500

            // @ts-ignore
            if(error.message == "Error Work"){
                message = `Ce projet n'existe pas !`
                code = 409
            }

            return res.status(code).json({
                message,
            })

        }

    }

}



export default handler

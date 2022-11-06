import {google} from 'googleapis'
import { NextApiRequest, NextApiResponse } from 'next';

type Formulario = {
    nome: string,
    email: string
}

async function handler(req: NextApiRequest,res: NextApiResponse){
    
    if(req.method === 'POST'){
        const {dados, respostas, nota, nivel} = req.body
        console.log("teste: " + {dados, respostas, nota, nivel})
    }


    const body = req.body as Formulario


    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
            },
            scopes: [
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/drive.file',
                'https://www.googleapis.com/auth/spreadsheets',
            ]
           
            
        })

        const sheets = google.sheets({
            auth,
            version: 'v4'
        })

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: 'A1:B1',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [body.nome, body.email]
                ]
            }
        })

        return res.status(200).json({
            data: response.data
        })
    }catch (e) {
        console.log(e)
        return res.status(500).send({message: "errooo"})
    }
}

export default handler
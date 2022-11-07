import {google} from 'googleapis'
import { NextApiRequest, NextApiResponse } from 'next';

type Formulario = {
    fnome: string,
    femail: string,
    score: any,
}

async function handler(req: NextApiRequest,res: NextApiResponse){
    
    if(req.method !== 'POST'){
        console.log("Something went wrong. Only POST methods.")
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
            range: 'A1:C1',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [body.fnome, body.femail, body.score]
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
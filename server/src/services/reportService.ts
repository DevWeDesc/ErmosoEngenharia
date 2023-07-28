import multipart from '@fastify/multipart';
import fs from 'fs';
import path from "path";
import fastify from "fastify";
import util from 'util';
import { Stream, pipeline } from 'stream';
const pump = util.promisify(pipeline)

const fast = fastify()

fast.register(multipart)

export const reportServices = {
  streamPdfs: async (pdfsFile: any, id?: string) => {
    const filePath = path.join(__dirname, '..', '..','pdfs')

    try {
         
    const pdfFile = pdfsFile
    let pdfpath = []
    for await (const part of pdfFile) {

         // upload and save the file
        await pump(part.file, fs.createWriteStream(`${filePath}/${id}${part.filename}`))
              pdfpath.push(`${filePath}/${id}${part.filename}`)
            
       }

       return pdfpath

    } catch (error) {
      console.log(error)
    
    }

  }
}
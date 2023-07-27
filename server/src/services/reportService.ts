import multipart from '@fastify/multipart';
import fs from 'fs';
import path from "path";
import fastify from "fastify";
import util from 'util';
import { pipeline } from 'stream';
import { randomUUID } from 'crypto';
const pump = util.promisify(pipeline)

const fast = fastify()

fast.register(multipart)

export const reportServices = {
  streamPdfs: async (pdfsFile: any) => {

    const id = randomUUID()
    const filePath = path.join(__dirname, '..', '..','pdfs')

    try {
         
    const pdfFile = pdfsFile
    let pdfpath = []
    for await (const part of pdfFile) {

          await pump(part.file, fs.createWriteStream(`${filePath}/${id}.pdf`))
              pdfpath.push(`${filePath}/${id}`)
            
       }

       return id

    } catch (error) {
      console.log(error)
    
    }

  }
}
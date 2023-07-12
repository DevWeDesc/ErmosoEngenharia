import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
const prisma = new PrismaClient();

export class ValidationContract {
    private errors: string[];
    constructor() {
      this.errors = [];
    }
    
    public async userAlreadyExists(value: string, message: string) {
        const userExist = await prisma.user.findFirst({
          where:{email: value}
        })

        if(userExist) {
          this.errors.push(message)
        }
    }
    
    public async checkPassword(value: { email: string, password: string}, message: string) {
        const user = await prisma.user.findUnique({where: {email: value.email }})
        if(!user) return
        const isCorrectPassword = await bcrypt.compare(value.password, user.password)

        if(isCorrectPassword === false) {
            this.errors.push(message)
        }
    }

    public async verifyIfUserExist(value: string, message: string) {
       const user = await prisma.user.findUnique({
            where: {email: value}
        })

        if(!user) {
           this.errors.push(message)
        }
    }

    public async reportAlreadyExist(value: string, message: string) {
      const report = await prisma.reportReceived.findUnique({
        //@ts-ignore
        where: {leadNumber: value}
      })

      if(report) {
          this.errors.push(message)
      }
    }

    public showErrors(): string[] {
      return this.errors;
    }
    public hadError() {
      if(this.errors.length >= 1)
      return true
    }

    public clearErrors() {
      this.errors = [];
    }
  }
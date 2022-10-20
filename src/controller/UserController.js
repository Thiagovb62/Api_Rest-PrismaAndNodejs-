import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

module.exports = {
    async index(req, res) {
        const user = await prisma.user.findMany()

        res.json(user)
    },
    async create(req, res) {
        try {

            const { name, email } = req.body

            let user = await prisma.user.findUnique({ where: { email } })

            if (user) {
                return res.json({ error: "ja existe um Usuário com este email" })
            }

            user = await prisma.user.create({
                data: {
                    name,
                    email,
                },
            })

            return res.json(user)

        } catch (error) {
            return res.json({ error })
        }

    }
}
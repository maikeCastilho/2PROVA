import { FastifyInstance } from "fastify";
import { prisma } from '../lib/prisma';
import { date, z } from 'zod';


export async function saleRoutes(app: FastifyInstance) {
    app.get('/salesorder', async () => {
        const salesorder = await prisma.salesOrder.findMany({
        })
        return salesorder
    })

    app.get('/salesorder/:id', async (request) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        });
        const { id } = paramsSchema.parse(request.params);
        const salesorder = await prisma.salesOrder.findFirst({
            where: {
                id
            }
        });
        return salesorder;
    });



    app.post('/salesorder/cadastro', async(request) => {
        const bodySchema = z.object({
            product_name: z.string(),
            sales_order_data: z.string(),
            amount: z.string(),
            unitary_value: z.string(),
            clientId: z.string()
        })

        const { product_name, sales_order_data, amount, unitary_value, clientId } = bodySchema.parse(request.body)
        
        const salesorder = await prisma.salesOrder.create({
            data:{
                product_name,
                sales_order_data,
                amount,
                unitary_value,
                clientId
                
            }
        })
        return salesorder
    })


    app.delete('/salesorder/:id', async (request) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        })
        const { id } = paramsSchema.parse(request.params)
        await prisma.salesOrder.delete({
            where: {
                id
            }
        })
        return {
            message: 'Venda deletada'
        }
    })

    app.put("/salesorder/:id", async(request) => {
        const paramSchema = z.object({
            id: z.string().uuid(),
        })
        const { id } = paramSchema.parse(request.params)

        const bodySchema = z.object({
            product_name: z.string(),
            sales_order_data: z.string(),
            amount: z.string(),
            unitary_value: z.string()
        })
        const { product_name, sales_order_data, amount, unitary_value } = bodySchema.parse(request.body)
        
        const salesorder = await prisma.salesOrder.update({
            where: {
                id
            },
    
            data:{
                product_name,
                sales_order_data,
                amount,
                unitary_value
            }
        })
        return {
            message: "Dados atualizado",
            salesorder: salesorder
        }
    })

    
  










}
import { FastifyInstance } from "fastify";
import { prisma } from '../lib/prisma';
import { date, z } from 'zod';
import { Prisma } from "@prisma/client";
import { valTot_imposto, valTot_pedido } from "../util/sale_count";


export async function clientsRoutes(app: FastifyInstance) {
    app.get('/clients', async () => {
        const clients = await prisma.client.findMany({
        })
        return clients
    })

    app.get('/clients/:id', async (request) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        });
        const { id } = paramsSchema.parse(request.params);
        const clients = await prisma.client.findFirst({
            where: {
                id
            }
        });
        return clients;
    });



    app.post('/clients/cadastro', async (request) => {
        const bodySchema = z.object({
            nome_cliente: z.string(),
            email: z.string(),
            cpf: z.string(),
            telephone: z.string()
        })

        const { nome_cliente, email, cpf, telephone } = bodySchema.parse(request.body)

        const clients = await prisma.client.create({
            data: {
                nome_cliente,
                email,
                cpf,
                telephone

            }
        })
        return clients
    })


    app.delete('/clients/:id', async (request) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        })
        const { id } = paramsSchema.parse(request.params)
        await prisma.client.delete({
            where: {
                id
            }
        })
        return {
            message: 'Cliente deletado'
        }
    })

    app.put("/clients/:id", async (request) => {
        const paramSchema = z.object({
            id: z.string().uuid(),
        })
        const { id } = paramSchema.parse(request.params)
        
        const bodySchema = z.object({
            nome_cliente: z.string(),
            email: z.string(),
            cpf: z.string(),
            telephone: z.string()
        })
        const { nome_cliente, email, cpf, telephone } = bodySchema.parse(request.body)

        const clients = await prisma.client.update({
            where: {
                id
            },
            data: {
                nome_cliente,
                email,
                cpf,
                telephone
            }
        })
        return clients
        
    })


    app.get('/clients/salesorder', async () => {
        const clients = await prisma.client.findMany({
            include: {
                SalesOrder: true
            }
        })
        return clients
    })



    app.get('/clients/salesorderunit', async () => {
        const clients = await prisma.client.findMany({
            include: {
                SalesOrder: true
            }
        })
        return clients.map(clients => {
            return {
                id: clients.id,
                nome_cliente: clients.nome_cliente,
                cpf: clients.cpf,
                salesorder: clients.SalesOrder.map(salesorder => {
                    return {
                        product_name: salesorder.product_name,
                        sales_order_data: salesorder.sales_order_data,
                        amount: salesorder.amount,
                        unitary_value: salesorder.unitary_value,

                    }
                })
            }
        })
    })


    app.get('/clients/salesordertotal', async () => {
        const clients = await prisma.client.findMany({
            include: {
                SalesOrder: true
            }
        })
        return clients.map(clients => {
            return {
                id: clients.id,
                nome_cliente: clients.nome_cliente,
                telephone_cliente: clients.telephone,
                salesorder: clients.SalesOrder.map(salesorder => {
                    return {
                        sales_order_data: salesorder.sales_order_data,
                        product_name: salesorder.product_name,
                        amount: salesorder.amount,
                        unitary_value: salesorder.unitary_value,
                        valTotal_pedido: valTot_pedido(salesorder.amount, salesorder.unitary_value),
                        valTotal_pedido_imposto: valTot_imposto(salesorder.amount, salesorder.unitary_value)
                    }
                })
            }
        })
    })



    app.get('/clients/customer_sales_order/:cpf', async (request) => {
        const paramSchema = z.object({
            cpf: z.string(),
        })
        const { cpf } = paramSchema.parse(request.params)

        const clients = await prisma.client.findMany({
            where: {
                cpf
            },
            include: {
                SalesOrder: true
            }
        })
        return clients

        // return clients.map(clients => {   
        //     return {
        //         where: {
        //             cpf
        //         },
        //         id: clients.id,
        //         nome_cliente: clients.nome_cliente,
        //         cpf: clients.cpf,
        //         salesorder: clients.SalesOrder.map(salesorder =>{
        //             return {
        //                 product_name: salesorder.product_name,
        //                 sales_order_data: salesorder.sales_order_data,
        //                 amount: salesorder.amount,
        //                 unitary_value: salesorder.unitary_value,

        //             }
        //         })


        //     }
        // })
    })




}
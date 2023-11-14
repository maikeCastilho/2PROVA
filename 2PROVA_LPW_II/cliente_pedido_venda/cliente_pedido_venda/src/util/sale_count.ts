export function valTot_pedido(amount: any, unitary_value: any){
    return amount * unitary_value
}

export function valTot_imposto(amount: any, unitary_value: any){
    let valorTotal = (amount * unitary_value) * 0.10
    let valorTotal_imposto = valorTotal + (amount * unitary_value)
    return valorTotal_imposto
}
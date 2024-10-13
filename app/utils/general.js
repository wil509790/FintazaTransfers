import numeral from "numeral"


export const formatCurrency = (amount) =>{
    return numeral(amount).format("$0,0.0")
}

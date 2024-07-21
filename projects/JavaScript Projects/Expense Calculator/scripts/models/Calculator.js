export class Calculator{
    static incomes(records){
        return records.filter((record) => {
            return record.type === 'income'
        }).reduce((acc, record) => Number(acc) + Number(record.sum), 0);
    }

    static expense(records) {
        return records.filter((record) => {
            return record.type === 'expense'
        }).reduce((acc, record) => Number(acc) - Number(record.sum), 0);
    }

    static balance(records) {
        return Calculator.incomes(records) - Calculator.expense(records);
    }
}
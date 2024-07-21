import { Calculator } from "./models/Calculator.js";
import { Expense, Income, Report } from "./models/Report.js";

export const onStart = () => {
    const form = document.getElementById("form");

    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const selectInput = e.target['type'].value;
        const titleInput = e.target['title-input'].value;
        const dateInput = e.target['date-input'].value;

        const sumInput = selectInput === 'income' ? e.target['sum-input'].value: -e.target['sum-input'].value;
        
        const incomes = document.getElementById('incomes');
        const expenses = document.getElementById('expenses');
        
        const total = document.getElementById('total');

        const div = document.createElement('div');
        div.className = 'container-li';

        const info = document.createElement('span');

        const li = document.createElement('li');

        const xButton = document.createElement('span');
        xButton.textContent = 'X';
        xButton.className = 'x-btn';

        let report;
        if (selectInput === 'income'){
            report = new Income(dateInput, titleInput, sumInput);
        }
        if (selectInput === 'expense'){
            report = new Expense(dateInput, titleInput, sumInput);
        }

        info.textContent = report.getInfo();
        total.innerText = Calculator.balance(Report.reports)

        div.appendChild(info);
        div.appendChild(xButton);

        li.appendChild(div);

        if (report.type === 'income'){
            incomes.appendChild(li);
        }
        else {
            expenses.appendChild(li);
        }

        xButton.addEventListener('click', ()=>{
            if (report.type === 'income'){
                incomes.removeChild(li);
            } else{
                expenses.removeChild(li);
            }
            report.removeRecord(report.id);
            total.innerText = Calculator.balance(Report.reports)
        })
    })
}
export class Report{
    date;
    title;
    sum;
    id;

    static reports = [];

    constructor(date, title, sum){
        this.date = date;
        this.title = title;
        this.sum = sum;

        Report.reports.push(this);
        this.id = Report.reports.length;
    }

    getInfo(){
        console.log(this);
    }

    removeRecord(id){
        Report.reports = Report.reports.filter((item)=> item.id !== id)
    }
}

export class Income extends Report{
    type = 'income';

    constructor(date, title, sum){
        super(date, title, sum);
    }

    getInfo(){
        return `income: ${this.title} | ${this.sum} | ${this.date}`;
    }
}

export class Expense extends Report{
    type = 'expense';

    constructor(date, title, sum){
        super(date, title, sum);
    }

    getInfo(){
        return `expense: ${this.title} | ${this.sum} | ${this.date}`;
    }
}


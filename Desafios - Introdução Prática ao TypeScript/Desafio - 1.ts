export {}

// Como podemos rodar isso em um arquivo .ts sem causar erros? 

// let employee = {};
// employee.code = 10;
// employee.name = "John";

interface IPersonInfo {
    code: number
    name: string
}

const anyPerson: IPersonInfo = {
    code: 10,
    name: 'John'
}

console.log(anyPerson);
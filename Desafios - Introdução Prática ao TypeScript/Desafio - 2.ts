export {}

// Como podemos melhorar o esse código usando TS? 

// let pessoa1 = {};
// pessoa1.nome = "maria";
// pessoa1.idade = 29;
// pessoa1.profissao = "atriz"

// let pessoa2 = {}
// pessoa2.nome = "roberto";
// pessoa2.idade = 19;
// pessoa2.profissao = "Padeiro";

// let pessoa3 = {
//     nome: "laura",
//     idade: "32",
//     profissao: "Atriz"
// };

// let pessoa4 = {
//     nome = "carlos",
//     idade = 19,
//     profissao = "padeiro"
// }

interface IPersoninfo {
    name: string
    age: number
    profession: string
}

const firstPerson: IPersoninfo = {
    name: 'maria',
    age: 29,
    profession: 'atriz'
};
console.log(firstPerson);

const secondPerson: IPersoninfo = {
    name: 'roberto',
    age: 19,
    profession: 'Padeiro'
};
console.log(secondPerson);

const thirdPerson: IPersoninfo = {
    name: 'laura',
    age: 32,
    profession: 'Atriz'
};
console.log(thirdPerson);

const fourthPerson: IPersoninfo = {
    name: 'carlos',
    age: 19,
    profession: 'padeiro'
};
console.log(fourthPerson);
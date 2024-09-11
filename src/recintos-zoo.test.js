import { recintos } from "./dados.js";
import { RecintosZoo } from "./recintos-zoo.js";

describe('Recintos do Zoologico', () => {

    test('Deve rejeitar animal inválido', () => {
            const resultado = new RecintosZoo().analisaRecintos('UNICORNIO', 1);
            expect(resultado.erro).toBe("Animal inválido");
            expect(resultado.recintosViaveis).toBeFalsy();
        });

    test('Deve rejeitar quantidade inválida', () => {
            const resultado = new RecintosZoo().analisaRecintos('MACACO', 0);
            expect(resultado.erro).toBe("Quantidade inválida");
            expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Não deve encontrar recintos para 10 macacos', () => {
            const resultado = new RecintosZoo().analisaRecintos('MACACO', 10);
            expect(resultado.erro).toBe("Não há recinto viável");
            expect(resultado.recintosViaveis).toBeFalsy();
        });

    test('Deve encontrar recinto para 1 crocodilo', () => {
        const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 4 (espaço livre: 5 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    test('Deve encontrar recintos para 2 macacos', () => {

        const resultado = new RecintosZoo().analisaRecintos('MACACO', 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 5 total: 10)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 2 (espaço livre: 3 total: 5)');
        expect(resultado.recintosViaveis[2]).toBe('Recinto 3 (espaço livre: 2 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(3);
    });

    //Um macaco não se sente confortável sem outro animal no recinto, portanto não deve retornar o Recinto 2 para 1 macaco
    test('Deve encontrar recintos para 1 macaco', () => {

        const resultado = new RecintosZoo().analisaRecintos('MACACO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 6 total: 10)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 3 (espaço livre: 3 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(2);
    });

    //embora tenha espaço para os leopardos nos recintos, as regras dizem que animais carnivoros só podem ficar com a própia especie
    test('Não deve encontrar recintos viáveis para leopardos ', () => {

        const resultado = new RecintosZoo().analisaRecintos('LEOPARDO', 1);
        expect(resultado.erro).toBe("Não há recinto viável");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    //Hipopótamo(s) só tolera(m) outras espécies estando num recinto com savana e rio
    test('Deve encontrar recintos para 1 hipopotamo', () => {

        const resultado = new RecintosZoo().analisaRecintos('HIPOPOTAMO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 3 (espaço livre: 0 total: 7)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 4 (espaço livre: 4 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(2);
    });

    test('Deve retornar apenas o Recinto 5 para 1 Leao', () => {

        const resultado = new RecintosZoo().analisaRecintos('LEAO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 5 (espaço livre: 3 total: 9)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    test('Deve encontrar recinto para 1 hipopotamo em um recinto com 1 hipopotamo residente', () => {
        const recintosComHipopotamo = [
            ...recintos,
            {
            nome: "Recinto 6",
            bioma: ["savana","rio"],
            tamanho: 10,
            tamanhoOcupado: 4,
            animaisResidentes: ["HIPOPOTAMO"]
            }
        ]

        const resultado = new RecintosZoo().encontraRecintosViaveis('HIPOPOTAMO', 1, recintosComHipopotamo);
        expect(resultado[0]).toBe('Recinto 3 (espaço livre: 0 total: 7)');
        expect(resultado[1]).toBe('Recinto 4 (espaço livre: 4 total: 8)');
        expect(resultado[2]).toBe('Recinto 6 (espaço livre: 2 total: 10)');
        expect(resultado.length).toBe(3);
    });

    //não deve incluir a Gazela pois o hipopotamo residente no recinto ficaria desconfortável
    test('Não deve retornar o recinto que ja tem um hipopotamo residente, caso tentassemos colocar outro animal de espécie diferente e o bioma não for savana e rio', () => {
        const recintosComHipopotamo = [
            ...recintos,
            {
            nome: "Recinto 6",
            bioma: ["savana"],
            tamanho: 10,
            tamanhoOcupado: 4,
            animaisResidentes: ["HIPOPOTAMO"]
            }
        ]
        
        const resultado = new RecintosZoo().encontraRecintosViaveis('GAZELA', 1, recintosComHipopotamo);
        expect(resultado[0]).toBe('Recinto 1 (espaço livre: 4 total: 10)');
        expect(resultado[1]).toBe('Recinto 3 (espaço livre: 3 total: 7)');;
        expect(resultado.length).toBe(2);
    });

    //nesse caso como o bioma é savana e rio o hipopotamo residente não ficaria desconfortável
    test('Deve retornar o recinto que ja tem um hipopotamo residente, caso tentassemos colocar outro animal de espécie diferente e o bioma for savana e rio', () => {
        const recintosComHipopotamo = [
            ...recintos,
            {
            nome: "Recinto 6",
            bioma: ["savana", "rio"],
            tamanho: 10,
            tamanhoOcupado: 4,
            animaisResidentes: ["HIPOPOTAMO"]
            }
        ]
        
        const resultado = new RecintosZoo().encontraRecintosViaveis('GAZELA', 1, recintosComHipopotamo);
        expect(resultado[0]).toBe('Recinto 1 (espaço livre: 4 total: 10)');
        expect(resultado[1]).toBe('Recinto 3 (espaço livre: 3 total: 7)');;
        expect(resultado[2]).toBe('Recinto 6 (espaço livre: 3 total: 10)');
        expect(resultado.length).toBe(3);
    });

});

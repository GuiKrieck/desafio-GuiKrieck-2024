export const recintos = [
    {
        nome: "Recinto 1",
        bioma: ["savana"],
        tamanho: 10,
        tamanhoOcupado: 3,
        animaisResidentes: ["MACACO", "MACACO", "MACACO"]
    },
    {
        nome: "Recinto 2",
        bioma: ["floresta"],
        tamanho: 5,
        tamanhoOcupado: 0,
        animaisResidentes: []
    },
    {
        nome: "Recinto 3",
        bioma: ["savana","rio"],
        tamanho: 7,
        tamanhoOcupado: 2,
        animaisResidentes: ["GAZELA"]
    },
    {
        nome: "Recinto 4",
        bioma: ["rio"],
        tamanho: 8,
        tamanhoOcupado: 0,
        animaisResidentes: []
    },
    {
        nome: "Recinto 5",
        bioma: ["savana"],
        tamanho: 9,
        tamanhoOcupado: 3,
        animaisResidentes: ["LEAO"]
    }
]

export const animaisAceitos = [
    {
        especie: "LEAO",
        tamanho: 3,
        ambientesFavoraveis:["savana"],
        caracteristica:"carnivoro"
    },
    {
        especie: "LEOPARDO",
        tamanho: 2,
        ambientesFavoraveis:["savana"],
        caracteristica:"carnivoro"
    },
    {
        especie: "CROCODILO",
        tamanho: 3,
        ambientesFavoraveis:["rio"],
        caracteristica:"carnivoro"
    },
    {
        especie: "MACACO",
        tamanho: 1,
        ambientesFavoraveis:["savana", "floresta"],
        caracteristica:"onivoros"
    },
    {
        especie: "GAZELA",
        tamanho: 2,
        ambientesFavoraveis:["savana"],
        caracteristica:"herbivoro"
    },
    {
        especie: "HIPOPOTAMO",
        tamanho: 4,
        ambientesFavoraveis:["savana", "rio"],
        caracteristica:"herbivoro"
    }
]
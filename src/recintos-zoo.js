import{recintos, animaisAceitos} from "./dados.js"

class RecintosZoo {

    analisaRecintos(animal, quantidade) {

        let resultado = {
            erro: false,
            recintoViaveis: null
        };

        try {
            const ehAnimalValido = this.verificaAnimal(animal);
            const ehQuantidadeValida = this.verificaQuantidade(quantidade);
            if(ehAnimalValido && ehQuantidadeValida){
                resultado.recintoViaveis = this.encontraRecintosViaveis(animal, quantidade);
            }
        }catch (erro){
            resultado.erro = erro.message;
            resultado.recintoViaveis = null;

        };

        return resultado;

    }

    verificaAnimal(novoAnimal){
        const animalFiltrados = animaisAceitos.filter((animal) => animal.especie === novoAnimal);

        if(animalFiltrados.length === 1) {
            return true;
        }

        throw new Error("Animal inválido");
    }

    verificaQuantidade(quantidade){
        if (quantidade > 0){
            return true;
        }

        throw new Error("Quantidade inválida");
    }

    encontraRecintosViaveis(animal, quantidade){
        const dadosDoAnimal = animaisAceitos.find((animalAceito) => animalAceito.especie === animal);
        const ambientesFavoraveisDoAnimal = dadosDoAnimal.ambientesFavoraveis;

        const recintoViaveis = recintos.filter((recinto) => {

            const biomaEhFavoravel = recinto.bioma.some((bioma) => ambientesFavoraveisDoAnimal.includes(bioma));

            const temEspacoDisponivel = this.verificaEspaçoDisponivelRecinto(dadosDoAnimal, recinto, quantidade);

            return biomaEhFavoravel && temEspacoDisponivel
        })

        if (recintoViaveis.length > 0){
            return console.log(recintoViaveis);
        }

        throw new Error("Não há recinto viável");
    }

    verificaEspaçoDisponivelRecinto(dadosDoAnimal, recinto, quantidade){
        let tamanhoOcupado = recinto.tamanhoOcupado;

        tamanhoOcupado += dadosDoAnimal.tamanho * quantidade;

        if(recinto.animaisResidentes.length > 0 && !recinto.animaisResidentes.every(residente => residente === dadosDoAnimal.especie)){
            tamanhoOcupado += 1;
        }

        return recinto.tamanho >= tamanhoOcupado;
    }

}

export { RecintosZoo as RecintosZoo };

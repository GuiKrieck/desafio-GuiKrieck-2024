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

}

export { RecintosZoo as RecintosZoo };

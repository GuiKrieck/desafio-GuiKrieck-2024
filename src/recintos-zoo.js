import{recintos, animais} from "./dados.js"

const animaisAceitos = [...animais];
const recintosDoZoo = [...recintos];

class RecintosZoo {

    analisaRecintos(animal, quantidade) {

        let resultado = {
            erro: false,
            recintosViaveis: null
        };

        try {
            const ehAnimalValido = this.verificaAnimal(animal);
            const ehQuantidadeValida = this.verificaQuantidade(quantidade);
            if(ehAnimalValido && ehQuantidadeValida){
                resultado.recintosViaveis = this.encontraRecintosViaveis(animal, quantidade, recintosDoZoo);
            }
        }catch (erro){
            resultado.erro = erro.message;
            resultado.recintosViaveis = null;

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

    encontraRecintosViaveis(animal, quantidade, recintosDoZoo){
        const dadosDoAnimal = animaisAceitos.find((animalAceito) => animalAceito.especie === animal);
        const ambientesFavoraveisDoAnimal = dadosDoAnimal.ambientesFavoraveis;

        const recintosViaveis = recintosDoZoo.filter((recinto) => {

            const biomaEhFavoravel = recinto.bioma.some((bioma) => ambientesFavoraveisDoAnimal.includes(bioma));

            const temEspacoDisponivel = this.verificaEspaçoDisponivelRecinto(dadosDoAnimal, recinto, quantidade);

            const temBoaConvivencia = this.verificaConvivencia(dadosDoAnimal, recinto, quantidade);

            return biomaEhFavoravel && temEspacoDisponivel && temBoaConvivencia;
        })

        if (recintosViaveis.length > 0){
            return recintosViaveis.map((recinto) => {
                const tamanhoOcupado = this.calculaTamanhoOcupado(dadosDoAnimal, recinto, quantidade);
                const espacoLivre = recinto.tamanho - tamanhoOcupado;
                return `${recinto.nome} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`
            });
        }

        throw new Error("Não há recinto viável");
    }

    verificaEspaçoDisponivelRecinto(dadosDoAnimal, recinto, quantidade){
        let tamanhoOcupado = this.calculaTamanhoOcupado(dadosDoAnimal, recinto, quantidade);

        return recinto.tamanho >= tamanhoOcupado;
    }

    verificaConvivencia(dadosDoAnimal, recinto, quantidade){

        if (dadosDoAnimal.especie === "MACACO" && recinto.animaisResidentes.length === 0 && quantidade ===1){
            return false
        }

        if(recinto.animaisResidentes.length > 0){
            const temCarnivoroNoRecinto = recinto.animaisResidentes.some((residente) => {
                const animalResidente = animaisAceitos.find((animal) => animal.especie === residente);
                return animalResidente.caracteristica === "carnivoro";
            });

            if (temCarnivoroNoRecinto && dadosDoAnimal.caracteristica !== "carnivoro"){
                return false;
            }

            if(dadosDoAnimal.caracteristica === "carnivoro" && !recinto.animaisResidentes.every((residente) => residente === dadosDoAnimal.especie)){
                return false;
            }
        }

        if (dadosDoAnimal.especie === "HIPOPOTAMO") {
            
            if (recinto.animaisResidentes.some((residente) => residente === "HIPOPOTAMO")) {
                return true;
            }
            
            if (recinto.animaisResidentes.length > 0 && !(recinto.bioma.includes("savana") && recinto.bioma.includes("rio"))) {
                return false;
            }
        }

        return true;
    }

    calculaTamanhoOcupado(dadosDoAnimal, recinto, quantidade){
        let tamanhoOcupado = recinto.tamanhoOcupado;

        tamanhoOcupado += dadosDoAnimal.tamanho * quantidade;

        if(recinto.animaisResidentes.length > 0 && !recinto.animaisResidentes.every((residente) => residente === dadosDoAnimal.especie)) {
            tamanhoOcupado += 1;
        }

        return tamanhoOcupado;
    }

}

export { RecintosZoo as RecintosZoo };

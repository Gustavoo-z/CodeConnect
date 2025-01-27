const uploadBtn = document.getElementById('upload-btn');
const inputUpload = document.getElementById('image-upload');

uploadBtn.addEventListener('click', () => {
    inputUpload.click();
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name})
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo)
    })
}

const imagemPrincipal = document.querySelector('.main-imagem');
const nomeDaImagem = document.querySelector('.container-imagem-nome p')

inputUpload.addEventListener('change', async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (error) {
            console.error("Erro na leitura do arquivo")
        }
    }
})

const listaTags = document.getElementById('lista-tags');

listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")) {
        const tagParaRemover = evento.target.parentElement;
        listaTags.removeChild(tagParaRemover);
    }
})

const tagsDisponiveis = ["Front-end", "Programação", "Data Science", "Full-stack", "HTML", "CSS", "Javascript"];

async function verificarTags(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000)
    })
}
const categoria = document.getElementById('categoria');

categoria.addEventListener("keypress", (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const tagTexto = categoria.value.trim();
        if (tagTexto !== "" && tagsDisponiveis.includes(tagTexto)) {
            const tagsUsadas = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);
            if(tagsUsadas.includes(tagTexto)) {
                alert('Tag já utilizada!');
                categoria.value = "";
            } else {
                const novaCategoria = document.createElement("li");
                novaCategoria.innerHTML = `<p class="nome-tag">${tagTexto}</p> <img src="/img/close-black.svg" class="remove-tag">`
                listaTags.appendChild(novaCategoria);
                categoria.value = "";
            }
        } else {
            alert('Tag inválida!');
        }
    }
})

const botaoPublicar = document.querySelector('.botao-publicar');

botaoPublicar.addEventListener('click', async (evento) => {
    evento.preventDefault();
    const nomeProjeto = document.getElementById('nome').value;
    const descricaoProjeto = document.getElementById('descricao').value;
    const tagsUsadas = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);

    try {
        const mensagem = await publicarProjeto(nomeProjeto, descricaoProjeto, tagsUsadas);
        console.log(mensagem);
        alert(mensagem);
    } catch (error) {
        console.log(error);
        alert(error);
    }
})

async function publicarProjeto(nomeProjeto, descricaoProjeto, tagsUsadas) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const FunctionOk = Math.random() > 0.5;

            if (FunctionOk) {
                resolve("Projeto publicado com sucesso!")
            } else {
                reject("Erro ao publicar o projeto.")
            }
        }, 2000)
    })
}
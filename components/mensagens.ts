import Swal from 'sweetalert2';

export const msgCadastroSucesso = () => {
    Swal.fire(
        'Bom trabalho!',
        'Cadastro realizado com sucesso!',
        'success'
      );    
} 

export const msgCadastroErro = (error:string) => {
    Swal.fire({
        title: 'Erro!',
        text: `Ocorreu um erro ao tentar realizar o cadastro: ${error || '' }`,
        icon: 'error',
        confirmButtonText: 'Cool'
      });
      console.log(`Ocorreu um erro, tente novamente mais tarde. Erro: ${error}`);
}

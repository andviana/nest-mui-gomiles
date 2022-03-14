import Swal from 'sweetalert2';

export const msgCadastroSucesso = () => {
    return Swal.fire(
        'Bom trabalho!',
        'Cadastro realizado com sucesso!',
        'success'
      );    
} 

export const msgCadastroErro = (error:string) => {
    return Swal.fire({
        title: 'Erro!',
        text: `Ocorreu um erro ao tentar realizar o cadastro: ${error || '' }`,
        icon: 'error',
        showCloseButton:true      
      });
      console.log(`Ocorreu um erro, tente novamente mais tarde. Erro: ${error}`);
}

export const msgEdicaoSucesso = () => {
  return Swal.fire(
      'Bom trabalho!',
      'Alteração realizada com sucesso!',
      'success'
    );    
} 

export const msgEdicaoErro = (error:string) => {
  return Swal.fire({
      title: 'Erro!',
      text: `Ocorreu um erro ao tentar realizar a alteração: ${error || '' }`,
      icon: 'error',
      showCloseButton:true      
    });
    console.log(`Ocorreu um erro, tente novamente mais tarde. Erro: ${error}`);
}
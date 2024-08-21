export const InputMask = (type: any, value: string) => {
    
    switch(type){

        case 'cpf':

            return value
                .replace(/\D/g, '')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1-$2')
                .replace(/(-\d{2})\d+?$/, '$1')

            // ---------------------------------------------------   

        case 'phone':

            return value
                .replace(/\D/g, '')
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{5})(\d)/, '$1-$2')
                .replace(/(-\d{4})\d+?$/, '$1')

            // ---------------------------------------------------

            
        case 'cep':

            return value
            .replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{3})\d+?$/, '$1')

            // ---------------------------------------------------   
            
        case 'BRL':

            return value
            .replace(/\D/g, "") // Remove todos os não dígitos
            .replace(/(\d+)(\d{2})$/, "$1,$2") // Adiciona a parte de centavos
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") // Adiciona pontos a cada três dígitos

            // ---------------------------------------------------   

        
    }
    
}
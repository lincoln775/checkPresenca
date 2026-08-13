# Confirmação de presença — Aniversário da Letícia

## Conectar ao Google Sheets

1. Crie uma planilha no Google Sheets, por exemplo `Confirmações - Letícia`.
2. Na URL da planilha, copie o texto entre `/d/` e `/edit`. Esse é o ID da planilha.
3. Acesse [script.google.com](https://script.google.com), crie um **Novo projeto** e substitua o conteúdo pelo arquivo `Code.gs` deste projeto.
4. No `Code.gs`, troque `COLE_O_ID_DA_SUA_PLANILHA_AQUI` pelo ID copiado e salve.
5. Clique em **Implantar** → **Nova implantação** → selecione **Aplicativo da web**.
6. Em **Quem tem acesso**, escolha **Qualquer pessoa**. Em **Executar como**, mantenha sua conta. Clique em **Implantar** e autorize o acesso solicitado pelo Google.
7. Copie a URL gerada. Ela deve terminar em `/exec`.
8. Abra `script.js` e cole essa URL em `URL_DA_PLANILHA`.

Cada confirmação válida cria uma linha na aba `Confirmações`, com nome completo e data/hora.

> Sempre que mudar o `Code.gs`, crie uma nova versão da implantação. Alterações somente em `script.js` não exigem nova implantação.

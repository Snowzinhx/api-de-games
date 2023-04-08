
## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gilcinei-alves)



# API de Jogos

Essa API fornece informações sobre jogos, como nome, ano de lançamento e valor. Além disso, permite que os usuários se cadastrem no GitHub para acessar e gerenciar projetos e códigos. É fácil de usar e escalável.



## Documentação da API

### Usando as rotas para jogos.

#### Retorna a listagem de todos os jogos cadastrados no banco de dados.

```http
  GET /games
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Nenhum` | `number` | Null |

| Status  | Resposta                           |
| :---------- | :---------------------------------- |
| `200` | `Retorna a lista de jogos` |
| `401` | `Token inválido!` |
| `404` | `Não foi possível localizar os jogos` |

#### Retorna um item

```http
  GET /games/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. O ID do item que você quer listar. |

| Status  | Resposta                          |
| :---------- | :---------------------------------- |
| `200` | `Retorna o jogo conforme o ID.` |
| `400` | `Rota inválida.`
| `401` | `Token inválido!` |
| `404` | `Não foi possível localizar o jogo no banco de dados.` |

#### Insere um novo jogo dentro do banco de dados

```http
  POST /games
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Nenhum`      | `number` | Null |

| Status  | Resposta                           |
| :---------- | :---------------------------------- |
| `201` | `Jogo adicionado com sucesso!` |
| `400` | `Requisição inválida!`
| `401` | `Token inválido!` |
| `404` | `Não foi possível localizar o jogo nao banco de dados.` |
| `409` | `Já existe um jogo com este nome cadastrado no sistema!` |

###### Exemplo:
```http
  {
    "name": "Meu primeiro jogo",
    "year": "2023",
    "price": "35"
  }
```

#### Deleta um jogo do banco de dados

```http
  DELETE /games/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. ID do jogo que deseja deletar do banco de dados. |

| Status  | Resposta                          |
| :---------- | :---------------------------------- |
| `200` | `Jogo deletado com sucesso!` |
| `400` | `Requisição inválida!`
| `401` | `Token inválido!` |
| `404` | `Não foi possível localizar o jogo nao banco de dados.` |

#### Edita dados de um jogo no banco de dados

```http
  PUT /games/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. ID do jogo que deseja editar no banco de dados. |

| Status  | Resposta                           |
| :---------- | :---------------------------------- |
| `200` | `Jogo modificado com sucesso!` |
| `400` | `Requisição inválida!`
| `401` | `Token inválido!` |
| `404` | `Não foi possível localizar o jogo nao banco de dados.` |

###### Exemplo:
```http
  {
    "name": "Meu Jogo",
    "year": "2023",
    "price": "90"
  }
```

### Usando a api para usuários

#### Edita dados de um jogo no banco de dados

```http
  POST /users/
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Nenhum`      | `null` | null |

| Status  | Resposta                          |
| :---------- | :---------------------------------- |
| `201` | `Usuário criado com sucesso!` |
| `400` | `Requisição inválida!` |
| `409` | `Já existe um usuário com este email no banco de dados!` |

###### Exemplo:
```http
  {
    "name": "John Doe",
    "email": "example@example.com",
    "password": "12345678"
  }
```

#### Logar na aplicação

```http
  POST /auth/
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Nenhum`      | `null` | null |

| Status  | Resposta                           |
| :---------- | :---------------------------------- |
| `200` | `Entrada autorizada!` |
| `400` | `Requisição inválida!` |
| `401` | `Senha incorreta!` |
| `404` | `Email não cadastrado no banco de dados` |
| `409` | `Já existe um usuário com este email no banco de dados!` |

###### Exemplo:
```http
  {
    "email": "example@example.com",
    "password": "12345678"
  }
```
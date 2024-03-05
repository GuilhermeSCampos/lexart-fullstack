# :computer: Lexart - Gerenciamento de Smartphones :computer:


## :page_with_curl: Sobre

Esse projeto tem como objetivo construir uma aplicação CRUD Fullstack para cadastro de celulares.

<br />

Além de poder instalar e rodar o projeto localmente, você pode também interagir com essa
[<strong>versão online em um deploy realizado no Vercel</strong>](https://lexart-fullstack-frontend.vercel.app/).

<br />

E também é possível verificar a API neste [<strong>deploy realizado no Vercel</strong>](https://lexart-fullstack-backend.vercel.app/).
<br />
<br />


## :wrench: Ferramentas utilizadas

<strong>Frontend<strong/>
* TypeScript
* React.js
* Tailwind.css
* Vite
* React Router
* React Toastify
* Phospor icons
* i18n

<strong>Backend<strong/>
* Node.js
* Express.js
* Joi
* Sequelize
* PostgreSQL do Vercel


  
## :hammer_and_wrench: Instalação e execução


<details>
  <summary markdown="span"><strong>Rodando a aplicação localmente</strong></summary><br />

Para rodar está aplicação localmente é necessário ter **Git**, **Node** e o **PostgreSQL** instalados e atualizados em seu computador.

Também é necessário que o seu sistema operacional tenha um **terminal Bash** instalado. Caso você esteja utilizando **Linux** ou **macOS**, o Bash já vem instalado por padrão. Porém, se o seu sistema for **Windows**, talvez você precise fazer [a instalação a parte](https://www.lifewire.com/install-bash-on-windows-10-4101773).

<details>
  <summary markdown="span"><strong> :hammer: Configurando o Back-end</strong></summary><br />
  
    
    1. Clone o repositório

  - Use o comando: `git clone git@github.com:GuilhermeSCampos/lexart-fullstack.git`.
  - Entre na pasta do repositório que você acabou de clonar:
    - `cd lexart-fullstack`
    
  2. Entre na pasta do Backend

  - `cd backend`

  3. Instale as dependências

  - `npm install`
    
  <summary markdown="span"><strong>Configurando o banco de dados e .env</strong></summary><br />
  
  O projeto vem configurado para rodar em um banco de dados PostgreSQL, então é nessário instalar 
  PostgreSQL em seu computador ou utilizar um servidor na nuvem. Após ter configurado seu banco, é necessário configurar
    as variáveis de ambiente:

### 1. Em um arquivo .env na raíz do repositório, adicione as configurações de seu banco MySQL:

```sh
POSTGRES_URL=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
JWT_SECRET=
```

### 2. Nesse mesmo arquivo .env, a porta do Express desejada para rodar o servidor

```sh
PORT=
```
### 3. Depois de preencher os dados no env pra se conectar ao banco execute as migrations que populam o banco:
  
  - `npx sequelize db:migrate`

### 4. Por fim, após ter efetuado todas as configurações, rode o servidor utilizando este comando no diretório backend:
  
  - `npm run dev`

  
  </details>
  
   <details>
  <summary markdown="span"><strong> :sunrise: Configurando o Front-end</strong></summary><br />
  
    
    1. Acesse o repositório
  
  - Entre na pasta do repositório:
    - `cd lexart-fullstack`
    
  2. Entre na pasta do Frontend

  - `cd frontend`

  3. Instale as dependências

  - `npm install`
    
  <summary markdown="span"><strong>Configurando variáveis de ambiente</strong></summary><br />
  
  O projeto Frontend vem configurado para fazer diversas requisições para uma API, o endereço vai mudar dependendo de como você rodar o projeto, por isso é necessário configurar
    as variáveis de ambiente:

### 1. Em um arquivo .env na raíz do repositório, adicione as configurações de seu endereço no API como no exemplo abaixo:

```sh
VITE_API_URL="https://lexart-fullstack-backend.vercel.app"
```

### 3. Por fim, após ter efetuado todas as configurações, rode o servidor utilizando este comando no diretório frontend:
  
  - `npm run dev`

  
  </details>
  
 </details>
 
 ## :computer: Documentação e rotas da API:

### 📱Rotas para interação com os produtos:
<summary markdown="span"><strong>Obtendo lista de todos os produtos - GET /phones</strong></summary><br />
<summary markdown="span"><strong>Obtendo cliente por ID - GET /phones/:ID</strong></summary><br />
<summary markdown="span"><strong>Obtendo lista de produtos filtradas por query - GET /phones/search?query="query desejada"</strong></summary><br />
<summary markdown="span"><strong>Excluindo um Produto - DELETE /phones/:ID</strong></summary><br />
<details>
<summary markdown="span"><strong>Editando um produto - PUT /phones/:ID</strong></summary><br /> 

  ```sh
body = {
   name: "Xiaomi Redmi 9",
   brand: "Xiaomi",
   model: "Redmi 9",
   price:  10000,
   color: "red"
}
```
</details>


 
<details>
  <summary markdown="span"><strong>Registrando um produto - POST /phones </strong></summary><br />

  <strong>Estrutura 1 </strong><br />
  
  
```sh
body = {
  "name": "Xiaomi Redmi 9",
  "brand": "Xiaomi",
  "model": "Redmi 9",
  "price": 10000,
  "color": "red"
}
```

  <strong>Estrutura 2 </strong><br />
  
  
```sh
body = {
  "name": "Xiaomi Redmi 9",
  "details": {
    "brand": "Xiaomi",
    "model": "Redmi 9",
    "color": "red"
  },
  "price": 10000
}
```

  <strong>Estrutura 3 </strong><br />
  
  
```sh
body = [
  {
    "name": "Xiaomi Redmi 9",
    "brand": "Xiaomi",
    "model": "Redmi 9",
    "data": [
      {
        "price": 10000,
        "color": "red"
      },
      {
        "price": 10000,
        "color": "blue"
      }
    ]
  },
  {
    "name": "Iphone 14 Pro",
    "brand": "Iphone",
    "model": "14 Pro",
    "data": [
      {
        "price": 30000,
        "color": "silver"
      },
      {
        "price": 30100,
        "color": "gold"
      }
    ]
  }
]


```
</details>

#### * __*Todas as rotas referentes à interação com produtos necessitam de um token obtido ao fazer login na chave Authorization nos Headers da requisição*__ *

### 🙆 Rotas para autenticação e usuários
<details>
<summary markdown="span"><strong>Registrando um usuário - POST /user/register</strong></summary><br />

  ```sh
body = {
  "username": "testeuser",
  "password": "testesenha"
}
```
  </details>
  <details>
<summary markdown="span"><strong>Fazendo o Login - POST /auth/login</strong></summary><br />
    
  ```sh
body = {
  "username": "testeuser",
  "password": "testesenha"
}
```
</details>
<summary markdown="span"><strong>Validando um token - POST /auth/validate --> com o token nos Headers da requisição</strong></summary><br />

https://github.com/GuilhermeSCampos/lexart-fullstack/assets/82980024/0c0416eb-d562-4c45-a4d0-eef09e2820ae

https://github.com/GuilhermeSCampos/lexart-fullstack/assets/82980024/fdcb9b4d-9edc-4e92-b7d5-cd1cee18ffb6

 
 

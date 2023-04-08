const express = require('express');
const app = express();
const connection = require('./database/database');
const cors = require('cors')
const Games = require('./models/Games');
const Users = require('./models/Users');
const argon2 = require('argon2');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const userAuth = require('./middleware/authUser');
require('dotenv').config();

const jwtSecret = process.env.TOKEN_SECRET;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(helmet())
connection
    .authenticate()
    .then(console.log('Conectado ao banco de dados'))
    .catch(err => {
        console.error(err)
    });

app.get('/games', userAuth, async (req, res) => {
    const games = await Games.findAll()
    if (!games) {
        res.status(404).json({ error: 'Não foi possível localizar os jogos.' })
    } else {

        res.status(200).json(games)
    }
});

app.get('/games/:id', userAuth, async (req, res) => {
    let id = parseInt(req.params.id);
    if (!id || isNaN(id)) {
        res.status(400).json({ error: 'Rota inválida.' })
    } else {
        let game = await Games.findOne({ where: { id: id } });
        if (!game) {
            res.status(404).json({ error: 'Não foi possível localizar o jogo no banco de dados.' })
        } else {
            res.status(200).json(game)
        }

    }
});

app.post('/games', userAuth, async (req, res) => {
    let { name, year, price } = req.body;
    let hasGame = await Games.findOne({ where: { name: name } });
    if (!name || !year || !price) {
        res.status(400).json({ error: 'Há algo de errado com sua solicitação!' })
    } else if (hasGame) {
        res.status(409).json({ error: 'Já existe um jogo com este nome cadastrado no sistema!' })
    }
    else {
        Games.create({ name: name, year: year, price: price })
        res.status(201).json({ message: 'Jogo adicionado com sucesso!' })
    }

});


app.delete('/games/:id', userAuth, async (req, res) => {
    let id = parseInt(req.params.id);
    if (!id || isNaN(id)) {
        res.status(400).json({ error: 'Requisição inválida!' })
    } else {
        let hasGame = await Games.findOne({ where: { id: id } });
        if (hasGame) {
            Games.destroy({
                where: {
                    id: id
                },
                force: true
            }).then(()=> res.status(200).json({ message: 'Jogo deletado com sucesso!' })).catch(err=>{console.error(err)});
            
        } else {
           
            res.status(404).json({ error: 'Não foi possível localizar o jogo nao banco de dados.' })
        }
    }
}
);

app.put('/games/:id', userAuth, async (req, res) => {
    let id = parseInt(req.params.id);
    if (!id || isNaN(id)) {
        res.status(400).json({ message: 'Requisição inválida!' })
    } else {
        let game = await Games.findOne({ where: { id: id } });
        if (!game) {
            res.status(404).json({ error: 'Não foi possível localizar o jogo nao banco de dados.' })
        } else {
            let { name, year, price } = req.body;
            if (name != undefined) {
                Games.update({ name: name }, {where: {id: id}})
            }
            if (year != undefined) {
                Games.update({ year: year }, {where: {id: id}});
            }
            if (price != undefined) {
                Games.update({ price: price }, {where: {id: id}})
            }

            res.status(200).json({ message: 'Jogo modificado com sucesso!' })
        }
    }
});


app.post('/users', async (req, res) => {
    let { name, email, password } = req.body;
    let hasUser = await Users.findOne({ where: { email: email } });
    let hashPass = await argon2.hash(password);
    if (!name || !email || !password) {
        res.status(400).json({ message: 'Há algo de errado com sua solicitação!' })
    } else if (hasUser) {
        res.status(409).json({ message: 'Já existe um usuário com este email no banco de dados!' })
    }
    else {
        Users.create({ name: name, email: email, password: hashPass })
        res.status(201).json({ message: 'Usuário criado com sucesso!' })
    }

});

app.post('/auth', async (req,res)=>{
    let { email, password } = req.body;
    
    if(!email || !password) {
        res.status(400).json({message: "Verifique se os dados está corretos."})
    } else {
        let user = await Users.findOne({where: {email: email}})
        if(!user) {
            res.status(404).json({message: "Email não cadastrado no banco de dado."})
        } else {
            let verifiedPass = await argon2.verify(user.password, password);
            if(!verifiedPass) {
                res.status(401).json({message: "A senha enviada está incorreta!"})
            } else {
                jwt.sign({id: user.id, email: user.email}, jwtSecret, {expiresIn: '2h'}, (err, token)=>{
                    if(err){
                        res.status(400).json({error: "Falha interna."});
                    } else {
                        res.status(200).json({message: "Entrada autorizada", token: token});
                    }
                })
               
            }
        }
        
    }
});

app.listen(3000, () => {
    console.log('API Rodando!')
});
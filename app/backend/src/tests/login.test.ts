import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para a rota Login', () => {
	afterEach(() => {
		sinon.restore();
	})
 
	describe('Testa o POST: /login', () => {
		let response: Response;

    it('Email incorreto', async () => {
			response = await chai.request(app).post('/login')
				.send({
					email: "admin.com",
					password: "123"
				});
			expect(response.status).to.be.equal(401)
			expect(response.body).to.be.deep.equal({ message: "Invalid email or password" })
    })

		it('Senha incorreta', async () => {
			response = await chai.request(app).post('/login')
				.send({
					email: "admin@admin.com",
					password: "123"
				});
			expect(response.status).to.be.equal(401)
			expect(response.body).to.be.deep.equal({ message: "Invalid email or password"	})
    })

	describe('Teste de GET: /login/role', () => {
		let response: Response;

    it('Token invalido', async () => {
			response = await chai.request(app).get('/login/role')
				.set('Authorization', 'token-invalid')				
			expect(response.status).to.be.equal(401)
			expect(response.body).to.be.deep.equal({ message: "Token must be a valid token" })
	})

    it('Sem token', async () => {
			response = await chai.request(app).get('/login/role')
			expect(response.status).to.be.equal(401)
			expect(response.body).to.be.deep.equal({ message: "Token not found" })
    })
	})
});
});
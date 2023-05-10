const request = require('supertest');
const app = require( '../src/server.ts');

describe('get Endpoint', () => {
    it('UnitTest endpoint post', async () => {
        const res = await request(app).post('/repository')
          .send({
            name: 'unitTest',
            link: 'https://raw.githubusercontent.com/jfandinoh/ITO-Software/main/Empleado/ITOSoftware/appsettings.json',
          });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Repository create');
        console.log(res.body)
      });

    it('UnitTest endpoint get', async () => {
        const res = await request(app).get("/repository");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([{id:1,name:'"Identity-Management_fail"',link:'"https://raw.githubusercontent.com/jfandinoh/Identity-Management/main/IdentityServer/Program.cs"'}]);
        console.log(res.body)
    });

    it('UnitTest endpoint get by id', async () => {
        const res = await request(app).get("/repository/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([{id:1,name:'"Identity-Management"',link:'"https://raw.githubusercontent.com/jfandinoh/Identity-Management/main/IdentityServer/Program.cs"'}]);
        console.log(res.body)
    });

    it('UnitTest endpoint put', async () => {
        const res = await request(app).put("/repository/1")
        .send({
          name: 'unitTest',
          link: 'https://raw.githubusercontent.com/jfandinoh/ITO-Software/main/Empleado/ITOSoftware/appsettings.json',
          });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual('Repository updated');
        console.log(res.body)
    });

    it('UnitTest endpoint delete', async () => {
        const res = await request(app).delete("/repository/2");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual('Repositoy deleted');
        console.log(res.body)
    });
})
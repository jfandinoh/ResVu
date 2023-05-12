const request = require('supertest');
const app = require( '../src/server.ts');

describe('get Endpoint', () => {
    it('UnitTest Repositoy endpoint post', async () => {
        const res = await request(app).post('/repository')
          .send({
            name: 'unitTest',
            link: 'https://raw.githubusercontent.com/jfandinoh/ITO-Software/main/Empleado/ITOSoftware/appsettings.json',
          });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Repository create');
        console.log(res.body)
      });

    it('UnitTest Repositoy endpoint get', async () => {
        const res = await request(app).get("/repository");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([{id:1,name:'"Identity-Management_fail"',link:'"https://raw.githubusercontent.com/jfandinoh/Identity-Management/main/IdentityServer/Program.cs"'}]);
        console.log(res.body)
    });

    it('UnitTest Repositoy endpoint get by id', async () => {
        const res = await request(app).get("/repository/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([{id:1,name:'"Identity-Management"',link:'"https://raw.githubusercontent.com/jfandinoh/Identity-Management/main/IdentityServer/Program.cs"'}]);
        console.log(res.body)
    });

    it('UnitTest Repositoy endpoint put', async () => {
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

    it('unitTest fail scanRepositoy endpoint get', async () => {
      const res = await request(app).get("/scan/repository/1");
      expect(res.statusCode).toEqual(400);
      expect(res.body).toEqual('Repository no found--fail');
      console.log(res.body)
    });

    it('unitTest scanRepositoy endpoint get', async () => {
      const res = await request(app).get("/scan/repository/1");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual('Repository add to Queue');
      console.log(res.body)
    });

    it('unitTest statusScanRepositoy endpoint get', async () => {
      const res = await request(app).get("/scan/status/repository/1");
      expect(res.statusCode).toEqual(200);
      console.log(res.body[0].findings)
      expect(res.body).toEqual([
        {
          id: 1,
          idrespository: 6,
          status: '"Queued"',
          repositoryname: '"ITO-Software"',
          repositoryurl: '"https://raw.githubusercontent.com/jfandinoh/ITO-Software/main/Objetos DB.sql"',
          findings: '"[{"word": "private_key","line": 60}]"',
          queuedat: '"2023-05-11T10:46:36.991Z"',
          scanningat: null,
          finishedat: null
        }
      ]);
      expect(res.body[0].findings).any(String);
      console.log(res.body)
    });

    it('unitTest fail statusScanRepositoy endpoint get', async () => {
      const res = await request(app).get("/scan/status/repository/1");
      expect(res.statusCode).toEqual(200);
      console.log(res.body[0].findings)
      expect(res.body).toEqual([
        {
          id: 1,
          idrespository: 6,
          status: '"Queued"',
          repositoryname: '"ITO-Software"',
          repositoryurl: '"https://raw.githubusercontent.com/jfandinoh/ITO-Software/main/Objetos DB.sql"',
          findings: null,
          queuedat: '"2023-05-11T10:46:36.991Z"',
          scanningat: null,
          finishedat: null
        }
      ]);
      expect(res.body[0].findings).any(String);
      console.log(res.body)
    });

})
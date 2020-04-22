const supertest = require("supertest");
const tape = require("tape");
const equalsFile = require("./util");
const sittersCRUD = require("../src/queries/sittersCRUD");
const reserveCRUD = require("../src/queries/reserveCRUD");
const getAvailableSitters = require("../src/queries/getAvailableSitters");
const router = require("../src/router");



tape.test("check if tape works",t=>{
    t.ok(true,"passed");
    t.end();
})


tape.test("test route '/'",t=>{

    supertest(router)
        .get("/")
        .expect(200)
        .expect(equalsFile("./public/index.html"))
        .end(e=>{
            t.error(e,"equals './public/index.html'");
            t.end();
        })
})
tape.test("test route '/pathThatDoesntExist'",t=>{

    supertest(router)
        .get("/pathThatDoesntExist")
        .expect(404)
        .end(e=>{
            t.error(e,"equals 'path doesnt exist'");
            t.end();
        })
})


tape.test("test method: GET , route '/sitters'",t=>{

    supertest(router)
        .get("/sitters")
        .expect(200)
        .expect("content-type","application/json")
        .end((e,res)=>{
            t.error(e,"response code 200");
            t.error(e,"returns a json file");
            t.ok(Array.isArray(res.body), "returns an array")
            t.end();
        })
})
tape.test("test method: GET , route '/sitters?count=1'",t=>{

    supertest(router)
        .get("/sitters?count=1")
        .expect(200)
        .expect("content-type","application/json")
        .end((e,res)=>{
            t.error(e,"response code 200");
            t.error(e,"returns a json file");
            t.ok(Array.isArray(res.body), "returns an array")
            t.ok(res.body.length <= 1, "length <= 1")
            t.end();
        })
})
tape.test("test method: GET , route '/sitters?count=2&offset=1'",t=>{

    supertest(router)
        .get("/sitters?count=1&offset=1")
        .expect(200)
        .expect("content-type","application/json")
        .end((e,res)=>{
            t.error(e,"response code 200");
            t.error(e,"returns a json file");
            t.ok(Array.isArray(res.body), "returns an array")
            t.ok(res.body.length <= 1, "length <= 2")
            t.end();
        })
})
tape.test("test method: GET , route '/sitters?count=2&count=1'",t=>{

    supertest(router)
        .get("/sitters?count=2&count=1")
        .expect(400)
        .end((e)=>{
            t.error(e,"response code 400");
            t.end();
        })
})
tape.test("test method: GET , route '/sitters?offset=2'",t=>{

    supertest(router)
        .get("/sitters?offset=2")
        .expect(400)
        .end((e)=>{
            t.error(e,"response code 400");
            t.end();
        })
})
tape.test("test method: GET , route '/sitters?somethingElse=2'",t=>{

    supertest(router)
        .get("/sitters?somethingElse=2")
        .expect(400)
        .end((e)=>{
            t.error(e,"response code 400");
            t.end();
        })
})
tape.test("test method: POST , route '/sitters' body: {name,startingHr,endHr,cost}",t=>{

    supertest(router)
        .post("/sitters?somethingElse=2")
        .send({name: 'test',startingHr:"10:30",endHr:"22:00",cost:30})
        .set('Accept', 'application/json')
        .expect(200)
        .end((e)=>{

            t.error(e,"added to database");
            t.end();
        })
})
tape.test("test method: POST , route '/sitters' body: {name,startingHr,endHr}",t=>{

    supertest(router)
        .post("/sitters?somethingElse=2")
        .send({name: 'test',startingHr:"10:30",endHr:"22:00"})
        .set('Accept', 'application/json')
        .expect(200)
        .end((e)=>{

            t.error(e,"added to database");
            t.end();
        })
})






tape.test("test method: GET , route '/reservations'",t=>{

    supertest(router)
        .get("/reservations")
        .expect(200)
        .expect("content-type","application/json")
        .end((e,res)=>{
            t.error(e,"response code 200");
            t.error(e,"returns a json file");
            t.ok(Array.isArray(res.body), "returns an array")
            t.end();
        })
})
tape.test("test method: GET , route '/reservations?count=1'",t=>{

    supertest(router)
        .get("/reservations?count=1")
        .expect(200)
        .expect("content-type","application/json")
        .end((e,res)=>{
            t.error(e,"response code 200");
            t.error(e,"returns a json file");
            t.ok(Array.isArray(res.body), "returns an array")
            t.ok(res.body.length <= 1, "length <= 1")
            t.end();
        })
})
tape.test("test method: GET , route '/reservations?count=2&offset=1'",t=>{

    supertest(router)
        .get("/reservations?count=1&offset=1")
        .expect(200)
        .expect("content-type","application/json")
        .end((e,res)=>{
            t.error(e,"response code 200");
            t.error(e,"returns a json file");
            t.ok(Array.isArray(res.body), "returns an array")
            t.ok(res.body.length <= 1, "length <= 2")
            t.end();
        })
})
tape.test("test method: GET , route '/reservations?count=2&count=1'",t=>{

    supertest(router)
        .get("/reservations?count=2&count=1")
        .expect(400)
        .end((e)=>{
            t.error(e,"response code 400");
            t.end();
        })
})
tape.test("test method: GET , route '/reservations?offset=2'",t=>{

    supertest(router)
        .get("/reservations?offset=2")
        .expect(400)
        .end((e)=>{
            t.error(e,"response code 400");
            t.end();
        })
})
tape.test("test method: GET , route '/reservations?somethingElse=2'",t=>{

    supertest(router)
        .get("/reservations?somethingElse=2")
        .expect(400)
        .end((e)=>{
            t.error(e,"response code 400");
            t.end();
        })
})




tape.test("test method: GET , route '/availableSitters'",t=>{

    supertest(router)
        .get("/availableSitters")
        .expect(400)
        .end((e)=>{
            t.error(e,"response code 400");
            t.end();
        })
})
tape.test("test method: GET , route '/availableSitters?Start=13%3A00'",t=>{

    supertest(router)
        .get("/availableSitters?start=13%3A00")
        .expect(400)
        .end((e)=>{
            t.error(e,"response code 400");
            t.end();
        })
})
tape.test("test method: GET , route '/availableSitters?end=13%3A30'",t=>{

    supertest(router)
        .get("/availableSitters?end=13%3A00")
        .expect(400)
        .end((e)=>{
            t.error(e,"response code 400");
            t.end();
        })
})
tape.test("test method: GET , route '/availableSitters?somethingElse=13%3A30'",t=>{

    supertest(router)
        .get("/availableSitters?somethingElse=13%3A00")
        .expect(400)
        .end((e)=>{
            t.error(e,"response code 400");
            t.end();
        })
})
tape.test("test method: GET , route '/availableSitters?start=13%3A30&end=15%3A00'",t=>{

    supertest(router)
        .get("/availableSitters?start=13%3A30&end=15%3A00")
        .expect(200)
        .expect("content-type","application/json")
        .end((e,res)=>{
            t.error(e,"response code 200");
            t.error(e,"returns a json file");
            t.ok(Array.isArray(res.body), "returns an array")
            t.end();
        })
})
tape.test("test method: GET , route '/availableSitters?start=13%3A30&end=12%3A00'",t=>{

    supertest(router)
        .get("/availableSitters?start=13%3A30&end=12%3A00")
        .expect(502)
        .end((e)=>{
            t.error(e,"response code 502 (should be 400) , start time must come before the end time");
            t.end();
        })
})
tape.test("test method: GET , route '/availableSitters?start=13%3A30&end=13%3A30'",t=>{

    supertest(router)
        .get("/availableSitters?start=13%3A30&end=13%3A30")
        .expect(502)
        .end((e)=>{
            t.error(e,"response code 502 (should be 400) , start time must come before the end time");
            t.end();
        })
})




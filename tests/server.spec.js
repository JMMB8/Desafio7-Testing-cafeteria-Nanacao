const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it("obteniendo un status 200 y tipo de datos", async () => {
    const { statusCode, body } = await request(server).get("/cafes").send();

    expect(statusCode).toBe(200);
    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBeGreaterThan(0);
  });
});

it("Eliminar un café con un id que no existe: delete 404", async () => {
  const jwt = "Bearer token";
  const id = 999;
  const response = await request(server)
    .delete(`/cafes/${id}`)
    .set("Authorization", jwt)
    .send();
  expect(response.statusCode).toBe(404);
});
it("Agregando un nuevo cafe: POST 201", async () => {
  const id = Math.floor(Math.random() * 999);
  const cafe = { id, nombre: "cafe nuevo" };
  const { body: cafes, statusCode } = await request(server)
    .post("/cafes")
    .send(cafe);
  expect(statusCode).toBe(201);
});

it("actualizar cafe con id diferente: PUT 400", async () => {
  const id = 999;
  const cafePayload = { id, nombre: "cafe nuevo" };
  const { body: cafe, statusCode } = await request(server)
    .put("/cafes/1")
    .send(cafePayload);
  expect(statusCode).toBe(400);
});

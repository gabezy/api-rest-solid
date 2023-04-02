import request from "supertest";
import { app } from "@/app";
import { registerAndAuthenticateUser } from "@/utils/test/register-and-authenticate-user";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Register Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to register a gym", async () => {
    const { token } = await registerAndAuthenticateUser(app);

    const response = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "JavaScript Gym",
        description: "Some description.",
        phone: "1199999999",
        latitude: -15.8337195,
        longitude: -47.8328526,
      });

    expect(response.statusCode).toEqual(201);
  });
});

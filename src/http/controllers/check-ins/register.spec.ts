import request from "supertest";
import { app } from "@/app";
import { registerAndAuthenticateUser } from "@/utils/test/register-and-authenticate-user";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { prisma } from "@/lib/prisma";

describe("Register check-in (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to register a check-in", async () => {
    const { token } = await registerAndAuthenticateUser(app);

    const gym = await prisma.gym.create({
      data: {
        title: "JavaScript Gym",
        latitude: -15.8337195,
        longitude: -47.8328526,
      },
    });

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -15.8337195,
        longitude: -47.8328526,
      });

    expect(response.statusCode).toEqual(201);
  });
});

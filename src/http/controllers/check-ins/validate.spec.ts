import request from "supertest";
import { app } from "@/app";
import { registerAndAuthenticateUser } from "@/utils/test/register-and-authenticate-user";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { prisma } from "@/lib/prisma";

describe("Validate check-in (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to validate a check-in", async () => {
    const { token } = await registerAndAuthenticateUser(app, true);

    const user = await prisma.user.findFirstOrThrow();

    const gym = await prisma.gym.create({
      data: {
        title: "JavaScript Gym",
        latitude: -15.8337195,
        longitude: -47.8328526,
      },
    });

    let checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      },
    });

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(204);

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      },
    });

    // console.log(checkIn.validated_at);

    expect(checkIn.validated_at).toEqual(expect.any(Date));
  });
});

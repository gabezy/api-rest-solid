# App

Gympass style app.

## RFs (Requisitos Funcionais)

- [x] It must be possible to register
- [x] It must be possible to authenticate
- [x] it must be possible to get the profile of a logged-in user
- [x] it must be possible to get the check-ins numbers realized by the logged-in user
- [x] it must be possible for the user to get the check-ins history
- [x] It must be possible for the user to search for gyms nearby (until 10KM)
- [x] It must be possible for the user to search gyms by the name
- [x] It must be possible for the user to check-in in a gym
- [x] It must be possible to validate a user's check-in
- [x] It must be possible to register a gym

## RNs (Regras de negócio)

- [x] The user can't register wwith a duplicate e-mail
- [x] the user can't do 2 check-ins in the same day
- [x] The user can't make check-in if she/he isn't close (100m) to the gym
- [x] The check-in can only be validated until 20 minutes after create
- [] The check-in only can be validate by administrators
- [] The Gym only can be registred by administrators

## RNFs (Requisitos não-funcionais)

- [x] The user's password must be encrypt
- [] The application data must be persisted in a PostgreSQL database
- [] All data list must be paginated with 20 items
- [] The user must be identified by a JWT (JSON Web Tkoen)

#### Docker Commands

```sh
# Create a new prisma migration
npx prisma migrate dev
# Open prisma studio
npx prisma studio

# Create a container
docker run imageName
# Up dockers service
docker compose up -d
# stop dockers services
docker compose stop
# Delete dockers services
docker compose down
# Check the running containers
docker ps
# Ckeck all containers
docker ps -a
```

## Vantagens do repository Patterns

- Separa toda a logística e código específico de um banco de dados/ferramenta de comunição, para caso no futuro troque a ferramenta, apenas os código da pasta `repositories` precisem ser atualizados

## SOLID

- D - Dependency Inversion Principle

## TDD - Test-Driven development

#### Stages

- Red: Means that the test failed
- Green: Means that the test passed
- Refactor : Refactor the test code
  <br>

**unit tests need to be as specific as possible**

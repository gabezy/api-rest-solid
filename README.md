# App

Gympass style app.

## RFs (Requisitos Funcionais)

- [] It must be possible to register
- [] It must be possible to authenticate
- [] it must be possible to get the profile of a logged-in user
- [] it must be possible to get the check-ins numbers realized by the logged-in user
- [] it must be possible for the user to get the check-ins history
- [] It must be possible for the user to search for gyms nearby
- [] It must be possible for the user to search gyms by the name
- [] It must be possible for the user to check-in in a gym
- [] It must be possible to validate a user's check-in
- [] It must be possible to register a gym

## RNs (Regras de negócio)

- [] The user can't register wwith a duplicate e-mail
- [] the user can't do 2 check-ins in the same day
- [] The user can't make check-in if she/he isn't close (100m) to the gym
- [] The check-in can only be validated until 20 minutes after create
- [] The check-in only can be validate by administrators
- [] The Gym only can be registred by administrators

## RNFs (Requisitos não-funcionais)

- [] The user's password must be encrypt
- [] The application data must be persisted in a PostgreSQL database
- [] All data list must be paginated with 20 items
- [] The user must be identified by a JWT (JSON Web Tkoen)

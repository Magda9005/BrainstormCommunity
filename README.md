# BrainstormCommunity - clone of Stack Overflow

Fullstack project in Typescript, React and Next.js, using Node.js, PostgreSQL and Prisma.

## Demo on video

[![BrainstormCommunity](https://img.youtube.com/vi/JfIdcK-RUr0/0.jpg)](https://www.youtube.com/watch?v=JfIdcK-RUr0)

## Features of the project:

- authentication using GitHub provider
- possibility to add posts (choosing the tags), comments, likes, unlikes and votes
- displaying number of views, comments and votes for each post
- displaying likes and unlikes for each comment
- informations about user: displaying the user's avatar, nickname, number of posts published and possibility to access the user's github profile
- searching for the posts containing the given key word
- clicking on the tag enables to display all posts containing the given tag

## How to setup the project

1. Install all dependencies: `yarn install`
2. Generate Prisma Client: `yarn run postinstall`
3. Start the development server: `yarn run dev`
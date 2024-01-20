import { Post, User } from "@prisma/client";
import fastify, { FastifyReply } from "fastify";
import { createUser } from "./services/user/create-user";
import { ZodError } from "zod";
import { getUser } from "./services/user/get-user";
import { listUsers } from "./services/user/list-users";
import { createPost } from "./services/post/create-post";
import { listPosts } from "./services/post/list-posts";
import { getPost } from "./services/post/get-post";
import { updateUser } from "./services/user/update-user";
import { updatePost } from "./services/post/update-post";

function handleError(error: unknown, reply: FastifyReply) {
  reply.code(error instanceof ZodError ? 400 : 500).send(error);
}

const app = fastify();

// USERS
app.post("/user", async (req, reply) => {
  try {
    const body = req.body as User;
    return await createUser(body);
  } catch (error) {
    handleError(error, reply);
  }
});

app.get("/user", async (_, reply) => {
  try {
    return await listUsers();
  } catch (error) {
    handleError(error, reply);
  }
});

app.get("/user/:id", async (req, reply) => {
  try {
    const { id } = req.params as any;

    return await getUser(id);
  } catch (error) {
    handleError(error, reply);
  }
});

app.put("/user/:id", async (req, reply) => {
  try {
    const { id } = req.params as any;
    const { name } = req.body as any;

    return await updateUser({
      id,
      name,
    });
  } catch (error) {
    handleError(error, reply);
  }
});

// POSTS
app.post("/post", async (req, reply) => {
  try {
    const body = req.body as Post;
    return await createPost(body);
  } catch (error) {
    handleError(error, reply);
  }
});

app.get("/post", async (req, reply) => {
  try {
    const { authorId } = req.query as any;
    return await listPosts(authorId);
  } catch (error) {
    handleError(error, reply);
  }
});

app.get("/post/:id", async (req, reply) => {
  try {
    const { id } = req.params as any;

    return await getPost(id);
  } catch (error) {
    handleError(error, reply);
  }
});

app.put("/post/:id", async (req, reply) => {
  try {
    const { id } = req.params as any;
    const post = req.body as Post;

    return await updatePost({
      ...post,
      id
    });
  } catch (error) {
    handleError(error, reply);
  }
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("🚀 Server is running!");
  });

const path = require("node:path");
const { readFileSync } = require("node:fs");
const Fastify = require("fastify");
const fastifyStaticPlugin = require("@fastify/static");
const React = require("react");
const { renderToPipeableStream } = require("react-server-dom-webpack/server");
const AppImport = require("../src/App.jsx");
const App = AppImport.default;

let MODULE_MAP = {};
try {
  const MANIFEST = readFileSync(
    path.resolve(__dirname, "../dist/react-client-manifest.json"),
    "utf8"
  );
  MODULE_MAP = JSON.parse(MANIFEST);
} catch (error) {
  console.warn(
    "Could not read react-server-manifest.json, using empty module map."
  );
}
const PORT = process.env.PORT ? process.env.PORT : 3000;

const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});

fastify.register(fastifyStaticPlugin, {
  root: path.join(__dirname, "../dist"),
  prefix: "/assets/",
});
fastify.register(fastifyStaticPlugin, {
  root: path.join(__dirname, "../public"),
  decorateReply: false,
});

fastify.get("/", async function rootHandler(request, reply) {
  return reply.sendFile("index.html");
});

fastify.get("/react-flight", function reactFlightHandler(request, reply) {
  try {
    reply.header("Content-Type", "application/octet-stream");
    const { pipe } = renderToPipeableStream(
      React.createElement(App),
      MODULE_MAP
    );
    pipe(reply.raw);
  } catch (error) {
    request.log.error("react-flight error", error);
    throw error;
  }
});

module.exports = async function start() {
  try {
    await fastify.listen({ port: PORT });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

const development = (process.env.NODE_ENV || "production") === "development";

module.exports = {
  presets: [
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
        useSpread: true,
        development,
      },
    ],
  ],
};

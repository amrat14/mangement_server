module.exports = {
  DB:
    process.env.DB ||
    "mongodb+srv://amratgarg:Wt1YFtve3HSSdrYg@project-1.4kz6fj7.mongodb.net/school_db?retryWrites=true&w=majority",
  PORT: process.env.PORT || "6061",
  IS_CONSOLE_LOG: process.env.IS_CONSOLE_LOG || "true",
  JWT_SECRET:
    "VEgd91C9lhbVU4pKsawXuqAk8RgODzpA75m056lfLr_UHhO1uDTG8HvUwvfWtkNU",
  EMAIL:
    "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",
};

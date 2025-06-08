class CustomError extends Error {
    constructor(message) {
      super(message);
      this.name = "CustomError";
    }
  }
  
  function throwGenericError() {
    throw new Error("Generic error");
  }
  
  function throwCustomError() {
    throw new CustomError("Custom error");
  }
  
  try {
    throwGenericError();
  } catch (err) {
    console.log("Caught generic error:", err.message);
  } finally {
    console.log("Finally block for generic error");
  }
  
  try {
    throwCustomError();
  } catch (err) {
    console.log("Caught custom error:", err.message);
  } finally {
    console.log("Finally block for custom error");
  }
  
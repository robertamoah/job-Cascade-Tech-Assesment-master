const authMiddleware = (data) => {
  // if "" email return
  if (!data.email) {
    return {
      error: true,
      message: "Fill in email",
    };
  }

  // if "" password return
  if (!data.password) {
    return {
      error: true,
      message: "Fill in password",
    };
  }

  if (!data.number || data.number) {
    // checks for ########## digit numbers,
    // checks if its all numbers
    const numData = [...data.number];
    let mainResult = "";
    numData.forEach((char) => {
      if (isNaN(char) == true) {
        console.log("it a match");
        mainResult = true;
      }
    });

    // checks for input to be all number
    if (mainResult === true) {
      return {
        error: true,
        message: "it needs all numbers",
      };
    }
  }

  //checks if number is 10 digits
  if (data.number.length < 10) {
    return {
      error: true,
      message: "Number needs 10 digits",
    };
  }
  // if "" name return

  if (!data.number) {
    return {
      error: true,
      message: "Fill in number",
    };
  }
};
module.exports.authMiddleware = authMiddleware;

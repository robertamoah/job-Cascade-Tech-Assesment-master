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

  if (!data.phone || data.phone) {
    // checks for ########## digit phones,
    // checks if its all phones
    const numData = [...data.phone];
    let mainResult = "";
    numData.forEach((char) => {
      if (isNaN(char) == true) {
        console.log("it a match");
        mainResult = true;
      }
    });

    // checks for input to be all phone
    if (mainResult === true) {
      return {
        error: true,
        message: "it needs all phones",
      };
    }
  }

  //checks if phone is 10 digits
  if (data.phone.length < 10) {
    return {
      error: true,
      message: "phone needs 10 digits",
    };
  }

  // if "" name return
  if (!data.phone) {
    return {
      error: true,
      message: "Fill in phone",
    };
  }

  if (data.email && data.password && data.phone) {
    return {
      error: false,
      message: "Fill in phone",
    };
  }
};
module.exports.authMiddleware = authMiddleware;

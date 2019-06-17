
module.exports = (error, data) => {
  if (error) {
    console.error(error)

    return {
      error: true,
      messages: error.length ? error : error.toString()
    }
  }

  return {
    error: false,
    data: data
  }
}

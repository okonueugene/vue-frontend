<template>
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Not Found</title>
    </head>
    <body>
      <h1>Not Found</h1>

      <p>Sorry, the page you are looking for could not be found.</p>

      <p>Go back to the <a href="/">home page</a>.</p>
    </body>
  </html>
</template>

<script>
export default {
  name: "NotFound"
};
</script>
<style scoped>
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1rem;
  margin-bottom: 1rem;
}

a {
  color: #42b983;
}

a:hover {
  color: #35495e;
}

@media (prefers-color-scheme: dark) {
  body {
    background-color: #2c3e50;
    color: #fff;
  }

  a {
    color: #42b983;
  }

  a:hover {
    color: #fff;
  }
}
</style>

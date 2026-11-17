<template>
  <main class="not-found">
    <img class="logo" src="/images/404.png" alt="404">
    <h1>Oops, we couldn't find that page</h1>
    <p class="hint">The link might be broken, or the page may have moved.</p>
    <nav class="links">
      <a href="/" class="primary">Back to home</a>
      <a href="/official-logos">Official logos</a>
      <a href="/fonts">Fonts</a>
    </nav>
  </main>
</template>

<style scoped>
  .not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.25em;
    padding-block: 3em;
    text-align: center;
  }
  .logo {
    display: block;
    width: min(34rem, 85%);
    height: auto;
    translate: 7% 0;
  }
  h1 {
    margin: .5em 0 0;
    font-weight: normal;
    font-size: clamp(1.6rem, 5vw, 2.6rem);
    line-height: 1.15;
    color: var(--colour-text-red);
  }
  .hint {
    margin: 0;
    font-family: poppins-medium, sans-serif;
    color: var(--colour-text-muted);
  }
  .links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: .75em;
    margin-top: .75em;
  }
  .links a {
    font-family: poppins-medium, sans-serif;
    text-decoration: none;
    color: var(--colour-text-light);
    background: var(--colour-bg-panel);
    padding: .6em 1.2em;
    user-select: none;
    transition: background-color var(--short-animation-time);
  }
  .links a.primary {
    background: var(--colour-button);
  }
  .links a:hover,
  .links a:focus-visible {
    background: var(--colour-button-hover);
  }
</style>

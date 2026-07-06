---
title: "SSR vs CSR: The Interview Question That Made Me Rethink Rendering 🤯"
subtitle: "A Deep Dive into Server-Side Rendering and Client-Side Rendering"
date: "2026-07-06"
---

# SSR vs CSR: The Interview Question That Made Me Rethink Rendering 🤯

![Browser and Server](https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200)

I was sitting in an interview.

The interviewer asked:

> **"Can you explain what happens in Server-Side Rendering?"**

I confidently replied:

> **"In SSR, the server renders the component and sends the HTML file to the browser."**

I thought I cooked.

The interviewer looked at me.

I looked at the interviewer.

He looked back.

Then he said:

> **"That's not wrong… but that's not the whole story either."**

Ouch.

That sentence sent me on a rabbit hole that ended with me understanding SSR and CSR much better than before.

---

# First, What Is Rendering?

Rendering simply means:

> **Taking your code and turning it into something the user can see on the screen.**

The question is:

> **Who creates the HTML?**

The answer decides whether it's SSR or CSR.

---

# Client-Side Rendering (CSR)


1. Browser requests the page.
2. Server sends an almost empty HTML and a JavaScript bundle.
3. Browser downloads JavaScript.
4. React executes in the browser.
5. React creates the UI.

```html
<body>
  <div id="root"></div>
</body>
```

The actual content doesn't exist initially.

## CSR Flow

```text
Browser
   ↓
Request
   ↓
Server sends HTML + JS
   ↓
Browser downloads JS
   ↓
React renders UI
   ↓
User sees content
```

---

# Why CSR Can Feel Slow

Imagine ordering food and the restaurant says:

1. Build the kitchen.
2. Hire the chef.
3. Buy vegetables.
4. Then we'll cook.

That's CSR.

The browser has a lot of work before showing content.

---

# Server-Side Rendering (SSR)

This is where my interview answer was incomplete.

The server doesn't simply send HTML.

The server actually **runs React**.

```jsx
<Home />
```

becomes

```html
<h1>Hello World</h1>
<p>Welcome back.</p>
```

before it even reaches the browser.

## SSR Flow

```text
Browser
   ↓
Request
   ↓
Server runs React
   ↓
Generates HTML
   ↓
Sends HTML + JS
   ↓
Browser shows content immediately
```

---

# The Missing Piece: Hydration 💧

Then my next question was:

> **If HTML is already there, why do we still need JavaScript?**

Because HTML is just the picture.

The page still needs:

- Click handlers
- Forms
- State
- Interactivity

So the browser:

1. Displays HTML immediately.
2. Downloads JavaScript.
3. React attaches event handlers.

This process is called:

# Hydration

```text
HTML arrives
↓
Content becomes visible
↓
JS arrives
↓
React hydrates
↓
Page becomes interactive
```

This was the detail I missed in the interview.

---

# Visual Comparison

```text
CSR

Request
↓
HTML
↓
Download JS
↓
Execute JS
↓
Render UI


SSR

Request
↓
Server generates HTML
↓
Display UI immediately
↓
Download JS
↓
Hydrate
```

---

# Benefits of SSR

✅ Better First Paint

✅ Better SEO

✅ Better User Experience

✅ Better for slower devices

---

# Benefits of CSR

✅ Great for highly interactive applications

✅ Lower server work

✅ Fast client-side navigation

---

# When Should You Use What?

| **Situation** | **Better Choice** |
|-----------|----------------|
| Blogs | SSR |
| Marketing Pages | SSR |
| SEO-heavy apps | SSR |
| Admin Dashboards | CSR |
| Internal Tools | CSR |
| Highly Interactive Apps | CSR |

---

# The Interview Answer I'd Give Today

> **In Server-Side Rendering, the server executes React components and generates HTML on the server itself. The browser receives this pre-rendered HTML and displays content immediately. Along with the HTML, JavaScript is also sent so React can hydrate the page and attach event handlers, making the page interactive.**

---

# Final Thoughts

I wasn't completely wrong.

I was just… incomplete.

And sometimes in tech, that's the difference between:

> **"Knows React"**

and

> **"Understands React."**

As Harvey Specter would say:

> **"The difference between good and great is attention to detail."**

This tiny detail called hydration completely changed my understanding of rendering.

And honestly?

That's the best part of learning.

There is always one more layer beneath what you think you know.

---

**Keep digging. Keep learning. The browser always has another story to tell. 🚀**

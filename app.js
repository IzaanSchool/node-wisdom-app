const express = require('express');
const app = express();
const PORT = 8000;

// Sample wisdom quotes
const quotes = [
    "The only true wisdom is in knowing you know nothing. – Socrates",
    "In the middle of every difficulty lies opportunity. – Albert Einstein",
    "Do what you can, with what you have, where you are. – Theodore Roosevelt",
    "Life is really simple, but we insist on making it complicated. – Confucius",
    "It does not matter how slowly you go as long as you do not stop. – Confucius",
    "Wisdom is not a product of schooling but of the lifelong attempt to acquire it. – Albert Einstein",
    "The unexamined life is not worth living. – Socrates",
];

// Serve a random quote in HTML
app.get('/', (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    res.send(`
        <html>
            <head><title>Random Wisdom</title></head>
            <body>
                <h1>Random Wisdom</h1>
                <p>${randomQuote}</p>
                <a href="/quotes">View All Quotes</a>
                <br><a href="/add-quote">Add a new quote</a>
            </body>
        </html>
    `);
});

// Serve all quotes in HTML
app.get('/quotes', (req, res) => {
    const quoteList = quotes.map((quote, index) => `<li>${index + 1}. ${quote}</li>`).join('');
    res.send(`
        <html>
            <head><title>All Wisdom Quotes</title></head>
            <body>
                <h1>All Wisdom Quotes</h1>
                <ul>${quoteList}</ul>
                <a href="/">Get a Random Quote</a>
                <br><a href="/add-quote">Add a new quote</a>
            </body>
        </html>
    `);
});

// Add a new quote (Form + POST)
app.use(express.urlencoded({ extended: true }));
app.get('/add-quote', (req, res) => {
    res.send(`
        <html>
            <head><title>Add Wisdom</title></head>
            <body>
                <h1>Add a New Wisdom Quote</h1>
                <form method="POST" action="/add-quote">
                    <textarea name="quote" rows="4" cols="50" placeholder="Enter your wisdom here"></textarea><br>
                    <button type="submit">Add Quote</button>
                </form>
                <a href="/">Back to Random Quote</a>
                <br><a href="/add-quote">Add a new quote</a>
            </body>
        </html>
    `);
});

app.post('/add-quote', (req, res) => {
    const newQuote = req.body.quote;
    if (newQuote && typeof newQuote === 'string') {
        quotes.push(newQuote);
        res.send(`
            <html>
                <head><title>Quote Added</title></head>
                <body>
                    <h1>Quote Added Successfully!</h1>
                    <p>${newQuote}</p>
                    <a href="/">Get a Random Quote</a>
                    <br>
                    <a href="/quotes">View All Quotes</a>
                    <br><a href="/add-quote">Add a new quote</a>
                </body>
            </html>
        `);
    } else {
        res.send(`
            <html>
                <head><title>Error</title></head>
                <body>
                    <h1>Error</h1>
                    <p>Invalid quote format. Please provide a string.</p>
                    <a href="/add-quote">Try Again</a>
                </body>
            </html>
        `);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Wisdom app is running at http://localhost:${PORT}`);
});

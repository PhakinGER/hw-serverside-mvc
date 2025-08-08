const express = require('express');
const path = require('path');
const app = express();
const productRoutes = require('./routes/product.routes');
const { swaggerUi, specs } = require('./swagger');

const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.get('/', (req, res) => res.send('hi'));
app.use('/products', productRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});

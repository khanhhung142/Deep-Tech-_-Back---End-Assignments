import { createServer } from 'http';
import express, { Application } from 'express';
import deck from './routes/deck.route'
import cors from 'cors';
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUI  from 'swagger-ui-express'

const app: Application = express();
const server = createServer(app);

const swaggerOptions = {
  swaggerDefinition: {
    components: {},
    info: {
      title: "Deck API",
      version: '1.0.0',
    }
  },
  apis: ["./routes/*.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use('/api/deck', deck);

const PORT = process.env.PORT || 5000

server.listen(PORT, (): void => {
  console.log(`Connected successfully on port ${PORT}`);
});
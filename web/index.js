import { join } from 'path';
import { readFileSync } from 'fs';
import express from 'express';
import serveStatic from 'serve-static';
import prisma from './prisma/index.js';
import shopify from './shopify.js';
import webhooks from './webhooks.js';

const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);
console.log(process.env.SHOPIFY_API_KEY);
const STATIC_PATH =
	process.env.NODE_ENV === 'production'
		? `${process.cwd()}/frontend/dist`
		: `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());

app.get(
	shopify.config.auth.callbackPath,
	shopify.auth.callback(),
	shopify.redirectToShopifyOrAppRoot()
);
app.post(
	shopify.config.webhooks.path,
	// @ts-ignore
	shopify.processWebhooks({ webhookHandlers: webhooks })
);

// All endpoints after this point will require an active session
app.use('/api/*', shopify.validateAuthenticatedSession());

app.use(express.json());

app.use(serveStatic(STATIC_PATH, { index: false }));

app.use('/*', shopify.ensureInstalledOnShop(), async (_req, res) => {
	return res.set('Content-Type', 'text/html').send(readFileSync(join(STATIC_PATH, 'index.html')));
});

app.post('https://character-wellness-blowing-andrew.trycloudflare.com/', async (req, res) => {
	try {
	  // Save the checkout data to the database using Prisma
	  console.log('in')
	  const savedCheckout = await prisma.checkout.create({
		data: {
		  checkoutToken:req.body.checkoutToken,
		  productIds:req.body.products 
		},
	  });
	  res.status(200).json(savedCheckout);
	} catch (error) {
	  res.status(500).json({ error: 'Failed to save checkout data' });
	}
  });

app.listen(PORT);

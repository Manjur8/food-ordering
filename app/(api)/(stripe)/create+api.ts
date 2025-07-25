import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
    const body = await request.json();
    const {name, email, amount} = body;

    if(!name || !email || !amount) {
        return new Response(JSON.stringify({error: "Please enter details properly", status: 400}))
    }

    let customer;

    const existingCustomer = await stripe.customers.list({email})

    if(existingCustomer && existingCustomer?.data?.length > 0) {
        customer = existingCustomer.data[0];
    } else {
        customer = await stripe.customers.create({name, email});
    }

    const ephemeralKey = await stripe.ephemeralKeys.create(
      {customer: customer.id},
      {apiVersion: '2025-06-30.basil'}
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amount) * 100,
      currency: 'usd',
      customer: customer.id,
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter
      // is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never'
      },
    });

    return new Response(JSON.stringify({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id
    }));
}
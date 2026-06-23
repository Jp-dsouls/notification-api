import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const emailChannel = await prisma.channel.upsert({
    where: { name: 'Email' },
    update: {},
    create: {
      name: 'Email',
      configSchema: {
        provider: 'smtp',
        host: 'smtp.example.com',
        port: 587,
        secure: false,
        auth: { user: '', pass: '' },
      },
    },
  });

  const smsChannel = await prisma.channel.upsert({
    where: { name: 'SMS' },
    update: {},
    create: {
      name: 'SMS',
      configSchema: {
        provider: 'twilio',
        accountSid: '',
        authToken: '',
        fromNumber: '',
      },
    },
  });

  const whatsappChannel = await prisma.channel.upsert({
    where: { name: 'WhatsApp' },
    update: {},
    create: {
      name: 'WhatsApp',
      configSchema: {
        provider: 'meta',
        accessToken: '',
        phoneNumberId: '',
      },
    },
  });

  console.log('Channels created:', { emailChannel, smsChannel, whatsappChannel });

  const product = await prisma.product.upsert({
    where: { name: 'E-commerce' },
    update: {},
    create: {
      name: 'E-commerce',
      apiKey: uuidv4(),
      status: true,
    },
  });

  console.log('Product created:', product);

  await prisma.productChannel.upsert({
    where: {
      productId_channelId: {
        productId: product.id,
        channelId: emailChannel.id,
      },
    },
    update: {},
    create: {
      productId: product.id,
      channelId: emailChannel.id,
      isEnabled: true,
    },
  });

  await prisma.productChannel.upsert({
    where: {
      productId_channelId: {
        productId: product.id,
        channelId: smsChannel.id,
      },
    },
    update: {},
    create: {
      productId: product.id,
      channelId: smsChannel.id,
      isEnabled: true,
    },
  });

  console.log('Product-Channel associations created');

  await prisma.template.create({
    data: {
      productId: product.id,
      channelId: emailChannel.id,
      name: 'Welcome Email',
      body: 'Hello {{name}}, welcome to {{company}}! Your account has been created.',
    },
  });

  await prisma.template.create({
    data: {
      productId: product.id,
      channelId: smsChannel.id,
      name: 'Order Confirmation',
      body: 'Hi {{name}}, your order #{{orderNumber}} has been confirmed. Total: ${{total}}',
    },
  });

  console.log('Templates created');
  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

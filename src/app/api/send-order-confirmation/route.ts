// src/app/api/send-order-confirmation/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId, userEmail, userName, orderNumber, totalAmount, items } = body;

    // Create email HTML
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #ea580c;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background-color: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 8px 8px;
            }
            .order-details {
              background-color: white;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .item {
              display: flex;
              justify-content: space-between;
              padding: 10px 0;
              border-bottom: 1px solid #eee;
            }
            .total {
              font-size: 24px;
              font-weight: bold;
              color: #ea580c;
              text-align: right;
              margin-top: 20px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Order Confirmation</h1>
            </div>
            <div class="content">
              <h2>Thank you for your order, ${userName}!</h2>
              <p>Your order has been confirmed and will be shipped soon.</p>
              
              <div class="order-details">
                <h3>Order Details</h3>
                <p><strong>Order Number:</strong> ${orderNumber}</p>
                <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
                
                <h4 style="margin-top: 20px;">Items Ordered:</h4>
                ${items.map((item: any) => `
                  <div class="item">
                    <div>
                      <strong>${item.productName}</strong><br>
                      <small>Quantity: ${item.quantity}</small>
                    </div>
                    <div>$${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                `).join('')}
                
                <div class="total">
                  Total: $${totalAmount.toFixed(2)}
                </div>
              </div>
              
              <p>We'll send you a shipping confirmation email as soon as your order ships.</p>
              
              <p>If you have any questions, please don't hesitate to contact us.</p>
              
              <p>Thank you for shopping with HomeTaste!</p>
            </div>
            
            <div class="footer">
              <p>© 2024 HomeTaste. All rights reserved.</p>
              <p>This is an automated email. Please do not reply to this message.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const data = await resend.emails.send({
      from: 'HomeTaste <onboarding@resend.dev>', // Change this to your verified domain
      to: [userEmail],
      subject: `Order Confirmation - ${orderNumber}`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
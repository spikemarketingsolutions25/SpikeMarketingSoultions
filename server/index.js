import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Setup nodemailer transporter
let transporter;

const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
const smtpPort = parseInt(process.env.SMTP_PORT || '465');
const secure = process.env.SMTP_SECURE !== 'false'; // default to true

if (smtpUser && smtpPass) {
  const config = {
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  };

  if (smtpHost === 'smtp.gmail.com') {
    config.service = 'gmail';
  } else {
    config.host = smtpHost;
    config.port = smtpPort;
    config.secure = secure;
  }

  transporter = nodemailer.createTransport(config);
  console.log(`Real SMTP Mail Transporter configured for user: ${smtpUser}`);
} else {
  // Use Ethereal test account as fallback
  console.log('No SMTP config found. Provisioning mock Ethereal test account...');
  nodemailer.createTestAccount().then((account) => {
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
    console.log(`Mock SMTP Transporter created. User: ${account.user}`);
  }).catch(err => {
    console.error('Failed to create mock SMTP account:', err);
  });
}

// Helper to send lead notifications
async function sendLeadEmail(lead) {
  if (!transporter) {
    console.warn('Mail transporter not initialized yet.');
    return null;
  }

  const senderEmail = smtpUser || 'leads@spike-marketing-platform.io';

  const mailOptions = {
    from: `"Spike Leads" <${senderEmail}>`,
    to: 'garg.abhi999@gmail.com, lakshayb057@gmail.com, Spikemarketingsolutions25@gmail.com',
    subject: `🔥 New Lead Received: ${lead.name} (${lead.serviceInterest})`,
    text: `
      Spike Marketing Solutions - New Lead Booking Details
      --------------------------------------------------
      Lead ID: ${lead.id}
      Full Name: ${lead.name}
      Email: ${lead.email}
      Phone: ${lead.phone}
      Company: ${lead.company}
      Service of Interest: ${lead.serviceInterest}
      
      Scheduled Product Demo Slot:
      Day: ${lead.demoDay}
      Time: ${lead.demoTime}
      
      Message/Workflows:
      ${lead.message}
      --------------------------------------------------
      Received at: ${lead.createdAt}
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #f8fafc;">
        <h2 style="color: #4f46e5; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px; margin-top: 0;">🔥 New Lead Booking</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr style="background-color: #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; width: 180px;">Lead ID:</td>
            <td style="padding: 10px;">${lead.id}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Full Name:</td>
            <td style="padding: 10px; font-size: 16px; color: #0f172a; font-weight: bold;">${lead.name}</td>
          </tr>
          <tr style="background-color: #f1f5f9;">
            <td style="padding: 10px; font-weight: bold;">Email:</td>
            <td style="padding: 10px;"><a href="mailto:${lead.email}" style="color: #4f46e5; text-decoration: none;">${lead.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Phone:</td>
            <td style="padding: 10px;"><a href="tel:${lead.phone.replace(/\s+/g, '')}" style="color: #4f46e5; text-decoration: none;">${lead.phone}</a></td>
          </tr>
          <tr style="background-color: #f1f5f9;">
            <td style="padding: 10px; font-weight: bold;">Company:</td>
            <td style="padding: 10px;">${lead.company}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Service Interest:</td>
            <td style="padding: 10px; color: #0ea5e9; font-weight: bold;">${lead.serviceInterest}</td>
          </tr>
          <tr style="background-color: #e0e7ff;">
            <td style="padding: 10px; font-weight: bold;">Demo Scheduled:</td>
            <td style="padding: 10px; font-weight: bold; color: #4f46e5;">${lead.demoDay} at ${lead.demoTime}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; vertical-align: top;">Message:</td>
            <td style="padding: 10px; line-height: 1.5; color: #475569;">${lead.message || 'N/A'}</td>
          </tr>
        </table>
        <div style="margin-top: 25px; font-size: 11px; text-align: center; color: #94a3b8; border-top: 1px dashed #cbd5e1; padding-top: 15px;">
          © 2026 Spike Marketing Solutions Private Limited. All systems operational.
        </div>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email successfully sent to Abhishek & Lakshay: ${info.messageId}`);
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log(`[Ethereal Preview URL]: ${previewUrl}`);
      return previewUrl;
    }
  } catch (err) {
    console.error('Error sending lead email:', err);
  }
  return null;
}

// Temporary in-memory list for demo bookings
const contactLeads = [];

// API route: contact form submissions
app.post('/api/contact', (req, res) => {
  const { name, email, phone, company, message, serviceInterest, demoDay, demoTime } = req.body;
  
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Please provide name, email, and phone number.' });
  }

  const newLead = {
    id: Date.now(),
    name,
    email,
    phone,
    company: company || 'N/A',
    message: message || '',
    serviceInterest: serviceInterest || 'General Inquiry',
    demoDay: demoDay || 'Not Scheduled',
    demoTime: demoTime || 'N/A',
    createdAt: new Date().toISOString()
  };

  contactLeads.push(newLead);
  console.log('New Lead Received via Contact Form:', newLead);

  // Send email and log preview URL if ethereal
  sendLeadEmail(newLead).then((previewUrl) => {
    if (previewUrl) {
      console.log(`[Mock Mail Preview Link]: ${previewUrl}`);
    }
  });

  return res.status(201).json({
    success: true,
    message: 'Thank you! Your request has been received. Our team will contact you shortly.',
    leadId: newLead.id
  });
});

// API route: CRM Simulation data
app.get('/api/simulation/crm', (req, res) => {
  // Return CRM statistics that are similar to the User's actual CRM dashboard metrics
  const now = new Date();
  
  // Create some fluctuation in statistics to make it feel "live"
  const seconds = now.getSeconds();
  const callsToday = 142 + Math.floor(seconds / 2);
  const pendingQueue = 24 - Math.floor(seconds / 5);
  const expectedRevenue = 845000 + (seconds * 1200);
  const convertedRevenue = 412000 + (seconds * 900);
  const leadsCount = 78 + Math.floor(seconds / 4);

  const agentCalls = [
    { name: 'Amit Sharma', callsCount: 42 + Math.floor(seconds / 6), revenue: 125000, progress: 85 },
    { name: 'Priya Patel', callsCount: 38 + Math.floor(seconds / 8), revenue: 98000, progress: 72 },
    { name: 'Raj Malhotra', callsCount: 35 + Math.floor(seconds / 10), revenue: 110000, progress: 91 },
    { name: 'Neha Gupta', callsCount: 27 + Math.floor(seconds / 7), revenue: 79000, progress: 60 }
  ];

  res.json({
    totalContacts: 1248,
    pendingQueue,
    callsToday,
    totalLeads: leadsCount,
    expectedRevenue,
    convertedLeads: 48,
    convertedRevenue,
    agentCalls
  });
});

// API route: ChatLeads AI Simulation messages stream
app.get('/api/simulation/whatsapp', (req, res) => {
  // A catalog of mock WhatsApp incoming messages and their parsed details
  const mockStreams = [
    {
      id: 1,
      sender: "+91 98765 43210",
      time: "Just now",
      message: "Hello, I am interested in your WhatsApp automation service. Please share pricing and details. I run a retail business. - Rahul Mehta",
      extracted: {
        name: "Rahul Mehta",
        phone: "+91 98765 43210",
        company: "Retail Business",
        intent: "HOT",
        extractedFields: ["Name", "Phone", "Intent: Retail WhatsApp Automation"]
      }
    },
    {
      id: 2,
      sender: "+91 87654 32109",
      time: "2 mins ago",
      message: "Hi Spike team, can we schedule a demo of your CRM integration tomorrow at 3 PM? Contact me at preeti.sharma@nexus.com",
      extracted: {
        name: "Preeti Sharma",
        phone: "+91 87654 32109",
        company: "Nexus",
        intent: "HOT",
        extractedFields: ["Name", "Phone", "Email", "Meeting Request"]
      }
    },
    {
      id: 3,
      sender: "+91 76543 21098",
      time: "5 mins ago",
      message: "Need bulk whatsapp sender tool. Send details. Thanks, Rohan.",
      extracted: {
        name: "Rohan",
        phone: "+91 76543 21098",
        company: "Unknown",
        intent: "WARM",
        extractedFields: ["Name", "Phone", "Tool Inquiry"]
      }
    },
    {
      id: 4,
      sender: "+91 99887 76655",
      time: "10 mins ago",
      message: "Do you provide international numbers for promotion? Let me know.",
      extracted: {
        name: "Visitor",
        phone: "+91 99887 76655",
        company: "N/A",
        intent: "COLD",
        extractedFields: ["Phone", "International Promos"]
      }
    }
  ];

  res.json({
    activeSessions: 12,
    leadsCapturedCount: 14820,
    accuracyRate: "99.2%",
    extractionSpeed: "380ms",
    streams: mockStreams
  });
});

// API route: Online Advertisements Simulation data
app.get('/api/simulation/ads', (req, res) => {
  const now = new Date();
  const seconds = now.getSeconds();

  // Dynamic statistics with live fluctuations
  const totalSpent = 124500 + (seconds * 45);
  const impressions = 845000 + (seconds * 220);
  const leadsCaptured = 2450 + Math.floor(seconds / 2);
  const avgCPL = parseFloat((50.8 - (seconds * 0.08)).toFixed(2));
  const avgCTR = parseFloat((3.45 + (seconds * 0.005)).toFixed(2));

  const activeCampaigns = [
    { name: 'Meta Click-to-WhatsApp Leads', spent: 54200 + (seconds * 20), leads: 1220 + Math.floor(seconds / 3), conversionRate: 14.2 },
    { name: 'Instagram Stories Direct Promo', spent: 38400 + (seconds * 15), leads: 830 + Math.floor(seconds / 4), conversionRate: 11.8 },
    { name: 'Google Search Intent Keywords', spent: 31900 + (seconds * 10), leads: 400 + Math.floor(seconds / 6), conversionRate: 18.5 }
  ];

  // Past 7 days data for AreaChart
  const chartData = [
    { name: 'Mon', spend: 12000, cpl: 62 },
    { name: 'Tue', spend: 14500, cpl: 58 },
    { name: 'Wed', spend: 15000, cpl: 54 },
    { name: 'Thu', spend: 17200, cpl: 51 },
    { name: 'Fri', spend: 19000, cpl: 49 },
    { name: 'Sat', spend: 15500, cpl: 47 },
    { name: 'Sun', spend: 18000, cpl: avgCPL }
  ];

  res.json({
    totalSpent,
    impressions,
    leadsCaptured,
    avgCPL,
    avgCTR,
    activeCampaigns,
    chartData
  });
});

// Serve frontend static assets in production
app.use(express.static(path.join(__dirname, '../client/dist')));

// Route all other requests to React frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Spike Marketing Solutions server running on port ${PORT}`);
});


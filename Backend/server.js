
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const headerRoutes = require('./routes/header');
const footerRoutes = require('./routes/footer');
const heroRoutes = require('./routes/heroRoutes');
const viewRoutes = require('./routes/views');
const nodemailer = require('nodemailer');
const path = require('path');
const Email = require('./models/Email');
const userRoutes = require('./routes/auth');
const galleryRoutes = require('./routes/gallery');
const viewsRoutes = require('./routes/views');
// const serviceRoutes = require('./routes/serviceRoutes');
const bannerRoutes = require('./routes/home/banner');
 const counterRoutes = require('./routes/home/counter');
const serviceRoutes = require('./routes/home/service');
const ratingRoutes = require('./routes/home/rating');
const expertiseRoutes = require('./routes/home/expertise');
const futureRoutes = require('./routes/home/future');


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../../exotica-app/public')));
app.use('/api/header', headerRoutes);
app.use('/api/footer', footerRoutes);
app.use('/api', heroRoutes);
app.use('/api/views', viewRoutes);
app.use('/users', userRoutes);
app.use('/api/gallery', galleryRoutes);
// app.use('/api/services', serviceRoutes); 
app.use('/api', viewsRoutes);

app.use('/api/banner', bannerRoutes);
app.use('/api/counters', counterRoutes);
app.use('/api/service', serviceRoutes);
app.use('/api/rating', ratingRoutes);
app.use('/api/expertise', expertiseRoutes );
app.use('/api/future', futureRoutes);



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vivekkumarkhatana9436@gmail.com', 
    pass: 'xkif whwc oabi ulqb',   
  },
});

app.post('/send-email', async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  try {
    
    const mailOptions = {
      from: 'vivekkumarkhatana9436@gmail.com',
      to: 'vivekkumarkhatana9436@gmail.com', 
      subject: `Contact  ${firstName} ${lastName}`,
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);

    
    const contact = new Email({ firstName, lastName, email, phone, message });
    await contact.save();

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
});

app.get('/emails', async (req, res) => {
  try {
   
    const emails = await Email.find();
    res.status(200).json(emails);
  } catch (error) {
    console.error('Error retrieving emails: ', error);
    res.status(500).json({ message: 'Error retrieving emails' });
  }
});


mongoose.connect('mongodb://localhost:27017/Exotica_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const RocketSMS = require('node-rocketsms-api');
const router = express.Router();

const sms = new RocketSMS({
    username: process.env.ROCKETSMS_USERNAME,
    password: process.env.ROCKETSMS_PASSWORD
});

// Отправка SMS
router.post('/send', async (req, res) => {
    try {
        const { phone, message } = req.body;

        if (!phone || !message) {
            return res.status(400).json({ error: 'Необходимо указать телефон и сообщение' });
        }

        const result = await sms.send(phone, message, false);
        res.json({ success: true, result });
    } catch (error) {
        console.error('Ошибка отправки SMS:', error);
        res.status(500).json({ error: error.message });
    }
});

// Проверка статуса сообщения
router.get('/status/:id', async (req, res) => {
    try {
        const result = await sms.status(req.params.id);
        res.json({ success: true, result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Получение баланса
router.get('/balance', async (req, res) => {
    try {
        const result = await sms.balance();
        res.json({ success: true, result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;